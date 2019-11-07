package at.pro2future.cavl.infrastructure.resources;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.siemens.wotus.commonserver.utilities.ResponsesFactory;

import at.pro2future.cavl.infrastructure.CognitiveInfrastructure;

@Path(AbstractResource.rootResourcePath)
public class APIv1Resource extends AbstractResource {

	@GET
	@Produces(MediaType.TEXT_HTML)
	public static Response getIndexHuman() {
		logger.log(Level.INFO, "Got a GET at the " + AbstractResource.rootResourcePath + " endpoint " + MediaType.APPLICATION_JSON);
		
		Map<String, URI> root = new HashMap<String, URI>();
		root.put("baseURI", CognitiveInfrastructure.getBaseURI());
		
		ResponseBuilder response = ResponsesFactory.createHTMLResponseFromTemplate("APIv1.ftl", root);
		finalizeResponse(response);
		return response.build();
	}
}
