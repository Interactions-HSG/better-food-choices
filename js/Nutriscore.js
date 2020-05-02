// API detail constants
const API_USERNAME = 'eatfit_student_dominic';
const API_PASSWORD = 'yJFbbHtCPTFyy8GB';
const API_URL_TEMPLATE = "https://eatfit-service.foodcoa.ch/products/{GTIN}/?resultType=array";

var Nutriscore = {
    // Load image URLs
    A_URL: chrome.runtime.getURL("images/nsA.png"),
    B_URL: chrome.runtime.getURL("images/nsB.png"),
    C_URL: chrome.runtime.getURL("images/nsC.png"),
    D_URL: chrome.runtime.getURL("images/nsD.png"),
    E_URL: chrome.runtime.getURL("images/nsE.png"),
    V_URL: chrome.runtime.getURL("images/nsV.png"),
    
    // Item cache
    itemCache: null,
    // Loads item cache from localStorage
    loadItemCache: function() {
        // If the item DB has not been created yet
        if(localStorage["nutriscore-item-cache"] == undefined || localStorage["nutriscore-item-cache"] == "") {
            localStorage["nutriscore-item-cache"] = "{}";
        }
        
        if(this.itemCache === null) {
            this.itemCache = JSON.parse(localStorage.getItem("nutriscore-item-cache"));	
        }
    },
    // Gets item from cache by product ID
    getItemFromCache: function(productId) {
        // Search for item
        for (gtin in this.itemCache) {
            if(this.itemCache[gtin].productId == productId) {
                // Create new item
                let item = new Item('');
                // Assign the JSON object data to the new item object
                Object.assign(item, this.itemCache[gtin]);
                // Return the item
                return item;
            }
        }
    },
    // Adds item to the cache
    addItemToCache: function(item) {
        // Add item to the dictionary by GTIN
        this.itemCache[item.gtin] = item;
        // Save to localStorage
        this.saveCache();
    },
    // Stores cache in localStorage
    saveCache: function() {
        localStorage["nutriscore-item-cache"] = JSON.stringify(this.itemCache);
    },
    // Food methods
    getFoodEnergyScore: function(energy) {
        let energyScore;

        if (energy <= 335) {
            energyScore = 0;
        } 
        else if (energy <= 670) {
            energyScore = 1;
        } 
        else if (energy <= 1005) {
            energyScore = 2;
        } 
        else if (energy <= 1340) {
            energyScore = 3;
        } 
        else if (energy <= 1675) {
            energyScore = 4;
        } 
        else if (energy <= 2010) {
            energyScore = 5;
        } 
        else if (energy <= 2345) {
            energyScore = 6;
        } 
        else if (energy <= 2680) {
            energyScore = 7;
        } 
        else if (energy <= 3015) {
            energyScore = 8;
        } 
        else if (energy <= 3350) {
            energyScore = 9;
        } 
        else {
            energyScore = 10;
        }

        return energyScore;
    },
    getFoodAcidScore: function(acids) {
        let acidsScore;

        if (acids <= 1) {
            acidsScore = 0;
        } 
        else if (acids <= 2) {
            acidsScore = 1;
        } 
        else if (acids <= 3) {
            acidsScore = 2;
        } 
        else if (acids <= 4) {
            acidsScore = 3;
        } 
        else if (acids <= 5) {
            acidsScore = 4;
        } 
        else if (acids <= 6) {
            acidsScore = 5;
        } 
        else if (acids <= 7) {
            acidsScore = 6;
        } 
        else if (acids <= 8) {
            acidsScore = 7;
        } 
        else if (acids <= 9) {
            acidsScore = 8;
        } 
        else if (acids <= 10) {
            acidsScore = 9;
        } 
        else {
            acidsScore = 10;
        }

        return acidsScore;
    },
    getFoodSugarScore: function(sugar) {
        let sugarScore;

        if (sugar <= 4.5) {
            sugarScore = 0;
        }        
        else if (sugar <= 9) {
            sugarScore = 1;
        } 
        else if (sugar <= 13.5) {
            sugarScore = 2;
        } 
        else if (sugar <= 18) {
            sugarScore = 3;
        } 
        else if (sugar <= 22.5) {
            sugarScore = 4;
        } 
        else if (sugar <= 27) {
            sugarScore = 5;
        } 
        else if (sugar <= 31) {
            sugarScore = 6;
        } 
        else if (sugar <= 36) {
            sugarScore = 7;
        } 
        else if (sugar <= 40) {
            sugarScore = 8;
        } 
        else if (sugar <= 45) {
            sugarScore = 9;
        } 
        else {
            sugarScore = 10;
        }

        return sugarScore;
    },
    getFoodSodiumScore: function(sodium) {
        let sodiumScore;

        if (sodium <= 90) {
            sodiumScore = 0;
        } 
        else if (sodium <= 180) {
            sodiumScore = 1;
        } 
        else if (sodium <= 270) {
            sodiumScore = 2;
        } 
        else if (sodium <= 360) {
            sodiumScore = 3;
        } 
        else if (sodium <= 450) {
            sodiumScore = 4;
        } 
        else if (sodium <= 540) {
            sodiumScore = 5;
        } 
        else if (sodium <= 630) {
            sodiumScore = 6;
        } 
        else if (sodium <= 720) {
            sodiumScore = 7;
        } 
        else if (sodium <= 810) {
            sodiumScore = 8;
        } 
        else if (sodium <= 900) {
            sodiumScore = 9;
        } 
        else {
            sodiumScore = 10;
        }

        return sodiumScore;
    },
    getFoodFiberScore: function(fibers) {
        let fibersScore;

        if (fibers <= 0.9) {
            fibersScore = 0;
        } 
        else if (fibers <= 1.9) {
            fibersScore = 1;
        } 
        else if (fibers <= 2.8) {
            fibersScore = 2;
        } 
        else if (fibers <= 3.7) {
            fibersScore = 3;
        } 
        else if (fibers <= 4.7) {
            fibersScore = 4;
        } 
        else {
            fibersScore = 5;
        }

        return fibersScore;
    },
    getFoodProteinScore: function(protein) {
        let proteinScore;

        if (protein <= 1.6) {
            proteinScore = 0;
        } 
        else if (protein <= 3.2) {
            proteinScore = 1;
        } 
        else if (protein <= 4.8) {
            proteinScore = 2;
        } 
        else if (protein <= 6.4) {
            proteinScore = 3;
        } 
        else if (protein <= 8.0) {
            proteinScore = 4;
        } 
        else {
            proteinScore = 5;
        }

        return proteinScore;
    },

    // Drink methods
    getDrinkEnergyScore: function(energy) {
        let energyScore;

        if (energy <= 0) {
            energyScore = 0;
        } 
        else if (energy <= 30) {
            energyScore = 1;
        } 
        else if (energy <= 60) {
            energyScore = 2;
        } 
        else if (energy <= 90) {
            energyScore = 3;
        } 
        else if (energy <= 120) {
            energyScore = 4;
        } 
        else if (energy <= 150) {
            energyScore = 5;
        } 
        else if (energy <= 180) {
            energyScore = 6;
        } 
        else if (energy <= 210) {
            energyScore = 7;
        } 
        else if (energy <= 240) {
            energyScore = 8;
        } 
        else if (energy <= 270) {
            energyScore = 9;
        } 
        else {
            energyScore = 10;
        }

        return energyScore;
    },
    getDrinkAcidScore: function(acids) {
        let acidsScore = 0;

        return acidsScore;
    },
    getDrinkSugarScore: function(sugar) {
        let sugarScore;

        if (sugar <= 0) {
            sugarScore = 0;
        } 
        else if (sugar <= 1.5) {
            sugarScore = 1;
        } 
        else if (sugar <= 3) {
            sugarScore = 2;
        } 
        else if (sugar <= 4.5) {
            sugarScore = 3;
        } 
        else if (sugar <= 6) {
            sugarScore = 4;
        } 
        else if (sugar <= 7.5) {
            sugarScore = 5;
        } 
        else if (sugar <= 9) {
            sugarScore = 6;
        } 
        else if (sugar <= 10.5) {
            sugarScore = 7;
        } 
        else if (sugar <= 12) {
            sugarScore = 8;
        } 
        else if (sugar <= 13.5) {
            sugarScore = 9;
        } 
        else {
            sugarScore = 10;
        }

        return sugarScore;
    },
    getDrinkSodiumScore: function(sodium) {
        let sodiumScore = 0;
        
        return sodiumScore;
    },
    getDrinkFiberScore: function(fibers) {
        let fibersScore = 0;

        return fibersScore;
    },
    getDrinkProteinScore: function(protein) {
        let proteinScore = 0;

        return proteinScore;
    },

    // Attempts to get product data via the API using the items current GTIN
    fetchApiData: function(item, callback) {
        $.ajax({
            url: Nutriscore.getApiUrl(item.gtin),
            type: "GET",
            dataType: "json",
            cache: false,
            async: true,
            beforeSend: function(xhr) {
                // Set auth header
                xhr.setRequestHeader("Authorization", "Basic " + btoa(API_USERNAME + ":" + API_PASSWORD));
            },
            success: function(json) {
                callback(item, json)
            },
            error: function(textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            },
        });
    },
    // Creates API URL with the given GTIN
    getApiUrl: function(gtin) {
        return API_URL_TEMPLATE.replace("{GTIN}", gtin);
    },
    updateBasket: function() {
        let basketTotal = 0;
        // Find the basket items
        let basketItems = $('.mui-js-shoppinglist-link-item-page');
        
        // Iterate over basket items
        basketItems.each(function(index, item) {
            // Find the current item in the item DB
            let currentItemData = $(item).data('trackinginformation');
            let currentItem = Nutriscore.getItemFromCache(currentItemData.id);
            
            // Return if the item was not found
            // This should not happen as by virtue of having added the item 
            // to the basket the item data should have been loaded
            if(currentItem == undefined) {
                return;
            }
            
            // Find the quantity
            let quantity = $(item).parent().parent().find('.mui-js-shoppinglist-input-quantity').val();
            
            let newPriceSection = '';
            
            let currentBasketPrice = 0;
            let originalBasketPrice = 0;
                
            // Calculate price
            currentBasketPrice = Number((currentItem.getAdjustedDiscountPrice() * quantity).toFixed(2));
            originalBasketPrice = Number((currentItem.getAdjustedOriginalPrice() * quantity).toFixed(2));
            
            newPriceSection = currentBasketPrice.toFixed(2);
            
            // Check for item discount value
            if(currentItem.discount > 0) {
                newPriceSection = newPriceSection 
                                + ' <span>statt</span> ' 
                                + originalBasketPrice.toFixed(2);
            }
                                
            // Increment basket total
            basketTotal += currentBasketPrice;
            
            // Update nutriscore image
            if($(item).find('.nutriscore-container').length == 0) {
                let nutriscoreImage = document.createElement('img');
                nutriscoreImage.src = currentItem.getNutriscoreImageUrl();
                nutriscoreImage.style = 'height: 40px; width: 80px; z-index: 10; display: block;';
                
                let nutriscoreDiv = document.createElement('div');
                nutriscoreDiv.className = 'nutriscore-container';
                nutriscoreDiv.append(nutriscoreImage);
                
                $(item).find('.mui-shoppinglist-companion-product-tile-info-container').append(nutriscoreDiv);
            }
            
            // Update price section
            $(item).find('.mui-shoppinglist-companion-product-tile-price').html(newPriceSection);
            
            // Display discount image if required
            if (currentItem.discount > 0) {
                // let discountContainer = document.createElement("DIV");
                // discountContainer.id = "discountHolder";
                // discountContainer.float = "right";
                // discountContainer.style.display = "inline-block";
                // discountContainer.style.padding = "0px 0px 0px 0px";
                // discountContainer.style.boxShadow = "5px 5px 5px darkgrey";
                // discountContainer.style.webkitTransform = "rotate(-5deg)";
                // discountContainer.style.mozTransform = "rotate(-5deg)";
                // discountContainer.style.msTransform = "rotate(-5deg)";
                // discountContainer.style.oTransform = "rotate(-5deg)";			
            
                // let discountLabel = document.createElement("TEXT");
                // discountLabel.style.fontSize = "16px";
                // discountLabel.style.backgroundImage = "linear-gradient(130deg, #ffb696,#ff4d00, #ff4d00, #ffb696)";
                // discountLabel.style.color = "White";
                // discountLabel.style.fontFamily = "Helvetica Neue Condensed,Impact,arial,sans-serif";
                // discountLabel.style.fontWeight="bold"; 
                // discountLabel.style.margin = "0px";
                // discountLabel.style.padding = "2px";
                // discountLabel.textContent = " "+ Math.round(currentItem.discount) +"% ";
                // discountLabel.float = "right";
                
                // discountContainer.append(discountLabel);
                
                // $(item).find('.mui-shoppinglist-companion-product-tile-badge').html(discountContainer.outerHTML);
            }
            else {
                $(item).find('.mui-shoppinglist-companion-product-tile-badge').remove();
            }
        });
        
        // Update basket total text
        let basketTotalText = '';        
        basketTotalText = 'CHF ' + Number(basketTotal).toFixed(2);

        $('.mui-shoppinglist-companion-total-price').text(basketTotalText);
    },    
    // Updates the prices for the given item in the overview list
    updateListItemPrices: function(item) {
        // Find all rating container element
        let rating = document.querySelectorAll('.mui-product-tile-rating');

        if(rating.length > 0) {
            rating.forEach(function(el, index) {
                el.remove();
            });
        }

        // Find item section
        let productItemSelector = "div.mui-lazy-load-product a[href='" + item.url + "']";
        // Find item price span
        let productPriceSpan = document.querySelector(productItemSelector + " span.mui-product-tile-price");

        if(productPriceSpan === null) {
            return;
        }

        // If there is a discount on the item
        if(item.discount > 0) {
            // Find original price span
            let originalPriceSpan = document.querySelector(productItemSelector + " span.mui-product-tile-original-price");

            // Update prices
            productPriceSpan.innerText = item.getAdjustedDiscountPrice();
            originalPriceSpan.innerText = "statt " + item.getAdjustedOriginalPrice();
        }
        else {
            // Update prices
            productPriceSpan.innerText = item.getAdjustedOriginalPrice();
        }
    },
    // Updates the prices for the given item in the items main page
    updateSingleItemPrices: function(item) {
        // Find price span
        let productPriceSpan = document.querySelector("span.current-price");

        if(productPriceSpan === null) {
            return;
        }

        // If there is a discount on the item
        if(item.discount > 0) {
            // Find original price span
            let originalPriceSpan = document.querySelector("span.usual-price");

            // Update prices
            productPriceSpan.innerText = item.getAdjustedDiscountPrice();
            originalPriceSpan.innerText = "statt " + item.getAdjustedOriginalPrice();
        }
        else {
            // Update prices
            productPriceSpan.innerText = item.getAdjustedOriginalPrice();
        }
    },
    // Adds the nutriscore image for the given item to the overview list 
    addNutriscoreImageToList: function (item) {
        switch(group) {
            case 'A':
            case 'B':
            case 'C':
                // Create image container
                let div = document.createElement("DIV");
                div.style.paddingLeft = "50px";
                div.style.marginBottom = "-20px";

                // Create image element
                let img = document.createElement("IMG");
                img.src = item.getNutriscoreImageUrl();
                img.setAttribute("href", "https://world.openfoodfacts.org/nutriscore");
                
                img.id= "NutriscoreImage"
                img.style.height = '40px';
                img.style.width = '80px';
                img.style.zIndex = '10';
                img.style.display = 'block';
                img.style.marginBottom = '16px';

                div.appendChild(img);
                
                // Set nutriscore image
                let productItemSelector = "div.mui-lazy-load-product a[href='" + item.url + "']";
                let productTitle = document.querySelector(productItemSelector + " div.mui-product-tile-body");
                let productName = document.querySelector(productItemSelector + " div.mui-product-tile-name");

                productTitle.insertBefore(div, productName);
                break;
        }
    },
    // Adds the nutriscore image for the given item to the items main page 
    addNutriscoreImageToSingle: function(item) {
        switch(group) {
            case 'A':
            case 'B':
                // Create image container
                let div = document.createElement("DIV");
                div.id = "imageHolder";
                div.style.margin = "auto";
    
                // Find item info container
                let position = document.getElementById("info");
    
                // Create image element
                let img = document.createElement("IMG");
                img.src = item.getNutriscoreImageUrl();
                
                img.style.height = '87.5px';
                img.style.width = '164px';
                img.style.zIndex = '10';
                img.style.display = 'block';
                img.setAttribute("href", "https://world.openfoodfacts.org/nutriscore");
    
                div.appendChild(img);
    
                // Work out where to insert the nutriscore image
                let insertIndex = 4;
                if(item.discount === 0) {
                    insertIndex -= 2;
                }

                // Insert the image
                position.insertBefore(div, position.childNodes[insertIndex]);
                
                if (document.getElementsByClassName('section-bottom-md-padding').length != 0) {
                    document.getElementsByClassName("section-bottom-md-padding")[0].remove();
                }
                break;
            case 'C':
                if (document.getElementsByClassName('section-bottom-md-padding').length != 0) {
                    document.getElementsByClassName("section-bottom-md-padding")[0].remove();
                }
                break;
            default:
                console.log("NutiScore Group Error");
                break;
        }
    }
};