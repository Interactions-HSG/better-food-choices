package at.pro2future.cavl.infrastructure.knowledge;

import java.util.HashMap;
import java.util.Map;

import at.pro2future.cavl.infrastructure.CognitiveInfrastructure;

/**
 * Registers query invocations. Stub for a billing API
 * 
 * @author Simon Mayer, ETH Zurich and Pro²Future
 *
 */
public class Bookkeeper {

	private Map<String, Integer> numInvocationsPerQuery;
	
	public Bookkeeper() {
		CognitiveInfrastructure.logger.fine("Resetting query bookkeeper");
		numInvocationsPerQuery = new HashMap<String, Integer>();
	}
	
	public void registerQueryInvocation(String queryName) {
		CognitiveInfrastructure.logger.fine("Registering query invocation: " + queryName);
		
		if (numInvocationsPerQuery.containsKey(queryName)) {
			numInvocationsPerQuery.put(queryName, numInvocationsPerQuery.get(queryName) + 1);
		} else {
			numInvocationsPerQuery.put(queryName, 1);
		}
	}
	
	public int getNumInvocations(String queryName) {
		if (numInvocationsPerQuery.containsKey(queryName)) {
			return numInvocationsPerQuery.get(queryName);
		} else {
			return 0;
		}
	}
}
