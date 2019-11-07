package at.pro2future.cavl.infrastructure.resources;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.siemens.wotus.commonserver.utilities.ResponsesFactory;

import at.pro2future.cavl.infrastructure.knowledge.Bookkeeper;
import at.pro2future.cavl.infrastructure.knowledge.KnowledgePackManager;

@Path(AbstractResource.queriesResourcePath)
public class QueriesResource extends AbstractResource {

	@GET
	@Produces(MediaType.TEXT_HTML)
	@SuppressWarnings("rawtypes")
	public static Response getIndexHuman() {
		logger.log(Level.INFO, "Got a GET (TEXT_HTML) at the " + AbstractResource.queriesResourcePath + " endpoint " + MediaType.APPLICATION_JSON);
		Map template = packageResourceState();
		ResponseBuilder response = ResponsesFactory.createHTMLResponseFromTemplate("queries.ftl", template);
		finalizeResponse(response);
		return response.build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public static Response getIndexJSON() {
		logger.log(Level.INFO, "Got a GET (APPLICATION_JSON) at the " + AbstractResource.queriesResourcePath + " endpoint " + MediaType.APPLICATION_JSON);
		ResponseBuilder response;
		response = ResponsesFactory.createJSONResponse(packageResourceState());
		finalizeResponse(response);
		return response.build();
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private static Map packageResourceState() {
		Map root = new HashMap();

		Map<String, String> queryStrings = new HashMap<String, String>();
		Map<String, Integer> queryInvocations = new HashMap<String, Integer>();

		Set<String> queryNames = KnowledgePackManager.getInstance().getQueryNames();
		
		Bookkeeper bookkeeper = KnowledgePackManager.getInstance().getBookkeeper();
		
		int totalInvocations = 0;
		
		for (String queryName : queryNames) {
			String queryText = KnowledgePackManager.getInstance().getQueryText(queryName);
			queryStrings.put(queryName, queryText);
			
			int invocations = bookkeeper.getNumInvocations(queryName);
			totalInvocations += invocations;
			queryInvocations.put(queryName, invocations);
		}
				
		root.put("availableQueries", queryStrings);
		root.put("queryInvocations", queryInvocations);
		root.put("totalInvocations", totalInvocations);
		
		return root;
	}

}
