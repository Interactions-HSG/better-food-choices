// This module customizes the NutriScore on a SINGLE PRODUCT page to the user's location. 
// Check current pagetype
var page_type="migros.productoverview";
if ($("ul.mui-js-product-list").length) {
	page_type="migros.productoverview";
	console.log(page_type);
}
if ($("aside.sidebar").length) {
	page_type="migros.singleproduct";
}

//var page_type=localStorage.getItem("page_type");

if (page_type === "migros.productoverview") {
var user_country = localStorage.getItem("CountryName");
console.log("user_country: " + user_country );
urlLength=window.location.href.split('/').length;
//console.log(urlLength);
function main_page_score(){
	var current_price_Labels = document.getElementsByClassName("mui-product-tile-price");
	var current_instead_Labels = document.getElementsByClassName("mui-product-tile-original-price");
	
	var currency_unit_Label=[], currency_change=[], sidebar_price_Label=[], individual_current=[], discount_img=[],discountHolder=[], discount_Label=[];parent=[];child=[];
	
	product_Num=current_price_Labels.length;


	
	for (i=0; i<product_Num; i++) {
		
		var current=true;


		currency_unit_Label[i] = document.createElement("TEXT");
		currency_unit_Label[i].style.fontSize = "16px";
		currency_unit_Label[i].float="right";
		currency_unit_Label[i].style.color = "black";
		
		currency_change= document.createElement("INPUT");
		currency_change.type = "button";
		currency_change.value = "Change Currency";
		currency_change.style.lineHeight = 1;
		currency_change.style.float = "right";
		currency_change.style.zIndex = 100001;
		currency_change.style.fontFamily = "Helvetica Neue Condensed,Impact,arial,sans-serif";

		

		// This is the HTML code added to display the current currency unit (e.g. CHF or EUR)
		// Get price from website in CHF
		price_in_chf = current_price_Labels[i].innerText;
		console.log ('price_in_chf: '+ price_in_chf);

		// Get price from website in CHF
		price_in_chf_number = parseFloat(price_in_chf.replace('-',''));
		price_in_chf_number = ((price_in_chf_number*20).toFixed(0)/20).toFixed(2);
		price_in_chf = price_in_chf_number;
		console.log ('price_in_chf_number: '+ price_in_chf_number);

		// Convert CHF to EUR
		conversion_EUR_in_CHF = 1.09;
		conversion_GDP_CH = 59800.00;
		conversion_GDP_DE = 46200.00;
		conversion_factor = (conversion_EUR_in_CHF * conversion_GDP_CH / conversion_GDP_DE).toFixed(3);
		console.log ('conversion_factor:  '+ conversion_factor);
		price_in_eur = ((price_in_chf_number/conversion_factor*20).toFixed(0)/20).toFixed(2);
		console.log ('price_in_eur: '+ price_in_eur);

		// Tailor currency unit to user's location 
		if (user_country=="Germany") {
			currency_unit_Label[i].textContent = "EUR" ;
			current_price_Labels[i].innerText = price_in_eur;
			user_country="Germany";
			current=true;
		}
		else{
			currency_unit_Label[i].textContent = "CHF" ;
			current_price_Labels[i].innerText = price_in_chf;
			user_country="Switzerland";
			current=false;
		}

		// Add new prices to website
		sidebar_price_Label[i] = document.getElementsByClassName("mui-product-tile-price-container")[i];

		

		//sidebar_price_Label.append(current_price_Labels);
		sidebar_price_Label[i].append(currency_unit_Label[i]);
		
		// If there is a discount 
		if (current_instead_Labels[i]!=null) {

		 
			// Get current discount 
			current_oldprice_in_chf = current_instead_Labels[i].innerText
			current_oldprice_in_chf_number = current_oldprice_in_chf.replace('-','');
			current_oldprice_in_chf_number = parseFloat(current_oldprice_in_chf_number.replace('statt',''))
			console.log ('current_oldprice_in_chf_number:'+ current_oldprice_in_chf_number);
			current_oldprice_in_eur = ((current_oldprice_in_chf_number/conversion_factor*20).toFixed(0)/20).toFixed(2);
			
			// Only replace old price in EUR (as old price already is correct in CHF)
			if (user_country=="Germany") {
				current_instead_Labels[i].innerText = "statt " + current_oldprice_in_eur;
			}
			discount_percentage= (100*(current_oldprice_in_chf_number-price_in_chf_number) / current_oldprice_in_chf_number).toFixed(0);
			console.log ('Discount Percentage:'+ discount_percentage);

			discount_img[i] = document.getElementsByClassName("mui-product-tile-discount-image-container")[i];
			
	
			
			discountHolder[i]= document.createElement("DIV");
		    discountHolder[i].id = "discountHolder";
		    discountHolder[i].float="right";
		    discountHolder[i].style.display = "inline-block";
		    discountHolder[i].style.margin = "20px 14px 8px 14px";
			discountHolder[i].style.padding = "0px 0px 0px 0px";
			discountHolder[i].style.boxShadow = "5px 5px 5px darkgrey";
		    discountHolder[i].style.webkitTransform = "rotate(-5deg)";
		    discountHolder[i].style.mozTransform = "rotate(-5deg)";
		    discountHolder[i].style.msTransform = "rotate(-5deg)";
		    discountHolder[i].style.oTransform = "rotate(-5deg)";
		
		
		    discount_Label[i] = document.createElement("TEXT");
		    discount_Label[i].style.fontSize = "25px";
		    discount_Label[i].style.backgroundImage = "linear-gradient(130deg, #ffb696,#ff4d00, #ff4d00, #ffb696)";
		    discount_Label[i].style.color = "White";
		    discount_Label[i].style.fontFamily = "Helvetica Neue Condensed,Impact,arial,sans-serif";
		    discount_Label[i].style.fontWeight="bold"; 
		    discount_Label[i].style.margin = "0px";
		    discount_Label[i].style.padding = "4px 8px 4px 8px";
		    discount_Label[i].textContent = " "+ discount_percentage +"% ";
			discount_Label[i].float="right";
			

	
		    discount_img[i].childNodes[1].remove();
		    discount_img[i].childNodes[0].remove();
			
		    discount_img[i].append(discountHolder[i]);
		    discountHolder[i].append(discount_Label[i]);

		   

		}
		
		individual_current=current;
		currency_change.addEventListener('click', function(event){
			
			individual_current=!individual_current;
			//user_country = (user_country=="Germany")? "Switzerland": "Germany";
			//localStorage.setItem("CountryName", user_country );
			
			parent_Node=$(this).parent();
			current_Price_Node=parent_Node[0].getElementsByTagName("span")[0];
			old_Price_Node=parent_Node[0].getElementsByTagName("span")[1];
			unity_Node=parent_Node[0].getElementsByTagName("TEXT")[0];
				console.log(current_Price_Node.innerText, unity_Node.innerText);
			
			a_Tag=parent_Node.parent().parent().parent()[0];
				console.log(a_Tag);
			event.preventDefault();
			
			price_in_chf = current_Price_Node.innerText;
			price_in_chf_number = parseFloat(price_in_chf.replace('-'));
			price_in_eur = Math.round(price_in_chf_number/conversion_factor*20,2)/20;

			if (old_Price_Node!=null) {
				current_discount_in_chf = old_Price_Node.innerText;
				current_discount_in_chf_number = (current_discount_in_chf.replace('-',''));
				current_discount_in_chf_number = parseFloat(current_discount_in_chf_number.replace('statt',''))
				current_discount_in_eur = Math.round(current_discount_in_chf_number/conversion_factor*20,2)/20;
			}
			
			if (individual_current) {
				current_Price_Node.innerText = price_in_eur;
				if (old_Price_Node!=null) 
					old_Price_Node.innerText = "statt " + current_discount_in_eur;
				unity_Node.textContent="EUR";
			}
			else{
				current_Price_Node.innerText = Math.round(current_Price_Node.innerText*conversion_factor*20,2)/20;
				if (old_Price_Node!=null) 
					old_Price_Node.innerText = "statt " + Math.round(old_Price_Node.innerText.split(' ')[1]*conversion_factor*20)/20;
				unity_Node.textContent="CHF";
			}
		})
	}
}


if (urlLength==4){
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
	//function to return nutrisocre 

	if (group == "A"){
	function show(_nutri_score_final){
		nutriScore = _nutri_score_final;
		if(nutriScore==null){
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
	}
	else if (group == "B") {
		function show(_nutri_score_final){
			nutriScore = _nutri_score_final;
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
	}
	else if (group == "C") {
			console.log("NutriScore image Removed!");
		}
		}
		else {
			console.log("NutiScore Group Error");
	}
}

if (urlLength>4){
	var jsInitChecktimer = setInterval (checkForJS_Finish, 300);
}
function checkForJS_Finish () {
	main_page_score();
	var divHtml = document.createElement("DIV");
	document.body.appendChild(divHtml);
	divHtml.id = "main_overlay";
	divHtml.style.display='none';
	//console.log("currency1");
	clearInterval (jsInitChecktimer);
	// DO YOUR STUFF HERE.
	var current_hostname=window.location.hostname;
	var allHref=$("div.mui-lazy-load-product a[href^='http']");
	//console.log(allHref);
	
	allHref.each(myFunction);
	function myFunction(item, index) {
		console.log(item + ":" + index + "<br>");
		$.ajax({url: index, success: function(result){
			$("div#main_overlay").html(result);
			calc();
			//console.log(lastScore);
			
			function calc(){
				let identifierBox = document.getElementsByClassName("mui-panel-body additional-information-panel-body");
				if(identifierBox.length != 0) {
					var identifierTable = identifierBox[0];
					let identifierColumns = identifierTable.getElementsByTagName('td');

					function searchGTIN(nameKey, array1) {
						for(let i = 0; i < array1.length; i++) {
							if(array1[i].innerText === nameKey) {
								return(array1[i + 1].innerText);
							}
						}
					}
					let gtinTxt = searchGTIN("GTIN", identifierColumns);
					if(gtinTxt.length > 14) {
						var gtin2 = gtinTxt.split(", ");
						var gtin = parseInt(gtin2[0]);
					} else if(gtinTxt.length <= 14) {
						var gtin = parseInt(gtinTxt);
					}
					console.log("The GTIN of this product is: " + gtin);
					// Looking for categorization data.
					let categorizationTable = document.getElementsByClassName("mui-breadcrumb");
					for(let i = 0; i < categorizationTable.length; i++) {
						var categorizationTxt = categorizationTable[i].innerText;
					}
					categorization = categorizationTxt.toLowerCase();
					// Checking if it is food or a drink.
					var food;
					if(categorization.indexOf("getränke heiss & kalt") >= 0) {
						food = false;
					} else if(categorization.indexOf("getränke heiss & kalt") < 0) {
						food = true;
					}
					console.log("The object is food: " + food);
					// Checking if it is mineral water.
					var water;
					if(categorization.indexOf("mineralwasser") >= 0) {
						water = true;
					} else if(categorization.indexOf("mineralwasser") < 0) {
						water = false;
					}
					console.log("The object is mineral water: " + water);
					// Checking if it belongs to the yoghurt category.
					var joghurtCheck;
					if(categorization.indexOf("joghurt & joghurtdrinks") >= 0) {
						joghurtCheck = true;
					} else if(categorization.indexOf("joghurt & joghurtdrinks") < 0) {
						joghurtCheck = false;
					}
					var kaseCheck;
					if(categorization.indexOf("Käse ") >= 0) {
						kaseCheck = true;
					} else if(categorization.indexOf("Käse ") < 0) {
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
						if(json["products"] == null) {
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
								if(typeof callback == "function") {
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
					var queryname;

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
							for(let i = 0; i < nutrientColumns.length; i++) {
								if(nutrientColumns[i].innerText === "Energie") {
									var energyTxt = nutrientColumns[i + 1].innerText;
									break;
								} else {
									var energyTxt = "0";
								}
							}
							if(energyTxt.indexOf("<") !== -1) {
								energy = 0;
							} else {
								energy = parseFloat(energyTxt);
							}
							console.log("Energy (kJ): " + energy);
							for(let i = 0; i < nutrientColumns.length; i++) {
								if(nutrientColumns[i].innerText === "davon gesättigte Fettsäuren") {
									var acidsTxt = nutrientColumns[i + 1].innerText;
									break;
								} else {
									var acidsTxt = "0";
								}
							}
							if(acidsTxt.indexOf("<") !== -1) {
								acids = 0;
							} else {
								acids = parseFloat(acidsTxt);
							}
							console.log("Saturated fatty acids (g): " + acids);
							for(let i = 0; i < nutrientColumns.length; i++) {
								if(nutrientColumns[i].innerText === "davon Zucker") {
									var sugarTxt = nutrientColumns[i + 1].innerText;
									break;
								} else {
									var sugarTxt = "0";
								}
							}
							if(sugarTxt.indexOf("<") !== -1) {
								sugar = 0;
							} else {
								sugar = parseFloat(sugarTxt);
							}
							console.log("Sugar (g): " + sugar);
							for(let i = 0; i < nutrientColumns.length; i++) {
								if(nutrientColumns[i].innerText === "Ballaststoffe") {
									var fibersTxt = nutrientColumns[i + 1].innerText;
									break;
								} else {
									var fibersTxt = "0";
								}
							}
							if(fibersTxt.indexOf("<") !== -1) {
								fibers = 0;
							} else {
								fibers = parseFloat(fibersTxt);
							}
							console.log("Fibers (g): " + fibers);
							for(let i = 0; i < nutrientColumns.length; i++) {
								if(nutrientColumns[i].innerText === "Eiweiss") {
									var proteinTxt = nutrientColumns[i + 1].innerText;
									break;
								} else {
									var proteinTxt = "0";
								}
							}
							if(proteinTxt.indexOf("<") !== -1) {
								protein = 0;
							} else {
								protein = parseFloat(proteinTxt);
							}
							console.log("Protein (g): " + protein);
							for(let i = 0; i < nutrientColumns.length; i++) {
								if(nutrientColumns[i].innerText === "Salz") {
									var sodiumTxt = nutrientColumns[i + 1].innerText;
									break;
								} else {
									var sodiumTxt = "0";
								}
							}
							for(let i = 0; i < nutrientColumns.length; i++) {
								if(nutrientColumns[i].innerText === "Natrium") {
									var natriumTxt = nutrientColumns[i + 1].innerText;
									break;
								} else {
									var natriumTxt = "0";
								}
							}
							let sodiumMG;
							if(sodiumTxt.indexOf("<") !== -1) {
								sodiumMG = 0;
							} else {
								let sodiumInG = parseFloat(sodiumTxt).toFixed(3);
								sodiumMG = sodiumInG * 400;
							}
							let natriumMG;
							if(natriumTxt.indexOf("<") !== -1) {
								natriumMG = 0;
							} else {
								let natriumInG = parseFloat(natriumTxt).toFixed(3);
								natriumMG = natriumInG * 1000
							}
							// Choosing Sodium or Natrium data, depeding on availability.
							if(sodiumMG > natriumMG) {
								sodium = sodiumMG;
							} else if(sodiumMG = natriumMG) {
								sodium = sodiumMG;
							} else {
								sodium = natriumMG;
							}
							console.log("Sodium (mg): " + sodium);
							let fruitvegetables = 0;
							// Code for calculation of NutriScore based
							// on the recognized values on the website.
							let energyScore;
							if(food === true) {
								if(energy <= 335) {
									energyScore = 0;
								} else if(energy <= 670) {
									energyScore = 1;
								} else if(energy <= 1005) {
									energyScore = 2;
								} else if(energy <= 1340) {
									energyScore = 3;
								} else if(energy <= 1675) {
									energyScore = 4;
								} else if(energy <= 2010) {
									energyScore = 5;
								} else if(energy <= 2345) {
									energyScore = 6;
								} else if(energy <= 2680) {
									energyScore = 7;
								} else if(energy <= 3015) {
									energyScore = 8;
								} else if(energy <= 3350) {
									energyScore = 9;
								} else {
									energyScore = 10;
								};
							} else if(food === false) {
								if(energy <= 0) {
									energyScore = 0;
								} else if(energy <= 30) {
									energyScore = 1;
								} else if(energy <= 60) {
									energyScore = 2;
								} else if(energy <= 90) {
									energyScore = 3;
								} else if(energy <= 120) {
									energyScore = 4;
								} else if(energy <= 150) {
									energyScore = 5;
								} else if(energy <= 180) {
									energyScore = 6;
								} else if(energy <= 210) {
									energyScore = 7;
								} else if(energy <= 240) {
									energyScore = 8;
								} else if(energy <= 270) {
									energyScore = 9;
								} else {
									energyScore = 10;
								}
							}
							let acidsScore;
							if(food === true) {
								if(acids <= 1) {
									acidsScore = 0;
								} else if(acids <= 2) {
									acidsScore = 1;
								} else if(acids <= 3) {
									acidsScore = 2;
								} else if(acids <= 4) {
									acidsScore = 3;
								} else if(acids <= 5) {
									acidsScore = 4;
								} else if(acids <= 6) {
									acidsScore = 5;
								} else if(acids <= 7) {
									acidsScore = 6;
								} else if(acids <= 8) {
									acidsScore = 7;
								} else if(acids <= 9) {
									acidsScore = 8;
								} else if(acids <= 10) {
									acidsScore = 9;
								} else {
									acidsScore = 10;
								};
							} else if(food === false) {
								acidsScore = 0;
							}
							let sugarScore;
							if(food === true) {
								if(sugar <= 4.5) {
									sugarScore = 0;
								} else if(sugar <= 9) {
									sugarScore = 1;
								} else if(sugar <= 13.5) {
									sugarScore = 2;
								} else if(sugar <= 18) {
									sugarScore = 3;
								} else if(sugar <= 22.5) {
									sugarScore = 4;
								} else if(sugar <= 27) {
									sugarScore = 5;
								} else if(sugar <= 31) {
									sugarScore = 6;
								} else if(sugar <= 36) {
									sugarScore = 7;
								} else if(sugar <= 40) {
									sugarScore = 8;
								} else if(sugar <= 45) {
									sugarScore = 9;
								} else {
									sugarScore = 10;
								};
							} else if(food === false) {
								if(sugar <= 0) {
									sugarScore = 0;
								} else if(sugar <= 1.5) {
									sugarScore = 1;
								} else if(sugar <= 3) {
									sugarScore = 2;
								} else if(sugar <= 4.5) {
									sugarScore = 3;
								} else if(sugar <= 6) {
									sugarScore = 4;
								} else if(sugar <= 7.5) {
									sugarScore = 5;
								} else if(sugar <= 9) {
									sugarScore = 6;
								} else if(sugar <= 10.5) {
									sugarScore = 7;
								} else if(sugar <= 12) {
									sugarScore = 8;
								} else if(sugar <= 13.5) {
									sugarScore = 9;
								} else {
									sugarScore = 10;
								}
							}
							let sodiumScore;
							if(food === true) {
								if(sodium <= 90) {
									sodiumScore = 0;
								} else if(sodium <= 180) {
									sodiumScore = 1;
								} else if(sodium <= 270) {
									sodiumScore = 2;
								} else if(sodium <= 360) {
									sodiumScore = 3;
								} else if(sodium <= 450) {
									sodiumScore = 4;
								} else if(sodium <= 540) {
									sodiumScore = 5;
								} else if(sodium <= 630) {
									sodiumScore = 6;
								} else if(sodium <= 720) {
									sodiumScore = 7;
								} else if(sodium <= 810) {
									sodiumScore = 8;
								} else if(sodium <= 900) {
									sodiumScore = 9;
								} else {
									sodiumScore = 10;
								};
							} else if(food === false) {
								sodiumScore = 0;
							}
							let badIngredientScore = energyScore + sugarScore + acidsScore + sodiumScore;
							console.log("Bad ingredients score: " + badIngredientScore);
							let fruitvegetablesScore;
							if(food === true) {
								if(fruitvegetables <= 40) {
									fruitvegetablesScore = 0;
								} else if(fruitvegetables <= 60) {
									fruitvegetablesScore = 1;
								} else if(fruitvegetables <= 80) {
									fruitvegetablesScore = 2;
								} else {
									fruitvegetablesScore = 5;
								};
							}
							if(food === false) {
								if(fruitvegetables <= 40) {
									fruitvegetablesScore = 0;
								} else if(fruitvegetables <= 60) {
									fruitvegetablesScore = 2;
								} else if(fruitvegetables <= 80) {
									fruitvegetablesScore = 4;
								} else {
									fruitvegetablesScore = 10;
								}
							}
							let fibersScore;
							if(food === true) {
								if(fibers <= 0.9) {
									fibersScore = 0;
								} else if(fibers <= 1.9) {
									fibersScore = 1;
								} else if(fibers <= 2.8) {
									fibersScore = 2;
								} else if(fibers <= 3.7) {
									fibersScore = 3;
								} else if(fibers <= 4.7) {
									fibersScore = 4;
								} else {
									fibersScore = 5;
								};
							} else if(food === false) {
								fibersScore = 0;
							}
							let proteinScore;
							if(food === true) {
								if(protein <= 1.6) {
									proteinScore = 0;
								} else if(protein <= 3.2) {
									proteinScore = 1;
								} else if(protein <= 4.8) {
									proteinScore = 2;
								} else if(protein <= 6.4) {
									proteinScore = 3;
								} else if(protein <= 8.0) {
									proteinScore = 4;
								} else {
									proteinScore = 5;
								};
							} else if(food === false) {
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
							
							if(food === true) {
								if(nutriScoreNumber <= -1) {
									nutriScore = "A";
								} else if(nutriScoreNumber <= 2) {
									nutriScore = "B";
								} else if(nutriScoreNumber <= 10) {
									nutriScore = "C";
								} else if(nutriScoreNumber <= 18) {
									nutriScore = "D";
								} else if(nutriScoreNumber <= 40) {
									nutriScore = "E";
								}
							} else if(food === false) {
								if(water === true) {
									nutriScore = "A";
								} else if(water === false & nutriScoreNumber <= 1) {
									nutriScore = "B";
								} else if(water === false & nutriScoreNumber <= 5) {
									nutriScore = "C";
								} else if(water === false & nutriScoreNumber <= 9) {
									nutriScore = "D";
								} else if(water === false & nutriScoreNumber <= 30) {
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
					function show(_nutri_score_final) {
						nutriScore = _nutri_score_final;
						if(nutriScore == null) {
							console.log("Here you go")
							nutriScore = getScoreLocal();
						}
						console.log(nutriScore);
						console.log("THE NUTRI-SCORE OF THE PRODUCT IS: " + nutriScore);
						nsAURL = chrome.runtime.getURL("A.png");
						nsBURL = chrome.runtime.getURL("B.png");
						nsCURL = chrome.runtime.getURL("C.png");
						nsDURL = chrome.runtime.getURL("D.png");
						nsEURL = chrome.runtime.getURL("E.png");
						nsVURL = chrome.runtime.getURL("V.png");
						var div = document.createElement("DIV");
						//div.id = "imageHolder";
						//div.style.padding = "5px 10px 20px 0px";
						div.style.paddingLeft = "50px";
						div.style.marginBottom = "-20px";
						var position = document.getElementById("info");
						var img = document.createElement("IMG");
						if(nutriScore === "A") {
							img.src = nsAURL;
							queryname = "NutriscoreA"
						} else if(nutriScore === "B") {
							img.src = nsBURL;
							queryname = "NutriscoreB"
						} else if(nutriScore === "C") {
							img.src = nsCURL;
							queryname = "NutriscoreC"
						} else if(nutriScore === "D") {
							img.src = nsDURL;
							queryname = "NutriscoreD"
						} else if(nutriScore === "E") {
							img.src = nsEURL;
							queryname = "NutriscoreE"
						} else {
							img.src = nsVURL;
							queryname = "NutriscoreV"
						}
						img.style.height = '40px';
						img.style.width = '100px';
						img.style.zIndex = '10';
						img.style.display = 'block'
						img.setAttribute("href", "https://world.openfoodfacts.org/nutriscore");
						console.log("Nutri-Score image added!");
						div.appendChild(img);
						//$("div.mui-js-rating-loaded:eq("+item+")").css({'display':'block'});
						$("div.mui-js-rating-loaded:eq("+item+")").html(div);
					}
				}

			} 

		}});
	}
}
}
