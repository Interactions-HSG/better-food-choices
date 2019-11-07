<!doctype html>
<html lang="us">
<html lang="en">

<head>
  <title>Semantic Queries | Pro2Future Cognitive Infrastructure</title>
  <link rel="stylesheet" type="text/css" href="/webresources/stylesheets/style.css">
  <link rel="stylesheet" type="text/css" href="/webresources/stylesheets/queriesStyle.css">
  <link rel="stylesheet" type="text/css" href="/webresources/stylesheets/prettify.css">
  <script src="../scripts/prettify.js" type="text/javascript"></script>
</head>

<body onload="prettyPrint()">
    <a href="http://www.pro2future.at">
	<img src="/webresources/images/pro2future.png" width="170" alt="Pro2Future GmbH"><br/>
	<font size="1">Pro2Future GmbH | Cognitive Products</font>
	</a>
		
	<h1>Semantic Queries</h1>
	<font size="2"><a href="../">Back</a> to API entry point</font>
					
<#if (availableQueries?size > 0)>
<h2>The loaded KPs contain ${availableQueries?size} queries (mouseover for preview):</h2>
<font size="2">Total query invocations since restart: ${totalInvocations}</font>
<table width="100%">
<tr><td><ul>
	<#list availableQueries?keys as queryName>
		<a href="${queryName}/"><li class="query">${queryName} <font size="2">(${queryInvocations[queryName]} invocations)</font><span class="tooltiptext"><textarea>${availableQueries[queryName]}</textarea></span></li></a>
	</#list>
</ul></td></tr>
</table>
<#else>
<h2>The loaded KPs contain no queries.</h2>
</#if>

</body>
</html>
