// Checking if running properly.
console.log("Chrome extension is working!");

var group;
var group = localStorage.getItem("GroupName");
console.log ('group at refresh'+ group)

// Admin Section.
chrome.runtime.onMessage.addListener(
    function (request){
    if (request.Notice) {
        console.log("The Extension button was clicked");
        
        document.documentElement.style.height = "100%";
        document.body.style.height = "100%";
        document.documentElement.style.width = '100%';
        document.body.style.width = '100%';

        var div2 = document.createElement("DIV");
        var form = document.createElement("FORM");
        var title = document.createElement("TEXT");
        var explanation = document.createElement("TEXT");
        var frag = document.createDocumentFragment();
        var input = document.createElement("INPUT");
        var confirm = document.createElement("INPUT");
        var closer = document.createElement("INPUT");
        var nutriInfo = document.createElement("INPUT");
        var Adminpassword = document.createElement("INPUT");
        var finishbutton = document.createElement("INPUT");

        var country_germany = document.createElement("INPUT");
        var country_ch = document.createElement("INPUT");
        
        var group_a = document.createElement("INPUT");
        var group_b= document.createElement("INPUT");
        var group_c= document.createElement("INPUT");


        // Only append the elements if they are not already open.
       
        if ($("#overlay").length == 0) {
            document.body.appendChild(div2);
            div2.appendChild(form);
            form.appendChild(title);
            form.appendChild(explanation);
            form.appendChild(input);
            form.appendChild(closer);
            form.appendChild(nutriInfo);
            form.appendChild(finishbutton)
            
            


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
        div2.style.borderColor = 'lightblue';

        title.id = "title"
        title.textContent = "Welcome to the Nutriscore Study";
        title.style.fontSize = "20px";
        title.style.position = "absolute";
        title.style.top = "7%";
        title.style.left = "40%";

        explanation.textContent = "TEXT"
        explanation.style.fontSize = "14px";
        explanation.style.position = "absolute";
        explanation.style.top = "53%"
        explanation.style.left = "19%";

        input.id = "Adminbutton";
        input.type = "button";
        input.value = "Admin";
        input.style.position = "absolute";
        input.style.top = "39%";
        input.style.left = "42%";
        input.style.color = "darkgreen";
        input.style.backgroundColor = "lightgreen";


        



    ////Admin section

       
        $("#Adminbutton").on("click", function() {
    
        var password2 = '123';


            Adminpassword.id = "Adminpass";
            Adminpassword.type = "Text";
            Adminpassword.value = "Password";
            Adminpassword.style.position = "absolute";
            Adminpassword.style.top = "60%";
            Adminpassword.style.left = "42%";
            Adminpassword.style.color = "darkgreen";
            Adminpassword.style.backgroundColor = "lightgreen";

            confirm.id = "confirm";
            confirm.type = "button";
            confirm.value = "Confirm";
            confirm.style.position = "absolute";
            confirm.style.top = "60%";
            confirm.style.left = "60%";
            confirm.style.color = "darkgreen";
            confirm.style.backgroundColor = "lightgreen";

            form.appendChild(Adminpassword);
            form.appendChild(confirm);
//Password 
            $("#confirm").on("click", function() {

               password2 = document.getElementById("Adminpass").value;
            

            console.log(" Written password is : " + password2);
//Set Password here 
            if (password2 == '123') {

                if ($("#country_germany").length == 0 && $("#group_a").length == 0) {
                    frag.appendChild(country_germany);
                    frag.appendChild(country_ch);
                    frag.appendChild(group_a);
                    frag.appendChild(group_b);
                    frag.appendChild(group_c);
                    form.appendChild(frag);
                    
                    
                


                country_germany.id = "country_germany";
                country_germany.type = "button";
                country_germany.value = "GERMANY";
                country_germany.style.position = "absolute";
                country_germany.style.top = "20%";
                country_germany.style.left = "60%";
                country_germany.style.color = "red";
                country_germany.style.backgroundColor = "lightred";

                $("#country_germany").on("click", function() {

                    var Country = "Germany";
                    localStorage.setItem("CountryName", Country);
                 
     
                 console.log(" Country Selected is  : " + Country );

                
                });

                country_ch.id = "country_ch";
                country_ch.type = "button";
                country_ch.value = "Switzerland";
                country_ch.style.position = "absolute";
                country_ch.style.top = "20%";
                country_ch.style.left = "80%";
                country_ch.style.color = "red";
                country_ch.style.backgroundColor = "lightred";

                $("#country_ch").on("click", function() {

                    Country = "Switzerland";
                    localStorage.setItem("CountryName", Country );
                 
     
                 console.log(" Country Selected is  : " + Country);

                
                });

                group_a.id = "group_a";
                group_a.type = "button";
                group_a.value = "NutriScore ABCDE";
                group_a.style.position = "absolute";
                group_a.style.top = "90%";
                group_a.style.left = "20%";
                group_a.style.color = "blue";
                group_a.style.backgroundColor = "lightblue";

                group_b.id = "group_b";
                group_b.type = "button";
                group_b.value = "NutriScore AB";
                group_b.style.position = "absolute";
                group_b.style.top = "90%";
                group_b.style.left = "50%";
                group_b.style.color = "blue";
                group_b.style.backgroundColor = "lightblue";


                group_c.id = "group_c";
                group_c.type = "button";
                group_c.value = "NutriScore Disabled";
                group_c.style.position = "absolute";
                group_c.style.top = "90%";
                group_c.style.left = "80%";
                group_c.style.color = "blue";
                group_c.style.backgroundColor = "lightblue";



                $("#group_a").on("click", function() {

                    var group = "A";
                    localStorage.setItem("GroupName", group);
                 
     
                 console.log(" Group selected is  : " + group );

                
                });

                
                $("#group_b").on("click", function() {

                    var group = "B";
                    localStorage.setItem("GroupName", group);
                 
     
                    console.log(" Group selected is  : " + group );

                
                });

                
                $("#group_c").on("click", function() {

                    var group = "C";
                    localStorage.setItem("GroupName", group);
                 
     
                    console.log(" Group selected is  : " + group );

                
                });







                
                
                
            
                } else if ($("#country_ch").length > 0) {
                    console.log("Admin menu is already open");
                }
            } else {
                console.log(" Password False");
            };
    });
});
        



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
        

        closer.id = "exitButton";
        closer.type = "button";
        closer.value = "Close";
        closer.style.position = "absolute";
        closer.style.top = "5%";
        closer.style.left = "91%";
        
        $("#exitButton").on("click", function() {
            $(document.body).children("#overlay").remove();
            location.reload();
            
        });

        finishbutton.id = "finishbutton";
        finishbutton.type = "button";
        finishbutton.value = "Finish study";
        finishbutton.style.position = "absolute";
        finishbutton.style.top = "45%";
        finishbutton.style.left = "42%";
        finishbutton.style.color = "lightred";
        finishbutton.style.backgroundColor = "darkred";

        $("#finishbutton").on("click", function() {
        console.log ('Study is finished')
        

        

        });
    }
})



// Looking for unique identifier(GTIN).

let identifierBox = document.getElementsByClassName("mui-panel-body additional-information-panel-body");
if (identifierBox.length!=0) {

    var identifierTable = identifierBox[0];
    

let identifierColumns = identifierTable.getElementsByTagName('td');

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

// Checking if it belongs to the Cheese/Kase category.
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
                 show (nutri_score_final);
                 


            }
        },
        //function get nutri score if the json does not work
        error:function(textStatus, errorThrown) {
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
//Retrun error if the local NutriScore is different from API's Nutriscore.
     
if (nutriScore==nutri_score_final){
    var xhr = new XMLHttpRequest();
     var url2 = "https://eatfit-service.foodcoa.ch/product/report/";
     xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
     xhr.open("POST", url2, true);
     xhr.setRequestHeader("Content-Type", "application/json");
     xhr.onreadystatechange = function () {
     if (xhr.readyState === 4 && xhr.status === 200) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://eatfit-service.foodcoa.ch/product/report/",
            "method": "POST",
            "headers": {
              "Content-Type": "application/json",
              "cache-control": "no-cache",
              "Postman-Token": "010c1d65-2b2e-4558-8431-1c6ef39c46ba"
            },
            "processData": false,
            "data": "{\"gtin\":\"123123\", \"app\": \"TestApp\", \"error_description\": \"I am just here for the testing\"}"
          }
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
          
        var json = JSON.parse(xhr.responseText);
  
     }
     };
     var data = JSON.stringify({ "GTIN": gtin, "app": "ch.autoidlabs.nutriscore_chrome_extension","error_description": "Nutri-Score seems wrong. Please check"},);
     xhr.send(data);


}



if (group == "A"){

function show(nutri_score_final){
    nutriScore = nutri_score_final;
    if(nutriScore==null){
        console.log("Nutriscore is Null")
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
}
else if (group == "B") {
    function show(nutri_score_final){
        nutriScore = nutri_score_final;
        if(nutriScore==null){
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
            console.log("NutriScore image Removed!");
        } else if (nutriScore === "D") {
            console.log("NutriScore image Removed!"); 
        } else if (nutriScore === "E") {
            console.log("NutriScore image Removed!"); 
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
}
else if (group == "C") {
    
    
        console.log("NutriScore image Removed!");
     






    }
    }
    else {
        console.log("NutiScore Group Error");
    }


