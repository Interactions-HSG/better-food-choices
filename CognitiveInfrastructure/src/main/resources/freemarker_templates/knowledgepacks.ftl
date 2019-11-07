<!doctype html>
<html lang="us">

<html lang="en">
<head>
	<title>KnowledgePack Manager | Pro2Future Cognitive Infrastructure</title>
	<link rel="stylesheet" type="text/css" href="/webresources/stylesheets/style.css"/>
	<link rel="stylesheet" type="text/css" href="/webresources/stylesheets/prettify.css"/>
	<script src="http://code.jquery.com/jquery-1.8.2.js"></script>
	<script src="http://code.jquery.com/ui/1.9.1/jquery-ui.js"></script>
	<script src="../scripts/prettify.js" type="text/javascript"></script>

<meta charset="utf-8">
<title>KnowledgePack Manager</title>
 

<script>
myURL = '${interfaceURL}v1/knowledgepacks';

function loadKPs(kpsToLoad) {
	console.log("Loading KPs " + kpsToLoad);
	$('#overlay').fadeIn();
	$('#dialog-wait').fadeIn();
			
	$.ajax({
		type: 'PUT', 
		url: myURL, 
		contentType: 'application/json;charset=UTF-8', 
		data: JSON.stringify({"loadedKnowledgePacks": kpsToLoad }),
		dataType: 'json',
		success: function (data) {
			$('#dialog-wait').fadeOut();
			$("#ok-message").text(data.detail);
			$('#dialog-ok').fadeIn();
		},
		error: function (request, error) {
			$("#problem-message").text("Error loading KPs: " + error);
			$('#overlay').fadeIn();
			$('#dialog-problem').fadeIn();
		}
	});
}

$(function() {
	$("#sortable1").sortable({
		connectWith: ".connectedSortable",
		update: function( event, ui ) {
			kpsToLoad = $( "#sortable1" ).sortable( "toArray" );
			loadKPs(kpsToLoad);
		}
	}).disableSelection();
	
	$("#sortable2").sortable({
		connectWith: ".connectedSortable",
	}).disableSelection();
});

hide = function() {
  $('#overlay').fadeOut();
  $('.dialog').fadeOut();
};

$(document).ready(function() {
  // Close dialog when clicking the button
  $('.ok-button').click(function() {
    hide();
  });
  
  // Close dialog when clicking anywhere
  $('body').click(function() {
    hide();
  });
  
  $('#reload-button').click(function() {
  	kpsToLoad = $( "#sortable1" ).sortable( "toArray" );
	loadKPs(kpsToLoad);
  });
});
</script>
</head>


<body onload="prettyPrint()">
    <a href="http://www.pro2future.at">
	<img src="/webresources/images/pro2future.png" width="170" alt="Pro2Future GmbH"><br/>
	<font size="1">Pro2Future GmbH | Cognitive Products</font>
	</a>

<h1>KnowledgePack Manager</h1>
<font size="2"><a href="../">Back</a> to API entry point</font>

<h2>Use this interface to hot-load (and -unload) KnowledgePacks!</h2>

<a href="#" id="reload-button">Reload KPs</a>

<table width="100%">

	<#if loadedKnowledgePacks??>
	<tr><td>
		<h2>Loaded KnowledgePacks</h2>
		<ul id="sortable1" class="connectedSortable">
		<#list loadedKnowledgePacks as kp>
			<li class="ui-state-default" id="${kp}">${kp}</li>
		</#list>
	</ul></td>
	</#if>

	<#if availableKnowledgePacks??>
	<td>
		<h2>Available KnowledgePacks</h2>
		<ul id="sortable2" class="connectedSortable">
		<#list availableKnowledgePacks as kp>
			<li class="ui-state-default" id="${kp}">${kp}</li>
		</#list>
	</ul></td></tr></table>
	</#if>

	<div id="wrapper">
    </div>
    <div id="overlay">
      <div id="screen"></div>
      <div id="dialog-wait" class="dialog">
      	<div class="body-dialog">
        	<p id="wait-message">Loading KPs...</p>
        </div>
      </div>
      
      <div id="dialog-ok" class="dialog">
      	<div class="body-dialog">
        	<p id="ok-message">The new KPs were successfully loaded/unloaded.</p>
        </div>
      	<div class="ok-button"><p>:-)</p></div>
      </div>
      
      <div id="dialog-problem" class="dialog">
      	<div class="body-dialog">
        	<p id="problem-message">There was a problem loading the KPs.</p>
        </div>
      	<div class="ok-button"><p>:-(</p></div>
      </div>
    </div>





</body>
</html>
