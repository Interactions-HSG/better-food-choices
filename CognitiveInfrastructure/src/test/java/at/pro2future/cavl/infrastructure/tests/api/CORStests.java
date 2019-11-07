package at.pro2future.cavl.infrastructure.tests.api;

import javax.ws.rs.core.Response;

import org.junit.Test;

import at.pro2future.cavl.infrastructure.resources.APIv1Resource;
import at.pro2future.cavl.infrastructure.resources.KnowledgePacksResource;

import static org.junit.Assert.*;

public class CORStests {

    @Test
    public void testCORSheaders() {
    	Response response = APIv1Resource.getIndexHuman();
    	assertEquals("*", response.getHeaders().get("Access-Control-Allow-Origin").get(0));
    	assertEquals("GET, POST, PUT, DELETE, OPTIONS", response.getHeaders().get("Access-Control-Allow-Methods").get(0));
    }
    
    @Test
    public void testCORSpreflight() {
    	Response response = KnowledgePacksResource.getOptions();
    	assertEquals("*", response.getHeaders().get("Access-Control-Allow-Origin").get(0));
    	assertEquals("GET, POST, PUT, DELETE, OPTIONS", response.getHeaders().get("Access-Control-Allow-Methods").get(0));
    	assertEquals("Content-Type, Accept, X-Requested-With, Session", response.getHeaders().get("Access-Control-Allow-Headers").get(0));
    }
}