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
// These variables are defined globally, because they are needed later on.
//nutri final score def
var nutriScore;
var queryname ;
var finalResultSet;
//function to return nutrisocre 
function show(_nutri_score_final){
    nutriScore = _nutri_score_final;
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
    title.textContent = "HEALTHIER ALTERNATIVES BY";
    title.style.fontSize = "14px";
    title.style.display = 'block';
    title.style.color = "gray";
    title.style.fontWeight="bold";
    title.style.display = "block";
    title.style.textAlign="center"
    var title1 = document.createElement("TEXT");
    title1.textContent = "NUTRI-SCORE";
    title1.style.fontSize = "14px";
    title1.style.display = 'block';
    title1.style.color = "gray";
    title1.style.fontWeight="bold";
    title1.style.display = "block";
    title1.style.textAlign="center"


    div.appendChild(title);
    div.appendChild(title1);

    position.insertBefore(div, position.childNodes[0]);
    loadQueryResults(queryname, queryResultsCallback);

}
//Function Extracting Score from API
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
        error: function(textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
    });
}

//Function for C nutriscore excpetion
function loadQueryResults(queryname, callback)
{
    console.log("asdfasdfasdf",queryname)
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
//function pushing the alternatives as an array to the final_result
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

    

    // Function choosing random objects from "resultSet".
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
//function displaying all the six alternatives to Homepage

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