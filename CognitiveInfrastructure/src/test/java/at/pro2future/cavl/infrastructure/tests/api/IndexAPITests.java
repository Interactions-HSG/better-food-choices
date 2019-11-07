package at.pro2future.cavl.infrastructure.tests.api;

import javax.ws.rs.core.Response;

import org.junit.Test;

import at.pro2future.cavl.infrastructure.resources.APIv1Resource;

import static org.junit.Assert.*;

public class IndexAPITests {

    @Test
    public void testGETHTMLinterface() {
    	Response response = APIv1Resource.getIndexHuman();
    	assertTrue(response.getEntity().toString().startsWith("<!doctype html>"));
    }
}
