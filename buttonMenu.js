// Checking if running properly.
console.log("Chrome extension is working!");
var group;
var group = localStorage.getItem("GroupName");
console.log ('group at refresh'+ group)

// Admin Section. Activated on extension button click.
chrome.runtime.onMessage.addListener(
    function (request){
    if (request.Notice) {
        console.log("The button was clicked");
        
     //Admin holder appended on click.
        document.documentElement.style.height = "100%";
        document.body.style.height = "100%";
        document.documentElement.style.width = '100%';
        document.body.style.width = '100%'; 

        //variables for design buttons.
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
        var FalsePassword = document.createElement("TEXT");
        var countryselecttext = document.createElement("TEXT");
        var nutriscoreselecttext = document.createElement("TEXT");
        var Start = document.createElement("INPUT");
        var Finish = document.createElement("INPUT");

        //variables for study group selection. 
        var country_germany = document.createElement("INPUT");
        var country_ch = document.createElement("INPUT");
        
        //variable for country selection.  
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
            form.appendChild(Start);
            form.appendChild(Finish);
        } else if ($("#overlay").length > 0) {
            console.log("The menu is already open");
        }
    form.style.textAlign = "center";

    //Admin buttons & password set creation.
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
        div2.style.borderColor = 'lightgreen';

        //Menu title.
        title.textContent = "Welcome to the Nutriscore Study";
        title.style.fontSize = "20px";
        title.style.position = "absolute";
        title.style.top = "10%";
        title.style.left = "37%";

        //Explanation text.
        explanation.textContent = "Welcome to the study menu. Please press the 'Start study' button before shopping. Please press 'Finish study' when you are done shopping."
        explanation.style.fontSize = "18px";
        explanation.style.position = "absolute";
        explanation.style.top = "20%"
        explanation.style.left = "0%";

        //Settings button.
        input.id = "Adminbutton";
        input.type = "button";
        input.value = "Settings";
        input.style.position = "absolute";
        input.style.top = "39%";
        input.style.left = "5%";

        //Start button.
        Start.id = "Start";
        Start.type = "button";
        Start.value = "Start study";
        Start.style.position = "absolute";
        Start.style.top = "50%";
        Start.style.left = "35%";

        //Finish button.
        Finish.id = "Finish";
        Finish.type = "button";
        Finish.value = "Finish study";
        Finish.style.position = "absolute";
        Finish.style.top = "50%";
        Finish.style.left = "55%";
       
        $("#Start").on("click", function() {
            var start_time = new Date();
            localStorage.setItem("starttime", start_time);
            console.log ('start:'+start_time)});

        $("#Finish").on("click", function() {
            var end_time = new Date();
            var new_start_time = localStorage.getItem("starttime");
            

            var elapsed = end_time - new_start_time;
            var seconds = Math.round(elapsed / 1000);
            var minutes = Math.round(seconds / 60);
            var hours = Math.round(minutes / 60);

            console.log ('Time spent during the study:'+ hours+':'+minutes+':'+seconds)
        });


        //Settings button activation.
         $("#Adminbutton").on("click", function() {


         var password2 = '123';
//Password text and confirm button display

            Adminpassword.id = "Adminpass";
            Adminpassword.type = "Text";
            Adminpassword.value = "";
            Adminpassword.style.position = "absolute";
            Adminpassword.style.top = "39%";
            Adminpassword.style.left = "40%";
            

            confirm.id = "confirm";
            confirm.type = "button";
            confirm.value = "Confirm";
            confirm.style.position = "absolute";
            confirm.style.top = "39%";
            confirm.style.left = "65%";
          

            form.appendChild(Adminpassword);
            form.appendChild(confirm);
//Password aquisition.
            $("#confirm").on("click", function() {

               password2 = document.getElementById("Adminpass").value;
            

            console.log(" Written password is : " + password2);

            //Set Password here:

            if (password2 == '123') {


                //Remove password section of password is right.

                if (Adminpassword.length!=0) {
                Adminpassword.remove();}

                if (confirm.length!=0) {
                confirm.remove();}

                if (FalsePassword.length!=0) {
                    FalsePassword.remove();}



                    //Displaying Settings Menu.

                if ($("#country_germany").length == 0 && $("#group_a").length == 0) {


                    frag.appendChild(country_germany);
                    frag.appendChild(country_ch);
                    frag.appendChild(group_a);
                    frag.appendChild(group_b);
                    frag.appendChild(group_c);
                    frag.appendChild(countryselecttext);
                    frag.appendChild(nutriscoreselecttext);
                    form.appendChild(frag);
//Selection text forcountry and group 

                    countryselecttext.textContent = "Please select a country:";
                    countryselecttext.fontSize = "20px";
                    countryselecttext.style.position = "absolute";
                    countryselecttext.style.top = "70%";
                    countryselecttext.style.left = "5%";

                    nutriscoreselecttext.textContent = "Please select a group: ";
                    nutriscoreselecttext.fontSize = "20px";
                    nutriscoreselecttext.style.position = "absolute";
                    nutriscoreselecttext.style.top = "60%";
                    nutriscoreselecttext.style.left = "5%";
                    
                    
                
// Germany button.


                 country_germany.id = "country_germany";
                country_germany.type = "button";
                country_germany.value = "Germany";
                country_germany.style.position = "absolute";
                country_germany.style.top = "70%";
                country_germany.style.left = "40%";


                // Germany variable local storage.

                $("#country_germany").on("click", function() {

                    var Country = "Germany";
                    localStorage.setItem("CountryName", Country);
                 
     
                 console.log(" Country Selected is  : " + Country );

                
                });

                country_ch.id = "country_ch";
                country_ch.type = "button";
                country_ch.value = "Switzerland";
                country_ch.style.position = "absolute";
                country_ch.style.top = "70%";
                country_ch.style.left = "30%";

                // Switzerland variable local storage
                $("#country_ch").on("click", function() {

                    Country = "Switzerland";
                    localStorage.setItem("CountryName", Country );
                 
     
                 console.log(" Country Selected is  : " + Country);

                
                });

                group_a.id = "group_a";
                group_a.type = "button";
                group_a.value = "NutriScore: A/B/C/D/E";
                group_a.style.position = "absolute";
                group_a.style.top = "60%";
                group_a.style.left = "30%";
                

                group_b.id = "group_b";
                group_b.type = "button";
                group_b.value = "NutriScore: A/B";
                group_b.style.position = "absolute";
                group_b.style.top = "60%";
                group_b.style.left = "47%";
               


                group_c.id = "group_c";
                group_c.type = "button";
                group_c.value = "NutriScore disabled";
                group_c.style.position = "absolute";
                group_c.style.top = "60%";
                group_c.style.left = "60%";
               



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
                form.appendChild(FalsePassword);
                FalsePassword.textContent = "Wrong password!"
                FalsePassword.fontSize = "18px";
                FalsePassword.style.position = "absolute";
                FalsePassword.style.top = "39%"
                FalsePassword.style.left = "80%";


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
        closer.style.left = "88%";
        
        $("#exitButton").on("click", function() {
            $(document.body).children("#overlay").remove();
            location.reload();
            
        });
    }
})

