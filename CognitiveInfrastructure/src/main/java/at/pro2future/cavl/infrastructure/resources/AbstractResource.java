package at.pro2future.cavl.infrastructure.resources;

import java.util.logging.Level;
import java.util.logging.Logger;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;

import com.siemens.wotus.commonserver.utilities.ResponsesFactory;


/**
 * Common values and methods for all resources
 */
public abstract class AbstractResource {

	public static final String indexResourcePath = "/";
	public static final String rootResourcePath = "v1/";
	public static final String webResourcesPath = "webresources/";

	public static final String queriesResourcePath = rootResourcePath + "queries/";
	public static final String queryResourcePath = queriesResourcePath + "{queryName}/";
	public static final String knowledgePacksPath = rootResourcePath + "knowledgepacks/";

	public static final String loadedKnowledgePacksName = "loadedKnowledgePacks";
	public static final String availableKnowledgePacksName = "availableKnowledgePacks";

	protected static Logger logger = Logger.getLogger(AbstractResource.class.getName());

	static {
		logger.setLevel(Level.INFO);
	}

	protected static Response createCORScompatibleOptionsResponse() {
		ResponseBuilder response = Response.status(Status.OK);
		ResponsesFactory.addCORSAuthenticationHeaders(response);
		ResponsesFactory.addCORSOptionsHeader(response);
		return response.build();
	}

	public static void finalizeResponse(ResponseBuilder response) {	
		// TODO The following if/else that checks whether the response already contains CORS headers should be part of CommonServer!
		Response currentResponse = response.build();
		if (currentResponse.getHeaderString("Access-Control-Allow-Origin") == null) {
			ResponsesFactory.addCORSAuthenticationHeaders(response);
		}
	}
}
