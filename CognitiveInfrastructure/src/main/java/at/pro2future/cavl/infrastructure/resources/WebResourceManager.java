package at.pro2future.cavl.infrastructure.resources;

import java.io.InputStream;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.siemens.wotus.commonserver.utilities.ResponsesFactory;

import at.pro2future.cavl.infrastructure.CognitiveInfrastructure;


/**
 * Pseudo-Resource that handles static resources: images, stylesheets, scripts, API documentation
 * 
 * @author Simon Mayer, ETH Zurich
 *
 */
@Path(AbstractResource.webResourcesPath)
public class WebResourceManager {


	@GET
	@Path("/images/{picturename}")
	@Produces("images/*")
	public Response getImage(@PathParam("picturename") String picturename) {
		return getResourceResponse("images/" + picturename, "images/*");
	}

	@GET
	@Path("/stylesheets/{scriptname}")
	@Produces("text/css")
	public Response getStylesheet(@PathParam("scriptname") String scriptname) {
		return getResourceResponse("stylesheets/" + scriptname, "text/css");
	}

	@GET
	@Path("/data/{dataname}")
	@Produces("application/json")
	public Response getData(@PathParam("dataname") String dataname) {
		return getResourceResponse("data/" + dataname, "application/json");
	}


	@GET
	@Path("/scripts/{scriptname}")
	@Produces("text/css")
	public Response getScript(@PathParam("scriptname") String scriptname) {
		return getResourceResponse("scripts/" + scriptname, "application/js");
	}

	@GET
	@Path("/apidoc")
	@Produces("text/html")
	@SuppressWarnings({ "rawtypes", "unchecked" })	
	public Response getDescription() throws UnknownHostException {
		Map root = new HashMap();
		
		root.put("baseURI", CognitiveInfrastructure.getBaseURI());
		
		return ResponsesFactory.createHTMLResponseFromTemplate("apidoc.ftl", root).build();
	}

	private Response getResourceResponse(String string, String mediaType) {
		InputStream is = this.getClass().getClassLoader().getResourceAsStream(string);
		if (is != null) {
      return Response.ok(is, mediaType).build();
    } else {
      return ResponsesFactory.createStatusCodeResponse(Status.NOT_FOUND);
    }
	}
}
