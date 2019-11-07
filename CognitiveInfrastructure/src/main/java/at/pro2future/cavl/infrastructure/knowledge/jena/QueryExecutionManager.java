package at.pro2future.cavl.infrastructure.knowledge.jena;

import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.query.ResultSetFactory;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.shared.Lock;
import org.apache.jena.update.UpdateAction;
import org.apache.jena.update.UpdateRequest;
import org.topbraid.spin.arq.ARQFactory;

import at.pro2future.cavl.infrastructure.knowledge.KnowledgePackManager;

/**
 * Manages queries within a KnowledgePack and their execution
 */
public class QueryExecutionManager {

	public ResultSet executeQuery(Query query) {
		ResultSet results = null;
		Model model = KnowledgePackManager.getInstance().getModelsManager().getModel();

		model.enterCriticalSection(Lock.READ);
		try {
			try (QueryExecution qe = ARQFactory.get().createQueryExecution(query, model)) {
				results = ResultSetFactory.copyResults(qe.execSelect());
				qe.close();
			}
		} finally {
			model.leaveCriticalSection();
		}
		return results;
	}

	public ResultSet executeQuery(Query query, String baseUri){
		return executeQuery(query);		
	}

	public Model executeConstruct(Query query) {
		Model model = KnowledgePackManager.getInstance().getModelsManager().getModel();
		model.enterCriticalSection(Lock.WRITE);
		Model constructedModel = null;
		try {
			try (QueryExecution qe = ARQFactory.get().createQueryExecution(query, model)) {
				constructedModel = qe.execConstruct(model);
				qe.close();
			}
		} finally {
			model.leaveCriticalSection();
		}
		return constructedModel;
	}

	public ResultSet executeUpdate(UpdateRequest updateRequest) {
		Model model = KnowledgePackManager.getInstance().getModelsManager().getModel();
		model.enterCriticalSection(Lock.WRITE);
		try {
			UpdateAction.execute(updateRequest, model);
		}
		finally {
			model.leaveCriticalSection();
		}
		return null;
	}

}
