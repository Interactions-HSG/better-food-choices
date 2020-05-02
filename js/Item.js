
// Item type enum
const ItemType = Object.freeze({ "None": 0, "Food": 1, "Drink": 2 });

// Column text constants
const ENERGY_COLUMN_TEXT = "Energie";
const ACIDS_COLUMN_TEXT = "davon gesättigte Fettsäuren";
const SUGAR_COLUMN_TEXT = "davon Zucker";
const FIBER_COLUMN_TEXT = "Ballaststoffe";
const PROTEIN_COLUMN_TEXT = "Eiweiss";
const SALT_COLUMN_TEXT = "Salz";
const NATRIUM_COLUMN_TEXT = "Natrium";
const SODIUM_COLUMN_TEXT = "Sodium";

// Item constructor
function Item(url) {
	// Setting  up item properties
    this.productId = '';
    this.gtin = '';
    this.gtinList = [];
    this.nutriscore = null;
    this.acids = 0;
    this.energy = 0;
    this.sugar = 0;
    this.fibers = 0;
    this.protein = 0;
    this.sodium = 0;
    this.discount = 0.0;
    this.originalPrice = 0.0;
    this.isWater = false;
    this.isCheese = false;
    this.isYoghurt = false;
    this.itemType = ItemType.None;

	this.url = url;

	// Get adjustment factor based on current NutriScore
	this.getPriceAdjustmentFactor = function() {
		let adjustmentFactor = 0;

        switch(this.nutriscore) {
            case 'A':
                adjustmentFactor =  0.75;
                break;
            case 'B':
                adjustmentFactor = 0.9;
                break;
            case 'C':
                adjustmentFactor = 1;
                break;
            case 'D':
                adjustmentFactor = 1.1;
                break;
            case 'E':
                adjustmentFactor = 1.25;
                break;
            default:
                adjustmentFactor = 1;
                break;
		}
		
		return adjustmentFactor;
	};

	this.getDiscountedPrice = function() {
		// Calculate the discount and take it away from the original price
        return this.originalPrice - (this.originalPrice * (this.discount / 100));//.toFixed(2);
    };

	// Calculate the nutriscore adjusted price based on the current adjustment factor
	this.getAdjustedOriginalPrice = function() {
		let newPrice = this.originalPrice * this.getPriceAdjustmentFactor();
		
		newPrice = (Math.ceil(newPrice * 20 - 0.5) / 20).toFixed(2)

        return newPrice;
    };

	// Calculate the nutriscore adjusted discounted price based on the current adjustment factor
	this.getAdjustedDiscountPrice = function() {
		let newPrice = this.getDiscountedPrice() * this.getPriceAdjustmentFactor();
		
		newPrice = (Math.ceil(newPrice * 20 - 0.5) / 20).toFixed(2)

        return newPrice;
    };

	// Loads the data from  API using the GTINs parsed from the product page
    this.loadDataFromApi = function(callback) {
        // Get the NutriScore data from the API
        Nutriscore.fetchApiData(this, function(item, json) {
            // If no data was returned
            if (json["products"] == null && item.lastGtinSelected()) {
                callback(false);
                return;
            }
            // If the request was unsuccessful
            if(json["success"] === false && item.lastGtinSelected()) {
                callback(false);
                return;
            }
			
			// If there was product data returned
            if(json["products"] != null) {
                item.nutriscore = json["products"][0].nutri_score_final;
            }

            // If a NutriScore was returned for that GTIN
            if(item.nutriscore != null) {
                callback(true);
                return;
            }

            // If there are no more GTINs in the list
            if(item.nextGtin() == false) {
                callback(false);
                return;
            }

            // Attempt load with next GTIN
            item.loadDataFromApi(callback);
        });
    };

	// Loads product data from the page that is passed in to the method
    this.loadDataFromProductPage = function(pageBody) { 
		console.log("Loading data from product page");

        // Looking for unique identifier (GTIN).     
        let identifierBox = pageBody.getElementsByClassName("mui-panel-body additional-information-panel-body");
        if (identifierBox.length != 0) {        
            var identifierTable = identifierBox[0];
            let identifierColumns = identifierTable.getElementsByTagName('td');
            let gtinTxt = this.searchGtin("GTIN", identifierColumns);

            if (gtinTxt.length > 14) {
                this.gtinList = gtinTxt.split(", ");
                this.gtin = parseInt(this.gtinList[0]);
            } 
            else if (gtinTxt.length <= 14) {
                this.gtin = parseInt(gtinTxt);
            }
		}
		
        // Looking for categorization data.
        let categorizationTxt;
		let categorizationTable = pageBody.getElementsByClassName("mui-breadcrumb");

		if(categorizationTable === undefined || categorizationTable === null) {
			return;
		}

		for (let i = 0; i < categorizationTable.length; i++) {
			categorizationTxt = categorizationTable[i].innerText;
		}

		if(categorizationTxt === undefined || categorizationTxt === null) {
			return;
		}

		categorization = categorizationTxt.toLowerCase();
		
        // Set food type
        if (categorization.indexOf("getränke heiss & kalt") >= 0) {
            this.itemType = ItemType.Drink;
		} 
		else if (categorization.indexOf("lebensmittel") >= 0) {
            this.itemType = ItemType.Food;
		}
		else {
			this.itemType = ItemType.None;
			return;
		}

        // Checking if it is mineral water
        if (categorization.indexOf("mineralwasser") >= 0) {
            this.isWater = true;
		} 
		else if (categorization.indexOf("mineralwasser") < 0) {
            this.isWater = false;
        }

        // Checking if it belongs to the yoghurt category.
        if (categorization.indexOf("joghurt & joghurtdrinks") >= 0) {
            this.isYoghurt = true;
        } 
        else if (categorization.indexOf("joghurt & joghurtdrinks") < 0) {
            this.isYoghurt = false;
        }
        
        if (categorization.indexOf("Käse ") >= 0) {
            this.isCheese = true;
        } 
        else if (categorization.indexOf("Käse ") < 0) {
            this.isCheese = false;
		}
		
		// Find the product price elements
		let currentPriceSpan = pageBody.querySelector('span[class="current-price"]');
		let originalPriceSpan = pageBody.querySelector('span[class="usual-price"]');
		
		// No discount
		if((originalPriceSpan === undefined || originalPriceSpan === null) &&
		   (currentPriceSpan !== undefined && currentPriceSpan !== null)) {
			this.originalPrice = Number(currentPriceSpan.innerText.trim().replace('–', ''));
		}
		else if((originalPriceSpan !== undefined && originalPriceSpan !== null) &&
				(currentPriceSpan !== undefined && currentPriceSpan !== null))  {
			// Parse discounted amount
			this.originalPrice = Number(originalPriceSpan.innerText.trim().replace('statt ', '').replace('–', ''));
			let discountedPrice = Number(currentPriceSpan.innerText.trim().replace('–', ''));

			// Calculate discount percentage
			this.discount = ((this.originalPrice - discountedPrice) / this.originalPrice) * 100;
		}
		else {
			// Could not parse price
			console.log("Could not parse price");
		}

		let ratingSection = pageBody.querySelector('div.mui-js-rating');
	
		if(ratingSection !== undefined && ratingSection !== null) {
			// Get product ID
			this.productId = Number(ratingSection.getAttribute('data-id'));
		}
    };

	// Looking for nutrient data from the table element passed in to the method
    this.parseNutrientTable = function(table) {
		if(table === null) {
			return;
		}

		let nutrientColumns = table.getElementsByTagName("td");
		
		// Nutrient table columns
		let energyCol = -1;
		let acidsCol = -1;
		let sugarCol = -1;
		let fiberCol = -1;
		let proteinCol = -1;
		let sodiumCol = -1;
		let natriumCol = -1;
		
		let energyTxt = "0";
		let acidsTxt = '0';
		let sugarTxt = '0';
		let fibersTxt = '0';
		let proteinTxt = '0';
		let sodiumTxt = '0';
		let natriumTxt = '0';
		
		let sodiumMG;
		let natriumMG;
		let sodiumInG = 0;
		let natriumInG = 0;
		
		// Iterate over the table columns 
		for (let i = 0; i < nutrientColumns.length; i++) {
			// Set the column indices based on column text
			switch(nutrientColumns[i].innerText.trim()) {
				case ENERGY_COLUMN_TEXT:
					energyCol = i;
					break;
				case ACIDS_COLUMN_TEXT:
					acidsCol = i;
					break;
				case SUGAR_COLUMN_TEXT:
					sugarCol = i;
					break;
				case FIBER_COLUMN_TEXT:
					fiberCol = i;
					break;
				case PROTEIN_COLUMN_TEXT:
					proteinCol = i;
					break;
				case SALT_COLUMN_TEXT:
					sodiumCol = i;
					break;
				case NATRIUM_COLUMN_TEXT:
					natriumCol = i;
					break;
				case SODIUM_COLUMN_TEXT:
					sodiumCol = i;
					break;
			}
			
			// If the column index matches one of table column indices
			switch(i) {
				case energyCol:
					energyTxt = nutrientColumns[i + 1].innerText;
					energyTxt = energyTxt.trim();
					energyTxt = energyTxt.substring(0, energyTxt.indexOf('kJ') - 1);
					
					if(energyTxt.includes('< 0.5')) {
						energyTxt = 0;
					}
					
					this.energy = parseFloat(energyTxt);
					break;
				case acidsCol:
					acidsTxt = nutrientColumns[i + 1].innerText;
					acidsTxt = acidsTxt.trim();
					acidsTxt = acidsTxt.substring(0, acidsTxt.indexOf(' g'));
					
					if(acidsTxt.includes('< 0.5')) {
						acidsTxt = 0;
					}
					
					this.acids = parseFloat(acidsTxt);
					break;
				case sugarCol:
					sugarTxt = nutrientColumns[i+1].innerText;
					sugarTxt = sugarTxt.trim();
					sugarTxt = sugarTxt.substring(0, sugarTxt.indexOf(' g'));
					
					if(sugarTxt.includes('< 0.5')) {
						sugarTxt = 0;
					}
					
					this.sugar = parseFloat(sugarTxt);
					break;
				case fiberCol:
					fibersTxt = nutrientColumns[i+1].innerText;
					fibersTxt = fibersTxt.trim();
					fibersTxt = fibersTxt.substring(0, fibersTxt.indexOf(' g'));
					
					if(fibersTxt.includes('< 0.5')) {
						fibersTxt = 0;
					}
					
					this.fibers = parseFloat(fibersTxt);
					break;
				case proteinCol:
					proteinTxt = nutrientColumns[i+1].innerText;
					proteinTxt = proteinTxt.trim();
					proteinTxt = proteinTxt.substring(0, proteinTxt.indexOf(' g'));
					
					if(proteinTxt.includes('< 0.5')) {
						proteinTxt = 0;
					}
					
					this.protein = parseFloat(proteinTxt);
					break;
				case sodiumCol:
					sodiumTxt = nutrientColumns[i+1].innerText;
					sodiumTxt = sodiumTxt.trim();
					sodiumTxt = sodiumTxt.substring(0, sodiumTxt.indexOf(' g'));
					
					if(sodiumTxt.includes('< 0.5')) {
						sodiumTxt = 0;
					}
					
					sodiumInG = parseFloat(sodiumTxt).toFixed(3);
					sodiumMG = sodiumInG * 400;
					break;
				case natriumCol:
					natriumTxt = nutrientColumns[i+1].innerText;
					natriumTxt = natriumTxt.trim();
					natriumTxt = natriumTxt.substring(0, natriumTxt.indexOf(' g'));
					
					if(natriumTxt.includes('< 0.5')) {
						natriumTxt = 0;
					}
					
					natriumInG = parseFloat(natriumTxt).toFixed(3);
					natriumMG = natriumInG * 1000;
					break;
			}
        }
        
		// Choosing Sodium or Natrium data, depeding on availability.
		if (sodiumMG > natriumMG || sodiumMG == natriumMG) {
			this.sodium = sodiumMG;
		} 
		else {
			this.sodium = natriumMG;
		}
    };

	// Calculates the NutriScore based on the nutrient table data
    this.calculateNutriscore = function() {
        let energyScore;
		let acidsScore;
		let sugarScore;
		let sodiumScore;
		let fibersScore;
		let proteinScore;

        let goodIngredientScore;
        let badIngredientScore;
		let fruitvegetablesScore;
        let nutriScoreNumber;
        
        switch(this.itemType) {
            case ItemType.Food:
                energyScore = Nutriscore.getFoodEnergyScore(this.energy);
                acidsScore = Nutriscore.getFoodAcidScore(this.acids);
                sugarScore = Nutriscore.getFoodSugarScore(this.sugar);
                sodiumScore = Nutriscore.getFoodSodiumScore(this.sodium);
                fibersScore = Nutriscore.getFoodFiberScore(this.fibers);
                proteinScore = Nutriscore.getFoodProteinScore(this.protein);
                break;
            case ItemType.Drink:
                energyScore = Nutriscore.getDrinkEnergyScore(this.energy);
                acidsScore = Nutriscore.getDrinkAcidScore(this.acids);
                sugarScore = Nutriscore.getDrinkSugarScore(this.sugar);
                sodiumScore = Nutriscore.getDrinkSodiumScore(this.sodium);
                fibersScore = Nutriscore.getDrinkFiberScore(this.fibers);
                proteinScore = Nutriscore.getDrinkProteinScore(this.protein);
                break;
            default:
                break;
        }

		// Calculate N score
		badIngredientScore = energyScore + sugarScore + acidsScore + sodiumScore;

        let fruitvegetables;

		if (this.itemType === ItemType.Food) {
			if (fruitvegetables <= 40) {
				fruitvegetablesScore = 0;
			} 
			else if (fruitvegetables <= 60) {
				fruitvegetablesScore = 1;
			} 
			else if (fruitvegetables <= 80) {
				fruitvegetablesScore = 2;
			} 
			else {
				fruitvegetablesScore = 5;
			}
		} 
		if (this.itemType !== ItemType.Food) {
			fruitvegetablesScore = 0;
		}

		// Calculate P score
		goodIngredientScore = fruitvegetablesScore + fibersScore + proteinScore;
		
		// Calculate Nutriscore 
		if (badIngredientScore <= 11) {
			nutriScoreNumber = badIngredientScore - goodIngredientScore;
		}
		else {
			if (fruitvegetablesScore >= 5) {
				nutriScoreNumber = badIngredientScore - goodIngredientScore;
			}
			else { 
				if (this.isCheese === true){
					nutriScoreNumber = badIngredientScore - goodIngredientScore - fruitvegetablesScore - fibersScore;
				}
				else{
					nutriScoreNumber = badIngredientScore - fruitvegetablesScore - fibersScore;
				}
			}
		}		
		
		// Acquire NutriScore
		if (this.itemType === ItemType.Food) {
			if (nutriScoreNumber <= -1) {
				this.nutriscore = "A";
			} 
			else if (nutriScoreNumber <= 2) {
				this.nutriscore = "B";
			} 
			else if (nutriScoreNumber <= 10) {
				this.nutriscore = "C";
			} 
			else if (nutriScoreNumber <= 18) {
				this.nutriscore = "D";
			} 
			else if (nutriScoreNumber <= 40) {
				this.nutriscore = "E";
			}
		} 
		else if (this.itemType !== ItemType.Food) {
			if (this.isWater === true) {
				this.nutriscore = "A";
			} 
			else if (this.isWater === false & nutriScoreNumber <= 1) {
				this.nutriscore = "B";
			} 
			else if (this.isWater === false & nutriScoreNumber <= 5) {
				this.nutriscore = "C";
			} 
			else if (this.isWater === false & nutriScoreNumber <= 9) {
				this.nutriscore = "D";
			} 
			else if (this.isWater === false & nutriScoreNumber <= 30) {
				this.nutriscore = "E";
			}
		}       
    };

	// Set GTIN to the next in the list if available
    this.nextGtin = function() {
        // Get the index of the current GTIN
        let currentIndex = this.gtinList.indexOf(this.gtin.toString());

        // If we are not on the last GTIN
        if(this.lastGtinSelected() == false) {
        //if(currentIndex < this.gtinList.length - 1) {
            this.gtin = this.gtinList[currentIndex + 1];
            return true;
        }
        else {
            return false;
        }
    };

	// Returns true if there are no more GTINs in the list
    this.lastGtinSelected = function() {
        // Get the index of the current GTIN
        let currentIndex = this.gtinList.indexOf(this.gtin.toString());

        return !(currentIndex < this.gtinList.length - 1);
	};
	
	// Returns the Nutriscore URL for the current NutriScore
	this.getNutriscoreImageUrl = function() {
		let imageUrl = '';

		switch(this.nutriscore) {
			case 'A':
				imageUrl = Nutriscore.A_URL;
				break;
			case 'B':
				imageUrl = Nutriscore.B_URL;
				break;
			case 'C':
				imageUrl = Nutriscore.C_URL;
				break;
			case 'D':
				imageUrl = Nutriscore.D_URL;
				break;
			case 'E':
				imageUrl = Nutriscore.E_URL;
				break;
			case 'V':
			case null:
				imageUrl = Nutriscore.V_URL;
				break;
		}

		return imageUrl;
	};
	
	this.searchGtin = function (nameKey, array1) {
		for (let i = 0; i < array1.length; i++) {
			if (array1[i].innerText === nameKey) {
				return (array1[i+1].innerText);
			}
		}
	};

}