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
var categoryCheck;
if (categorization.indexOf("joghurt & joghurtdrinks") >= 0) {
    categoryCheck = true;
} else if (categorization.indexOf("joghurt & joghurtdrinks") <0) {
    categoryCheck = false;
}


// Function for calling API from Klaus.
// If no data is available, Klaus gets a notification in his system.
var username = 'eatfit_student_dominic';
var password = 'yJFbbHtCPTFyy8GB';
var url = "https://eatfit-service.foodcoa.ch/products/" + gtin + "/?resultType=array";
var klausAPI;

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
                callback(json);
            }
        },
        error: function(textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
    });
}

// Testing if API from Klaus is offering the data.
function productDataCallback(json)
{
    if (json["products"] == null) {
        console.log("The product is not availabe in the database.");      
    } else {
        console.log("Product data is available in API.");
    }
};


// Function to check if nutritional data is available and fetch it.
// The whole Nutriscore-calculation is done within this statement.
// These variables are defined globally, because they are needed later on.
var nutriScore;
var acids;
var energy;
var sugar;
var fibers;
var protein;
var sodium;

var nutrientTable = document.getElementById("nutrient-table");
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

    if (goodIngredientScore === 0 && badIngredientScore === 0) {
        nutriScoreNumber = 50;
    } else if (badIngredientScore >= 11) {
        nutriScoreNumber = badIngredientScore - (fibersScore + fruitvegetablesScore);
    } else {
        nutriScoreNumber = badIngredientScore - goodIngredientScore;
    }

    console.log(nutriScoreNumber);

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


// Choosing the corresponding picture to the Nutri-Score.
// Appending the corresponding image to the website.
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

var img = document.createElement("IMG");
if (nutriScore === "A") {
    img.src = nsAURL;
} else if (nutriScore === "B") {
    img.src = nsBURL;
} else if (nutriScore === "C") {
    img.src = nsCURL;
} else if (nutriScore === "D") {
    img.src = nsDURL;
} else if (nutriScore === "E") {
    img.src = nsEURL;
} else {
    img.src = nsVURL;
}
img.style.height = '87.5px';
img.style.width = '164px';
img.style.zIndex = '10';
img.setAttribute("href", "https://world.openfoodfacts.org/nutriscore");

console.log("Nutri-Score image added!");
div.appendChild(img);
position.insertBefore(div, position.childNodes[0]);


// Calling the function which accesses Klaus's API.
loadProductData(productDataCallback);

// The rest of the code is only executed, once the button in
// the windowbar of the browser is clicked.
///////////////////////////////////////////////////////////////
// From here on, the SPARQL queries are called fom the backend.
function loadQueryResults(queryname, callback)
{
    $.ajax({
        url: "http://localhost:8080/v1/queries/" + queryname,
        type: "GET",
        dataType: "json",
        cache: false,
        async: true,
        success: function(json) {
            console.log("Success", json);
            if(typeof callback == "function") {
                callback(json, queryname);
            }
        },
        error: function(textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
    });
}
// Extracting the object "bindings" from JSON Object.
let finalResultSet = [];
function queryResultsCallback(json, queryname) {
    let bindings = json["results"]["bindings"];
    let resultSet = [];

    // Gets executed after a SPARQL query for a better Nutriscore.
    // Pushing all SPARQL results from "bindings" into the "resultSet".
    function alternativeSuggestionNutriscore(array2) {
        for (let i = 0; i < array2.length; i++) {
            resultSet.push([array2[i]["gtin"]["value"], array2[i]["pname"]["value"], array2[i]["score"]["value"]]);
            }
    }

    // Gets executed after a SPARQL query for single nutritional improvement.
    // Pushing all SPARQL results from "bindings" into the "resultSet".
    function alternativeSuggestionNutrients(array4) {
        for (let i = 0; i < array4.length; i++) {
            resultSet.push([array4[i]["gtin"]["value"], array4[i]["pname"]["value"], array4[i]["diff"]["value"]]);
            }
    }

    // Gets executed after a SPARQL query for fruit/vegetable improvement.
    // Pushing all SPARQL results from "bindings" into the "resultSet".
    function alternativeSuggestionNutrients2(array5) {
        for (let i = 0; i < array5.length; i++) {
            resultSet.push([array5[i]["gtin"]["value"], array5[i]["pname"]["value"], array5[i]["diff"]["value"]]);
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
    if (queryname.indexOf("Nutriscore") !== -1) {
        alternativeSuggestionNutriscore(bindings);
        finalResultSet = getRandom(resultSet, 3);
    } else if (queryname.indexOf("Acids") !== -1) {
        alternativeSuggestionNutrients(bindings);
        finalResultSet = getRandom(resultSet, 3);
    } else if (queryname.indexOf("Energy") !== -1) {
        alternativeSuggestionNutrients(bindings);
        finalResultSet = getRandom(resultSet, 3);
    } else if (queryname.indexOf("Sugar") !== -1) {
        alternativeSuggestionNutrients(bindings);
        finalResultSet = getRandom(resultSet, 3);
    } else if (queryname.indexOf("Salt") !== -1) {
        alternativeSuggestionNutrients(bindings);
        finalResultSet = getRandom(resultSet, 3);
    } else if (queryname.indexOf("Fiber") !== -1) {
        alternativeSuggestionNutrients(bindings);
        finalResultSet = getRandom(resultSet, 3);
    } else if (queryname.indexOf("Protein") !== -1) {
        alternativeSuggestionNutrients(bindings);
        finalResultSet = getRandom(resultSet, 3);
    } else if (queryname.indexOf("FruitVegetable") !== -1) {
        alternativeSuggestionNutrients2(bindings);
        finalResultSet = getRandom(resultSet, 3);
    } else {
        console.log("The used query is unknown.");
        finalResultSet = [0];
    }
    console.log(finalResultSet);
    return finalResultSet;
};


// "id" is retrieved from selection menu of the extension.
// According to the id, the correct queryname is generated.
// For nutritional improvements, the code makes sure that always a
// decimal number is sent to the JAVA Backend (necessary to work).
function queryNameDefiner(id) {
    if (id == "NS" && nutriScore == "A") {
        return("NutriscoreA");
    } else if (id == "NS" && nutriScore == "B") {
        return("NutriscoreB");
    } else if (id == "NS" && nutriScore == "C") {
        return("NutriscoreC");
    } else if (id == "NS" && nutriScore == "D") {
        return("NutriscoreD");
    } else if (id == "NS" && nutriScore == "E") {
        return("NutriscoreE");
    } else if (id == "EN") {
        if (energy.toString().indexOf(".") == -1) {
            return("NutrientEnergyComparison?filt=" + energy + ".0");
        } else if (energy.toString().indexOf(".") !== -1) {
            return("NutrientEnergyComparison?filt=" + energy)
        }
    } else if (id == "SU") {
        if (sugar.toString().indexOf(".") == -1) {
            return("NutrientSugarComparison?filt=" + sugar + ".0");
        } else if (sugar.toString().indexOf(".") !== -1) {
            return("NutrientSugarComparison?filt=" + sugar)
        }
    } else if (id == "SA") {
        if (acids.toString().indexOf(".") == -1) {
            return("NutrientAcidsComparison?filt=" + acids + ".0");
        } else if (acids.toString().indexOf(".") !== -1) {
            return("NutrientAcidsComparison?filt=" + acids)
        }
    } else if (id == "SO") {
        if ((sodium/400).toString().indexOf(".") == -1) {
            return("NutrientSaltComparison?filt=" + (sodium/400) + ".0");
        } else if ((sodium/400).toString().indexOf(".") !== -1) {
            return("NutrientSaltComparison?filt=" + (sodium/400))
        }
    } else if (id == "FI") {
        if (fibers.toString().indexOf(".") == -1) {
            return("NutrientFiberComparison?filt=" + fibers + ".0");
        } else if (fibers.toString().indexOf(".") !== -1) {
            return("NutrientFiberComparison?filt=" + fibers)
        }
    } else if (id == "PR") {
        if (protein.toString().indexOf(".") == -1) {
            return("NutrientProteinComparison?filt=" + protein + ".0");
        } else if (protein.toString().indexOf(".") !== -1) {
            return("NutrientProteinComparison?filt=" + protein)
        }
    } else if (id == "FV") {
        return("NutrientFruitVegetableComparison?filt=20.0");
    }
}
///////////////////////////////////////////////////////////////


// Reaction once the extension button is clicked.
// --> Displaying the menu for user interaction.
chrome.runtime.onMessage.addListener(
    function (request){
    if (request.Notice) {
        console.log("The button was clicked");
        
        document.documentElement.style.height = "100%";
        document.body.style.height = "100%";
        document.documentElement.style.width = '100%';
        document.body.style.width = '100%';

        var div2 = document.createElement("DIV");
        var form = document.createElement("FORM");
        var title = document.createElement("TEXT");
        var explanation = document.createElement("TEXT");
        var frag = document.createDocumentFragment();
        var select = document.createElement("SELECT");
        var input = document.createElement("INPUT");
        var closer = document.createElement("INPUT");
        var nutriInfo = document.createElement("INPUT");

        // Only append the elements if they are not already open.
        if ($("#overlay").length == 0) {
            document.body.appendChild(div2);
            div2.appendChild(form);
            form.appendChild(title);
            form.appendChild(explanation);
            form.appendChild(input);
            form.appendChild(closer);
            form.appendChild(nutriInfo);
        } else if ($("#overlay").length > 0) {
            console.log("The menu is already open");
        }
        
        form.style.textAlign = "center";

        div2.id = "overlay";
        div2.style.position = 'fixed';
        div2.style.top = '30%';
        div2.style.left = '10%';
        div2.style.width = '78%';   
        div2.style.height = '50%';
        div2.style.zIndex = '100';
        div2.style.opacity = '0.95';
        div2.style.backgroundColor = 'white';
        div2.style.border = 'solid';
        div2.style.borderWidth = '5px';
        div2.style.borderRadius = '20px';
        div2.style.borderColor = 'orange';

        title.textContent = "Which nutrient value would you like to improve?";
        title.style.fontSize = "20px";
        title.style.position = "absolute";
        title.style.top = "7%";
        title.style.left = "27%";

        explanation.textContent = "(Difference means less for: Energy, Sugar, Fatty Acids & Salt and more for: Fiber & Protein)"
        explanation.style.fontSize = "14px";
        explanation.style.position = "absolute";
        explanation.style.top = "53%"
        explanation.style.left = "19%";

        select.id = "queryChoice";
        select.options.add(new Option("Overall Nutriscore improvement", "NS", true, true));
        select.options.add(new Option("Energy (kJ)", "EN"));
        select.options.add(new Option("Sugar (g)", "SU"));
        select.options.add(new Option("Saturated fatty Acids (g)", "SA"));
        select.options.add(new Option("Salt (g)", "SO"));
        select.options.add(new Option("Fiber (g)", "FI"));
        select.options.add(new Option("Protein (g)", "PR"));
        //select.options.add(new Option("Fruit/Vegetable (%)", "FV"));
        
        // The above option is not activated, because this kind of
        // data is very incomplete in Klaus's database and no yoghurt
        // has a high enough percentage to gain points through it.

        // Only append the elements if they are not already open.
        if ($("#overlay").length == 1) {
            frag.appendChild(select);
            form.appendChild(frag);
        } else if ($("#overlay").length > 1) {
            console.log("The menu is already open");
        }

        select.style.position = "absolute";
        select.style.top = "24%";
        select.style.left = "37%";

        input.id = "queryExecution";
        input.type = "button";
        input.value = "Show alternatives!";
        input.style.position = "absolute";
        input.style.top = "39%";
        input.style.left = "42%";
        input.style.color = "darkgreen";
        input.style.backgroundColor = "lightgreen";

        nutriInfo.id = "nutriInfo";
        nutriInfo.type = "button";
        nutriInfo.value = "More infos about Nutriscore";
        nutriInfo.style.position = "absolute";
        nutriInfo.style.top = "84%";
        nutriInfo.style.left = "76%";
        $("#nutriInfo").on("click", function() {
            window.open("https://world.openfoodfacts.org/nutriscore");
        });

        var alternative1 = document.createElement("INPUT");
        var alternative2 = document.createElement("INPUT");
        var alternative3 = document.createElement("INPUT");

        alternative1.id = "alt1";
        alternative1.type = "button";
        alternative1.style.position = "absolute";
        alternative1.style.top = "65%";
        alternative1.style.left = "10%";
        alternative1.style.border = "none";
        alternative1.style.color = "blue";
        alternative1.style.textDecoration = "underline";
        alternative1.value = "Alternative 1";

        alternative2.id = "alt2";
        alternative2.type = "button";
        alternative2.style.position = "absolute";
        alternative2.style.top = "75%";
        alternative2.style.left = "10%";
        alternative2.style.border = "none";
        alternative2.style.color = "blue";
        alternative2.style.textDecoration = "underline";
        alternative2.value = "Alternative 2";

        alternative3.id = "alt3";
        alternative3.type = "button";
        alternative3.style.position = "absolute";
        alternative3.style.top = "85%";
        alternative3.style.left = "10%";
        alternative3.style.border = "none";
        alternative3.style.color = "blue";
        alternative3.style.textDecoration = "underline";
        alternative3.value = "Alternative 3";

        // Functions are only executed upon the click
        // of the "Show alternatives"-button on the menu.
        $("#queryExecution").on("click", function() {
            if (categoryCheck == true) {
                var queryChoiceSet = document.getElementById("queryChoice");
                var queryChoice = queryChoiceSet.value
                var queryName = queryNameDefiner(queryChoice);
                loadQueryResults(queryName, queryResultsCallback);
                
                // Delay makes sure, that the query results
                // are loaded by the extension and are ready.
                var delayInMilliseconds = 400;
                    setTimeout(function() {

                        // After checking if the query was looking
                        // for an improved Nutriscore or just one
                        // nutritional value, the corresponding
                        // information is retrieved from the result set
                        // and displayed as alternatives on the menu.
                        $(function() {
                            if (finalResultSet[0] == undefined) {
                                console.log("Result set position 0 is empty.");
                                alert("There are no better options available in the yoghurt category than the current product.");
                            } else if (finalResultSet[0][2] == "A" || finalResultSet[0][2] == "B" || finalResultSet[0][2] == "C" || finalResultSet[0][2] == "D" || finalResultSet[0][2] == "E") {
                                $("#alt1").val(finalResultSet[0][1] + " – Nutriscore: " + finalResultSet[0][2]);
                            } else {
                                $("#alt1").val(finalResultSet[0][1] + " – Difference: " + parseFloat(finalResultSet[0][2]).toFixed(2));
                            }
                        });
                        $(function() {
                            if (finalResultSet[1] == undefined) {
                                console.log("Result set position 1 is empty.");
                            } else if (finalResultSet[1][2] == "A" || finalResultSet[1][2] == "B" || finalResultSet[1][2] == "C" || finalResultSet[1][2] == "D" || finalResultSet[1][2] == "E") {
                                $("#alt2").val(finalResultSet[1][1] + " – Nutriscore: " + finalResultSet[1][2]);
                            } else {
                                $("#alt2").val(finalResultSet[1][1] + " – Difference: " + parseFloat(finalResultSet[1][2]).toFixed(2));
                            }
                        });
                        $(function() {
                            if (finalResultSet[2] == undefined) {
                                console.log("Result set position 2 is empty.");
                            } else if (finalResultSet[2][2] == "A" || finalResultSet[2][2] == "B" || finalResultSet[2][2] == "C" || finalResultSet[2][2] == "D" || finalResultSet[2][2] == "E") {
                                $("#alt3").val(finalResultSet[2][1] + " – Nutriscore: " + finalResultSet[2][2]);
                            } else {
                                $("#alt3").val(finalResultSet[2][1] + " – Difference: " + parseFloat(finalResultSet[2][2]).toFixed(2));
                            }
                        });
                        form.appendChild(alternative1);
                        form.appendChild(alternative2);
                        form.appendChild(alternative3);
                        
                        // The corresponding link to each
                        // alternative is injected here.
                        $("#alt1").on("click", function() {
                            if (finalResultSet[0] == undefined) {
                                console.log("No link received on position 0.");
                            } else {
                                window.open("https://search.migros.ch/de/q:" + finalResultSet[0][0], "altSug");
                            }
                        });
                        $("#alt2").on("click", function() {
                            if (finalResultSet[1] == undefined) {
                                console.log("No link received on position 1.");
                            } else {
                                window.open("https://search.migros.ch/de/q:" + finalResultSet[1][0], "altSug");
                            }
                        });
                        $("#alt3").on("click", function() {
                            if (finalResultSet[2] == undefined) {
                                console.log("No link received on position 2.");
                            } else {
                                window.open("https://search.migros.ch/de/q:" + finalResultSet[2][0], "altSug");
                            }
                        });
                    }, delayInMilliseconds);
            } else {
                alert("No alternatives can be suggested, since your product is not in the category of yoghurts.");
            }
        });

        closer.id = "exitButton";
        closer.type = "button";
        closer.value = "Close";
        closer.style.position = "absolute";
        closer.style.top = "5%";
        closer.style.left = "91%";
        $("#exitButton").on("click", function() {
            $(document.body).children("#overlay").remove();
        });
    }
})