
    var current='Germany';
    var currency = document.getElementsByClassName("current-price")[0];
    current_instead = document.getElementsByClassName('usual-price')[0];
    

    if (document.getElementsByClassName('usual-price').length==0);{
    current_instead = 'statt'}
    else {current_instead = document.getElementsByClassName('usual-price')[0];}

    console.log ('discount is here:'+ current_instead.innerText)

    var title = document.createElement("TEXT");
     if (currency!=null) {

    
    title.style.fontSize = "20px";
    title.style.color = "gray";
    title.style.fontWeight="bold";
   

    var currency_unit = document.createElement("TEXT");
    currency_unit.textContent = "EUR" ;
    currency_unit.style.fontSize = "16px";
    currency_unit.float="right";
    currency_unit.style.color = "gray";
    currency_unit.style.fontWeight="bold";

    
    
    

    

        if (current=='Germany') {
            price_in_chf = currency.innerText;
            price_in_chf_number = parseFloat(price_in_chf.replace('-',''));
             

            console.log ('price in CHF:'+ price_in_chf_number)
//// here if this thing is existing then works out
           current_discount_in_chf = current_instead.innerText
           current_discount_in_chf_number = (current_discount_in_chf.replace('-',''));
           current_discount_in_chf_number = parseFloat(current_discount_in_chf_number.replace('statt',''))

           price_in_eur = Math.round(price_in_chf_number/1.7*20,2)/20;
          
        
        
           current_discount_in_eur = Math.round(current_discount_in_chf_number/1.7*20,2)/20;
        
        
          currency.innerText = price_in_eur;
          current_instead.innerText = "statt " + current_discount_in_eur;
          currency_unit.textContent="EUR";
          
          
          console.log ('price in EUR:'+ currency.innerText)
        }
        else if (current=='Switzerland') {
            currency.innerText = price_in_chf;
            current_instead.innerText = "statt " + current_discount_in_chf;
            currency_unit.textContent="CHF";
        }
    }

    if (current=='Germany') {
        currency_unit.textContent="EUR"
    }
    else{
        currency_unit.textContent="CHF";
    }


    var sidebar_price = document.getElementsByClassName("sidebar-price")[0];

    sidebar_price.append(currency_unit);
    sidebar_price.append(Discount);
