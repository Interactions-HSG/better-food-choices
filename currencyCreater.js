    console.log(" Country Selected on CC 1 is  : " + Country )
    var Country = localStorage.getItem("CountryName");
    console.log(" Country Selected on CC 1 is  : " + Country )
    var current_price = document.getElementsByClassName("current-price")[0];
    current_instead = document.getElementsByClassName('usual-price')[0];
    


    var title = document.createElement("TEXT");
     if (current_instead!=null) {

    
    title.style.fontSize = "20px";
    title.style.color = "gray";
    title.style.fontWeight="bold";
   

    var currency_unit = document.createElement("TEXT");
    currency_unit.textContent = "EUR" ;
    currency_unit.style.fontSize = "16px";
    currency_unit.float="right";
    currency_unit.style.color = "gray";
    currency_unit.style.fontWeight="bold";

    //with Discount

        if (Country=='Germany') {

            price_in_chf = current_price.innerText;
            price_in_chf_number = parseFloat(price_in_chf.replace('-',''));
             

            console.log ('price in CHF:'+ price_in_chf_number)

            current_discount_in_chf = current_instead.innerText
            current_discount_in_chf_number = (current_discount_in_chf.replace('-',''));
            current_discount_in_chf_number = parseFloat(current_discount_in_chf_number.replace('statt',''))

            price_in_eur = Math.round(price_in_chf_number/1.7*20,2)/20;
          
        
        
            current_discount_in_eur = Math.round(current_discount_in_chf_number/1.7*20,2)/20;
        
        
            current_price.innerText = price_in_eur;
            current_instead.innerText = "statt " + current_discount_in_eur;
            currency_unit.textContent="EUR";

         

          discount_percentage= -(Math.round(((price_in_chf_number - current_discount_in_chf_number )/current_discount_in_chf_number)*10,1)/10)*100;

          console.log ('price_in_chf_number:'+ price_in_chf_number);
          console.log ('current_discount_in_chf_number:'+ current_discount_in_chf_number);
        

          
          console.log ('Discount Percentage GE:'+ discount_percentage);

          var Discount = document.createElement("TEXT");
          Discount.textContent = "  " + discount_percentage +"% RABATT" ;
          Discount.style.fontSize = "25px";
          Discount.float="right";
          Discount.style.color = "Orange";
          Discount.style.fontWeight="bold";


          
          console.log ('price in EUR:'+ current_price.innerText)
        }
        else if (Country=='Switzerland') {
            
            price_in_chf = current_price.innerText;
            price_in_chf_number = parseFloat(price_in_chf.replace('-',''));
            
            

           current_discount_in_chf = current_instead.innerText
           current_discount_in_chf_number = (current_discount_in_chf.replace('-',''));
           current_discount_in_chf_number = parseFloat(current_discount_in_chf_number.replace('statt',''))

           console.log ('price in CHF:'+ price_in_chf_number)
            
            discount_percentage= -(Math.round(((price_in_chf_number - current_discount_in_chf_number )/current_discount_in_chf_number)*10,1)/10)*100;
           
            var Discount = document.createElement("TEXT");
            Discount.textContent = "  " + discount_percentage +"% RABATT" ;
            Discount.style.fontSize = "25px";
            Discount.float="right";
            Discount.style.color = "Orange";
            Discount.style.fontWeight="bold"
            
            price_in_chf = current_price.innerText;
            current_instead.innerText = "statt " + current_discount_in_chf;
            currency_unit.textContent="CHF";

            var sidebar_price = document.getElementsByClassName("sidebar-price")[0];
            sidebar_price.append(Discount);

            console.log ('Discount Percentage CH:'+ discount_percentage);

        }
    
    
    if (Country=='Germany') {
        currency_unit.textContent="EUR"
    }
    else{
        currency_unit.textContent="CHF";
    }


    var sidebar_price = document.getElementsByClassName("sidebar-price")[0];

    sidebar_price.append(currency_unit);
    sidebar_price.append(Discount);
}
else {
    title.style.fontSize = "20px";
    title.style.color = "gray";
    title.style.fontWeight="bold";
   

    var currency_unit = document.createElement("TEXT");
    currency_unit.textContent = "EUR" ;
    currency_unit.style.fontSize = "16px";
    currency_unit.float="right";
    currency_unit.style.color = "gray";
    currency_unit.style.fontWeight="bold";

    

        if (Country=='Germany') {
            price_in_chf = current_price.innerText;
            price_in_chf_number = parseFloat(price_in_chf.replace('-',''));
             

            console.log ('price in CHF:'+ price_in_chf_number)

         
           price_in_eur = Math.round(price_in_chf_number/1.7*20,2)/20;
          
        
    
        
        
           current_price.innerText = price_in_eur;
          
          currency_unit.textContent="EUR";
          
          
          console.log ('price in EUR:'+ current_price.innerText)
        }
        else if (Country=='Switzerland') {
            
           
            currency_unit.textContent="CHF";
        }
        if (Country=='Germany') {
            currency_unit.textContent="EUR"
        }
        else{
            currency_unit.textContent="CHF";
        }
    
    
        var sidebar_price = document.getElementsByClassName("sidebar-price")[0];
    
        
        sidebar_price.append(currency_unit);
        
    


}

