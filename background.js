console.log("Background running!");

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