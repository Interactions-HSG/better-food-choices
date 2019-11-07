package dominicbruegger.thesis.foodplugin.functions;

import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.github.jsonldjava.core.JsonLdOptions;
import com.github.jsonldjava.core.JsonLdProcessor;
import com.github.jsonldjava.utils.JsonUtils;

import org.apache.jena.atlas.json.JSON;
import org.apache.jena.atlas.json.JsonObject;

public class JsonLdCreator {
	
	public static String createJsonLd(String jsonStorage, String nutriScore) throws Exception {
		JSONParser parse = new JSONParser();
		
		// Replacement of basic field names with URIs to prepare data for JSON-LD.
		String replace1 = jsonStorage.replaceFirst("products", "http://schema.org/Product");
	    String replace2 = replace1.replaceFirst("gtin", "http://schema.org/gtin13");
	    String replace3 = replace2.replaceFirst("product_name_de", "http://schema.org/name");
	    String replace4 = replace3.replaceFirst("major_category", "https://interactions.ics.unisg.ch/ontologies/dominicbruegger/majorCategory");
	    String replace5 = replace4.replaceFirst("minor_category", "https://interactions.ics.unisg.ch/ontologies/dominicbruegger/minorCategory");
	    String replace6 = replace5.replaceFirst("ingredients", "http://purl.org/foodontology#Ingredient");
	    String replace7 = replace6.replaceFirst("nutrients", "https://interactions.ics.unisg.ch/ontologies/dominicbruegger/Nutrient");
	    String replace8 = replace7.replaceFirst("health_percentage", "https://interactions.ics.unisg.ch/ontologies/dominicbruegger/healthPercentage");
	    String replace9 = replace8.replaceAll("lang", "http://schema.org/language");
	    String replace10 = replace9.replaceAll("text", "http://purl.org/foodontology#ingredientsListAsText");
	    String replace11 = replace10.replaceFirst("\"name\":\"energyKJ\"", "\"https://interactions.ics.unisg.ch/ontologies/dominicbruegger/nutrientName\":\"energyKJ\"");
	    String replace12 = replace11.replaceFirst("\"name\":\"dietaryFiber\"", "\"https://interactions.ics.unisg.ch/ontologies/dominicbruegger/nutrientName\":\"dietaryFiber\"");
	    String replace13 = replace12.replaceFirst("\"name\":\"protein\"", "\"https://interactions.ics.unisg.ch/ontologies/dominicbruegger/nutrientName\":\"protein\"");
	    String replace14 = replace13.replaceFirst("\"name\":\"salt\"", "\"https://interactions.ics.unisg.ch/ontologies/dominicbruegger/nutrientName\":\"salt\"");
	    String replace15 = replace14.replaceFirst("\"name\":\"saturatedFat\"", "\"https://interactions.ics.unisg.ch/ontologies/dominicbruegger/nutrientName\":\"saturatedFat\"");
	    String replace16 = replace15.replaceFirst("\"name\":\"sugars\"", "\"https://interactions.ics.unisg.ch/ontologies/dominicbruegger/nutrientName\":\"sugars\"");
	    String replace17 = replace16.replaceAll("amount", "https://interactions.ics.unisg.ch/ontologies/dominicbruegger/nutrientAmount");
	    String replace18 = replace17.replaceAll("product_size_unit_of_measure", "product-size-unit-of-measure");
	    String replaced = replace18.replaceAll("unit_of_measure", "https://interactions.ics.unisg.ch/ontologies/dominicbruegger/nutrientUnitOfMeasure");
	    
	    // Adding the Nutriscore to the JSON Object.
	    String replaced2 = "null";
	    JsonObject addNutriscore = JSON.parse(replaced);
	    if (replaced.length() >= 75) {
		    addNutriscore.get("http://schema.org/Product").getAsArray().get(0).getAsObject().put("https://interactions.ics.unisg.ch/ontologies/dominicbruegger/nutriscore", nutriScore);
		    replaced2 = addNutriscore.toString();
	    } else {
	    	System.out.println("Information about this product is incomplete and does not allow the adding of a Nutriscore.");
	    	replaced2 = replaced;
	    }
	    JSONObject document = (JSONObject)parse.parse(replaced2);
	    
	    // Adding the context to the JSON Object to create JSON-LD Object.
	    JsonLdOptions options = new JsonLdOptions();
	    Map<String, String> context = new HashMap<String, String>();
	    //context.put("@version", "1.1");
	    context.put("products", "http://schema.org/Product");
	    context.put("gtin", "http://schema.org/gtin13");
	    context.put("product-name", "http://schema.org/name");
	    context.put("major-category", "https://interactions.ics.unisg.ch/ontologies/dominicbruegger/majorCategory");
	    context.put("minor-category", "https://interactions.ics.unisg.ch/ontologies/dominicbruegger/minorCategory");
	    context.put("ingredients", "http://purl.org/foodontology#Ingredient");
	    context.put("nutrients", "https://interactions.ics.unisg.ch/ontologies/dominicbruegger/Nutrient");
	    context.put("health-percentage", "https://interactions.ics.unisg.ch/ontologies/dominicbruegger/healthPercentage");
	    context.put("language", "http://schema.org/language");
	    context.put("text", "http://purl.org/foodontology#ingredientsListAsText");
	    context.put("name", "https://interactions.ics.unisg.ch/ontologies/dominicbruegger/nutrientName");
	    context.put("amount", "https://interactions.ics.unisg.ch/ontologies/dominicbruegger/nutrientAmount");
	    context.put("unit-of-measure", "https://interactions.ics.unisg.ch/ontologies/dominicbruegger/nutrientUnitOfMeasure");
	    context.put("nutriscore", "https://interactions.ics.unisg.ch/ontologies/dominicbruegger/nutriscore");
	    Object compact = JsonLdProcessor.compact(document, context, options);  
	    String jsonldReader = JsonUtils.toPrettyString(compact);
		return jsonldReader;
	}
	
}