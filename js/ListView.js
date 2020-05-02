// var page_type="migros.productoverview";
// if ($("ul.mui-js-product-list").length) {
// 	page_type="migros.productoverview";

// 	console.log(page_type);
// }
// if ($("aside.sidebar").length) {
// 	page_type="migros.singleproduct";
// }

function setUpClickListeners() {
	// Watch for shopping basket add, quantity, and delete button click
	$('.mui-button, .mui-shoppinglist-button-add').on('click', triggerBasketUpdate);
	$('.mui-js-shoppinglist-input-quantity').on('change', triggerBasketUpdate);

	// On category click wait for 500 milliseconds and rerun the calculations
	$('.category-browser-category, .mui-pagination-page').on('click', function() {
		window.setTimeout(function() {
			loadPageData();
		}, 500);
	});
}

// Waits for 2000 milliseconds before updating the basket items
function triggerBasketUpdate() {
	window.setTimeout(function() {
		Nutriscore.updateBasket();
	}, 2000);
}

function loadItem(url) {
	// Create GET request for the product main page
	let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function() {
		// Load page HTML
		let productPageDocument = new DOMParser().parseFromString(xhr.response, 'text/html');
		
		// Create new item
		let item = new Item(url);
		// Load page data
		item.loadDataFromProductPage(productPageDocument);
		
		if(item.itemType  == ItemType.None) {
			return;
		}

		// Load API data
		item.loadDataFromApi(function(success) {
			if(success === false) {
				// Get the nutrient table
				let table = productPageDocument.getElementById("nutrient-table");
	
				// Parse table and calculate nutriscore
				item.parseNutrientTable(table);
				item.calculateNutriscore();
			}
		
			// Add nutriscore image
			Nutriscore.addNutriscoreImageToList(item);
			// Update item price
			Nutriscore.updateListItemPrices(item);
			// Add item to cache
			Nutriscore.addItemToCache(item);

			count--;
			if(count == 0) {
				overlay.style.display = "none";
			}
		});
	};
	xhr.onerror = function() {
		console.log("Request for '" + url + "' failed");
		count--;
	}

	xhr.send(); 
}

var allHref;
var count;
var overlay = null;
function loadPageData () {	
	// If there is no overlay element
	if(overlay === null) {
		// Create and insert the overlay
		overlay = document.createElement("DIV");
		overlay.id = "nutriscore-loading-overlay";
		overlay.className = "loading";
		overlay.innerHTML = "Loading&#8230;";
		document.body.appendChild(overlay);	
	}
	else {
		// Show previously loaded overlay
		overlay.style.display = "block";
	}

	// Load item cache from localStorage
	Nutriscore.loadItemCache();

	// Repeatedly scroll to bottom of page to force item loading
	window.scrollTo(0, document.body.scrollHeight);

	setTimeout(function () {
		window.scrollTo(0, document.body.scrollHeight);

		setTimeout(function () {
			window.scrollTo(0, document.body.scrollHeight);
			
			// Scroll back to top of page
			setTimeout(function () {				
				window.scrollTo(0, 0);

				//allHref = $("div.mui-lazy-load-product a[href^='http']");//.first();
				allHref = $("a.mui-product-tile.mui-tracking-information");

				count = allHref.length;	
						
				allHref.each(async function(index, item) {
					// Stagger requests by sleeping a random number of milliseconds between 1 and 75
					await sleep(Math.floor((Math.random() * 75) + 1));
					loadItem(item.href);
				});

				// Set up jQuery click events
				setUpClickListeners();
			}, 500);
		}, 500);
	}, 500);
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

loadPageData();
