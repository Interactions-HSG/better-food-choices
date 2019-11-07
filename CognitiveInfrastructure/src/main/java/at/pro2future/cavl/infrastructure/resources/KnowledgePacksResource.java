package at.pro2future.cavl.infrastructure.resources;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.siemens.wotus.commonserver.utilities.Constants;
import com.siemens.wotus.commonserver.utilities.ResponsesFactory;
import com.siemens.wotus.commonserver.utilities.ServerUtilities;

import at.pro2future.cavl.infrastructure.knowledge.KnowledgePackManager;
import at.pro2future.cavl.infrastructure.utilities.KPdoesNotExistException;

@Path(AbstractResource.knowledgePacksPath)
public class KnowledgePacksResource extends AbstractResource {

    @GET
    @Produces(MediaType.TEXT_HTML)
    @SuppressWarnings("rawtypes")
    public static Response getModelsHTML() {
        logger.log(Level.INFO, "Got a GET at the " + AbstractResource.knowledgePacksPath + " endpoint " + MediaType.APPLICATION_JSON);
        Map template = packageResourceState();
        ResponseBuilder response = ResponsesFactory.createHTMLResponseFromTemplate("knowledgepacks.ftl", template);
        finalizeResponse(response);
        return response.build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public static Response getModelsJSON() {
        logger.log(Level.INFO, "Got a GET at the " + AbstractResource.knowledgePacksPath + " endpoint " + MediaType.APPLICATION_JSON);
        ResponseBuilder response = ResponsesFactory.createJSONResponse(packageResourceState());
        finalizeResponse(response);
        return response.build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public static Response updateModels(String newKnowledgePacksObjectAsString) {
        logger.info("Got a PUT at the " + AbstractResource.knowledgePacksPath + " endpoint " + MediaType.APPLICATION_JSON);
        logger.info(newKnowledgePacksObjectAsString);

        try {
            JSONObject newKnowledgePacksObject = new JSONObject(newKnowledgePacksObjectAsString);
            JSONArray knowledgePacksArray = newKnowledgePacksObject.getJSONArray(AbstractResource.loadedKnowledgePacksName);

            List<String> knowledgePacks = new ArrayList<String>();
            for (int i = 0; i < knowledgePacksArray.length(); i++) {
              knowledgePacks.add(knowledgePacksArray.getString(i));
            }
            KnowledgePackManager.getInstance().updateModelsAndQueries(knowledgePacks);

            return ResponsesFactory.createHttpProblemResponse(Status.OK, "Ok. Loaded " + KnowledgePackManager.getInstance().getModelsManager().countTriples() + " triples and " + KnowledgePackManager.getInstance().countQueryTemplates() + " query templates.");
        } catch (JSONException e) {
            logger.severe(e.getMessage());
            return ResponsesFactory.createHttpProblemResponse(Status.BAD_REQUEST, e.getMessage());
        } catch (KPdoesNotExistException e) {
            return ResponsesFactory.createHttpProblemResponse(Status.BAD_REQUEST, e.getMessage());
        }
    }

    @GET
    @Path("/save")
    public static Response saveModels() {
        logger.log(Level.INFO, "Got a GET(saveModels) at the " + AbstractResource.knowledgePacksPath + " endpoint " + MediaType.APPLICATION_JSON);
        KnowledgePackManager.getInstance().getModelsManager().saveModelToFile();
        return ResponsesFactory.createHttpProblemResponse(Status.OK, "Saved model to file.");
    }

    @OPTIONS
    public static Response getOptions() {
        return createCORScompatibleOptionsResponse();
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
    private static Map packageResourceState() {
        Map root = new HashMap();
        
        root.put("interfaceURL", ServerUtilities.getBaseURI(Constants.serverPort));
        
        List<String> loadedKnowledgePacks = KnowledgePackManager.getInstance().getLoadedKnowledgePacks();
        root.put(AbstractResource.loadedKnowledgePacksName, loadedKnowledgePacks);
        
        List<String> availableKnowledgePacks = KnowledgePackManager.getInstance().getAvailableKnowledgePacks();

        for (String loadedKPname : loadedKnowledgePacks) {
            if (availableKnowledgePacks.contains(loadedKPname)) {
                availableKnowledgePacks.remove(loadedKPname);
            }
        }

        root.put(AbstractResource.availableKnowledgePacksName, availableKnowledgePacks);
        
        root.put("apidoc", "See the 'knowledgePacks' array for all KPs that are in use at the moment. PUT a new KP descriptor in application/json to change which models are used. The resources support CORS http://www.w3.org/TR/cors/");

        return root;
    }
}
