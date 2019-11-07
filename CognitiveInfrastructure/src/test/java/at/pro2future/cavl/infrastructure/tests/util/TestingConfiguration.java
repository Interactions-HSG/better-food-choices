package at.pro2future.cavl.infrastructure.tests.util;

import java.util.ArrayList;
import java.util.List;

import at.pro2future.cavl.infrastructure.tests.util.TestingConfiguration;

public class TestingConfiguration {
	public static int numModelsTesting = 4;
	public static int numTriplesTesting = 8822;
	public static int numQueriesTesting = 8;
	public static int numMoviesTesting = 2;
	public static int numMoviesWithWillSmithTesting = 1;
	
	public static int numModelsTestingAdditional = 3;
	public static int numTriplesTestingAdditional = 97;
	public static int numQueriesTestingAdditional = 3;

	public static int numMetadataTriples = 0;
	public static int numCarsTesting = 0;
	
	public static List<String> getTestingKP() {
		List<String> testingKPs = new ArrayList<String>();
		testingKPs.add("testing-1");
		return testingKPs;
	}
	
	public static List<String> getTestingAdditionalKP() {
		List<String> testingKPs = new ArrayList<String>();
		testingKPs.add("testing-2");
		return testingKPs;
	}
	
	public static List<String> getAllTestingKPs() {
		List<String> testingKPs = new ArrayList<String>();
		testingKPs.add("testing-1");
		testingKPs.add("testing-2");
		return testingKPs;
	}

	public static List<String> getAVLKPs() {
		List<String> testingKPs = new ArrayList<String>();
		testingKPs.add("avl-testing");
		return testingKPs;
	}

}
