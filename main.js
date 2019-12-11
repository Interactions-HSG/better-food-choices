// Main.js

// Page Types
const pageTypes = {
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
      console.log("mutationObserver:" + mutation);



      
    });
});

$(document).ready(function(){

    // Check if Main.js is running 
    console.log("Main.js: is working and page has finished loading!");

    // Starts listening for changes in the root HTML element of the page.
    mutationObserver.observe(document.documentElement, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
    });
    
    // Check current pagetype
    let currentPage = pageTypes.OTHER;
    if (document.getElementsByClassName('mui-js-product-list').length>0) {
        currentPage = pageTypes.MIGROS.PRODUCTOVERVIEWPAGE;
    }
    if (document.getElementsByClassName('sidebar-product-information').length!=0) {
        currentPage = pageTypes.MIGROS.SINGLEPRODUCTPAGE;
    }
    console.log("Main.js: Current page is: " + currentPage);


});
