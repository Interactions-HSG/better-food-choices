package at.pro2future.cavl.infrastructure.tests;

import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.MultivaluedMap;

import org.apache.jena.query.ResultSet;
import org.apache.jena.query.ResultSetFactory;
import org.junit.Before;
import org.junit.Test;

import at.pro2future.cavl.infrastructure.CognitiveInfrastructure;
import at.pro2future.cavl.infrastructure.knowledge.KnowledgePackManager;
import at.pro2future.cavl.infrastructure.tests.util.TestingConfiguration;
import at.pro2future.cavl.infrastructure.utilities.KPdoesNotExistException;

import static org.junit.Assert.*;

public class ModelTests {

	@Before
	public void setupModels() throws KPdoesNotExistException {
		KnowledgePackManager.getInstance().updateModelsAndQueries(TestingConfiguration.getTestingKP());
	}

	@Test
	public void testInitializeTestingKP() throws KPdoesNotExistException {
		KnowledgePackManager.getInstance().updateModelsAndQueries(TestingConfiguration.getTestingKP());
		
		assertEquals(TestingConfiguration.numModelsTesting, KnowledgePackManager.getInstance().getModelsManager().getKnownModels().size());
		assertEquals(TestingConfiguration.numQueriesTesting, KnowledgePackManager.getInstance().getQueryNames().size());
		assertEquals(TestingConfiguration.numTriplesTesting, KnowledgePackManager.getInstance().getModelsManager().countTriples());
	}
	
	@Test
	public void testInitializeTestingAdditionalKP() throws KPdoesNotExistException {
		KnowledgePackManager.getInstance().updateModelsAndQueries(TestingConfiguration.getTestingAdditionalKP());
		
		assertEquals(TestingConfiguration.numModelsTestingAdditional, KnowledgePackManager.getInstance().getModelsManager().getKnownModels().size());
		assertEquals(TestingConfiguration.numQueriesTestingAdditional, KnowledgePackManager.getInstance().getQueryNames().size());
		assertEquals(TestingConfiguration.numTriplesTestingAdditional, KnowledgePackManager.getInstance().getModelsManager().countTriples());
	}

	@Test
	public void testInitializeAllTestingKPs() throws KPdoesNotExistException {
		KnowledgePackManager.getInstance().updateModelsAndQueries(TestingConfiguration.getAllTestingKPs());

		assertEquals(TestingConfiguration.numModelsTesting + TestingConfiguration.numModelsTestingAdditional, KnowledgePackManager.getInstance().getModelsManager().getKnownModels().size());
		assertEquals(TestingConfiguration.numQueriesTesting + TestingConfiguration.numQueriesTestingAdditional, KnowledgePackManager.getInstance().getQueryNames().size());
		assertEquals(TestingConfiguration.numTriplesTesting + TestingConfiguration.numTriplesTestingAdditional + TestingConfiguration.numMetadataTriples, KnowledgePackManager.getInstance().getModelsManager().countTriples());

		// Recreate original state
		KnowledgePackManager.getInstance().updateModelsAndQueries(CognitiveInfrastructure.getDefaultKnowledgePacks());
	}
	
	@Test
	public void testInitializeEmptyKP() throws KPdoesNotExistException {
		KnowledgePackManager.getInstance().updateModelsAndQueries(new ArrayList<String>());
		assertEquals(0, KnowledgePackManager.getInstance().getModelsManager().getKnownModels().size());
		assertEquals(0, KnowledgePackManager.getInstance().getQueryNames().size());
		assertEquals(0, KnowledgePackManager.getInstance().getModelsManager().countTriples());

		// Recreate original state
		KnowledgePackManager.getInstance().updateModelsAndQueries(CognitiveInfrastructure.getDefaultKnowledgePacks());
	}

	@Test(expected = KPdoesNotExistException.class)
	public void testReplaceModelByInvalidKP() throws KPdoesNotExistException {
		List<String> knowledgePackNames = new ArrayList<String>();
		knowledgePackNames.add("ssf");
		knowledgePackNames.add("nonexistingkp");
		KnowledgePackManager.getInstance().updateModelsAndQueries(knowledgePackNames);
	}

	@Test
	public void testInvalidModelDoesNotChangeState() throws KPdoesNotExistException {
		List<String> knowledgePackNames = new ArrayList<String>();
		knowledgePackNames.add("nonexistingkp");

		try {
			KnowledgePackManager.getInstance().updateModelsAndQueries(knowledgePackNames);
		} catch (KPdoesNotExistException e) {
			assertNotNull(e);
		}
		
		assertEquals(TestingConfiguration.numModelsTesting, KnowledgePackManager.getInstance().getModelsManager().getKnownModels().size());
		
		assertEquals("testing-1", KnowledgePackManager.getInstance().getLoadedKnowledgePacks().get(0));
		
		System.out.println("===============");
		System.out.println(TestingConfiguration.numQueriesTesting);
		System.out.println(KnowledgePackManager.getInstance().getQueryNames().size());
		System.out.println("===============");
		
		assertEquals(TestingConfiguration.numQueriesTesting, KnowledgePackManager.getInstance().getQueryNames().size());
		assertEquals(TestingConfiguration.numTriplesTesting, KnowledgePackManager.getInstance().getModelsManager().countTriples());

		// Recreate original state
		KnowledgePackManager.getInstance().updateModelsAndQueries(CognitiveInfrastructure.getDefaultKnowledgePacks());
	}

	@Test
	public void executeNamedSparqlQuery() {
		ResultSet results = KnowledgePackManager.getInstance().executeNamedQuery("AllMovies");
		results = ResultSetFactory.copyResults(results);
		
		int numResults = 0;
		
		while (results.hasNext()) {
			numResults++;
			results.next();
		}
		
		assertEquals(TestingConfiguration.numMoviesTesting, numResults);
	}

	@Test
	public void executeNamedSparqlQueryReplaceOneItem() {
		MultivaluedMap<String, String> replacementMap = new MultivaluedHashMap<String, String>();
		replacementMap.add("actorName", "Will Smith");

		ResultSet results = KnowledgePackManager.getInstance().executeNamedQuery("AllMoviesWithActor", replacementMap);
		
		int numResults = 0;

		while (results.hasNext()) {
			numResults++;
			results.next();
		}

		assertEquals(TestingConfiguration.numMoviesWithWillSmithTesting, numResults);
	}

	@Test(expected=WebApplicationException.class)
	public void executeUnknownSparqlQuery() {
		KnowledgePackManager.getInstance().executeNamedQuery("NonexistingQuery");
	}

	@Test
	public void executeNamedSparqlQueryNoReplaceException() {
		KnowledgePackManager.getInstance().executeNamedQuery("AllMoviesWithActor");
	}
}