const rdfstore = require('rdfstore');

var global_store = null;

rdfstore.create(function(err, store) {
    global_store = store; 
    var addProduct = function(id, productName, nutriScoreProduct, dietaryFiber, energyKJ, protein, sugars, saturatedFat, salt, healthPercentage) {
        jsonld = {
            "@context":
            {
                "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                "xsd": "http://www.w3.org/2001/XMLSchema#",
                "product-name": "http://example.org/product-name",
                "nutriscore": "http://example.org/nutriscore",
                "dietaryFiber": "http://example.org/dietaryFiber",
                "energyKJ": "http://example.org/energyKJ",
                "protein": "http://example.org/protein",
                "sugars": "http://example.org/sugars",
                "saturatedFat": "http://example.org/saturatedFat",
                "salt": "http://example.org/salt",
                "health-percentage": "http://example.org/health-percentage",
                "ex": "http://example.org/"
            },
            "@id": `${id}`, //"ex:3045320104783"
            "product-name": `${productName}`, //"Andros Orangensaft"
            "nutriscore" : `${nutriScoreProduct}`, //"C"
            "dietaryFiber": `${dietaryFiber}`, //0.6
            "energyKJ": `${energyKJ}`, //209
            "protein": `${protein}`, //0.0
            "sugars": `${sugars}`, //9.1
            "saturatedFat": `${saturatedFat}`, //0.0
            "salt": `${salt}`, //0.0
            "health-percentage": `${healthPercentage}`//100
        }
        store.setPrefix("ex", "http://example.org/")
        store.load("application/ld+json", jsonld, function(err,results) {
            if (err) {
                console.log("An error occured adding the new product to the graph.");
            }
            console.log(results);
        })
    }
    //addProduct(id, productName, nutriScoreProduct, dietaryFiber, energyKJ, protein, sugars, saturatedFat, salt, healthPercentage)
    addProduct("ex:22114150", "MClassic Joghurt Kokos-Schokolade", "C", 0.0, 520, 3.0, 14, 3.8, 0.1, 0.0);
    addProduct("ex:7610200379382", "Bio Joghurt Zwetschge 180g", "C", 0.0, 440, 3.5, 15.0, 1.7, 0.1, 9.3);
    addProduct("ex:7610900085309", "Joghurt Pur Himbeere", "B", 0.6, 395, 4.5, 13, 2.5, 0.08, 0.0);
    addProduct("ex:7617027897488", "Léger Joghurt Haselnuss", "A", 3.5, 300, 4.5, 5, 0.2, 0.1, 0.0);
    addProduct("ex:7613269878186", "Excellence Joghurt Kirsche", "C", 0.5, 610, 2.5, 15, 4.5, 0.1, 0.0);
    addProduct("ex:7616600711371", "Bifidus Classic", "B", 1, 290, 4, 5, 2, 0.1, 0.0);
    addProduct("ex:7613269360773", "Joghurt Himbeere Laktosefrei Aha!", "C", 0.5, 440, 3.5, 16, 1.7, 0.1, 0.0);
    addProduct("ex:7617027140362", "Bio Joghurt Schafmilch Nature", "B", 0.0, 390, 5, 4.5, 3.8, 0.1, 0.0);
    addProduct("ex:7613269817994", "YOU 100CAL Mango Passion", "A", 0.5, 280, 4.5, 9, 0.5, 0.1, 0.0);
    addProduct("ex:22136671", "Yogos mit Honig", "C", 0, 610, 3, 13, 5.1, 0.1, 0.0);
});

var delayInMilliseconds = 2000;
setTimeout(function() {
    global_store.execute([
        'SELECT * ',
        'WHERE {',
            /*'?s ?p ?o . ',*/
            /*'?s <http://example.org/product-name> ?o . ',*/
            /*'?s <http://example.org/nutriscore> ?score . ',*/
            '?s <http://example.org/energyKJ> ?value1 . ',
            /*'FILTER (?o = "A" || ?o = "C")',*/
            'FILTER (?value > 500)',
        '}',
        /*'ORDER BY ASC (?value)',*/
        /*'LIMIT 5'*/].join(' '),
        [],[],
        function(err, results){
            console.log(results);
            //var string = JSON.stringify(results[0]);
            //resultGTIN = string.match(/\d+/g)[0];
            //console.log(resultGTIN);
        }
    )
}, delayInMilliseconds);

//FINDINGS SO FAR:
//Every filter besides "=" does not seem to work
//If queried for integers, all 10 results are shown
//If queried for nutriscores, only 5 results are shown

/*
var delayInMilliseconds1 = 3000;
setTimeout(function() {
    global_store.node("ex:22114150", function(err, graph) {
		console.log(graph)
    })
    global_store.node("ex:7610900085309", function(err, graph) {
		console.log(graph)
	})
}, delayInMilliseconds1);
*/

//Loading from folder on MAC: https://stackoverflow.com/questions/18002780/rdfstore-js-create-load-local-file

//https://github.com/antoniogarrote/rdfstore-js/issues/149
//http://antoniogarrote.github.io/rdfstore-js/doc/symbols/Server.html
//https://github.com/antoniogarrote/rdfstore-js#json-ld-support