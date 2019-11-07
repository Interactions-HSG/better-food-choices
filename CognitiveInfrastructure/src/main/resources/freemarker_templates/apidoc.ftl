<!DOCTYPE HTML>
 
<html lang="en">
<head>
  <title>API Documentation | Pro2Future Cognitive Infrastructure</title>
  <link rel="stylesheet" type="text/css" href="/webresources/stylesheets/style.css">
  <link rel="stylesheet" type="text/css" href="/webresources/stylesheets/prettify.css">
  <script src="../scripts/prettify.js" type="text/javascript"></script>
</head>

<body onload="prettyPrint()">

    <a href="http://www.pro2future.at">
	<img src="/webresources/images/pro2future.png" width="170" alt="Pro2Future GmbH"><br/>
	<font size="1">Pro2Future GmbH | Cognitive Products</font>
	</a>
	
	<h1><i>How</i> to do <i>What</i> with the Cognitive Infrastructure?</h1>
	<font size="2"><a href="../../v1/">Back</a> to API entry point</font>
		
	<h2 id="actions">Overview</h2>
	
	<p>Each of the blocks in the <a href="#actions">Client Actions</a> section of this page describes one functionality of the Cognitive Infrastructure (CI).
	All types that are referenced within a user action are described in the <a href="#types">Types</a> section of this page. 
	If not otherwise stated, all responses use the <i>application/json</i> media type.</p>
	
	<p>Here is an example Client Action Block:</p>
	
	<div class="resource">
		<h3>&lt;Action Name&gt;</h3>
		<h3 id="description">&lt;Request method and resource&gt;</h3>
		<ul>			
			<li><b>Description</b> &lt;Short description of the action&gt;</li>
			<li><b>Produces</b> &lt;What HTTP response code and body to expect&gt;</li>
			<li><b>Consumes</b> &lt;What to include in the HTTP request&gt; (&lt;location of the input: <i>Request Body</i>, <i>URL Parameter</i>, or <i>Path Parameter</i>&gt;)</li>
			<li><b>Example</b> &lt;An example request for this action&gt;</li>
		</ul>
	</div>
	
	
	<h3 id="cors">Cross-Origin Requests</h3>
	<p>For JavaScript clients, the Cognitive Infrastructure supports <a href="http://www.w3.org/TR/cors/">Cross Origin Resource Sharing</a> (CORS) for AJAX requests from any origin, including CORS preflight.</p> 
	
	
	<h2 id="actions">Client Actions</h2>
  	  	
	<ul id="enum">
		<li><a href="#listQueries">List loaded Queries</a></li>
		<li><a href="#semanticQuery">Query the CI</a></li>
		<li><a href="#semanticQueryAlt">Query the CI (alternative for long parameters)</a></li>
		<li><a href="#listKPs">List loaded and available Knowledge Packs</a></li>
		<li><a href="#manageKPs">Load/Unload Knowledge Packs</a></li>
	</ul>
		
	<div class="resource">
		<h3 id="listQueries">List loaded CI Queries</h3>
		<h3 id="description">GET v1/queries/</h3>
		
		<ul>		
			<li><b>Description</b> Get a list of queries from Knowledge Packs that are currently loaded in the CI</li>
			<li><b>Produces</b> Human-readable list of queries (text/html)</li>
			<li><b>Produces</b> Results in the <a href="#queriesFormat">CI Queries Format</a> (application/json)</li>
			<li><b>Example</b> <pre class="prettyprint">GET <a href="${baseURI}v1/queries/">${baseURI}v1/queries/</a></pre></li>
		</ul>
	</div>
	
	<div class="resource">
		<h3 id="semanticQuery">Query the CI</h3>
		<h3 id="description">GET v1/queries/{queryName}?key1=parameter1&key2=parameter2&...</h3>
		
		<ul>		
			<li><b>Description</b> Invoke one of the query templates provided by a Knowledge Packs that is currently loaded in the CI (see <a href="#listQueries">List loaded CI Queries</a>). The provided (URL-encoded) parameters replace variables in the SPARQL query template.</li>
			<li><b>Produces</b> Results in the <a target="_blank" href="https://www.w3.org/TR/sparql11-results-json/">SPARQL 1.1 Query Results JSON format</a> (application/sparql-results+json)</li>
			<li><b>Consumes</b> Parameters for the Query; optional (URL Parameter)</li>
			<li><b>Example</b> (returns 3 movies) <pre class="prettyprint">GET <a href="${baseURI}v1/queries/AllMoviesWithActor">${baseURI}v1/queries/AllMoviesWithActor</a></pre></li>
			<li><b>Example</b> (returns 1 movie) <pre class="prettyprint">GET <a href="${baseURI}v1/queries/AllMoviesWithActor?actorName=Will%20Smith">${baseURI}v1/queries/AllMoviesWithActor?actorName=Will%20Smith</a></pre></li>
			<li><b>Example</b> (returns 0 movies) <pre class="prettyprint">GET <a href="${baseURI}v1/queries/AllMoviesWithActor?actorName=Alec%20Baldwin">${baseURI}v1/queries/AllMoviesWithActor?actorName=Alec%20Baldwin</a></pre></li>
			<li class="deprecated"><b>Example</b> (returns a BAD REQUEST 400 because multiple values for the same key are not permitted) <pre class="prettyprint">GET <a href="${baseURI}v1/queries/AllMoviesWithActor?actorName=Alec%20Baldwin&actorName=Will%20Smith">${baseURI}v1/queries/AllMoviesWithActor?actor=Alec%20Baldwin&actor=Will%20Smith</a></pre></li>
			
		</ul>
	</div>
	
	<div class="resource">
		<h3 id="semanticQueryAlt">Query the CI (Long Parameters)</h3>
		<h3 id="description">POST v1/queries/{queryName}</h3>
		
		<ul>		
			<li><b>Description</b> Invoke one of the query templates provided by a Knowledge Packs that is currently loaded in the CI (see <a href="#listQueries">List loaded CI Queries</a>). Parameters for the SPARQL query template should be provided in the HTTP request body, formatted as JSON.</li>
			<li><b>Produces</b> Results in the <a target="_blank" href="https://www.w3.org/TR/sparql11-results-json/">SPARQL 1.1 Query Results JSON Format</a> (application/sparql-results+json)</li>
			<li><b>Consumes</b> Parameters for the Query in the <a href="#queryParamsFormat">CI Query Parameters JSON Format</a> (Request Body)</li>
			<li><b>Example</b> <pre class="prettyprint">POST ${baseURI}v1/queries/AllMoviesWithActor <br/><br/>{
	"actorName" : "Will Smith",
	"movieName" : "Independence Day"
}</pre></li>
		</ul>
	</div>
	
	<div class="resource">
		<h3>Query the CI [DEPRECATED]</h3>
		<h3 id="description">GET queries/{queryName}?params=parameter1,parameter2,parameter3</h3>
		
		<ul>		
			<li class="deprecated"><b>Description</b> Invoke one of the query templates provided by a Knowledge Packs that is currently loaded in the CI (see <a href="listQueries">List loaded CI Queries</a>). The provided parameters replace the placeholders in the query template.</li>
			<li class="deprecated"><b>Produces</b> Results in the <a target="_blank" href="https://www.w3.org/TR/sparql11-results-json/">SPARQL 1.1 Query Results JSON format</a> (application/sparql-results+json)</li>
			<li class="deprecated"><b>Produces</b> Results in a <a href="#homegrownJSON">Homegrown JSON Format</a> (application/json) [DEPRECATED]</li>
			<li class="deprecated"><b>Consumes</b> Parameter "params" with a comma-separated list of URL-encoded parameters for the Query (URL Parameter)</li>
			<li class="deprecated"><b>Example</b> <pre class="prettyprint">GET <a href="${baseURI}queries/AllMoviesWithActor?params=Will%20Smith">${baseURI}queries/AllMoviesWithActor?params=Will%20Smith</a></pre></li>
			
		</ul>
	</div>
	
	<div class="resource">
		<h3 id="listKPs">List loaded and available Knowledge Packs</h3>
		<h3 id="description">GET v1/knowledgepacks/</h3>
		<ul>			
			<li><b>Description</b> List CI's currently loaded and available Knowledge Packs</li>
			<li><b>Produces</b> Human-readable list of queries (text/html)</li>
			<li><b>Produces</b> Results in the <a href="#kpsFormat">CI Knowledge Packs Format</a> (application/json)</li>
			<li><b>Example</b> <pre class="prettyprint">GET <a href="${baseURI}v1/knowledgepacks/">${baseURI}v1/knowledgepacks/</a></pre></li>
		</ul>
	</div>	
					
	<div class="resource">
		<h3 id="manageKPs">Load/unload Knowledge Packs</h3>
		<h3 id="description">PUT v1/knowledgepacks/</h3>
		<ul>			
			<li><b>Description</b> Load or unload Knowledge Packs on CI</li>
			<li><b>Produces</b> Feedback in the response body according to the <a target="_blank" href="https://tools.ietf.org/html/draft-nottingham-http-problem-06">HTTP Problem Format Draft</a> (application/json)</li>
			<li><b>Consumes</b> A new configuration in the <a href="#kpsFormat">CI Knowledge Packs Format</a> format (Request Body)</li>
			<li><b>Example</b> <pre class="prettyprint">PUT ${baseURI}v1/knowledgepacks <br/><br/>{ "loadedKnowledgePacks": [ "testing-additional", "testing" ] }</pre></li>
		</ul>
	</div>
	
	<h2 id="types">Types</h2>
	
	Each of the blocks in this section describes one type/format that is consumed or produced by the ASbase platform.
	
	<div class="resource">	
		<h3 id="queryParamsFormat">CI Query Parameters JSON Format</h3>
		<h3 id="description">A map of parameters that are provided to the SPARQL query template</h3>
		<ul>	
			<li><b>Media Type</b> application/json</li>
			<li><b>Example</b><br/>
			
<pre class="prettyprint">
{
  "actorName" : "Will Smith",
  "movieName" : "Independence Day"
}
</pre>
	
	  		</li>
	  	</ul>
	</div>
	
	<div class="resource">	
		<h3 id="queriesFormat">CI Queries Format</h3>
		<h3 id="description">A list of semantic queries that are provided by Knowledge Packs currently loaded within the CI</h3>
		<ul>	
			<li><b>Media Type</b> application/json</li>
			<li><b>Example</b><br/>
			
<pre class="prettyprint">
{
  "availableQueries": [
    "AllMoviesWithActor",
    "AllMoviesByDirector",
    "AllMovies"
  ]
}
</pre>
	
	  		</li>
	  	</ul>
	</div>
	
	<div class="resource">	
		<h3 id="kpsFormat">CI KnowledgePacks Format</h3>
		<h3 id="description">A list of loaded and available Knowledge Packs</h3>
		<ul>	
			<li><b>Media Type</b> application/json</li>
			<li><b>Example</b><br/>
			
<pre class="prettyprint">
{
  "interfaceURL": "http://169.254.57.167:8087/",
  "loadedKnowledgePacks": [
    "testing-additional",
    "testing"
  ],
  "availableKnowledgePacks": [
    "eddl-core",
    "qudt",
    "ssf-sg",
  ],
  "apidoc": "&lt;short API documentation&gt;"
}
</pre>
	
	  		</li>
	  	</ul>
	</div>
		
  	
</body>
</html>
