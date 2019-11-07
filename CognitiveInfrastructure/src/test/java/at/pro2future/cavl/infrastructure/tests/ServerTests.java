package at.pro2future.cavl.infrastructure.tests;
import org.junit.Test;

import at.pro2future.cavl.infrastructure.knowledge.KnowledgePackManager;
import static org.junit.Assert.*;

public class ServerTests {

	@Test
    public void testKnowledgePackManager() {
    	assertNotNull(KnowledgePackManager.getInstance());
    }
	
    @Test
    public void testModelsManager() {
    	assertNotNull(KnowledgePackManager.getInstance().getModelsManager());
    }
    
}
