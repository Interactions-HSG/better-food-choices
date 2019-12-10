// This module customizes the price on a SINGLE PRODUCT to the user's location. 

// get the user's country from localStorage
var user_country = localStorage.getItem("CountryName");
console.log("user_country: " + user_country )

// get current price
var current_price_Label = document.getElementsByClassName("current-price")[0];
// get normal price (without discount). if there is no current_instead (i.e. is null),
// then there is no discount displayed
var current_instead_Label = document.getElementsByClassName('usual-price')[0];

// This is the HTML code added to display the current currency unit (e.g. CHF or EUR)
var currency_unit_Label = document.createElement("TEXT");
currency_unit_Label.style.fontSize = "16px";
currency_unit_Label.float="right";
currency_unit_Label.style.color = "black";

// Get price from website in CHF
price_in_chf = current_price_Label.innerText;
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
    currency_unit_Label.textContent = "EUR" ;
    current_price_Label.innerText = price_in_eur;
}
else{
    currency_unit_Label.textContent = "CHF" ;
    current_price_Label.innerText = price_in_chf;
}

// Add new prices to website
var sidebar_price_Label = document.getElementsByClassName("sidebar-price")[0];
if (user_country=="Germany") {
    currency_unit_Label.textContent = "EUR" ;
    current_price_Label.innerText = price_in_eur;
}
else{
    currency_unit_Label.textContent = "CHF" ;
    current_price_Label.innerText = price_in_chf;
}
sidebar_price_Label.append(currency_unit_Label);

// If there is a discount 
if (current_instead_Label!=null) {

    // Get current discount 
    current_oldprice_in_chf = current_instead_Label.innerText
    current_oldprice_in_chf_number = current_oldprice_in_chf.replace('-','');
    current_oldprice_in_chf_number = parseFloat(current_oldprice_in_chf_number.replace('statt',''))
    console.log ('current_oldprice_in_chf_number:'+ current_oldprice_in_chf_number);
    current_oldprice_in_eur = ((current_oldprice_in_chf_number/conversion_factor*20).toFixed(0)/20).toFixed(2);
    
    // Only replace old price in EUR (as old price already is correct in CHF)
    if (user_country=="Germany") {
        current_instead_Label.innerText = "statt " + current_oldprice_in_eur;
    }

    discount_percentage= (100*(current_oldprice_in_chf_number-price_in_chf_number) / current_oldprice_in_chf_number).toFixed(0);
    console.log ('Discount Percentage:'+ discount_percentage);
    
    // Add discount label to page
    var sidebar_discount_Label = document.getElementsByClassName("sidebar-discount-badge")[0];
    var discount_Label = document.createElement("TEXT");
    discount_Label.style.fontSize = "40px";
    discount_Label.float="right";
    discount_Label.style.backgroundColor = "#ff4d00";
    discount_Label.style.color = "White";
    discount_Label.style.fontWeight="bold"; 
    discount_Label.style.margin = "auto";
    discount_Label.textContent = " - " + discount_percentage +"%" ;
    sidebar_discount_Label.replaceWith(discount_Label);
    discount_Label.parentElement = document.getElementsByClassName("sidebar-product-information")[0];
    current_price_Label.parentElement = document.getElementsByClassName("sidebar-product-information")[0];
    sidebar_discount_Label.insertAdjacentHTML('afterend', current_price_Label.outerHTML);

}