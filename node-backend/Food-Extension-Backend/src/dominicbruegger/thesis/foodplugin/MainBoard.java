package dominicbruegger.thesis.foodplugin;

import java.io.FileWriter;
import java.io.StringReader;

import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;

import dominicbruegger.thesis.foodplugin.functions.ApiCall;
import dominicbruegger.thesis.foodplugin.functions.NutriscoreCalculator;
import dominicbruegger.thesis.foodplugin.functions.JsonLdCreator;


public class MainBoard {

    public static void main(String[] args) throws Exception {
	    
	    // Construction of RDF data and storing in .xml/.ttl file.
    	// The wanted datatype (.xml/.ttl) has to be selected at the bottom of the code.
    	
    	// Creating of RDF graph.
    	Model model = ModelFactory.createDefaultModel();
    	
    	// Copy function block, change string name and add GTIN to create a JSON-LD file.
    	// Created JSON-LD file contains product data including nutritional data and Nutriscore.
    	// The StringReader directly adds the JSON-LD file to the graph in the last step.
    	String product1 = addProductdataToGraph("7613269879817");
    	try (StringReader reader = new StringReader(product1)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product2 = addProductdataToGraph("7613269879695");
    	try (StringReader reader = new StringReader(product2)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product3 = addProductdataToGraph("7613404068212");
    	try (StringReader reader = new StringReader(product3)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product4 = addProductdataToGraph("7610200424686");
    	try (StringReader reader = new StringReader(product4)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product5 = addProductdataToGraph("7610200424747");
    	try (StringReader reader = new StringReader(product5)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product6 = addProductdataToGraph("7617027620857");
    	try (StringReader reader = new StringReader(product6)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product7 = addProductdataToGraph("7613269448143");
    	try (StringReader reader = new StringReader(product7)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product8 = addProductdataToGraph("7613269595687");
    	try (StringReader reader = new StringReader(product8)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product9 = addProductdataToGraph("7613404057971");
    	try (StringReader reader = new StringReader(product9)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product10 = addProductdataToGraph("7617027971782");
    	try (StringReader reader = new StringReader(product10)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product11 = addProductdataToGraph("4104420173118");
    	try (StringReader reader = new StringReader(product11)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product12 = addProductdataToGraph("22016065");
    	try (StringReader reader = new StringReader(product12)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product13 = addProductdataToGraph("22138705");
    	try (StringReader reader = new StringReader(product13)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product14 = addProductdataToGraph("22138910");
    	try (StringReader reader = new StringReader(product14)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product15 = addProductdataToGraph("7616600708944");
    	try (StringReader reader = new StringReader(product15)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product16 = addProductdataToGraph("22140609");
    	try (StringReader reader = new StringReader(product16)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product17 = addProductdataToGraph("22140616");
    	try (StringReader reader = new StringReader(product17)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product18 = addProductdataToGraph("7617027848909");
    	try (StringReader reader = new StringReader(product18)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product19 = addProductdataToGraph("22138026");
    	try (StringReader reader = new StringReader(product19)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product20 = addProductdataToGraph("22136671");
    	try (StringReader reader = new StringReader(product20)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product21 = addProductdataToGraph("7613269287124");
    	try (StringReader reader = new StringReader(product21)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product22 = addProductdataToGraph("7613269360773");
    	try (StringReader reader = new StringReader(product22)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product23 = addProductdataToGraph("7613404131718");
    	try (StringReader reader = new StringReader(product23)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product24 = addProductdataToGraph("7613269287124");
    	try (StringReader reader = new StringReader(product24)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product25 = addProductdataToGraph("7616600709736");
    	try (StringReader reader = new StringReader(product25)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product26 = addProductdataToGraph("22016072");
    	try (StringReader reader = new StringReader(product26)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product27 = addProductdataToGraph("22016096");
    	try (StringReader reader = new StringReader(product27)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product28 = addProductdataToGraph("22016102");
    	try (StringReader reader = new StringReader(product28)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product29 = addProductdataToGraph("22016119");
    	try (StringReader reader = new StringReader(product29)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product30 = addProductdataToGraph("22016126");
    	try (StringReader reader = new StringReader(product30)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product31 = addProductdataToGraph("22016133");
    	try (StringReader reader = new StringReader(product31)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product32 = addProductdataToGraph("22016157");
    	try (StringReader reader = new StringReader(product32)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product33 = addProductdataToGraph("22016201");
    	try (StringReader reader = new StringReader(product33)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product34 = addProductdataToGraph("7616600711401");
    	try (StringReader reader = new StringReader(product34)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product35 = addProductdataToGraph("22114150");
    	try (StringReader reader = new StringReader(product35)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product36 = addProductdataToGraph("22139337");
    	try (StringReader reader = new StringReader(product36)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product37 = addProductdataToGraph("22016256");
    	try (StringReader reader = new StringReader(product37)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product38 = addProductdataToGraph("22016287");
    	try (StringReader reader = new StringReader(product38)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product39 = addProductdataToGraph("76102745");
    	try (StringReader reader = new StringReader(product39)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product40 = addProductdataToGraph("7613269852186");
    	try (StringReader reader = new StringReader(product40)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product41 = addProductdataToGraph("7613269176817");
    	try (StringReader reader = new StringReader(product41)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product42 = addProductdataToGraph("7616600710169");
    	try (StringReader reader = new StringReader(product42)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product43 = addProductdataToGraph("7610200369994");
    	try (StringReader reader = new StringReader(product43)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product44 = addProductdataToGraph("7613269878186");
    	try (StringReader reader = new StringReader(product44)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product45 = addProductdataToGraph("22140623");
    	try (StringReader reader = new StringReader(product45)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product46 = addProductdataToGraph("7617027983570");
    	try (StringReader reader = new StringReader(product46)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product47 = addProductdataToGraph("22140128");
    	try (StringReader reader = new StringReader(product47)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product48 = addProductdataToGraph("22140135");
    	try (StringReader reader = new StringReader(product48)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product49 = addProductdataToGraph("7613269947677");
    	try (StringReader reader = new StringReader(product49)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product50 = addProductdataToGraph("7613404135730");
    	try (StringReader reader = new StringReader(product50)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product51 = addProductdataToGraph("7613269604877");
    	try (StringReader reader = new StringReader(product51)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product52 = addProductdataToGraph("7613269605331");
    	try (StringReader reader = new StringReader(product52)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product53 = addProductdataToGraph("7613269466949");
    	try (StringReader reader = new StringReader(product53)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product54 = addProductdataToGraph("7616600711302");
    	try (StringReader reader = new StringReader(product54)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product55 = addProductdataToGraph("7616600711319");
    	try (StringReader reader = new StringReader(product55)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product56 = addProductdataToGraph("7610200379351");
    	try (StringReader reader = new StringReader(product56)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product57 = addProductdataToGraph("7610200379368");
    	try (StringReader reader = new StringReader(product57)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product58 = addProductdataToGraph("7610200379382");
    	try (StringReader reader = new StringReader(product58)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product59 = addProductdataToGraph("7616600703468");
    	try (StringReader reader = new StringReader(product59)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product60 = addProductdataToGraph("7616600708906");
    	try (StringReader reader = new StringReader(product60)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product61 = addProductdataToGraph("7613269908289");
    	try (StringReader reader = new StringReader(product61)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product62 = addProductdataToGraph("7613269908692");
    	try (StringReader reader = new StringReader(product62)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product63 = addProductdataToGraph("7613404121528");
    	try (StringReader reader = new StringReader(product63)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product64 = addProductdataToGraph("7613404131473");
    	try (StringReader reader = new StringReader(product64)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product65 = addProductdataToGraph("7613404055977");
    	try (StringReader reader = new StringReader(product65)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product66 = addProductdataToGraph("22138743");
    	try (StringReader reader = new StringReader(product66)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product67 = addProductdataToGraph("22138774");
    	try (StringReader reader = new StringReader(product67)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product68 = addProductdataToGraph("7613269928379");
    	try (StringReader reader = new StringReader(product68)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product69 = addProductdataToGraph("7616600706667");
    	try (StringReader reader = new StringReader(product69)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product70 = addProductdataToGraph("7617027897488");
    	try (StringReader reader = new StringReader(product70)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product71 = addProductdataToGraph("7613269818038");
    	try (StringReader reader = new StringReader(product71)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product72 = addProductdataToGraph("7613269817994");
    	try (StringReader reader = new StringReader(product72)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product73 = addProductdataToGraph("7613269833970");
    	try (StringReader reader = new StringReader(product73)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product74 = addProductdataToGraph("7616600710831");
    	try (StringReader reader = new StringReader(product74)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product75 = addProductdataToGraph("7616600710848");
    	try (StringReader reader = new StringReader(product75)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product76 = addProductdataToGraph("7616600710855");
    	try (StringReader reader = new StringReader(product76)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product77 = addProductdataToGraph("7616600710862");
    	try (StringReader reader = new StringReader(product77)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product78 = addProductdataToGraph("7616600710879");
    	try (StringReader reader = new StringReader(product78)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product79 = addProductdataToGraph("22016348");
    	try (StringReader reader = new StringReader(product79)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product80 = addProductdataToGraph("22016355");
    	try (StringReader reader = new StringReader(product80)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	String product81 = addProductdataToGraph("22016362");
    	try (StringReader reader = new StringReader(product81)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product82 = addProductdataToGraph("22016386");
    	try (StringReader reader = new StringReader(product82)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product83 = addProductdataToGraph("22121103");
    	try (StringReader reader = new StringReader(product83)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product84 = addProductdataToGraph("7617027140362");
    	try (StringReader reader = new StringReader(product84)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product85 = addProductdataToGraph("7617027140720");
    	try (StringReader reader = new StringReader(product85)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product86 = addProductdataToGraph("7617027140744");
    	try (StringReader reader = new StringReader(product86)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product87 = addProductdataToGraph("7617027878333");
    	try (StringReader reader = new StringReader(product87)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product88 = addProductdataToGraph("7613269475576");
    	try (StringReader reader = new StringReader(product88)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product89 = addProductdataToGraph("7613269476368");
    	try (StringReader reader = new StringReader(product89)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product90 = addProductdataToGraph("7613269287247");
    	try (StringReader reader = new StringReader(product90)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product91 = addProductdataToGraph("22137555");
    	try (StringReader reader = new StringReader(product91)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product92 = addProductdataToGraph("7616600706285");
    	try (StringReader reader = new StringReader(product92)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product93 = addProductdataToGraph("7616600706315");
    	try (StringReader reader = new StringReader(product93)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product94 = addProductdataToGraph("7613269540120");
    	try (StringReader reader = new StringReader(product94)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product95 = addProductdataToGraph("7613269539957");
    	try (StringReader reader = new StringReader(product95)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product96 = addProductdataToGraph("7610900085309");
    	try (StringReader reader = new StringReader(product96)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product97 = addProductdataToGraph("7610900085323");
    	try (StringReader reader = new StringReader(product97)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product98 = addProductdataToGraph("7610900085347");
    	try (StringReader reader = new StringReader(product98)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product99 = addProductdataToGraph("7610200425676");
    	try (StringReader reader = new StringReader(product99)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product100 = addProductdataToGraph("7613404065105");
    	try (StringReader reader = new StringReader(product100)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product101 = addProductdataToGraph("7613404065044");
    	try (StringReader reader = new StringReader(product101)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product102 = addProductdataToGraph("7613404064986");
    	try (StringReader reader = new StringReader(product102)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product103 = addProductdataToGraph("7616600711180");
    	try (StringReader reader = new StringReader(product103)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product104 = addProductdataToGraph("7616600711357");
    	try (StringReader reader = new StringReader(product104)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product105 = addProductdataToGraph("7616600711364");
    	try (StringReader reader = new StringReader(product105)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product106 = addProductdataToGraph("7616600711371");
    	try (StringReader reader = new StringReader(product106)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product107 = addProductdataToGraph("7616600711395");
    	try (StringReader reader = new StringReader(product107)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product108 = addProductdataToGraph("76166860");
    	try (StringReader reader = new StringReader(product108)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product109 = addProductdataToGraph("7613269871156");
    	try (StringReader reader = new StringReader(product109)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product110 = addProductdataToGraph("7613269928263");
    	try (StringReader reader = new StringReader(product110)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product111 = addProductdataToGraph("7613269934035");
    	try (StringReader reader = new StringReader(product111)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product112 = addProductdataToGraph("7613404055755");
    	try (StringReader reader = new StringReader(product112)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product113 = addProductdataToGraph("7613269934004");
    	try (StringReader reader = new StringReader(product113)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product114 = addProductdataToGraph("7613404073254");
    	try (StringReader reader = new StringReader(product114)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product115 = addProductdataToGraph("7617027983556");
    	try (StringReader reader = new StringReader(product115)) {
	    	model.read(reader, null, "JSON-LD");
	    }

    	String product116 = addProductdataToGraph("4104420204263");
    	try (StringReader reader = new StringReader(product116)) {
	    	model.read(reader, null, "JSON-LD");
	    }
    	
    	model.write(System.out);
    	
    	// Use this code if a RDF/XML file should be created from the graph.
    	//FileWriter out = new FileWriter("yoghurts.xml");
    	//model.write(out, "RDF/XML");
    	
    	
    	// Use this code if a TURTLE file should be created from the graph.
    	//FileWriter out2 = new FileWriter("yoghurts.ttl");
    	//model.write(out2, "TURTLE");
    	
    }
    
    public static String addProductdataToGraph(String gtin) throws Exception {
    	String ApiAnswer = ApiCall.callKlausApi(gtin);
    	String NutriscoreResult = NutriscoreCalculator.calculateNS(ApiAnswer);
	    String jsonldReader = (JsonLdCreator.createJsonLd(ApiAnswer, NutriscoreResult));
	    return jsonldReader;
    }
}
