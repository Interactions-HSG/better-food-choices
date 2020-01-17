console.log("Background running!");
localStorage.setItem('userNames', JSON.stringify("zwrh0093@guRY7221.com"));			
localStorage.setItem("GroupName", "A");

chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {Notice: "The button was clicked"}, function(response) {
				if (response.farewell) {
					console.log(response.farewell);
				}
				else {
					console.log("No Response Received");
				}
			});
    });
}