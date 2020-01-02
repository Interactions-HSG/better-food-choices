// Main.js

// Page Types

var pageTypes = {
    MIGROS:{
        SINGLEPRODUCTPAGE: 'migros.singleproduct',
        PRODUCTOVERVIEWPAGE: 'migros.productoverview',
        UNKNOWN: 'migros.unknown'
    },
    OTHER:'other'
}

// Detect DOM Changes
var mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        console.log("mutationObserver:" + mutation + ". attributeName: " + mutation.attributeName);
    });
});

$(document).ready(function(){
    // Check if Main.js is running 
    console.log("Main.js: is working and page has finished loading!");

    // Starts listening for changes in the root HTML element of the page.
    // https://blog.sessionstack.com/how-javascript-works-tracking-changes-in-the-dom-using-mutationobserver-86adc7446401
    // https://benfrain.com/an-introduction-to-the-javascript-mutationobserver-api/
	
    mutationObserver.observe(document.documentElement, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
    });
	
    // Check current pagetype
    currentPage = pageTypes.OTHER;
	//var page_type="migros.productoverview";
    if ($("ul.mui-js-product-list").length) {
		console.log("multi");
        currentPage = pageTypes.MIGROS.PRODUCTOVERVIEWPAGE;
		//page_type="migros.productoverview";
    }
    if (document.getElementsByClassName("mui-js-product-list")[0]===undefined) {
		console.log("single");
        currentPage = pageTypes.MIGROS.SINGLEPRODUCTPAGE;
		//page_type="migros.singleproduct";
    }
    console.log("Main.js: Current page is: " + currentPage);
	//console.log(page_type);
});
