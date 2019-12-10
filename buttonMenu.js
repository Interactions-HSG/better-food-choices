// Checking if running properly.
console.log("Chrome extension is working!");

var group;
var group = localStorage.getItem("GroupName");
console.log ('group at refresh'+ group)

// Admin Section.
chrome.runtime.onMessage.addListener(
    function (request){
    if (request.Notice) {
        console.log("The button was clicked");
        
        document.documentElement.style.height = "100%";
        document.body.style.height = "100%";
        document.documentElement.style.width = '100%';
        document.body.style.width = '100%';

        var div2 = document.createElement("DIV");
        var form = document.createElement("FORM");
        var title = document.createElement("TEXT");
        var explanation = document.createElement("TEXT");
        var frag = document.createDocumentFragment();
        var input = document.createElement("INPUT");
        var confirm = document.createElement("INPUT");
        var closer = document.createElement("INPUT");
        var nutriInfo = document.createElement("INPUT");
        var Adminpassword = document.createElement("INPUT");

        var country_germany = document.createElement("INPUT");
        var country_ch = document.createElement("INPUT");
        
        var group_a = document.createElement("INPUT");
        var group_b= document.createElement("INPUT");
        var group_c= document.createElement("INPUT");


        // Only append the elements if they are not already open.
       
        if ($("#overlay").length == 0) {
            document.body.appendChild(div2);
            div2.appendChild(form);
            form.appendChild(title);
            form.appendChild(explanation);
            form.appendChild(input);
            form.appendChild(closer);
            form.appendChild(nutriInfo);
            
            


        } else if ($("#overlay").length > 0) {
            console.log("The menu is already open");
        }
        
        form.style.textAlign = "center";

        div2.id = "overlay";
        div2.style.position = 'fixed';
        div2.style.top = '30%';
        div2.style.left = '10%';
        div2.style.width = '78%';   
        div2.style.height = '50%';
        div2.style.zIndex = '100';
        div2.style.opacity = '0.95';
        div2.style.backgroundColor = 'white';
        div2.style.border = 'solid';
        div2.style.borderWidth = '5px';
        div2.style.borderRadius = '20px';
        div2.style.borderColor = 'lightblue';

        title.textContent = "Welcome to the Nutriscore Study";
        title.style.fontSize = "20px";
        title.style.position = "absolute";
        title.style.top = "7%";
        title.style.left = "40%";

        explanation.textContent = "TEXT"
        explanation.style.fontSize = "14px";
        explanation.style.position = "absolute";
        explanation.style.top = "53%"
        explanation.style.left = "19%";

        input.id = "Adminbutton";
        input.type = "button";
        input.value = "Admin";
        input.style.position = "absolute";
        input.style.top = "39%";
        input.style.left = "42%";
        input.style.color = "darkgreen";
        input.style.backgroundColor = "lightgreen";

    ////Admin section

       
        $("#Adminbutton").on("click", function() {
    
        var password2 = '123';


            Adminpassword.id = "Adminpass";
            Adminpassword.type = "Text";
            Adminpassword.value = "Password";
            Adminpassword.style.position = "absolute";
            Adminpassword.style.top = "60%";
            Adminpassword.style.left = "42%";
            Adminpassword.style.color = "darkgreen";
            Adminpassword.style.backgroundColor = "lightgreen";

            confirm.id = "confirm";
            confirm.type = "button";
            confirm.value = "Confirm";
            confirm.style.position = "absolute";
            confirm.style.top = "60%";
            confirm.style.left = "60%";
            confirm.style.color = "darkgreen";
            confirm.style.backgroundColor = "lightgreen";

            form.appendChild(Adminpassword);
            form.appendChild(confirm);
//Password 
            $("#confirm").on("click", function() {

               password2 = document.getElementById("Adminpass").value;
            

            console.log(" Written password is : " + password2);
//Set Password here 
            if (password2 == '123') {

                if ($("#country_germany").length == 0 && $("#group_a").length == 0) {
                    frag.appendChild(country_germany);
                    frag.appendChild(country_ch);
                    frag.appendChild(group_a);
                    frag.appendChild(group_b);
                    frag.appendChild(group_c);
                    form.appendChild(frag);
                    
                    
                


                country_germany.id = "country_germany";
                country_germany.type = "button";
                country_germany.value = "GERMANY";
                country_germany.style.position = "absolute";
                country_germany.style.top = "20%";
                country_germany.style.left = "60%";
                country_germany.style.color = "red";
                country_germany.style.backgroundColor = "lightred";

                $("#country_germany").on("click", function() {

                    var Country = "Germany";
                    localStorage.setItem("CountryName", Country);
                 
     
                 console.log(" Country Selected is  : " + Country );

                
                });

                country_ch.id = "country_ch";
                country_ch.type = "button";
                country_ch.value = "Switzerland";
                country_ch.style.position = "absolute";
                country_ch.style.top = "20%";
                country_ch.style.left = "80%";
                country_ch.style.color = "red";
                country_ch.style.backgroundColor = "lightred";

                $("#country_ch").on("click", function() {

                    Country = "Switzerland";
                    localStorage.setItem("CountryName", Country );
                 
     
                 console.log(" Country Selected is  : " + Country);

                
                });

                group_a.id = "group_a";
                group_a.type = "button";
                group_a.value = "NutriScore ABCDE";
                group_a.style.position = "absolute";
                group_a.style.top = "90%";
                group_a.style.left = "20%";
                group_a.style.color = "blue";
                group_a.style.backgroundColor = "lightblue";

                group_b.id = "group_b";
                group_b.type = "button";
                group_b.value = "NutriScore AB";
                group_b.style.position = "absolute";
                group_b.style.top = "90%";
                group_b.style.left = "50%";
                group_b.style.color = "blue";
                group_b.style.backgroundColor = "lightblue";


                group_c.id = "group_c";
                group_c.type = "button";
                group_c.value = "NutriScore Disabled";
                group_c.style.position = "absolute";
                group_c.style.top = "90%";
                group_c.style.left = "80%";
                group_c.style.color = "blue";
                group_c.style.backgroundColor = "lightblue";



                $("#group_a").on("click", function() {

                    var group = "A";
                    localStorage.setItem("GroupName", group);
                 
     
                 console.log(" Group selected is  : " + group );

                
                });

                
                $("#group_b").on("click", function() {

                    var group = "B";
                    localStorage.setItem("GroupName", group);
                 
     
                    console.log(" Group selected is  : " + group );

                
                });

                
                $("#group_c").on("click", function() {

                    var group = "C";
                    localStorage.setItem("GroupName", group);
                 
     
                    console.log(" Group selected is  : " + group );

                
                });







                
                
                
            
                } else if ($("#country_ch").length > 0) {
                    console.log("Admin menu is already open");
                }
            } else {
                console.log(" Password False");
            };
    });
});
        



        nutriInfo.id = "nutriInfo";
        nutriInfo.type = "button";
        nutriInfo.value = "More infos about Nutriscore";
        nutriInfo.style.position = "absolute";
        nutriInfo.style.top = "84%";
        nutriInfo.style.left = "76%";
        $("#nutriInfo").on("click", function() {
            window.open("https://world.openfoodfacts.org/nutriscore");
        
    
        });

        var alternative1 = document.createElement("INPUT");
        var alternative2 = document.createElement("INPUT");
        var alternative3 = document.createElement("INPUT");

        alternative1.id = "alt1";
        alternative1.type = "button";
        alternative1.style.position = "absolute";
        alternative1.style.top = "65%";
        alternative1.style.left = "10%";
        alternative1.style.border = "none";
        alternative1.style.color = "blue";
        alternative1.style.textDecoration = "underline";
        alternative1.value = "Alternative 1";

        alternative2.id = "alt2";
        alternative2.type = "button";
        alternative2.style.position = "absolute";
        alternative2.style.top = "75%";
        alternative2.style.left = "10%";
        alternative2.style.border = "none";
        alternative2.style.color = "blue";
        alternative2.style.textDecoration = "underline";
        alternative2.value = "Alternative 2";

        alternative3.id = "alt3";
        alternative3.type = "button";
        alternative3.style.position = "absolute";
        alternative3.style.top = "85%";
        alternative3.style.left = "10%";
        alternative3.style.border = "none";
        alternative3.style.color = "blue";
        alternative3.style.textDecoration = "underline";
        alternative3.value = "Alternative 3";
        

        closer.id = "exitButton";
        closer.type = "button";
        closer.value = "Close";
        closer.style.position = "absolute";
        closer.style.top = "5%";
        closer.style.left = "91%";
        
        $("#exitButton").on("click", function() {
            $(document.body).children("#overlay").remove();
            location.reload();
            
        });
    }
})

