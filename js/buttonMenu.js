// Checking if running properly.
console.log("Chrome extension is working!");

var group = localStorage.getItem("GroupName");
if (group==null) {
	localStorage.setItem("GroupName", "A");
	group = localStorage.getItem("GroupName");
}
console.log ('group at refresh'+ group);
var userArray = ['zwrh0093@guRY7221.com'], 
    password = 'zwrh0093guRY7221',
    localStorageUserArray;
	

// Admin Section. Activated on extension button click.
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse){
    if (request.Notice==="The button was clicked") {
        console.log("The button was clicked");
        sendResponse({farewell: "Button clicked event done!"});
		
		//Admin holder appended on click.
        document.documentElement.style.height = "100%";
        document.body.style.height = "100%";
        document.documentElement.style.width = '100%';
        document.body.style.width = '100%'; 

        //variables for menu page.
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
        
        var nutriscoreselecttext = document.createElement("TEXT");
        var Start = document.createElement("INPUT");
        var Finish = document.createElement("INPUT");
       



        //variables for Intro Survey Page.

        var div3 = document.createElement("DIV");
        var form2 = document.createElement("FORM");
        var title2 = document.createElement("TEXT");
        var explanation2 = document.createElement("TEXT");
        var Question1 = document.createElement("TEXT");
        var Answer1 = document.createElement("INPUT");
        var Question2 = document.createElement("TEXT");
        var Answer2 = document.createElement("SELECT");
        var Question3 = document.createElement("TEXT");
        var Answer3 = document.createElement("SELECT");
        var Question4 = document.createElement("TEXT");
        var Answer4 = document.createElement("SELECT");
        var closer2 = document.createElement("INPUT");


    
        
        //variable for country selection.  
        var group_a = document.createElement("INPUT");
        var group_b= document.createElement("INPUT");
        var group_c= document.createElement("INPUT");

        //variables for discount display

        var discountselecttext = document.createElement("TEXT");
        var withdiscount = document.createElement("INPUT");
        var withoutdiscount = document.createElement("INPUT");
        




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

        
        $('#Finish').on("click", function() {
            // Recording should be stopped
            chrome.runtime.sendMessage({stopRecording: true});

            var items = [];

            $('.mui-tracking-information').each((a, b) => {
            	var url = $(b).attr('href');
            	var title = $.trim($('h4', b).text());
            	title = title.replace(/\s+/g,' ').trim();
            	items.push({
            		url,
            		title
            	})
            });

            chrome.runtime.sendMessage({gotItems: items});

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
					if (Adminpassword.length!=0) {Adminpassword.remove();}
					if (confirm.length!=0) {confirm.remove();}
					if (FalsePassword.length!=0) {FalsePassword.remove();}

					//Displaying Settings Menu.
					if ($("#nutriscoreselecttext").length == 0 && $("#group_a").length == 0) {

						
						frag.appendChild(group_a);
						frag.appendChild(group_b);
						frag.appendChild(group_c);
					
                        frag.appendChild(nutriscoreselecttext);
                        frag.appendChild(discountselecttext);
                        frag.appendChild(withdiscount);
                        frag.appendChild(withoutdiscount);
						form.appendChild(frag);

						//Selection text for group and discount 
						

						nutriscoreselecttext.textContent = "Please select a group:";
						nutriscoreselecttext.fontSize = "20px";
						nutriscoreselecttext.style.position = "absolute";
						nutriscoreselecttext.style.top = "60%";
                        nutriscoreselecttext.style.left = "5%";
                        
                        discountselecttext.textContent = "Please select if discount banner is displayed:";
                        discountselecttext.fontSize = "20px";
						discountselecttext.style.position = "absolute";
						discountselecttext.style.top = "80%";
						discountselecttext.style.left = "5%";
					

						group_a.id = "group_a";
						group_a.type = "button";
						group_a.value = "NutriScore available";
						group_a.style.position = "absolute";
						group_a.style.top = "60%";
						group_a.style.left = "30%";

						group_b.id = "group_b";
						group_b.type = "button";
						group_b.value = "NutriScore available with cashback";
						group_b.style.position = "absolute";
						group_b.style.top = "60%";
						group_b.style.left = "47%";

						group_c.id = "group_c";
						group_c.type = "button";
						group_c.value = "NutriScore disabled";
						group_c.style.position = "absolute";
						group_c.style.top = "60%";
						group_c.style.left = "74%";

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
                        
                        withdiscount.id = "withdiscount";
						withdiscount.type = "button";
						withdiscount.value = "Yes";
						withdiscount.style.position = "absolute";
						withdiscount.style.top = "80%";
                        withdiscount.style.left = "50%";
                        
                        withoutdiscount.id = "withoutdiscount";
                        withoutdiscount.type = "button";
                        withoutdiscount.value = "No";
                        withoutdiscount.style.position = "absolute";
                        withoutdiscount.style.top = "80%";
                        withoutdiscount.style.left = "60%";

                        $("#withdiscount").on("click", function() {
							var discount = "YES";
							localStorage.setItem("discount", discount);
							console.log(" Discount banner: " + discount );
                        });

                        $("#withoutdiscount").on("click", function() {
							var discount = "NO";
							localStorage.setItem("discount", discount);
							console.log(" Discount banner: " + discount );
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
        
        $("#Start").on("click", function() {

            // Send a message to background script to start recording URLs
            chrome.runtime.sendMessage({startRecording: true});

           
            
			var url_register="https://login.migros.ch/register";
			var url_login="https://login.migros.ch/login";
			
			var _csrfMigros ="NsIDKzSiSn2m3R1tUn7UeQ";
			
			function randomGender(){
				genderRandom=Math.floor(Math.random() * 2);
				if(genderRandom) return("M");
				else return("F");
			}
			function randomChar(){
				while (1) {
					x=Math.floor(Math.random() * 58) + 65;
					if (x < 91 || x > 96) break;
				}
				return(String.fromCharCode(x));
			}
			function randomInt(){
				xInt=Math.floor(Math.random() * 10);
				return(xInt.toString());
			}
			function userName(){
				var i=1;
				var strChar="", strInt="";
				while (i<5) {
					i++;
					strChar=strChar+randomChar();
					strInt=strInt+randomInt();
				} 
				return strChar+strInt;
			}

			var gender=randomGender();
			var userFirstName=userName();
			var userLastName=userName();
			var email=userFirstName+"@"+userLastName+".com";
			var pass=userFirstName+userLastName;
			
			console.log(gender+'\n'+email+'\n'+pass);
			
			localStorageUserArray = JSON.parse(localStorage.getItem('userNames'));
			if (localStorageUserArray==null){
				localStorage.setItem('userNames', JSON.stringify(['zwrh0093@guRY7221.com']));
				localStorageUserArray = JSON.parse(localStorage.getItem('userNames'));
			}
			//console.log(localStorageUserArray);
			localStorageUserArray.push(email);
			localStorage.setItem('userNames', JSON.stringify(localStorageUserArray));
			console.log(localStorageUserArray);

			function registerFunc(txt){
				var zzz=txt.indexOf('name="_csrf"');
				_csrfMigros = txt.slice(zzz).slice(22,44);
				//console.log("_csrfMigros = ", _csrfMigros);
			
				var dataRegister = {
					'_csrf': _csrfMigros,
					'gender' : gender,
					 'firstname' : userFirstName,
					 'lastname' : userLastName,
					 'email' : email,
					 'password':  pass,
					 'legalDocuments[PRIVACY_STATEMENT].accepted' : 1
				};
				var dataInitial = {
					'_csrf': _csrfMigros,
					 'username' : email,
					 'password':  pass
				};

				$.ajax({
					url: url_register,
					type: "POST",
					async: false,
					data: dataRegister,
					success: function(response) {
						console.log("Success");
						//alert("new registered: " + email);
					},
					//function get error if the json does not work
					error: function(textStatus, errorThrown) {
						console.log(textStatus, errorThrown);
					}
				});
				$.ajax({
					url: url_login,
					type: "POST",
					async: false,
					data: dataInitial,
					success: function(response) {
						console.log("Success", response);
					},
					//function get error if the json does not work
					error: function(textStatus, errorThrown) {
						console.log(textStatus, errorThrown);
					}
				});
			}
			
			chrome.runtime.sendMessage(
				{contentScriptQuery: 'fetchUrl', url: url_login + encodeURIComponent(request.itemId)},
				text => registerFunc(text)
			);
            var user_country = localStorage.getItem("CountryName");
            
            if ($("#overlay2").length == 0) {

                
                document.body.appendChild(div3);
                div3.appendChild(form2);
                div3.id = "overlay2";
                form2.appendChild(title2);
                form2.appendChild(explanation2);
                form2.appendChild(Question1);
                form2.appendChild(Answer1);
                form2.appendChild(Question2);
                form2.appendChild(Answer2);
                form2.appendChild(Question3);
                form2.appendChild(Answer3);
                form2.appendChild(Question4);
                form2.appendChild(Answer4);
                form2.appendChild(closer2);


        } else if ($("#overlay2").length > 0) {
            console.log("The Intro Survey is already open");
        }
        div3.id = "overlay2";
        div3.style.position = 'fixed';
       div3.style.top = '20%';
       div3.style.left = '5%';
       div3.style.width = '88%';   
       div3.style.height = '75%';
       div3.style.zIndex = '100';
       div3.style.opacity = '0.95';
       div3.style.backgroundColor = 'white';
       div3.style.border = 'solid';
       div3.style.borderWidth = '5px';
       div3.style.borderRadius = '20px';
       div3.style.borderColor = 'lightgreen';

        title2.textContent = "Welcome to the Nutriscore Intro Survey";
        title2.style.fontSize = "20px";
        title2.style.position = "absolute";
        title2.style.top = "7%";
        title2.style.left = "32%";
        
        explanation2.textContent = "Liebe Teilnehmerin, lieber Teilnehmer, vielen Dank, dass Sie an dieser Studie teilnehmen. Unser Ziel ist es zu untersuchen, wie Menschen Lebensmittel online einkaufen. Zu diesem Zweck werden Sie später eine Einkaufsliste mit verschiedenen Produkten erhalten, die Sie in einem Online-Supermarkt bestellen sollen. Die Studie besteht aus insgesamt drei Teilen. Im ersten Teil werden Sie gebeten einen kurzen Fragebogen zu Ihrer Person und Ihrer Lebenssituation auszufüllen. Darauf folgt die Online-Shopping Aufgabe. Im letzten Teil folgt wieder ein Fragebogen zu Ihrer Person. Für Ihre Teilnahme an der Studie erhalten Sie eine Vergütung in Höhe von 100 CHF. Eine zusätzliche Vergütung erhalten Sie basierend auf den Entscheidungen, die Sie im Verlauf der Studie treffen. Hierzu werden zwei zufällige Produkte, die Sie im Verlauf der Studie in Ihren Warenkorb gelegt haben, ausgewählt. Sie erhalten entweder diese Produkte am Ende der Studie als zusätzliche Vergütung oder den monetären Gegenwert der Produkte. Wir werden all Ihre Antworten vertraulich und anonym erfassen. Anhand Ihrer Antworten werden keine Rückschlüsse auf Ihre Person möglich sein. Falls Sie ihre Daten nach Beendigung der Studie zurückziehen möchten, kontaktieren Sie bitte: ID Labs ETH/HSG, Weinbergstrasse 56, 8092 Zürich, team@autoidlabs.ch.  Nochmals vielen Dank! Klaus Fuchs (Projektleitung), Prof. Dr. Verena Tiefenbeck, Jie Lian, Leonard Michels, Mehdi Bouguerra ";
        explanation2.style.fontSize = "15px";
        explanation2.style.position = "absolute";
        explanation2.style.top = "20%"
        explanation2.style.left = "5%";


        Question1.textContent = "Wie alt sind Sie?";
        Question1.style.fontSize = "15px";
        Question1.style.position = "absolute";
        Question1.style.top = "57%";
        Question1.style.left = "5%";

        Question2.textContent = "Welches Geschlecht haben Sie?";
        Question2.style.fontSize = "15px";
        Question2.style.position = "absolute";
        Question2.style.top = "66%";
        Question2.style.left = "5%";
       
        
        Question3.textContent = "Was ist Ihr höchster abgeschlossener oder erhaltener Bildungsabschluss?";
        Question3.style.fontSize = "15px";
        Question3.style.position = "absolute";
        Question3.style.top = "76%";
        Question3.style.left = "5%";

        Question4.textContent = "Wie hoch ist das monatlich verfügbare Nettoeinkommen Ihres Haushalts?";
        Question4.style.fontSize = "15px";
        Question4.style.position = "absolute";
        Question4.style.top = "86%";
        Question4.style.left = "5%";

        Answer1.id = "Answer1";
        Answer1.type = "Text";
        Answer1.value = "";
        Answer1.style.position = "absolute";
        Answer1.style.top = "60%";
        Answer1.style.left = "5%";


        Answer2.id = "Answer2";
        Answer2.options.add(new Option("Weiblich", "Weiblich"));
        Answer2.options.add(new Option("Männlich", "Männlich"));
        Answer2.options.add(new Option("Divers", "Divers"));
        Answer2.style.position = "absolute";
        Answer2.style.top = "70%";
        Answer2.style.left = "5%";


      
            Answer3.options.add(new Option("Kein formeller Bildungsabschluss", "Kein formeller Bildungsabschluss"));
            Answer3.options.add(new Option("Primarschule oder Sekundarschule (A, B und C)", "Primarschule oder Sekundarschule (A, B und C)"));
            Answer3.options.add(new Option("Berufliche Grundbildung (eidg. Berufsattest oder Fähigkeitszeugnis mit Berufsmaturität)", "Berufliche Grundbildung (eidg. Berufsattest oder Fähigkeitszeugnis mit Berufsmaturität)"));
            Answer3.options.add(new Option("Gymnasiale Maturität oder Fachmaturität", "Gymnasiale Maturität oder Fachmaturität"));
            Answer3.options.add(new Option("Eidg. Berufsprüfung oder höhere Fachprüfunge", "Eidg. Berufsprüfung oder höhere Fachprüfunge"));
            Answer3.options.add(new Option("Bachelor", "Bachelor"));
            Answer3.options.add(new Option("Master", "Master"));
            Answer3.options.add(new Option("Diplom", "Diplom"));
            Answer3.options.add(new Option("Promotion", "Promotion"));
            Answer3.id = "Answer3";
            Answer3.style.position = "absolute";
            Answer3.style.top = "80%";
            Answer3.style.left = "5%";

    
            Answer4.options.add(new Option("0 – 999 Fr.","0 – 999 Fr."));
            Answer4.options.add(new Option("1000– 1999 Fr.","1000– 1999 Fr."));
            Answer4.options.add(new Option("2000 – 2999 Fr.", "2000 – 2999 Fr."));
            Answer4.options.add(new Option("3000 – 3999 Fr.","3000 – 3999 Fr."));
            Answer4.options.add(new Option("4000 – 4999 Fr.","4000 – 4999 Fr."));
            Answer4.options.add(new Option("5000 – 5999 Fr.","5000 – 5999 Fr."));
            Answer4.options.add(new Option("6000 – 6999 Fr.","6000 – 6999 Fr."));
            Answer4.options.add(new Option(">= 7000 Fr. ",">= 7000 Fr. "));
            Answer4.options.add(new Option("Keine Angabe","Keine Angabe"));
    
        Answer4.style.position = "absolute";
        Answer4.style.top = "90%";
        Answer4.style.left = "5%";

        closer2.id = "exitButtonSurvey";
        closer2.type = "button";
        closer2.value = "Save & Close";
        closer2.style.position = "absolute";
        closer2.style.top = "5%";
        closer2.style.left = "88%";
        
        $("#exitButtonSurvey").on("click", function() {


            $(document.body).children("#overlay2").remove();
            
            
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
});

