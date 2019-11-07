package at.pro2future.cavl.infrastructure.resources;

import java.io.ByteArrayOutputStream;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.jena.query.ResultSet;
import org.apache.jena.query.ResultSetFactory;
import org.apache.jena.query.ResultSetFormatter;
import org.json.JSONException;
import org.json.JSONObject;

import com.siemens.wotus.commonserver.utilities.ResponsesFactory;

import at.pro2future.cavl.infrastructure.CognitiveInfrastructure;
import at.pro2future.cavl.infrastructure.knowledge.KnowledgePackManager;

/**
 * Invoke named SPARQL queries
 * 
 * @author Simon Mayer, ETH Zurich and Pro2Future GmbH
 *
 */
@Path(AbstractResource.queryResourcePath)
public class QueryResource extends AbstractResource {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public static Response getQueryResultsAsJSON(@PathParam("queryName") String queryName, @Context UriInfo uriInfo) {
		logger.info("Got a GET at the " + AbstractResource.queryResourcePath + " endpoint (text/html) for query " + queryName);
		return(getResourceInformationAsSPARQLresults(queryName, uriInfo));
	}
	
	@GET
	@Produces("application/sparql-results+json")
	public static Response getResourceInformationAsSPARQLresults(@PathParam("queryName") String queryName, @Context UriInfo uriInfo) {
		logger.info("Got a GET at the " + AbstractResource.queryResourcePath + " endpoint (application/sparql-results+json) for query " + queryName);
		MultivaluedMap<String, String> queryParams = uriInfo.getQueryParameters(); 
		return(handleQuery(queryName, queryParams));
	}

	@POST
	@Consumes("application/json")
	@Produces("application/sparql-results+json")
	public static Response getResourceInformationAsSPARQLresultsLongParameters(String queryParamsAsJsonString, @PathParam("queryName") String queryName, @Context UriInfo uriInfo) {
		logger.info("Got a POST at the " + AbstractResource.queryResourcePath + " endpoint (application/sparql-results+json) for query " + queryName + " with parameters:");
		logger.info(queryParamsAsJsonString);
		return handleQueryWithJsonParameters(queryName, queryParamsAsJsonString);
	}

	@OPTIONS
	public Response getOptions() {
		return(createCORScompatibleOptionsResponse());
	}

	public static Response handleQueryWithJsonParameters(String queryName, String queryParamsAsJsonString) {
		MultivaluedMap<String, String> queryParams = parseQueryParameters(queryParamsAsJsonString);
		return handleQuery(queryName, queryParams);
	}


	public static Response handleQuery(String queryName, MultivaluedMap<String, String> queryParams) {
		if (queryParams != null) {
			for (String key : queryParams.keySet()) {
				if (queryParams.get(key).size() > 1) {
					return(ResponsesFactory.createHttpProblemResponse(Status.BAD_REQUEST, "Multiple values for the same key are not allowed. Please issue multiple requests instead."));
				}
			}
		}

		// Bookkeeping: Which clients access which queries?
		KnowledgePackManager.getInstance().getBookkeeper().registerQueryInvocation(queryName);

		try {
			checkIsLoadedQuery(queryName);
			ResultSet       results  = loadQueryResults(queryName, queryParams);
			ResponseBuilder response = packageResultsAsSPARQLresults(results);

			finalizeResponse(response);
			return(response.build());
		} catch (WebApplicationException e) {
			logger.warning(e.getMessage());
			return(ResponsesFactory.createHttpProblemResponse(Status.fromStatusCode(e.getResponse().getStatus()), e.getMessage()));
		}
	}
	
	private static ResponseBuilder packageResultsAsSPARQLresults(ResultSet results) {
		String responseStr  = null;
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		ResultSet localRS = (results != null) ? ResultSetFactory.copyResults(results) : results;

		if (localRS != null) {
			ResultSetFormatter.outputAsJSON(outputStream, localRS); //results); //localRS);
			responseStr = outputStream.toString();

			CognitiveInfrastructure.logger.fine("QueryResource.packageResultsAsSPARQLresults - Query Response: " + responseStr);

			JSONObject returnObject = new JSONObject(new String(outputStream.toByteArray()));
			return(ResponsesFactory.createJSONResponse(returnObject));
		} else {
			return(ResponsesFactory.createSimpleResponse(Status.OK, "Empty Response"));                        
		}
	}


	private static void checkIsLoadedQuery(String queryName) {
		if (!isLoadedQueryName(queryName)) {
			throw new WebApplicationException("The query " + queryName + " is not loaded or does not exist.", Status.NOT_FOUND);
		}
	}


	private static MultivaluedMap<String, String> parseQueryParameters(String content) {
		try {
			MultivaluedMap<String, String> parametersMap = new MultivaluedHashMap<String, String>();

			JSONObject parametersObject = new JSONObject(content);    

			for (String key : parametersObject.keySet()) {
				parametersMap.putSingle(key, parametersObject.getString(key));
			}

			return parametersMap;
		} catch (JSONException e) {
			logger.warning(e.getMessage());
			throw new WebApplicationException(e.getMessage(), Status.BAD_REQUEST);
		}
	}


	private static ResultSet loadQueryResults(String queryName, MultivaluedMap<String, String> queryParams) {
		ResultSet results = null;

		if (queryParams != null) {
			results = KnowledgePackManager.getInstance().executeNamedQuery(queryName, queryParams);
		} else {
			results = KnowledgePackManager.getInstance().executeNamedQuery(queryName);    
		}

		return(results);
	}


	private static boolean isLoadedQueryName(String queryName) {
		return(KnowledgePackManager.getInstance().getQueryNames().contains(queryName));
	}
}
