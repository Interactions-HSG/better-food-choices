
    var current ='Switzerland';
    var currency = document.getElementsByClassName("current-price")[0];
    var title = document.createElement("TEXT");
     if (currency!=null) {

    title.textContent = Math.round(currency.innerText/1.7*20)/20;
    title.style.fontSize = "20px";
    title.style.color = "gray";
    title.style.fontWeight="bold";
   

    var currency_unit = document.createElement("TEXT");
    currency_unit.textContent = "EUR" ;
    currency_unit.style.fontSize = "16px";
    currency_unit.float="right";
    currency_unit.style.color = "gray";
    currency_unit.style.fontWeight="bold";

    var currency_change = document.createElement("INPUT");
    currency_change.type = "button";
    currency_change.value = "Change Currency";
    currency_change.style.lineHeight = 1;
    currency_change.style.fontFamily = "Helvetica Neue Condensed,Impact,arial,sans-serif";
    var current_instead = document.getElementsByClassName('usual-price')[0];

    // current_instead.innerText = "statt " + Math.round(current_instead.innerText.split(' ')[1]/1.7*100,2)/100;
    // console.log(current_instead[0].innerText.split(' ')[1]);
    currency_change.addEventListener('click', function(){
        current=!current;

        price_in_chf = currency.innerText;
        price_in_chf_number = parseFloat(price_in_chf.replace('-'));

        current_discount_in_chf = current_instead.innerText;
        current_discount_in_chf_number = (current_discount_in_chf.replace('-',''));
        current_discount_in_chf_number = parseFloat(current_discount_in_chf_number.replace('statt',''))

        price_in_eur = Math.round(price_in_chf_number/1.7*20,2)/20;
        current_discount_in_eur = Math.round(current_discount_in_chf_number/1.7*20,2)/20;
        
        if (current=='Germany') {
            currency.innerText = price_in_eur;
            current_instead.innerText = "statt " + current_discount_in_eur;
            currency_unit.textContent="EUR";
            Console.log (" Currency" +currency_unit.textContent);
        }
        else if (current=='Switzerland'){
            currency.innerText = Math.round(currency.innerText*1.7*20,2)/20;
            current_instead.innerText = "statt " + Math.round(current_instead.innerText.split(' ')[1]*1.7*20)/20;
            currency_unit.textContent="CHF";
            Console.log (" Currency: "+currency_unit.textContent);
        }
        else { 
    }
    })

    if (current=='Germany') {
        currency.innerHTML=title.innerText;
    }
    else if (current=='Switzerland'){
        currency_unit.textContent="CHF";
    }
    else { 
    }
    }

    var sidebar_price = document.getElementsByClassName("sidebar-price")[0];

    sidebar_price.append(currency_unit);
    sidebar_price.append(currency_change);
    