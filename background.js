console.log("Background running!");

var recording = false;
var watchID = null;

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

//User generation
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.contentScriptQuery == 'fetchUrl') {
        
        fetch(request.url)
            .then(response => response.text())
            .then(text => sendResponse(text))
            .catch(error => console.log("Fetch Error"))
		return true;  
		
	}
});


function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function exportItems(items) {
	var fields = ["URL", "Item", "GTIN"];
	var data = [];

	items.forEach(i => {
		var ind = [];
		ind.push(i.url);
		ind.push(i.title);
		ind.push(i.GTIN);
		data.push(ind);
	});



	var csv = Papa.unparse({
		"fields": fields,
		"data": data
	});

	downloadData(csv, "items.csv", function() {
		
	});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.startRecording) {
		recording = true;
	}

	if (request.stopRecording) {
		recording = false;
		exportData();
	}

	if (request.gotItems) {
		let items = request.gotItems;
		var fetched = items.length;
		items.forEach(item => {
			$.ajax({
			    url: item.url, 
			    cache: false,
			    success: function(response) {
			        //var result = $(response).find("#result");
			        var result = $('.table-additional-information tr', response).eq(1);
			        var res2 = $('td', result).eq(1).text();
			        item.GTIN = res2;
			    	fetched--;
			        if (fetched === 0) {
						exportItems(items);
			        }
			    }
			});
		});
	}
 });

var tabs = {};
var urls = {};

function DateDiff(date1, date2) {
this.days = null;
this.hours = null;
this.minutes = null;
this.seconds = null;
this.date1 = date1;
this.date2 = date2;

this.init();
}

DateDiff.prototype.init = function() {
var data = new DateMeasure(this.date1 - this.date2);
this.days = data.days;
this.hours = data.hours;
this.minutes = data.minutes;
this.seconds = data.seconds;
};

function DateMeasure(ms) {
var d, h, m, s;
s = Math.floor(ms / 1000);
m = Math.floor(s / 60);
s = s % 60;
h = Math.floor(m / 60);
m = m % 60;
d = Math.floor(h / 24);
h = h % 24;

this.days = d;
this.hours = h;
this.minutes = m;
this.seconds = s;
};

Date.diff = function(date1, date2) {
return new DateDiff(date1, date2);
};

Date.prototype.diff = function(date2) {
return new DateDiff(this, date2);
};

function downloadData(csv, name, callback) {
    var filename = name;

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
    callback();
}

function exportData() {
	var fields = ["URL", "Time Spent"];
	var data = [];

	for (let property in urls) {
		let url = property;
		let time = urls[property];
		data.push([url, time]);
	}



	var csv = Papa.unparse({
		"fields": fields,
		"data": data
	});

	downloadData(csv, "time.csv", function() {
		urls = {};
	});
}


chrome.tabs.onUpdated.addListener(function (tabID, changeInfo, tab) {
	if (tab.id === watchID && changeInfo.status === "complete") {
		chrome.tabs.remove(watchID, function () {
			watchID = null;
		});
	}

	if (!recording) {
		return;
	}

	let existingTab = tabs[tabID];
	if (existingTab) {
		console.log(existingTab.url, tab.url);
		if (!(existingTab.url === tab.url)) {


			var diff = Date.diff(new Date(), existingTab.time);
			var seconds = String(diff.seconds).padStart(2, '0')

			var time = parseFloat(`${diff.minutes}.${seconds}`);

			console.log(time);

			if (urls[existingTab.url]) {
				urls[existingTab.url] += time;
			} else {
				urls[existingTab.url] = time;
			}

			existingTab.url = tab.url;
			existingTab.time = new Date();

		}
	} else {
		tabs[tabID] = {
			url: tab.url,
			time: new Date()
		}
	}
});

// Check to see if extension is installed, then set the default lang
chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason === "install") {
		chrome.tabs.create({
			active: false,
			url: "https://produkte.migros.ch/sortiment/supermarkt?region=gmos"
		}, function (tab) {
			watchID = tab.id;
		});
	}
});