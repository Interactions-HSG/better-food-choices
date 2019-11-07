//const fs = require('fs');
const $rdf = require('rdflib');
const jsonld = require('jsonld');
const $ = require('jquery')(require('jsdom-no-contextify').jsdom().parentWindow);
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
$.support.cors = true;
$.ajaxSettings.xhr = function () {
    return new XMLHttpRequest;
}
const btoa = require('btoa');
const express = require('express');
const app = express();

app.use(express.json());

const store = $rdf.graph();
const baseUri = "http://example.org/";

console.log("Connection is working!");

let username = 'eatfit_student_dominic';
let password = 'yJFbbHtCPTFyy8GB';

let gtinArray = [7613269879817, 7613269879695, 7613404068212, 7610200424686,
    203510300000, 7617027620857, 7613269448143, 7613269595687, 7613404057971,
    7613404073254, 7617027983556, 4104420204263, 4104420173118, 7617027983570,
    7617027971782, 22135926, 22016065, 22138705, 22138910, 7616600708944,
    22140609, 22140616, 7617027848909, 22138026, 22136671, 7613269287124,
    7613269360773, 7613404131718, 7616600709736, 7613404013373, 22016072,
    22016096, 22016102, 22016119, 22016126, 22016133, 22016157, 22016201,
    7616600711401, 22114150, 22139337, 22016256, 22016287, 76102745,
    7613269852186, 7613269176817, 7616600710169, 7610200369994, 7613269878186,
    22140623, 22140128, 22140135, 7613269947677, 7613404135730, 7613269604877,
    7613269605331, 7613269466949, 7616600711302, 7616600711319, 7610200379351,
    7610200379368, 7610200379382, 7616600703468, 7616600708906, 7613269908289,
    7613269908692, 7613404121528, 7613404131473, 7613404055977, 22138743,
    22138774, 7613269928379, 7616600706667, 7617027897488, 7613269818038,
    7613269817994, 7613269833970, 7616600710831, 7616600710848, 7616600710855,
    7616600710862, 7616600710879, 22016348, 22016355, 22016362, 22016386,
    22121103, 7617027140362, 7617027140720, 7617027140744, 7617027878333,
    7613269475576, 7613269476368, 7613269287247, 22137555, 7616600706285,
    7616600706315, 7613269540120, 7613269539957, 7610900085309, 7610900085323,
    7610900085347, 7610200425676, 7613404065105, 7613404065044, 7613404064986,
    7616600711180, 7616600711357, 7616600711364, 7616600711371, 7616600711395,
    76166860, 7613269871156, 7613269928263, 7613269934035, 7613404055755,
    7613269934004]

/** LIST OF YOGHURT GTINS **/
let gtin1 = 7613269879817; let gtin2 = 7613269879695; let gtin3 = 7613404068212;
let gtin4 = 7610200424686; let gtin5 = 203510300000; let gtin6 = 7617027620857;
let gtin7 = 7613269448143; let gtin8 = 7613269595687; let gtin9 = 7613404057971;
let gtin10 = 7613404073254; let gtin11 = 7617027983556; let gtin12 = 4104420204263;
let gtin13 = 4104420173118; let gtin14 = 7617027983570; let gtin15 = 7617027971782;
let gtin16 = 22135926; let gtin17 = 22016065; let gtin18 = 22138705;
let gtin19 = 22138910; let gtin20 = 7616600708944; let gtin21 = 22140609;
let gtin22 = 22140616; let gtin23 = 7617027848909; let gtin24 = 22138026;
let gtin25 = 22136671; let gtin26 = 7613269287124; let gtin27 = 7613269360773;
let gtin28 = 7613404131718; let gtin29 = 7616600709736; let gtin30 = 7613404013373;
let gtin31 = 22016072; let gtin32 = 22016096; let gtin33 = 22016102;
let gtin34 = 22016119; let gtin35 = 22016126; let gtin36 = 22016133;
let gtin37 = 22016157; let gtin38 = 22016201; let gtin39 = 7616600711401;
let gtin40 = 22114150; let gtin41 = 22139337; let gtin42 = 22016256;
let gtin43 = 22016287; let gtin44 = 76102745; let gtin45 = 7613269852186;
let gtin46 = 7613269176817; let gtin47 = 7616600710169; let gtin48 = 7610200369994;
let gtin49 = 7613269878186; let gtin50 = 22140623; let gtin51 = 22140128;
let gtin52 = 22140135; let gtin53 = 7613269947677; let gtin54 = 7613404135730;
let gtin55 = 7613269604877; let gtin56 = 7613269605331; let gtin57 = 7613269466949;
let gtin58 = 7616600711302; let gtin59 = 7616600711319; let gtin60 = 7610200379351;
let gtin61 = 7610200379368; let gtin62 = 7610200379382; let gtin63 = 7616600703468;
let gtin64 = 7616600708906; let gtin65 = 7613269908289; let gtin66 = 7613269908692;
let gtin67 = 7613404121528; let gtin68 = 7613404131473; let gtin69 = 7613404055977;
let gtin70 = 22138743; let gtin71 = 22138774; let gtin72 = 7613269928379;
let gtin73 = 7616600706667; let gtin74 = 7617027897488; let gtin75 = 7613269818038;
let gtin76 = 7613269817994; let gtin77 = 7613269833970; let gtin78 = 7616600710831;
let gtin79 = 7616600710848; let gtin80 = 7616600710855; let gtin81 = 7616600710862;
let gtin82 = 7616600710879; let gtin83 = 22016348; let gtin84 = 22016355;
let gtin85 = 22016362; let gtin86 = 22016386; let gtin87 = 22121103;
let gtin88 = 7617027140362; let gtin89 = 7617027140720; let gtin90 = 7617027140744;
let gtin91 = 7617027878333; let gtin92 = 7613269475576; let gtin93 = 7613269476368;
let gtin94 = 7613269287247; let gtin95 = 22137555; let gtin96 = 7616600706285;
let gtin97 = 7616600706315; let gtin98 = 7613269540120; let gtin99 = 7613269539957;
let gtin100 = 7610900085309; let gtin101 = 7610900085323; let gtin102 = 7610900085347;
let gtin103 = 7610200425676; let gtin104 = 7613404065105; let gtin105 = 7613404065044;
let gtin106 = 7613404064986; let gtin107 = 7616600711180; let gtin108 = 7616600711357;
let gtin109 = 7616600711364; let gtin110 = 7616600711371; let gtin111 = 7616600711395;
let gtin112 = 76166860; let gtin113 = 7613269871156; let gtin114 = 7613269928263;
let gtin115 = 7613269934035; let gtin116 = 7613404055755; let gtin117 = 7613269934004;
/** END OF LIST **/

function loadProductData(gtin, callback)
{
    $.ajax({
        url: "https://eatfit-service.foodcoa.ch/products/" + gtin + "/?resultType=array",
        type: "GET",
        dataType: "json",
        cache: false,
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
        },
        success: function(json) {
            console.log("Success", /*json*/);
            if(typeof callback == "function") {
                callback(gtin, json);
            }
        },
        error: function(textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
    });
}

let context = {
    "@version": 1.1,
    "@vocab": "http://example.org/",
    "products": "http://example.org/products",
    "gtin": "http://example.org/products/gtin",
    "product name": "http://example.org/products/product-name",
    "major category": "http://example.org/products/major-category",
    "minor category": "http://example.org/products/minor-category",
    "ingredients": "http://example.org/products/ingredients",
    "nutrients": "http://example.org/products/nutrients",
    "health-percentage": "http://example.org/products/health-percentage",
    "language": "http://example.org/products/ingredients/language",
    "text": "http://example.org/products/nutrients/text",
    "name": "http://example.org/products/nutrients/name",
    "amount": "http://example.org/products/nutrients/amount",
    "unit-of-measure": "http://example.org/products/nutrients/unit-of-measure",
    "nutriscore": "http://example.org/products/nutriscore",
    "type": "http://example.org/products/nutriscore/type",
    "value": "http://example.org/products/nutriscore/value"
};

function productDataCallback(gtin, json) {
    if (json["products"] == null) {
        console.log("Product with GTIN: " + gtin + " is not available in database")
    } else {
        let nutrients = json["products"][0]["nutrients"];
        let fruitvegetablesNumber = json["products"][0]["health_percentage"];
        let majorCategory = json["products"][0]["major_category"];
        let minorCategory = json["products"][0]["minor_category"];

        let food;
        let water;
        if (majorCategory == 1 || majorCategory == 2) {
            food = false;
        } else {
            food = true;
        }
        console.log("The product is food: " + food);

        if (minorCategory == 5) {
            water = true;
        } else {
            water = false;
        }
        console.log("The product is mineral water: " + water);

        function searchValue(nameKey, array1) {
            for (let i = 0; i < array1.length; i++) {
                if (array1[i].name === nameKey) {
                    return parseFloat(array1[i].amount);
                }
            }
        }

        let energy = searchValue("energyKJ", nutrients);
        //console.log("Energy (kJ): " + energy);
        let sugar = searchValue("sugars", nutrients);
        //console.log("Sugar (g): " + sugar);
        let acids = searchValue("saturatedFat", nutrients);
        //console.log("Saturated fatty acids (g): " + acids);
        let salt = searchValue("salt", nutrients);
        //console.log(salt);
        let sodium = salt*400;
        //console.log("Sodium (mg): " + sodium);
        let fruitvegetables
        if (fruitvegetablesNumber === null) {
            fruitvegetables = 0;
        } else {
            fruitvegetables = parseFloat(fruitvegetablesNumber);
        }
        //console.log("Fruit/Vegetable (%): " + fruitvegetables);
        let protein = searchValue("protein", nutrients);
        //console.log("Protein (g): " + protein);
        let fibers = searchValue("dietaryFiber", nutrients);
        //console.log("Fibers (g): " + fibers);

        //Code for calculation of NutriScore based on the recognized values
        let energyScore;

        if (food === true) {
            if (energy == null) {
                energyScore = 0;
            } else if(energy <= 335) {
                energyScore = 0;
            } else if (energy <= 670) {
                energyScore = 1;
            } else if (energy <= 1005) {
                energyScore = 2;
            } else if (energy <= 1340) {
                energyScore = 3;
            } else if (energy <= 1675) {
                energyScore = 4;
            } else if (energy <= 2010) {
                energyScore = 5;
            } else if (energy <= 2345) {
                energyScore = 6;
            } else if (energy <= 2680) {
                energyScore = 7;
            } else if (energy <= 3015) {
                energyScore = 8;
            } else if (energy <= 3350) {
                energyScore = 9;
            } else {
                energyScore = 10;
            };
        } else if (food === false) {
            if (energy == null) {
                energyScore = 0;
            } else if (energy <= 0) {
                energyScore = 0;
            } else if (energy <= 30) {
                energyScore = 1;
            } else if (energy <= 60) {
                energyScore = 2;
            } else if (energy <= 90) {
                energyScore = 3;
            } else if (energy <= 120) {
                energyScore = 4;
            } else if (energy <= 150) {
                energyScore = 5;
            } else if (energy <= 180) {
                energyScore = 6;
            } else if (energy <= 210) {
                energyScore = 7;
            } else if (energy <= 240) {
                energyScore = 8;
            } else if (energy <= 270) {
                energyScore = 9;
            } else {
                energyScore = 10;
            }
        }

        //console.log("EnergyScore: " + energyScore);

        let acidsScore;

        if (food === true) {
            if (acids == null) {
                acidsScore = 0;
            } else if (acids <= 1) {
                acidsScore = 0;
            } else if (acids <= 2) {
                acidsScore = 1;
            } else if (acids <= 3) {
                acidsScore = 2;
            } else if (acids <= 4) {
                acidsScore = 3;
            } else if (acids <= 5) {
                acidsScore = 4;
            } else if (acids <= 6) {
                acidsScore = 5;
            } else if (acids <= 7) {
                acidsScore = 6;
            } else if (acids <= 8) {
                acidsScore = 7;
            } else if (acids <= 9) {
                acidsScore = 8;
            } else if (acids <= 10) {
                acidsScore = 9;
            } else {
                acidsScore = 10;
            };
        } else if (food === false) {
            acidsScore = 0;
        }

        //console.log("AcidsScore: " + acidsScore);

        let sugarScore;

        if (food === true) {
            if (sugar == null) {
                sugarScore = 0;
            } else if (sugar <= 4.5) {
                sugarScore = 0;
            } else if (sugar <= 9) {
                sugarScore = 1;
            } else if (sugar <= 13.5) {
                sugarScore = 2;
            } else if (sugar <= 18) {
                sugarScore = 3;
            } else if (sugar <= 22.5) {
                sugarScore = 4;
            } else if (sugar <= 27) {
                sugarScore = 5;
            } else if (sugar <= 31) {
                sugarScore = 6;
            } else if (sugar <= 36) {
                sugarScore = 7;
            } else if (sugar <= 40) {
                sugarScore = 8;
            } else if (sugar <= 45) {
                sugarScore = 9;
            } else {
                sugarScore = 10;
            };
        } else if (food === false) {
            if (sugar == null) {
                sugarScore = 0;
            } else if (sugar <= 0) {
                sugarScore = 0;
            } else if (sugar <= 1.5) {
                sugarScore = 1;
            } else if (sugar <= 3) {
                sugarScore = 2;
            } else if (sugar <= 4.5) {
                sugarScore = 3;
            } else if (sugar <= 6) {
                sugarScore = 4;
            } else if (sugar <= 7.5) {
                sugarScore = 5;
            } else if (sugar <= 9) {
                sugarScore = 6;
            } else if (sugar <= 10.5) {
                sugarScore = 7;
            } else if (sugar <= 12) {
                sugarScore = 8;
            } else if (sugar <= 13.5) {
                sugarScore = 9;
            } else {
                sugarScore = 10;
            }
        }

        //console.log("SugarScore: " + sugarScore);

        let sodiumScore;

        if (food === true) {
            if (Number.isNaN(sodium) == true) {
                sodiumScore = 0;
            } else if (sodium <= 90) {
                sodiumScore = 0;
            } else if (sodium <= 180) {
                sodiumScore = 1;
            } else if (sodium <= 270) {
                sodiumScore = 2;
            } else if (sodium <= 360) {
                sodiumScore = 3;
            } else if (sodium <= 450) {
                sodiumScore = 4;
            } else if (sodium <= 540) {
                sodiumScore = 5;
            } else if (sodium <= 630) {
                sodiumScore = 6;
            } else if (sodium <= 720) {
                sodiumScore = 7;
            } else if (sodium <= 810) {
                sodiumScore = 8;
            } else if (sodium <= 900) {
                sodiumScore = 9;
            } else {
                sodiumScore = 10;
            };
        } else if (food === false) {
            sodiumScore = 0;
        }

        //console.log("SodiumScore: " + sodiumScore);

        let badIngredientScore = energyScore + sugarScore + acidsScore + sodiumScore;

        //console.log("Bad ingredients score: " + badIngredientScore);


        let fruitvegetablesScore;

        if (food === true) {
            if (fruitvegetables <= 40) {
                fruitvegetablesScore = 0;
            } else if (fruitvegetables <= 60) {
                fruitvegetablesScore = 1;
            } else if (fruitvegetables <= 80) {
                fruitvegetablesScore = 2;
            } else {
                fruitvegetablesScore = 5;
            };
        } if (food === false) {
            if (fruitvegetables <= 40) {
                fruitvegetablesScore = 0;
            } else if (fruitvegetables <= 60) {
                fruitvegetablesScore = 2;
            } else if (fruitvegetables <= 80) {
                fruitvegetablesScore = 4;
            } else {
                fruitvegetablesScore = 10;
            }
        }

        //console.log("FruitVegetableScore: " + fruitvegetablesScore);

        let fibersScore;

        if (food === true) {
            if (fibers == null) {
                fibersScore = 0;
            } else if (fibers <= 0.9) {
                fibersScore = 0;
            } else if (fibers <= 1.9) {
                fibersScore = 1;
            } else if (fibers <= 2.8) {
                fibersScore = 2;
            } else if (fibers <= 3.7) {
                fibersScore = 3;
            } else if (fibers <= 4.7) {
                fibersScore = 4;
            } else {
                fibersScore = 5;
            };
        } else if (food === false) {
            fibersScore = 0;
        }

        //console.log("FibersScore: " + fibersScore);

        let proteinScore;

        if (food === true) {
            if (protein == null) {
                proteinScore = 0;
            } else if (protein <= 1.6) {
                proteinScore = 0;
            } else if (protein <= 3.2) {
                proteinScore = 1;
            } else if (protein <= 4.8) {
                proteinScore = 2;
            } else if (protein <= 6.4) {
                proteinScore = 3;
            } else if (protein <= 8.0) {
                proteinScore = 4;
            } else {
                proteinScore = 5;
            };
        } else if (food === false) {
            proteinScore = 0;
        }

        //console.log("ProteinScore: " + proteinScore);

        //Calculating Nutri-Score
        let goodIngredientScore = fruitvegetablesScore + fibersScore + proteinScore;
        //console.log("Good ingredients score: " + goodIngredientScore);

        let nutriScoreNumber;
        if (food === true && energy == null && sugar == null) {
            nutriScoreNumber = 50;
        } else if (food === true && energy == null && acids == null) {
            nutriScoreNumber = 50;
        } else if (food === true && sugar == null && acids == null) {
            nutriScoreNumber = 50;
        } else if (food === false && energy == null && sugar == null) {
            nutriScoreNumber = 50;
        } else {
            nutriScoreNumber = badIngredientScore - goodIngredientScore;
        }
        let nutriScore;
        
        if (food === true) {
            if (nutriScoreNumber <= -1) {
                nutriScore = "A";
            } else if (nutriScoreNumber <= 2) {
                nutriScore = "B";
            } else if (nutriScoreNumber <= 10) {
                nutriScore = "C";
            } else if (nutriScoreNumber <= 18) {
                nutriScore = "D";
            } else if (nutriScoreNumber <= 40) {
                nutriScore = "E";
            } else if (nutriScoreNumber = 50) {
                nutriScore = "invalid";
            }
        } else if (food === false) {
            if (water === true) {
                nutriScore = "A";
            } else if (water === false & nutriScoreNumber <= 1) {
                nutriScore = "B";
            } else if (water === false & nutriScoreNumber <= 5) {
                nutriScore = "C";
            } else if (water === false & nutriScoreNumber <= 9) {
                nutriScore = "D";
            } else if (water === false & nutriScoreNumber <= 30) {
                nutriScore = "E";
            } else if (water === false & nutriScoreNumber == 50) {
                nutriScore = "invalid";
            }
        }

        let concreteName = json["products"][0]["product_name_de"];

        console.log("THE NUTRI-SCORE OF " + concreteName.toUpperCase() + " IS: " + nutriScore);

        let rating;
        if (food === true) {
            rating = "food";
        } else if (food === false) {
            rating = "drink";
        }

        json["products"][0]["nutriscore"] = [{"type": rating}, {"value": nutriScore}];
        //console.log(json["products"][0]["NutriScore"]);

        let str = JSON.stringify(json);
        let mapObj = {
            products: "http://example.org/products",
            gtin: "http://example.org/products/gtin",
            product_name_de: "http://example.org/products/product-name",
            major_category: "http://example.org/products/major-category",
            minor_category: "http://example.org/products/minor-category",
            ingredients: "http://example.org/products/ingredients",
            lang: "http://example.org/products/ingredients/language",
            text: "http://example.org/products/ingredients/text",
            nutrients: "http://example.org/products/nutrients",
            name: "http://example.org/products/nutrients/name",
            amount: "http://example.org/products/nutrients/amount",
            unit_of_measure: "http://example.org/products/nutrients/unit-of-measure",
            health_percentage: "http://example.org/products/health-percentage",
            nutriscore: "http://example.org/products/nutriscore",
            type: "http://example.org/products/nutriscore/type",
            value: "http://example.org/products/nutriscore/value"
        };
        str = str.replace(/products|gtin|product_name_de|product_size|product_size_unit_of_measures|major-category|minor-category|ingredients|lang|text|nutrients|name|amount|unit_of_measure|health_percentage|nutriscore|type|value/gi, function(matched) {
            return mapObj[matched];
        })

        //JSON-LD seems to be asynchronous as well! From JSON-LD to N-Quads
        let doc = JSON.parse(str);
        let gtinText = store.toString()
        if (gtinText.indexOf(gtin) == -1) {
            jsonld.compact(doc, context, function(err, compacted) {
                if (err) {
                    console.log(err);
                }
                //console.log(compacted);
                JSON.stringify(compacted, null, 2);
                jsonld.expand(compacted, function(err, expanded) {
                    if (err) {
                        console.log(err);
                    }
                    //console.log(expanded);
                    jsonld.flatten(expanded, context, function(err, flattened) {
                        if (err) {
                            console.log(err);
                        }
                        //console.log(flattened);
                        jsonld.toRDF(flattened, {format: 'application/n-quads'}, (err, nquads) => {
                            //console.log(nquads);
                            $rdf.parse(nquads, store, baseUri, 'application/n-quads', function(err, kb) {
                                if (err) {
                                    console.log(err);
                                }
                                //console.log(kb);
                            })
                        })
                    })
                })
            })
        } else if (gtinText.indexOf(gtin1) !== -1) {
            console.log("GTIN is already in the store");
        }
    }
};

/********** CALLING YOGHURT DATA **********/
loadProductData(gtin1, productDataCallback);
loadProductData(gtin2, productDataCallback);
loadProductData(gtin3, productDataCallback);
loadProductData(gtin4, productDataCallback);
loadProductData(gtin5, productDataCallback);
loadProductData(gtin6, productDataCallback);
loadProductData(gtin7, productDataCallback);
loadProductData(gtin8, productDataCallback);
loadProductData(gtin9, productDataCallback);
loadProductData(gtin10, productDataCallback);
/*loadProductData(gtin11, productDataCallback);
loadProductData(gtin12, productDataCallback);
loadProductData(gtin13, productDataCallback);
loadProductData(gtin14, productDataCallback);
loadProductData(gtin15, productDataCallback);
loadProductData(gtin16, productDataCallback);
loadProductData(gtin17, productDataCallback);
loadProductData(gtin18, productDataCallback);
loadProductData(gtin19, productDataCallback);
loadProductData(gtin20, productDataCallback);
loadProductData(gtin21, productDataCallback);
loadProductData(gtin22, productDataCallback);
loadProductData(gtin23, productDataCallback);
loadProductData(gtin24, productDataCallback);
loadProductData(gtin25, productDataCallback);
loadProductData(gtin26, productDataCallback);
loadProductData(gtin27, productDataCallback);
loadProductData(gtin28, productDataCallback);
loadProductData(gtin29, productDataCallback);
loadProductData(gtin30, productDataCallback);
loadProductData(gtin31, productDataCallback);
loadProductData(gtin32, productDataCallback);
loadProductData(gtin33, productDataCallback);
loadProductData(gtin34, productDataCallback);
loadProductData(gtin35, productDataCallback);
loadProductData(gtin36, productDataCallback);
loadProductData(gtin37, productDataCallback);
loadProductData(gtin38, productDataCallback);
loadProductData(gtin39, productDataCallback);
loadProductData(gtin40, productDataCallback);
loadProductData(gtin41, productDataCallback);
loadProductData(gtin42, productDataCallback);
loadProductData(gtin43, productDataCallback);
loadProductData(gtin44, productDataCallback);
loadProductData(gtin45, productDataCallback);
loadProductData(gtin46, productDataCallback);
loadProductData(gtin47, productDataCallback);
loadProductData(gtin48, productDataCallback);
loadProductData(gtin49, productDataCallback);
loadProductData(gtin50, productDataCallback);
loadProductData(gtin51, productDataCallback);
loadProductData(gtin52, productDataCallback);
loadProductData(gtin53, productDataCallback);
loadProductData(gtin54, productDataCallback);
loadProductData(gtin55, productDataCallback);
loadProductData(gtin56, productDataCallback);
loadProductData(gtin57, productDataCallback);
loadProductData(gtin58, productDataCallback);
loadProductData(gtin59, productDataCallback);
loadProductData(gtin60, productDataCallback);
loadProductData(gtin61, productDataCallback);
loadProductData(gtin62, productDataCallback);
loadProductData(gtin63, productDataCallback);
loadProductData(gtin64, productDataCallback);
loadProductData(gtin65, productDataCallback);
loadProductData(gtin66, productDataCallback);
loadProductData(gtin67, productDataCallback);
loadProductData(gtin68, productDataCallback);
loadProductData(gtin69, productDataCallback);
loadProductData(gtin70, productDataCallback);
loadProductData(gtin71, productDataCallback);
loadProductData(gtin72, productDataCallback);
loadProductData(gtin73, productDataCallback);
loadProductData(gtin74, productDataCallback);
loadProductData(gtin75, productDataCallback);
loadProductData(gtin76, productDataCallback);
loadProductData(gtin77, productDataCallback);
loadProductData(gtin78, productDataCallback);
loadProductData(gtin79, productDataCallback);
loadProductData(gtin80, productDataCallback);
loadProductData(gtin81, productDataCallback);
loadProductData(gtin82, productDataCallback);
loadProductData(gtin83, productDataCallback);
loadProductData(gtin84, productDataCallback);
loadProductData(gtin85, productDataCallback);
loadProductData(gtin86, productDataCallback);
loadProductData(gtin87, productDataCallback);
loadProductData(gtin88, productDataCallback);
loadProductData(gtin89, productDataCallback);
loadProductData(gtin90, productDataCallback);
loadProductData(gtin91, productDataCallback);
loadProductData(gtin92, productDataCallback);
loadProductData(gtin93, productDataCallback);
loadProductData(gtin94, productDataCallback);
loadProductData(gtin95, productDataCallback);
loadProductData(gtin96, productDataCallback);
loadProductData(gtin97, productDataCallback);
loadProductData(gtin98, productDataCallback);
loadProductData(gtin99, productDataCallback);
loadProductData(gtin100, productDataCallback);
loadProductData(gtin101, productDataCallback);
loadProductData(gtin102, productDataCallback);
loadProductData(gtin103, productDataCallback);
loadProductData(gtin104, productDataCallback);
loadProductData(gtin105, productDataCallback);
loadProductData(gtin106, productDataCallback);
loadProductData(gtin107, productDataCallback);
loadProductData(gtin108, productDataCallback);
loadProductData(gtin109, productDataCallback);
loadProductData(gtin110, productDataCallback);
loadProductData(gtin111, productDataCallback);
loadProductData(gtin112, productDataCallback);
loadProductData(gtin113, productDataCallback);
loadProductData(gtin114, productDataCallback);
loadProductData(gtin115, productDataCallback);
loadProductData(gtin116, productDataCallback);
loadProductData(gtin117, productDataCallback);*/
/********** END OF CALLING **********/


//Working query: 'SELECT ?p ?o ?s WHERE { ?p ?o ?s . }'
//'SELECT * WHERE { _:b1 <http://example.org/products/gtin> ?o . }'
//'SELECT * WHERE { _:b1 <http://example.org/products/nutrients/amount> ?o . }'
//Alternative filter that does not work: 'FILTER (?value = "A" || ?value = "B")'

const sparqlQuery =[
    'PREFIX ex: <http://example.org/products/> ',
    'SELECT *',
    'WHERE {',
        ' _:bN ex:gtin ?gtin . ',
        ' _:bN ex:nutriscore/value ?value . ',
        /*'FILTER (?value = "A")',*/
    '}',
    'ORDER BY DESC (?value)',
    'LIMIT 1'].join(' ');

const query = $rdf.SPARQLToQuery(sparqlQuery, false, store);

let delayInMilliseconds = 3000;
setTimeout(function() {
    store.query(query, function(result) {
        console.log(result);
    })
}, delayInMilliseconds);


//API HANDLING
app.get('/api/products/:gtin', (req, res) => {
    let apiGTIN = parseInt(req.params.gtin);
    if (gtinArray.indexOf(apiGTIN) >= 0) {
        res.status(200).send('Product was recognized!');
    } else {
        res.status(404).send('The product was not found!');
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

/*
function logCurrentGraph(){
    console.log(store.length);
};

setInterval(logCurrentGraph, 4000);

//setInterval(function() {loadProductData(gtin1, productDataCallback);}, 10000);
*/


//Maybe helpful for comparison:
//https://stackoverflow.com/questions/43872160/using-a-javascript-variable-in-sparql-update

//Maybe helpful for calculation of Nutriscore:
//https://gist.github.com/csjx/fb3defdfab8d805f4346bd5b3658232b
//https://www.w3.org/TR/sparql11-update/
//https://en.wikibooks.org/wiki/SPARQL/Expressions_and_Functions


//With this replace method, a JSON object can be manipulated
//console.log(JSON.stringify(doc).replace("products", "https://example.com/products"));
//https://stackoverflow.com/questions/28639345/replacing-values-in-json-object

//Could help as well: https://json-ld.org/spec/latest/json-ld/#interpreting-json-as-json-ld
//To get RDF from JSON-LD: https://json-ld.org/spec/latest/json-ld-api/#deserialize-json-ld-to-rdf-algorithm
// How to parse JSON-LD with rdflib.js: https://github.com/linkeddata/rdflib.js/issues/76

//https://json-ld.org/spec/latest/json-ld/#compacted-document-form
//https://blog.checklyhq.com/creating-a-chrome-extension-in-2018-the-good-the-bad-and-the-meh/
//http://browserify.org/ is this useful?
//https://forum.solidproject.org/t/rdflib-documentation/585
//https://github.com/linkeddata/rdflib.js/issues/160