// This module customizes the NutriScore on a SINGLE PRODUCT page to the user's location. 
// Check current pagetype
var page_type="migros.productoverview";
if ($("ul.mui-js-product-list").length) {
	page_type="migros.productoverview";
}
if ($("aside.sidebar").length) {
	page_type="migros.singleproduct";
}
console.log(page_type);
//var page_type=localStorage.getItem("page_type");
//test change 2222

if (page_type === "migros.singleproduct") {
    // Looking for unique identifier(GTIN).

    let identifierBox = document.getElementsByClassName("mui-panel-body additional-information-panel-body");
    if (identifierBox.length != 0) {

        var identifierTable = identifierBox[0];


        let identifierColumns = identifierTable.getElementsByTagName('td');

        function searchGTIN(nameKey, array1) {
            for (let i = 0; i < array1.length; i++) {
                if (array1[i].innerText === nameKey) {
                    return (array1[i + 1].innerText);
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
        } else if (categorization.indexOf("getränke heiss & kalt") < 0) {
            food = true;
        }
        console.log("The object is food: " + food);


        // Checking if it is mineral water.
        var water;
        if (categorization.indexOf("mineralwasser") >= 0) {
            water = true;
        } else if (categorization.indexOf("mineralwasser") < 0) {
            water = false;
        }
        console.log("The object is mineral water: " + water);


        // Checking if it belongs to the yoghurt category.
        var joghurtCheck;
        if (categorization.indexOf("joghurt & joghurtdrinks") >= 0) {
            joghurtCheck = true;
        } else if (categorization.indexOf("joghurt & joghurtdrinks") < 0) {
            joghurtCheck = false;
        }
        var kaseCheck;
        if (categorization.indexOf("Käse ") >= 0) {
            kaseCheck = true;
        } else if (categorization.indexOf("Käse ") < 0) {
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
        function productDataCallback(json) {
            if (json["products"] == null) {
                console.log("The product is not availabe in the database.");
            } else {
                console.log("Product data is available in API.");
                // console.log(json["products"][0].nutri_score_final);

                return json["products"][0].nutri_score_final;
            }
        };

        function loadProductData(callback) {
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                cache: false,
                async: true,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
                },
                success: function(json) {
                    console.log("Success", json);
                    if (typeof callback == "function") {
                        nutri_score_final = callback(json);
                        show(nutri_score_final);

                    }
                },
                //function get nutri score if the json does not work
                error: function(textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                },
            });
        }
        //function to display nutri-score when the page starts
        loadProductData(productDataCallback);

        // Function to check if nutritional data is available and fetch it.
        // The whole Nutriscore-calculation is done within this statement.
        // These variables are defined globally, because they are needed later on.
        //nutri final score defintion
        var nutriScore;
        var queryname;
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
            if (nutrientTable != null) {
                var nutrientColumns = nutrientTable.getElementsByTagName("td");

                // Fetching nutritional data from HTML of website.
                for (let i = 0; i < nutrientColumns.length; i++) {
                    if (nutrientColumns[i].innerText === "Energie") {
                        var energyTxt = nutrientColumns[i + 1].innerText;
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
                        var acidsTxt = nutrientColumns[i + 1].innerText;
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
                        var sugarTxt = nutrientColumns[i + 1].innerText;
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
                        var fibersTxt = nutrientColumns[i + 1].innerText;
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
                        var proteinTxt = nutrientColumns[i + 1].innerText;
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
                        var sodiumTxt = nutrientColumns[i + 1].innerText;
                        break;
                    } else {
                        var sodiumTxt = "0";
                    }
                }

                for (let i = 0; i < nutrientColumns.length; i++) {
                    if (nutrientColumns[i].innerText === "Natrium") {
                        var natriumTxt = nutrientColumns[i + 1].innerText;
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
                    sodiumMG = sodiumInG * 400;
                }

                let natriumMG;
                if (natriumTxt.indexOf("<") !== -1) {
                    natriumMG = 0;
                } else {
                    let natriumInG = parseFloat(natriumTxt).toFixed(3);
                    natriumMG = natriumInG * 1000
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
                }
                if (food === false) {
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
                        if (kaseCheck==true){

                            nutriScoreNumber = badIngredientScore-goodIngredientScore-fruitvegetablesScore-fibersScore;
                        }
                        else{

                        nutriScoreNumber = badIngredientScore-fruitvegetablesScore-fibersScore;
                        }
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

        if (group == "A") {
            function show(_nutri_score_final) {
                nutriScore = _nutri_score_final;
                if (nutriScore == null) {
                    console.log("Here you go")
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
                div.style.margin = "auto";
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

                console.log("Nutri-Score Group A added!");
                div.appendChild(img);

                position.insertBefore(div, position.childNodes[0]);
                //  loadQueryResults(queryname, queryResultsCallback);

            }
        } else if (group == "B") {
            function show(_nutri_score_final) {
                nutriScore = _nutri_score_final;
                if (nutriScore == null) {
                    console.log("Here you go")
                    nutriScore = getScoreLocal();
                }
                console.log(nutriScore);
                console.log("THE NUTRI-SCORE OF THE PRODUCT IS: " + nutriScore);
                nsAURL = chrome.runtime.getURL("nsA.png");
                nsBURL = chrome.runtime.getURL("nsB.png");


                var img = document.createElement("IMG");
                if (nutriScore === "A") {
                    var div = document.createElement("DIV");
                    div.id = "imageHolder";
                    div.style.padding = "5px 10px 20px 0px";
                    var position = document.getElementById("info");
                    img.src = nsAURL;
                    queryname = "NutriscoreA"
                } else if (nutriScore === "B") {
                    var div = document.createElement("DIV");
                    div.id = "imageHolder";
                    div.style.padding = "5px 10px 20px 0px";
                    var position = document.getElementById("info");
                    img.src = nsBURL;
                    queryname = "NutriscoreB"
                } else if (nutriScore === "C") {

                } else if (nutriScore === "D") {

                } else if (nutriScore === "E") {

                } else {
                    img.src = nsVURL;
                    queryname = "NutriscoreV"
                }
                img.style.height = '87.5px';
                img.style.width = '164px';
                img.style.zIndex = '10';
                img.style.display = 'block'
                img.setAttribute("href", "https://world.openfoodfacts.org/nutriscore");

                console.log("Nutri-Score Group B image added!");
                div.appendChild(img);

                position.insertBefore(div, position.childNodes[0]);
                //  loadQueryResults(queryname, queryResultsCallback);
            }
        } else if (group == "C") {
            console.log("NutriScore image Removed!");
        }
    } else {
        console.log("NutiScore Group Error");
    }
}

