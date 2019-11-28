// Checking if running properly.
console.log("Chrome extension is working!");


// Looking for unique identifier(GTIN).
let identifierBox = document.getElementsByClassName("mui-panel-body additional-information-panel-body");
for (let i = 0; i < identifierBox.length; i++) {
    var identifierTable = identifierBox[i];
    
}

let identifierColumns = identifierTable.getElementsByTagName("td");

function searchGTIN(nameKey, array1) {
    for (let i = 0; i < array1.length; i++) {
        if (array1[i].innerText === nameKey) {
            return (array1[i+1].innerText);
        }
    }
}
let gtinTxt = searchGTIN("GTIN", identifierColumns);

if (gtinTxt.length > 14) {
    var gtin2 = gtinTxt.split(", ");
    var gtin = parseInt(gtin2[0]);
} else if (gtinTxt.length <= 14) {
    var gtin = parseInt(gtinTxt);
}
console.log("The GTIN of this product is: " + gtin);


// Looking for categorization data.
let categorizationTable = document.getElementsByClassName("mui-breadcrumb");
for (let i = 0; i < categorizationTable.length; i++) {
    var categorizationTxt = categorizationTable[i].innerText;
}
categorization = categorizationTxt.toLowerCase();


// Checking if it is food or a drink.
var food;
if (categorization.indexOf("getränke heiss & kalt") >= 0) {
    food = false;
} else if (categorization.indexOf("getränke heiss & kalt") <0) {
    food = true;
}
console.log("The object is food: " + food);


// Checking if it is mineral water.
var water;
if (categorization.indexOf("mineralwasser") >= 0) {
    water = true;
} else if (categorization.indexOf("mineralwasser") <0) {
    water = false;
}
console.log("The object is mineral water: " + water);


// Checking if it belongs to the yoghurt category.
var joghurtCheck;
if (categorization.indexOf("joghurt & joghurtdrinks") >= 0) {
    joghurtCheck = true;
} else if (categorization.indexOf("joghurt & joghurtdrinks") <0) {
    joghurtCheck = false;
}
var kaseCheck;
if (categorization.indexOf("Käse ") >= 0) {
    kaseCheck = true;
} else if (categorization.indexOf("Käse ") <0) {
    kaseCheck = false;
}


// Function for calling API.
// If no data is available, API gets a notification in his system.
var username = 'eatfit_student_dominic';
var password = 'yJFbbHtCPTFyy8GB';
var url = "https://eatfit-service.foodcoa.ch/products/" + gtin + "/?resultType=array";
// var url1 = "https://eatfit-service.foodcoa.ch/products/*/?resultType=array";
var API;
var nutri_score_final;


// Testing if API is offering the data.
function productDataCallback(json)
{
    if (json["products"] == null) {
        console.log("The product is not availabe in the database.");      
    } else {
        console.log("Product data is available in API.");
        // console.log(json["products"][0].nutri_score_final);

           return json["products"][0].nutri_score_final;
    }
};

//function to display nutri-score when the page starts
loadProductData(productDataCallback);

// Function to check if nutritional data is available and fetch it.
// The whole Nutriscore-calculation is done within this statement.
// These variables are defined globally, because they are needed later on.
//nutri final score defintion
var nutriScore;
var queryname ;
var finalResultSet;

function getScoreLocal() {
            var nutriScore;
            var acids;
            var energy;
            var sugar;
            var fibers;
            var protein;
            var sodium;

            var nutrientTable = document.getElementById("nutrient-table");
            console.log(nutrientTable);
            if(nutrientTable != null) {
                var nutrientColumns = nutrientTable.getElementsByTagName("td");

                // Fetching nutritional data from HTML of website.
                for (let i = 0; i < nutrientColumns.length; i++) {
                    if (nutrientColumns[i].innerText === "Energie") {
                        var energyTxt = nutrientColumns[i+1].innerText;
                        break;
                    } else {
                        var energyTxt = "0";
                    }
                }
                if (energyTxt.indexOf("<") !== -1) {
                    energy = 0;
                } else {
                    energy = parseFloat(energyTxt);
                }
                console.log("Energy (kJ): " + energy);

                for (let i = 0; i < nutrientColumns.length; i++) {
                    if (nutrientColumns[i].innerText === "davon gesättigte Fettsäuren") {
                        var acidsTxt = nutrientColumns[i+1].innerText;
                        break;
                    } else {
                        var acidsTxt = "0";
                    }
                }
                if (acidsTxt.indexOf("<") !== -1) {
                    acids = 0;
                } else {
                    acids = parseFloat(acidsTxt);
                }
                console.log("Saturated fatty acids (g): " + acids);

                for (let i = 0; i < nutrientColumns.length; i++) {
                    if (nutrientColumns[i].innerText === "davon Zucker") {
                        var sugarTxt = nutrientColumns[i+1].innerText;
                        break;
                    } else {
                        var sugarTxt = "0";
                    }
                }
                if (sugarTxt.indexOf("<") !== -1) {
                    sugar = 0;
                } else {
                    sugar = parseFloat(sugarTxt);
                }
                console.log("Sugar (g): " + sugar);

                for (let i = 0; i < nutrientColumns.length; i++) {
                    if (nutrientColumns[i].innerText === "Ballaststoffe") {
                        var fibersTxt = nutrientColumns[i+1].innerText;
                        break;
                    } else {
                        var fibersTxt = "0";
                    }
                }
                if (fibersTxt.indexOf("<") !== -1) {
                    fibers = 0;
                } else {
                    fibers = parseFloat(fibersTxt);
                }
                console.log("Fibers (g): " + fibers);

                for (let i = 0; i < nutrientColumns.length; i++) {
                    if (nutrientColumns[i].innerText === "Eiweiss") {
                        var proteinTxt = nutrientColumns[i+1].innerText;
                        break;
                    } else {
                        var proteinTxt = "0";
                    }
                }
                if (proteinTxt.indexOf("<") !== -1) {
                    protein = 0;
                } else {
                    protein = parseFloat(proteinTxt);
                }
                console.log("Protein (g): " + protein);

                for (let i = 0; i < nutrientColumns.length; i++) {
                    if (nutrientColumns[i].innerText === "Salz") {
                        var sodiumTxt = nutrientColumns[i+1].innerText;
                        break;
                    } else {
                        var sodiumTxt = "0";
                    }
                }

                for (let i = 0; i < nutrientColumns.length; i++) {
                    if (nutrientColumns[i].innerText === "Natrium") {
                        var natriumTxt = nutrientColumns[i+1].innerText;
                        break;
                    } else {
                        var natriumTxt = "0";
                    }
                }
                let sodiumMG;
                if (sodiumTxt.indexOf("<") !== -1) {
                    sodiumMG = 0;
                } else {
                    let sodiumInG = parseFloat(sodiumTxt).toFixed(3);
                    sodiumMG = sodiumInG*400;
                }

                let natriumMG;
                if (natriumTxt.indexOf("<") !== -1) {
                    natriumMG = 0;
                } else {
                    let natriumInG = parseFloat(natriumTxt).toFixed(3);
                    natriumMG = natriumInG*1000
                }

                // Choosing Sodium or Natrium data, depeding on availability.
                if (sodiumMG > natriumMG) {
                    sodium = sodiumMG;
                } else if (sodiumMG = natriumMG) {
                    sodium = sodiumMG;
                } else {
                    sodium = natriumMG;
                }

                console.log("Sodium (mg): " + sodium);

                let fruitvegetables = 0;

                // Code for calculation of NutriScore based
                // on the recognized values on the website.

                let energyScore;

                if (food === true) {
                    if (energy <= 335) {
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
                    if (energy <= 0) {
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

                let acidsScore;

                if (food === true) {
                    if (acids <= 1) {
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

                let sugarScore;

                if (food === true) {
                    if (sugar <= 4.5) {
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
                    if (sugar <= 0) {
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

                let sodiumScore;

                if (food === true) {
                    if (sodium <= 90) {
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

                let badIngredientScore = energyScore + sugarScore + acidsScore + sodiumScore;

                console.log("Bad ingredients score: " + badIngredientScore);


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

                let fibersScore;

                if (food === true) {
                    if (fibers <= 0.9) {
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

                let proteinScore;

                if (food === true) {
                    if (protein <= 1.6) {
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

                // Calculating Nutriscore.
                let goodIngredientScore = fruitvegetablesScore + fibersScore + proteinScore;

                console.log("Good ingredients score: " + goodIngredientScore);

                let nutriScoreNumber;
                

                 
                   if (badIngredientScore<=11) {
                    nutriScoreNumber = badIngredientScore-goodIngredientScore-fruitvegetablesScore-fibersScore;
                   }
                   else{
                    if (fruitvegetablesScore>=5) {
                    nutriScoreNumber = badIngredientScore-goodIngredientScore-fruitvegetablesScore-fibersScore;
                    }
                    else{
                        nutriScoreNumber = badIngredientScore-fruitvegetablesScore-fibersScore;
                    }
                   }
                


                

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
                    }
                }

                console.log("THE NUTRI-SCORE OF THE PRODUCT IS: " + nutriScore);
            } else {
                console.log("Nutrient Table for calculation is missing!");
                nutriScore = "invalid";
            }
            return nutriScore;
        }
//function to return nutrisocre 
function show(_nutri_score_final){
    nutriScore = _nutri_score_final;
    if(nutriScore==null){
        console.log("wqwqe")
        nutriScore = getScoreLocal();
    }
    console.log(nutriScore);
    console.log("THE NUTRI-SCORE OF THE PRODUCT IS: " + nutriScore);
    nsAURL = chrome.runtime.getURL("nsA.png");
    nsBURL = chrome.runtime.getURL("nsB.png");
    nsCURL = chrome.runtime.getURL("nsC.png");
    nsDURL = chrome.runtime.getURL("nsD.png");
    nsEURL = chrome.runtime.getURL("nsE.png");
    nsVURL = chrome.runtime.getURL("nsV.png");

    var div = document.createElement("DIV");
    div.id = "imageHolder";
    div.style.padding = "5px 10px 20px 0px";
    var position = document.getElementById("info");
    var current=false;
    var currency = document.getElementsByClassName("current-price")[0];
    // console.log(currency);

    // console.log(currency);
 
   // document.getElementsByClassName('mui-list-unstyled retailer-tabs clearfix retailer-tabs-6').childNodes[1]
    document.getElementsByClassName("widget-ratings clearfix")[0].remove();
    document.getElementsByClassName("sidebar-product-information sidebar-product-availability")[0].remove();
    if (document.getElementsByClassName("clearfix mui-list-unstyled").length != 0)
    document.getElementsByClassName("clearfix mui-list-unstyled")[0].remove();
    document.getElementsByClassName("sidebar-favorite-button-container mui-js-favorite-button")[0].remove();
    // document.getElementsByClassName("sidebar-product-information sidebar-retailer")[0].remove();
    if (document.getElementsByClassName("sidebar-product-information sidebar-brandlabel-item").length != 0)
    document.getElementsByClassName("sidebar-product-information sidebar-brandlabel-item")[0].remove();
    document.getElementsByClassName("mui-panel panel-border-top")[0].remove();
    document.getElementsByClassName("section-bottom-md-padding")[0].remove();
    if (document.getElementsByClassName('section-bottom-md-padding').length!=0) 
    document.getElementsByClassName("section-bottom-md-padding")[0].remove();

    document.getElementsByClassName("section-bottom-padding bg-wooden")[0].remove();
    if (document.getElementsByClassName("section-bottom-padding bg-wooden").length != 0)
    document.getElementsByClassName("section-bottom-padding bg-wooden")[0].remove();
    if (document.getElementsByClassName('container section-bottom-padding').length!=0)
    document.getElementsByClassName("container section-bottom-padding")[0].remove();
    if (document.getElementsByClassName('mui-share-buttons mui-js-share-buttons share-buttons').length!=0)
    document.getElementsByClassName("mui-share-buttons mui-js-share-buttons share-buttons")[0].remove();
    // document.getElementsByClassName("container section-bottom-padding")[1].remove();
    document.getElementsByClassName("community-tabs-container bg-wooden")[0].remove();
    if (document.getElementsByClassName('mui-js-community-reviews js-community-loaded').length!=0)
    document.getElementsByClassName("mui-js-community-reviews js-community-loaded")[0].remove();
    if (document.getElementsByClassName("section-bottom-padding bg-light js-related-products").length != 0)
        document.getElementsByClassName("section-bottom-padding bg-light js-related-products")[0].remove();
    if (document.getElementsByClassName('section-bottom-padding bg-white related-container container').length !=0) 
        document.getElementsByClassName('section-bottom-padding bg-white related-container container')[0].remove();
    if (document.getElementsByClassName('mui-button mui-message-list-load-all mui-js-message-list-load-all-trigger mui-js-load-all-reviews').length!=0)
        document.getElementsByClassName('mui-button mui-message-list-load-all mui-js-message-list-load-all-trigger mui-js-load-all-reviews')[0].remove();
    document.getElementsByClassName("section-bottom-padding last-seen-products js-last-seen-products")[0].remove();
    // document.getElementById('gopt-related-products').remove();
    document.getElementById('skip-footer').remove();
   

    var img = document.createElement("IMG");
    if (nutriScore === "A") {
        img.src = nsAURL;
        queryname = "NutriscoreA"
    } else if (nutriScore === "B") {
        img.src = nsBURL;
        queryname = "NutriscoreB"
    } else if (nutriScore === "C") {
        img.src = nsCURL;
        queryname = "NutriscoreC"
    } else if (nutriScore === "D") {
        img.src = nsDURL;
        queryname = "NutriscoreD"
    } else if (nutriScore === "E") {
        img.src = nsEURL;
        queryname = "NutriscoreE"
    } else {
        img.src = nsVURL;
        queryname = "NutriscoreV"
    }
    img.style.height = '87.5px';
    img.style.width = '164px';
    img.style.zIndex = '10';
    img.style.display = 'block'
    img.setAttribute("href", "https://world.openfoodfacts.org/nutriscore");

    console.log("Nutri-Score image added!");
    div.appendChild(img);
    var title = document.createElement("TEXT");
     if (currency!=null) {

    title.textContent = Math.round(currency.innerText/1.7*20)/20;
    title.style.fontSize = "20px";
    title.style.color = "gray";
    title.style.fontWeight="bold";
   

    var currency_unit = document.createElement("TEXT");
    currency_unit.textContent = "EUR" ;
    currency_unit.style.fontSize = "16px";
    currency_unit.float="right";
    currency_unit.style.color = "gray";
    currency_unit.style.fontWeight="bold";

    var currency_change = document.createElement("INPUT");
    currency_change.type = "button";
    currency_change.value = "Change Currency";
    currency_change.style.lineHeight = 1;
    currency_change.style.fontFamily = "Helvetica Neue Condensed,Impact,arial,sans-serif";
    var current_instead = document.getElementsByClassName('usual-price')[0];
    // current_instead.innerText = "statt " + Math.round(current_instead.innerText.split(' ')[1]/1.7*20)/20;
    // console.log(current_instead[0].innerText.split(' ')[1]);
    currency_change.addEventListener('click', function(){
        current=!current;

        if (current) {
            currency.innerText = Math.round(currency.innerText/1.7*20)/20;
            current_instead.innerText = "statt " + Math.round(current_instead.innerText.split(' ')[1]/1.7*20)/20;
            currency_unit.textContent="EUR";
        }
        else{
            currency.innerText = Math.round(currency.innerText*1.7*20)/20;
            current_instead.innerText = "statt " + Math.round(current_instead.innerText.split(' ')[1]*1.7*20)/20;
            currency_unit.textContent="CHF";
        }
    })

    if (current) {
        currency.innerHTML=title.innerText;
    }
    else{
        currency_unit.textContent="CHF";
    }
    }

    var sidebar_price = document.getElementsByClassName("sidebar-price")[0];

    sidebar_price.append(currency_unit);
    sidebar_price.append(currency_change);
    position.insertBefore(div, position.childNodes[0]);
  //  loadQueryResults(queryname, queryResultsCallback);

}
//function to send request to the api and receive response and return nutri-score
function loadProductData(callback) {
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        cache: false,
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
        },
        success: function(json) {
            console.log("Success", json);
            if(typeof callback == "function") {
                 nutri_score_final = callback(json);
                 show(nutri_score_final)
            }
        },
        //function get nutri score if the json does not work
        error:function(textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },

    });
}

//function to send request that get products which nutrisocre is C
function loadQueryResults(queryname, callback)
{
  
    $.ajax({
        url: "https://localhost/v1/queries/" + queryname,
        type: "GET",
        dataType: "json",
        cache: false,
        async: true,
        success: function(json) {
            console.log("Success", json);
            if(typeof callback == "function") {
                finalResultSet=callback(json);
                display(finalResultSet);
            }
        },
        error: function(textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
    });
}
//function to push the alternatives as a array to the final_result
function queryResultsCallback(json, queryname) {

    let bindings = json["results"]["bindings"];
    let resultSet = [];

    // Gets executed after a SPARQL query for a better Nutriscore.
    // Pushing all SPARQL results from "bindings" into the "resultSet".
    function alternativeSuggestionNutriscore(array2) {
        for (let i = 0; i < array2.length; i++) {
            resultSet.push([array2[i]["gtin"]["value"], array2[i]["product_name_en"]["value"], array2[i]["serving_size"]["value"]]);
            }
    }

    

    // Function for choosing random objects from "resultSet".
    // Copied from here: https://stackoverflow.com/a/19270021.
    function getRandom(array3, number) {
        let result = new Array(number),
            len = array3.length,
            taken = new Array(len);
        if (number > len)
            console.log("getRandom: More elements taken than available");
        while (number--) {
            var x = Math.floor(Math.random() * len);
            result[number] = array3[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    // Executes the correct functions depending on the "queryname".

        alternativeSuggestionNutriscore(bindings);
        finalResultSet = getRandom(resultSet, 6);

        return finalResultSet;
   
}
//function to display all the alternatives to your homepage,not work if the api is incorrect

 function display(_finalResultSet){
    console.log("display")
    finalResultSet=_finalResultSet;
    console.log(finalResultSet);
    var div1 = document.createElement("div");
    var img1 = document.createElement("img");
        img1.src = finalResultSet[0][1];
        img1.style.width = '40px';
        img1.style.height = '87.5px';
        img1.setAttribute.href = "https://produkte.migros.ch/"+finalResultSet[0][0];
    var name1 = document.createElement("TEXT");
        name1.style.fontSize = "16px";
        name1.style.display = "block";
        name1.style.float = "left";
        name1.textContent = finalResultSet[0][0];
    var weight1 = document.createElement("TEXT");
        weight1.style.fontSize = "16px";
        weight1.style.display = "block";
        weight1.style.float = "left";
        weight1.textContent = finalResultSet[0][2]
    div1.appendChild(img1);
    div1.appendChild(name1);
    div1.appendChild(weight1);
    document.getElementById("imageHolder").append(div1);


    var div2 = document.createElement("div");
    var img2 = document.createElement("img");
        img2.src = finalResultSet[1][1];
        img2.style.width = '40px';
        img2.style.height = '87.5px';
        img2.setAttribute.href = "https://produkte.migros.ch/"+finalResultSet[1][0];
    var name2 = document.createElement("TEXT");
        name2.style.fontSize = "16px";
        name2.style.display = "block";
        name2.style.float = "left";
        name2.textContent = finalResultSet[1][0];
    var weight2 = document.createElement("TEXT");
        weight2.style.fontSize = "16px";
        weight2.style.display = "block";
        weight2.style.float = "left";
        weight2.textContent = finalResultSet[1][2];
    div2.appendChild(img2);
    div2.appendChild(name2);
    div2.appendChild(weight2);
    document.getElementById("imageHolder").append(div2);

    var div3 = document.createElement("div");
    var img3 = document.createElement("img");
        img3.src = finalResultSet[2][1];
        img3.style.width = '40px';
        img3.style.height = '87.5px';
        img3.setAttribute.href = "https://produkte.migros.ch/"+finalResultSet[2][0];
    var name3 = document.createElement("TEXT");
        name3.style.fontSize = "16px";
        name3.style.display = "block";
        name3.style.float = "left";
        name3.textContent = finalResultSet[2][0];
    var weight3 = document.createElement("TEXT");
        weight3.style.fontSize = "16px";
        weight3.style.display = "block";
        weight3.style.float = "left";
        weight3.textContent = finalResultSet[2][2]
    div3.appendChild(img3);
    div3.appendChild(name3);
    div3.appendChild(weight3);
    document.getElementById("imageHolder").append(div3);

    var div4 = document.createElement("div");
    var img4 = document.createElement("img");
        img4.src = finalResultSet[3][1];
        img4.style.width = '40px';
        img4.style.height = '87.5px';
        img4.setAttribute.href = "https://produkte.migros.ch/"+finalResultSet[3][0];
    var name4 = document.createElement("TEXT");
        name4.style.fontSize = "16px";
        name4.style.display = "block";
        name4.style.float = "left";
        name4.textContent = finalResultSet[3][0];
    var weight4 = document.createElement("TEXT");
        weight4.style.fontSize = "16px";
        weight4.style.display = "block";
        weight4.style.float = "left";
        weight4.textContent = finalResultSet[3][2]
    div4.appendChild(img4);
    div4.appendChild(name4);
    div4.appendChild(weight4);
    document.getElementById("imageHolder").append(div4);

    var div5 = document.createElement("div");
    var img5 = document.createElement("img");
        img5.src = finalResultSet[4][1];
        img5.style.width = '40px';
        img5.style.height = '87.5px';
        img5.setAttribute.href = "https://produkte.migros.ch/"+finalResultSet[4][0];
    var name5 = document.createElement("TEXT");
        name5.style.fontSize = "16px";
        name5.style.display = "block";
        name5.style.float = "left";
        name5.textContent = finalResultSet[4][0];
    var weight5 = document.createElement("TEXT");
        weight5.style.fontSize = "16px";
        weight5.style.display = "block";
        weight5.style.float = "left";
        weight5.textContent = finalResultSet[4][2]
    div5.appendChild(img5);
    div5.appendChild(name5);
    div5.appendChild(weight5);
    document.getElementById("imageHolder").append(div5);

    var div6 = document.createElement("div");
    var img6 = document.createElement("img");
        img6.src = finalResultSet[5][1];
        img6.style.width = '40px';
        img6.style.height = '87.5px';
        img6.setAttribute.href = "https://produkte.migros.ch/"+finalResultSet[5][0];
    var name6 = document.createElement("TEXT");
        name6.style.fontSize = "16px";
        name6.style.display = "block";
        name6.style.float = "left";
        name6.textContent = finalResultSet[5][0];
    var weight6 = document.createElement("TEXT");
        weight6.style.fontSize = "16px";
        weight6.style.display = "block";
        weight6.style.float = "left";
        weight6.textContent = finalResultSet[5][2]
    div6.appendChild(img6);
    div6.appendChild(name6);
    div6.appendChild(weight6);
    document.getElementById("imageHolder").append(div6);
   
 }