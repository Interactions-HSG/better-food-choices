package dominicbruegger.thesis.foodplugin.functions;

import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class ApiCall {
	
	public static String callKlausApi(String gtin) {
		String result = "null";
		CredentialsProvider credsProvider = new BasicCredentialsProvider();
        credsProvider.setCredentials(
                new AuthScope("eatfit-service.foodcoa.ch", 443),
                new UsernamePasswordCredentials("eatfit_student_dominic", "yJFbbHtCPTFyy8GB"));
        CloseableHttpClient httpclient = HttpClients.custom()
                .setDefaultCredentialsProvider(credsProvider)
                .build();
        try {
            HttpGet httpget = new HttpGet("https://eatfit-service.foodcoa.ch/products/" + gtin + "/?resultType=array");
            CloseableHttpResponse response = httpclient.execute(httpget);
        	result = EntityUtils.toString(response.getEntity());
        	httpclient.close();
        	return result;
    	} catch (Exception e) {
			e.printStackTrace();
			System.exit(0);
		}
		return null;
	}
}