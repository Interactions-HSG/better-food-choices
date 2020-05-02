
// Create new item
let item = new Item(document.url);

// Load product data
item.loadDataFromProductPage(document);

if(item.itemType != ItemType.None) {
    // Load API data
    item.loadDataFromApi(function(success) {
        // If we did not get any usable data from the API
        if(success === false) {
            // Get the nutrient table
            let table = document.getElementById("nutrient-table");

            // Parse table and calculate nutriscore
            item.parseNutrientTable(table);
            item.calculateNutriscore();
        }

        // Show the nutriscore image
        Nutriscore.addNutriscoreImageToSingle(item);
        // Update prices
        Nutriscore.updateSingleItemPrices(item);
    });
}