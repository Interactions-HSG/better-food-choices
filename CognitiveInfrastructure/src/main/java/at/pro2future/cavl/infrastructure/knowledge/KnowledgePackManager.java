package at.pro2future.cavl.infrastructure.knowledge;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.jena.query.ParameterizedSparqlString;
import org.apache.jena.query.Query;
import org.apache.jena.query.QueryParseException;
import org.apache.jena.query.ResultSet;
import org.apache.jena.sparql.core.Prologue;
import org.apache.jena.update.UpdateRequest;

import com.siemens.wotus.commonserver.utilities.ResponsesFactory;

import at.pro2future.cavl.infrastructure.Constants;
import at.pro2future.cavl.infrastructure.CognitiveInfrastructure;
import at.pro2future.cavl.infrastructure.knowledge.jena.ModelsManager;
import at.pro2future.cavl.infrastructure.knowledge.jena.QueryExecutionManager;
import at.pro2future.cavl.infrastructure.utilities.FileUtilities;
import at.pro2future.cavl.infrastructure.utilities.KPdoesNotExistException;
import at.pro2future.cavl.infrastructure.utilities.QueryUtilities;

/**
 * Loads and unloads KnowledgePacks (ontologies and queries)
 * 
 * @author Simon Mayer, ETH Zurich and Pro²Future
 *
 */
public class KnowledgePackManager {

	private ModelsManager modelsManager = null;
	private QueryExecutionManager queryExecutor = null;
	private Bookkeeper bookkeeper = null;

	private List<String> loadedKnowledgePacks = null;

	private KnowledgePackManager() {
		this.loadedKnowledgePacks = new ArrayList<String>();
		this.modelsManager = new ModelsManager();
		this.queryExecutor = new QueryExecutionManager();
		this.bookkeeper = new Bookkeeper();
	}

	/**
	 * updateModelsAndQueries: Updates the models and queries associated with a knowledge pack name
	 * 
	 */
	public void updateModelsAndQueries(List<String> knowledgePackNames) throws KPdoesNotExistException {
		this.modelsManager.update(knowledgePackNames);
		this.updateQueries(knowledgePackNames);
		this.loadedKnowledgePacks = knowledgePackNames;
	}

	private Map<String, String> allQueries = new HashMap<String, String>();

	/**
	 * updateQueries: Update the collection of queries associated with a knowledge pack name
	 */
	void updateQueries(List<String> knowledgePackNames) throws KPdoesNotExistException {
		List<String> queryFileNames = new ArrayList<String>();

		this.allQueries = new HashMap<>();
		CognitiveInfrastructure.logger.info("Updating KPs in QueryManager: " + knowledgePackNames.toString());

		for (String knowledgePackName : knowledgePackNames) {
			CognitiveInfrastructure.logger.info("Loading KnowledgePack (Queries): " + knowledgePackName);

			// Load query names from directory
			String[] files = FileUtilities.getFileListingForDirectory(FileUtilities.findKnowledgePackDirectory(knowledgePackName) + File.separator + Constants.queriesDirectoryName);

			if (files != null && files.length > 0) {
				for (String queryFileName : files) {
					queryFileNames.add(FileUtilities.findKnowledgePackDirectory(knowledgePackName) + File.separator + Constants.queriesDirectoryName + queryFileName);
				}
			}
		}

		for (String queryFileName : queryFileNames) {
			String queryName = QueryUtilities.qualifiedPathToQueryName(queryFileName);

			addQuery(queryName, queryFileName);
		}

		return;
	}

	/**
	 * addQuery: Adds a hash entry for a query and query file name to the allQueries collection
	 */
	private void addQuery(String queryName, String queryFileName) {
		if (this.allQueries.containsKey(queryName)) {
			CognitiveInfrastructure.logger.info("Query " + queryName + " is being replaced.");
		}

		this.allQueries.put(queryName, queryFileName);

		CognitiveInfrastructure.logger.fine("Registered query: " + queryName + " (" + queryFileName + ")");
		return;
	}

	public List<String> getAvailableKnowledgePacks() {
		String [] fileNames = FileUtilities.getFileListingForDirectory("knowledgepacks");

		return(new ArrayList<String>(Arrays.asList(fileNames)));
	}

	public List<String> getLoadedKnowledgePacks() {
		if (this.loadedKnowledgePacks == null) {
			return(new ArrayList<String>());
		}

		return(this.loadedKnowledgePacks);
	}

	public ModelsManager getModelsManager() {
		return(this.modelsManager);
	}

	public QueryExecutionManager getQueryExecutor() {
		return(this.queryExecutor);
	}

	public Bookkeeper getBookkeeper() {
		return(this.bookkeeper);
	}

	public Set<String> getQueryNames() {
		return(this.allQueries.keySet());
	}

	private Prologue loadQuery(String queryName, MultivaluedMap<String, String> replacementMap) {
		try {
			if (!this.allQueries.containsKey(queryName)) {
				throw new WebApplicationException(ResponsesFactory.createHttpProblemResponse(Status.INTERNAL_SERVER_ERROR, "Query " + queryName + " cannot be found!"));
			} else {
				ParameterizedSparqlString queryString = QueryUtilities.loadAndReplaceQueryParameters(this.allQueries.get(queryName), replacementMap);


				CognitiveInfrastructure.logger.info("Query: " + queryString);

				if (queryString.toString().contains("DELETE") || queryString.toString().contains("INSERT")) {                        // SPARQL Keywords
					CognitiveInfrastructure.logger.info("Treat as update.");
					return queryString.asUpdate();
				} else {
					Query query = queryString.asQuery();

					if (query.isConstructType()) {
						CognitiveInfrastructure.logger.info("Treat as construct.");
					} else {
						CognitiveInfrastructure.logger.info("Treat as select.");
					}

					return query;
				}
			}
		} catch (QueryParseException e) {
			e.printStackTrace();
			throw new WebApplicationException(e.getMessage(), Status.BAD_REQUEST);
		} catch (IOException e) {
			e.printStackTrace();
			throw new WebApplicationException(e.getMessage(), Status.INTERNAL_SERVER_ERROR);
		}		
	}

	public String getQueryText(String queryName) {
		try {
			return(StringEscapeUtils.escapeHtml(QueryUtilities.readFromFile(this.allQueries.get(queryName))));    
		} catch (IOException e) {
			return("Query file not found: " + e.getMessage());
		}
	}

	public ResultSet executeNamedQuery(String queryName) {
		return(executeNamedQuery(queryName, null));
	}

	public ResultSet executeNamedQuery(String queryName, MultivaluedMap<String, String> replacementMap) {
		Prologue prologue = loadQuery(queryName, replacementMap);

		if (prologue instanceof Query) {
			Query query = (Query) prologue;

			if (query.isConstructType()) {
				throw new WebApplicationException("CONSTRUCT queries are not implemented", Status.NOT_IMPLEMENTED);
			} else {
				return KnowledgePackManager.getInstance().getQueryExecutor().executeQuery(query);
			}
		} else if (prologue instanceof UpdateRequest) {
			return(KnowledgePackManager.getInstance().getQueryExecutor().executeUpdate(((UpdateRequest) prologue)));
		} else {
			return(null);
		}
	}

	public int countQueryTemplates() {
		return(this.allQueries.size());
	}

	private static KnowledgePackManager INSTANCE = null;

	public static KnowledgePackManager getInstance() {
		if (INSTANCE == null) {
			INSTANCE = new KnowledgePackManager();
		}

		CognitiveInfrastructure.logger.fine("Model Size: " + INSTANCE.getModelsManager().countTriples());

		return(INSTANCE);
	}

}
