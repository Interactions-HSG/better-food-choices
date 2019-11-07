package at.pro2future.cavl.infrastructure.tests.cavl;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.json.JSONObject;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import at.pro2future.cavl.infrastructure.knowledge.KnowledgePackManager;
import at.pro2future.cavl.infrastructure.resources.QueryResource;
import at.pro2future.cavl.infrastructure.tests.util.TestingConfiguration;
import at.pro2future.cavl.infrastructure.utilities.KPdoesNotExistException;

public class Cognitive_AVL_Tests {
	
	@Before
	public void setupModels() throws KPdoesNotExistException {
		KnowledgePackManager.getInstance().updateModelsAndQueries(TestingConfiguration.getAVLKPs());
	}

	@Test
	public void testGetAllTestModuleTypes() throws KPdoesNotExistException {
		Response response = QueryResource.handleQuery("AllTestingModuleTypes", null);
		
		assertEquals("Response must be an OK", Status.OK.getStatusCode(), response.getStatus());
		
		JSONObject responseObject = new JSONObject(response.getEntity().toString());
		assertTrue(responseObject.has("results"));
		assertEquals("Response must contain " + AVLTestingConfiguration.numTestModuleTypes + " elements", AVLTestingConfiguration.numTestModuleTypes, responseObject.getJSONObject("results").getJSONArray("bindings").length());
	}
	
	@Test
	public void testGetTestModuleInstancesForDriverType() throws KPdoesNotExistException {
		MultivaluedMap<String, String> initialBindings = new MultivaluedHashMap<String, String>();
		initialBindings.add("testModuleType", "http://pro2future.at/schemas/cavl#DriverModule");
		
		Response response = QueryResource.handleQuery("TestModulesWithType", initialBindings);
		
		assertEquals("Response must be an OK", Status.OK.getStatusCode(), response.getStatus());
		
		JSONObject responseObject = new JSONObject(response.getEntity().toString());
		assertTrue(responseObject.has("results"));
		assertEquals("Response must contain " + AVLTestingConfiguration.numDriverModuleInstances + " elements", AVLTestingConfiguration.numDriverModuleInstances, responseObject.getJSONObject("results").getJSONArray("bindings").length());
	}
	
	
	@Test
	public void testGetAggressiveDriverInformation() throws KPdoesNotExistException {
		MultivaluedMap<String, String> initialBindings = new MultivaluedHashMap<String, String>();
		initialBindings.add("testModule", "http://pro2future.at/schemas/cavl#MockDriverAggressive");
		
		Response response = QueryResource.handleQuery("TestModuleInformation", initialBindings);
		
		assertEquals("Response must be an OK", Status.OK.getStatusCode(), response.getStatus());
		
		JSONObject responseObject = new JSONObject(response.getEntity().toString());
		assertTrue(responseObject.has("results"));
		assertEquals("Response must contain " + AVLTestingConfiguration.numAggressiveDriverInstances + " elements", AVLTestingConfiguration.numAggressiveDriverInstances, responseObject.getJSONObject("results").getJSONArray("bindings").length());
		
		// TODO Verify that the returned information is correct
	}
	
	
	@Test
	public void testGetReferenceTestOrders() throws KPdoesNotExistException {
		Response response = QueryResource.handleQuery("AllTestOrders", null);
		
		assertEquals("Response must be an OK", Status.OK.getStatusCode(), response.getStatus());
		
		JSONObject responseObject = new JSONObject(response.getEntity().toString());
		assertTrue(responseObject.has("results"));
		assertEquals("Response must contain " + AVLTestingConfiguration.numTestOrders + " elements", AVLTestingConfiguration.numTestOrders, responseObject.getJSONObject("results").getJSONArray("bindings").length());
		
		assertEquals("First binding must have correct ID", 1, responseObject.getJSONObject("results").getJSONArray("bindings").getJSONObject(0).getJSONObject("testOrderId").getInt("value"));
		assertEquals("First binding must have correct characteristic value", "http://pro2future.at/schemas/cavl#Drivability", responseObject.getJSONObject("results").getJSONArray("bindings").getJSONObject(0).getJSONObject("testOrderTargetCharacteristic").getString("value"));
		
		assertEquals("Second binding must have correct ID", 2, responseObject.getJSONObject("results").getJSONArray("bindings").getJSONObject(1).getJSONObject("testOrderId").getInt("value"));
		assertEquals("Second binding must have correct characteristic value", "http://pro2future.at/schemas/cavl#FuelConsumption", responseObject.getJSONObject("results").getJSONArray("bindings").getJSONObject(1).getJSONObject("testOrderTargetCharacteristic").getString("value"));
	}
}