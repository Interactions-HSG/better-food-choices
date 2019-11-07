package at.pro2future.cavl.infrastructure.tests.api;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import at.pro2future.cavl.infrastructure.knowledge.KnowledgePackManager;
import at.pro2future.cavl.infrastructure.utilities.KPdoesNotExistException;
import at.pro2future.cavl.infrastructure.resources.AbstractResource;
import at.pro2future.cavl.infrastructure.resources.KnowledgePacksResource;
import at.pro2future.cavl.infrastructure.tests.util.TestingConfiguration;

import static org.junit.Assert.*;

public class ModelsAPITests {
	
	@Before
	public void setupKPs() throws KPdoesNotExistException {
		KnowledgePackManager.getInstance().updateModelsAndQueries(TestingConfiguration.getTestingKP());
	}
	
    @Test
    public void testGETHTMLinterface() {
    	Response response = KnowledgePacksResource.getModelsHTML();
    	assertTrue(response.getEntity().toString().startsWith("<!doctype html>"));
    }
    
    @Test
    public void testGETJSONinterface() {
    	Response response = KnowledgePacksResource.getModelsJSON();
    	JSONObject responseObject = new JSONObject(response.getEntity().toString());
    	assertTrue(responseObject.has("apidoc"));
    }
    
    @Test
    public void testFindModels() {
    	Response response = KnowledgePacksResource.getModelsJSON();
    	JSONObject responseObject = new JSONObject(response.getEntity().toString());
    	
    	assertTrue("Response contains loadedKnowledgepacks-object", responseObject.has(AbstractResource.loadedKnowledgePacksName));
    	assertEquals("A single KP has been loaded", 1, responseObject.getJSONArray(AbstractResource.loadedKnowledgePacksName).length());
    	assertEquals("That KPs name is 'testing-1'", "testing-1", responseObject.getJSONArray(AbstractResource.loadedKnowledgePacksName).getString(0));

    	assertTrue("Response contains availableKnowledgepacks-object", responseObject.has(AbstractResource.availableKnowledgePacksName));    	
    	assertTrue("KPs are available", responseObject.getJSONArray(AbstractResource.availableKnowledgePacksName).length() > 0);
    }
    
    @Test
    public void testReplaceModel_EmptyString() {
    	long initialTriples = KnowledgePackManager.getInstance().getModelsManager().countTriples();
    	assertTrue(initialTriples > 0);
    	
    	String newModelsStringAsJSON = "";
    	KnowledgePacksResource.updateModels(newModelsStringAsJSON);
    	
    	long newTriples = KnowledgePackManager.getInstance().getModelsManager().countTriples();
    	assertTrue(newTriples == initialTriples);	// Assert that model update was rejected
    }

    @Test
    public void testReplaceModel_BadRequestIfNonexistent() throws JSONException {
    	String newModelsStringAsJSON = "{'" + AbstractResource.loadedKnowledgePacksName + "' : [ \"testing\", \"nonexistingkp\" ] }";
    	Response response = KnowledgePacksResource.updateModels(newModelsStringAsJSON);
    	assertEquals(Status.BAD_REQUEST.getStatusCode(), response.getStatus());
    }
    
    @Test
    public void testReplaceModel_ValidString() throws JSONException {
    	JSONObject modelsObject = new JSONObject(KnowledgePacksResource.getModelsJSON().getEntity().toString());
    	
    	long initialTriples = KnowledgePackManager.getInstance().getModelsManager().countTriples();
    	assertTrue(initialTriples > 0);
    	
    	String newModelsStringAsJSON = "{'" + AbstractResource.loadedKnowledgePacksName + "' : [ ] }";
    	KnowledgePacksResource.updateModels(newModelsStringAsJSON);
    	assertEquals(0, KnowledgePackManager.getInstance().getModelsManager().countTriples());	// Assert that model update was successful
    	
    	String newNewModelsStringAsJSON = modelsObject.toString();
    	KnowledgePacksResource.updateModels(newNewModelsStringAsJSON);
    	
    	long newNewTriples = KnowledgePackManager.getInstance().getModelsManager().countTriples();
    	assertTrue(newNewTriples > 0);	// Assert that model update was successful
    }
}
