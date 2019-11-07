package at.pro2future.cavl.infrastructure.tests.api;

import static org.junit.Assert.*;

import java.util.ConcurrentModificationException;

import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.json.JSONObject;
import org.junit.BeforeClass;
import org.junit.Test;
import at.pro2future.cavl.infrastructure.knowledge.KnowledgePackManager;
import at.pro2future.cavl.infrastructure.utilities.KPdoesNotExistException;
import at.pro2future.cavl.infrastructure.resources.QueriesResource;
import at.pro2future.cavl.infrastructure.resources.QueryResource;
import at.pro2future.cavl.infrastructure.tests.util.TestingConfiguration;

public class QueryAPITests {

	@BeforeClass
	public static void resetModel() throws KPdoesNotExistException {
		KnowledgePackManager.getInstance().updateModelsAndQueries(TestingConfiguration.getTestingKP());
	}

	@Test
	public void testQueriesGETHTMLinterface() {
		Response response = QueriesResource.getIndexHuman();
		String responseHTML = response.getEntity().toString();
		
		assertTrue("Response should be HTML", responseHTML.startsWith("<!doctype html>"));
		assertTrue("The HTML contains " + TestingConfiguration.numQueriesTesting + " queries", responseHTML.contains("The loaded KPs contain " + TestingConfiguration.numQueriesTesting + " queries"));
		assertTrue("The HTML contains the AllMovies query with correct link", responseHTML.contains("<a href=\"AllMovies/\"><li class=\"query\">AllMovies"));
		assertTrue("The HTML contains the AllMoviesWithActor query with correct link", responseHTML.contains("<a href=\"AllMoviesWithActor/\"><li class=\"query\">AllMoviesWithActor"));
		
		assertTrue("The HTML contains the AllCars query text", responseHTML.contains("SELECT DISTINCT ?response ?name"));
	}
	
	@Test
	public void testQueriesGETJSONinterface() {
		Response response = QueriesResource.getIndexJSON();
		JSONObject responseObject = new JSONObject(response.getEntity().toString());
    	
		assertTrue("The response contains a list of available queries", responseObject.has("availableQueries"));
		
		JSONObject availableQueries = responseObject.getJSONObject("availableQueries");
		assertTrue("The available queries contains the query 'AllMoviesWithActor'", availableQueries.keySet().contains("AllMoviesWithActor"));
		assertTrue("The available queries contains the query 'AllCars'", availableQueries.keySet().contains("AllCars"));
		assertTrue("The available queries contains the query 'AllMovies'", availableQueries.keySet().contains("AllMovies"));
		
		assertEquals("The available queries contains the query text for the 'AllMovies' query", KnowledgePackManager.getInstance().getQueryText("AllMovies"), availableQueries.getString("AllMovies"));
	}
	
	@Test
	public void testGETSPARQLResultsInterface() {
		MultivaluedMap<String, String> initialBindings = new MultivaluedHashMap<String, String>();
		initialBindings.add("actorName", "Will Smith");
		
		Response response = QueryResource.handleQuery("AllMoviesWithActor", initialBindings);
		JSONObject responseObject = new JSONObject(response.getEntity().toString());
		
		assertTrue(responseObject.has("results"));
		assertEquals("Response should contain Independence Day", "Independence Day", responseObject.getJSONObject("results").getJSONArray("bindings").getJSONObject(0).getJSONObject("reflectMovieName").getString("value"));
	}
	
	@Test
	public void testSPARQLResultsInterfaceBookkeeping() {
		int initialNumberInvocations = KnowledgePackManager.getInstance().getBookkeeper().getNumInvocations("AllMoviesWithActor");

		MultivaluedMap<String, String> initialBindings = new MultivaluedHashMap<String, String>();
		initialBindings.add("actorName", "Will Smith");
		
		QueryResource.handleQuery("AllMoviesWithActor", initialBindings);
		assertEquals(initialNumberInvocations + 1, KnowledgePackManager.getInstance().getBookkeeper().getNumInvocations("AllMoviesWithActor"));
	}
	
	@Test
	public void testGETSPARQLLongParametersResultsInterface() {
		int initialNumberInvocations = KnowledgePackManager.getInstance().getBookkeeper().getNumInvocations("AllMoviesWithActor");

		JSONObject parametersObject = new JSONObject();
		QueryResource.handleQueryWithJsonParameters("AllMoviesWithActor", parametersObject.toString());
		
		assertEquals(initialNumberInvocations + 1, KnowledgePackManager.getInstance().getBookkeeper().getNumInvocations("AllMoviesWithActor"));
	}
	
	@Test
	public void testGETJSONinterfaceMultipleReplacementValues() {
		MultivaluedMap<String, String> initialBindings = new MultivaluedHashMap<String, String>();
		initialBindings.add("actor", "Will Smith");
		initialBindings.add("actor", "Alec Baldwin");
		
		Response response = QueryResource.handleQuery("AllMoviesWithActor", initialBindings);
		assertEquals("Response must be a BAD_REQUEST", Status.BAD_REQUEST.getStatusCode(), response.getStatus());
	}
		
	@Test
	public void testGETSPARQLResultsInterfaceMissingReplacementValue() throws KPdoesNotExistException {
		Response response = QueryResource.handleQuery("AllMoviesWithActor", null);
		
		assertEquals("Response must be an OK", Status.OK.getStatusCode(), response.getStatus());
		
		JSONObject responseObject = new JSONObject(response.getEntity().toString());
		assertTrue(responseObject.has("results"));
		assertEquals("Response must contain 3 elements", TestingConfiguration.numMoviesTesting, responseObject.getJSONObject("results").getJSONArray("bindings").length());
	}
	
	@Test
	public void testSPARQL_DELETE_INSERT_ResultsInterface() {
		
		// Assert the correct number of movies
		Response response = QueryResource.handleQuery("AllMovies", null);
		JSONObject responseObject = new JSONObject(response.getEntity().toString());
		
		assertTrue(responseObject.has("results"));
		assertEquals("Response must contain " + TestingConfiguration.numMoviesTesting + " elements", TestingConfiguration.numMoviesTesting, responseObject.getJSONObject("results").getJSONArray("bindings").length());
		
		// Add Star Trek II
		response = QueryResource.handleQuery("InsertMovie", null);
		
		// Assert that a movie was added
		response = QueryResource.handleQuery("AllMovies", null);
		responseObject = new JSONObject(response.getEntity().toString());
				
		assertTrue(responseObject.has("results"));
		assertEquals("Response must contain " + (TestingConfiguration.numMoviesTesting + 1) + " elements", TestingConfiguration.numMoviesTesting + 1, responseObject.getJSONObject("results").getJSONArray("bindings").length());

		// Remove Star Trek II
		response = QueryResource.handleQuery("DeleteMovie", null);
			
		// Assert the correct number of movies
		response = QueryResource.handleQuery("AllMovies", null);
		responseObject = new JSONObject(response.getEntity().toString());
				
		assertTrue(responseObject.has("results"));
		assertEquals("Response must contain " + TestingConfiguration.numMoviesTesting + " elements", TestingConfiguration.numMoviesTesting, responseObject.getJSONObject("results").getJSONArray("bindings").length());
	}
	
	@Test
	public void testSPARQL_DELETE_INSERT_Parameterized_ResultsInterface() {
		
		// Assert that there is no movie with actor Steve Buscemi
		MultivaluedMap<String, String> initialBindings = new MultivaluedHashMap<String, String>();
		initialBindings.add("actorName", "Steve Buscemi");
		
		Response response = QueryResource.handleQuery("AllMoviesWithActor", initialBindings);
		JSONObject responseObject = new JSONObject(response.getEntity().toString());
		
		assertTrue(responseObject.has("results"));
		assertEquals("Response must contain 0 elements", 0, responseObject.getJSONObject("results").getJSONArray("bindings").length());

		// Add Steve Buscemi to Armageddon
		initialBindings = new MultivaluedHashMap<String, String>();
		initialBindings.add("actorName", "Steve Buscemi");
		initialBindings.add("movieName", "Armageddon");
		
		response = QueryResource.handleQuery("InsertActor", initialBindings);
		
		// Assert that there is a single movie with actor Steve Buscemi
		initialBindings = new MultivaluedHashMap<String, String>();
		initialBindings.add("actorName", "Steve Buscemi");
		
		response = QueryResource.handleQuery("AllMoviesWithActor", initialBindings);
		responseObject = new JSONObject(response.getEntity().toString());
		
		assertTrue(responseObject.has("results"));
		assertEquals("Response must contain 1 elements", 1, responseObject.getJSONObject("results").getJSONArray("bindings").length());
		
		// Remove Steve Buscemi from Armageddon
		initialBindings = new MultivaluedHashMap<String, String>();
		initialBindings.add("actorName", "Steve Buscemi");
		initialBindings.add("movieName", "Armageddon");
				
		response = QueryResource.handleQuery("DeleteActor", initialBindings);
		
		// Assert that there is no movie with actor Steve Buscemi
		initialBindings = new MultivaluedHashMap<String, String>();
		initialBindings.add("actorName", "Steve Buscemi");
				
		response = QueryResource.handleQuery("AllMoviesWithActor", initialBindings);
		responseObject = new JSONObject(response.getEntity().toString());
				
		assertTrue(responseObject.has("results"));
		assertEquals("Response must contain 0 elements", 0, responseObject.getJSONObject("results").getJSONArray("bindings").length());
	}
	
	@Test
	public void testSPARQL_DELETE_CONSTRUCT_INEFFECTIVE_Parameterized_ResultsInterface() {
		
		// FIXME CONSTRUCT is deactivated in the API, so this test should not do anything
		
		// Assert that there is no movie with actor Steve Buscemi
		MultivaluedMap<String, String> initialBindings = new MultivaluedHashMap<String, String>();
		initialBindings.add("actorName", "Steve Buscemi");
		
		Response response = QueryResource.handleQuery("AllMoviesWithActor", initialBindings);
		JSONObject responseObject = new JSONObject(response.getEntity().toString());
		
		assertTrue(responseObject.has("results"));
		assertEquals("Response must contain 0 elements", 0, responseObject.getJSONObject("results").getJSONArray("bindings").length());

		// Add Steve Buscemi to Armageddon
		initialBindings = new MultivaluedHashMap<String, String>();
		initialBindings.add("actorName", "Steve Buscemi");
		initialBindings.add("movieName", "Armageddon");
		
		try {
			response = QueryResource.handleQuery("ConstructActor", initialBindings);	
		} catch (ConcurrentModificationException e) {
			// FIXME We expect this exception for CONSTRUCT queries - the CONSTRUCT still works, perhaps a race condition in-between the inferencing and CONSTRUCT
		}
		
		// Assert that there is a single movie with actor Steve Buscemi
		initialBindings = new MultivaluedHashMap<String, String>();
		initialBindings.add("actorName", "Steve Buscemi");
		
		response = QueryResource.handleQuery("AllMoviesWithActor", initialBindings);
		responseObject = new JSONObject(response.getEntity().toString());
		
		assertTrue(responseObject.has("results"));
		assertEquals("Response must contain 0 elements because CONSTRUCT queries are deactivated", 0, responseObject.getJSONObject("results").getJSONArray("bindings").length());
		
		// Remove Steve Buscemi from Armageddon
		initialBindings = new MultivaluedHashMap<String, String>();
		initialBindings.add("actorName", "Steve Buscemi");
		initialBindings.add("movieName", "Armageddon");
				
		response = QueryResource.handleQuery("DeleteActor", initialBindings);
		
		// Assert that there is no movie with actor Steve Buscemi
		initialBindings = new MultivaluedHashMap<String, String>();
		initialBindings.add("actorName", "Steve Buscemi");
				
		response = QueryResource.handleQuery("AllMoviesWithActor", initialBindings);
		responseObject = new JSONObject(response.getEntity().toString());
				
		assertTrue(responseObject.has("results"));
		assertEquals("Response must contain 0 elements", 0, responseObject.getJSONObject("results").getJSONArray("bindings").length());
	}
}
