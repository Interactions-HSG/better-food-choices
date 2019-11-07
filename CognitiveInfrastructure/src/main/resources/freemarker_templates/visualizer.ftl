<!DOCTYPE html>
<html lang="en-us">
<title>Visualization Tool | Pro2Future Cognitive Infrastructure</title>
<head>
    <meta charset="utf-8" />
    <meta name="author" content="Dan Yu, Simon Mayer, Byung Gon Song (and Original Webvowl authors : Vincent Link, Steffen Lohmann, Eduard Marbach, Stefan Negru)" />
    <meta name="keywords" content="webvowl, vowl, visual notation, web ontology language, owl, rdf, ontology visualization, ontologies, semantic web, knowledgepacks, KP, ontology" />
    <meta name="description" content="Ontology Adminitration Tool empowered by WebVOWL Beta Version" />
    <meta name="robots" content="noindex,nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="stylesheet" type="text/css" href="/webresources/stylesheets/webvowl.css" />
    <link rel="stylesheet" type="text/css" href="/webresources/stylesheets/webvowl.app.css" />
    <link rel="icon" href="/webresources/images/favicon.ico" />
    <!-- <link rel="stylesheet" type="text/css" href="/webresources/stylesheets/style.css"> -->
    <!-- <link rel="stylesheet" type="text/css" href="/webresources/stylesheets/prettify.css"> -->
    <script src="http://code.jquery.com/jquery-1.8.2.js"></script>  
    <script src="http://code.jquery.com/ui/1.9.1/jquery-ui.js"></script> 
    <script>
        myURLVISUALIZER = '${interfaceURL}visualizer'
        myURLSPARQL = '${interfaceURL}SPARQL';
        myURLConverter = '${interfaceURL}convert';
        myURLKP = '${interfaceURL}knowledgepacks';
        myQUERIES = '${interfaceURL}queries';
        function loadKPs(kpsToLoad) {
            $('#overlay').fadeIn();
            $('#dialog-wait').fadeIn();

            $.ajax({
                type: 'PUT', 
                url: myURLKP, 
                async : false,
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

        /* Initaially load */
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
        });


        function loadQueries() {
            console.log("loadQueries called");
            $('#overlay').fadeIn();
            $('#dialog-wait').fadeIn();
                    
            $.ajax({
                type: 'PUT', 
                url: myQUERIES, 
                async : false,
                data: JSON.stringify({"availableQueries": "lv2" }),
                contentType: 'application/json;charset=UTF-8', 
                dataType: 'json',
                success: function (data) {
                    console.log(data);
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
                    loadQueries();
                }
            }).disableSelection();
            
            $("#sortable2").sortable({
                connectWith: ".connectedSortable",
            }).disableSelection();
        });


    function dialogTabDisplayer(evt, cityName) {
        var i, tabcontent, tablinks;

        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }

    /* Initially load loadQueries */


    </script>
</head>

<body>
    <main>
        <section id="canvasArea">
            <div id="logo">
                <h2>Ontology Administration Tool<br/><span>empowered by WebVOWL beta 0.5.2</span></h2>
            </div>
            <div id="loading-info">
                <div id="loading-error" class="hidden">
                    <div id="error-info"></div>
                    <div id="error-description-button" class="hidden">Show error details</div>
                    <div id="error-description-container" class="hidden">
                        <pre id="error-description"></pre>
                    </div>
                </div>
                <div id="loading-progress" class="hidden">
                    <span>Loading ontology... </span>
                    <div class="spin">&#8635;</div>
                </div>
            </div>
            <div id="graph"></div>
        </section>
        <aside id="detailsArea">
            <section id="generalDetails">
                <h1 id="title"></h1>
                <span><a id="about" href=""></a></span>
                <h5>Version: <span id="version"></span></h5>
                <h5>Author(s): <span id="authors"></span></h5>
                <h5>
                <label>Language: <select id="language" name="language" size="1"></select></label>
            </h5>
                <h3 class="accordion-trigger accordion-trigger-active">Description</h3>
                <div class="accordion-container scrollable">
                    <p id="description"></p>
                </div>
                <h3 class="accordion-trigger">Metadata</h3>
                <div id="ontology-metadata" class="accordion-container"></div>
                <h3 class="accordion-trigger">Statistics</h3>
                <div class="accordion-container">
                    <p class="statisticDetails">Classes: <span id="classCount"></span></p>
                    <p class="statisticDetails">Object prop.: <span id="objectPropertyCount"></span></p>
                    <p class="statisticDetails">Datatype prop.: <span id="datatypePropertyCount"></span></p>
                    <div class="small-whitespace-separator"></div>
                    <p class="statisticDetails">Individuals: <span id="individualCount"></span></p>
                    <div class="small-whitespace-separator"></div>
                    <p class="statisticDetails">Nodes: <span id="nodeCount"></span></p>
                    <p class="statisticDetails">Edges: <span id="edgeCount"></span></p>
                </div>
                <h3 class="accordion-trigger" id="selection-details-trigger">Selection Details</h3>
                <div class="accordion-container" id="selection-details">
                    <div id="classSelectionInformation" class="hidden">
                        <p class="propDetails">Name: <span id="name"></span></p>
                        <p class="propDetails">Type: <span id="typeNode"></span></p>
                        <p class="propDetails">Equiv.: <span id="classEquivUri"></span></p>
                        <p class="propDetails">Disjoint: <span id="disjointNodes"></span></p>
                        <p class="propDetails">Charac.: <span id="classAttributes"></span></p>
                        <p class="propDetails">Individuals: <span id="individuals"></span></p>
                        <p class="propDetails">Description: <span id="nodeDescription"></span></p>
                        <p class="propDetails">Comment: <span id="nodeComment"></span></p>
                    </div>
                    <div id="propertySelectionInformation" class="hidden">
                        <p class="propDetails">Name: <span id="propname"></span></p>
                        <p class="propDetails">Type: <span id="typeProp"></span></p>
                        <p id="inverse" class="propDetails">Inverse: <span></span></p>
                        <p class="propDetails">Domain: <span id="domain"></span></p>
                        <p class="propDetails">Range: <span id="range"></span></p>
                        <p class="propDetails">Subprop.: <span id="subproperties"></span></p>
                        <p class="propDetails">Superprop.: <span id="superproperties"></span></p>
                        <p class="propDetails">Equiv.: <span id="propEquivUri"></span></p>
                        <p id="infoCardinality" class="propDetails">Cardinality: <span></span></p>
                        <p id="minCardinality" class="propDetails">Min. cardinality: <span></span></p>
                        <p id="maxCardinality" class="propDetails">Max. cardinality: <span></span></p>
                        <p class="propDetails">Charac.: <span id="propAttributes"></span></p>
                        <p class="propDetails">Description: <span id="propDescription"></span></p>
                        <p class="propDetails">Comment: <span id="propComment"></span></p>
                    </div>
                    <div id="noSelectionInformation">
                        <p><span>Select an element in the visualization.</span></p>
                    </div>
                </div>
            </section>
        </aside>
        <nav id="optionsArea">
            <ul id="optionsMenu">

                <li id="aboutMenu"><a href="#">Capture</a></li>


                <li id="aboutMenu"><a href="#">About</a>
                    <ul class="toolTipMenu aboutMenu">
                        <li><a href="license.txt" target="_blank">MIT License &copy; 2014-2016</a></li>
                        <li id="credits" class="option">Administration Developers:<br/> Dan Yu, Simon Mayer, Byung Gon Song</li>
                        <li id="credits" class="option">WebVOWL Developers:<br/> Vincent Link, Steffen Lohmann, Eduard Marbach, Stefan Negru </li>
                        <li><a href="http://vowl.visualdataweb.org/webvowl.html#releases" target="_blank">Version: 1.0.0-RC.1<br/>(release history)</a></li>

                        <li><a href="http://purl.org/vowl/" target="_blank">VOWL Specification &raquo;</a></li>
                    </ul>
                </li>
                <li id="display"><a href="#">Display</a>
                    <ul class="toolTipMenu gravity">
                        <li class="slideOption" id="classSliderOption"></li>
                        <li class="slideOption" id="datatypeSliderOption"></li>
                        <li class="toggleOption" id="pickAndPinOption"></li>
                        <li class="toggleOption" id="nodeScalingOption"></li>
                        <li class="toggleOption" id="compactNotationOption"></li>
                        <li class="toggleOption" id="colorExternalsOption"></li>
                        <li id="resetOption"><a id="reset-button" href="#" type="reset">Reset</a></li>
                        <li id="pauseOption"><a id="pause-button" href="#">Pause</a></li>
                    </ul>
                </li>
                <li id="explore"><a href="#">Explore</a>
                    <ul class ="toolTipMenu aboutMenu">
                <li class="option" id="converter-option">
                    <form class="converter-form" id="iri-keyword-form">
                        <label for="iri-keyword-input"> Keyword Seaerch:</label>
                        <input type="text" id="iri-keyword-input" placeholder="Keyword">    
                        <button type="submit" id="iri-keyword-button" disabled>Ok</button>
                    </form>
                </li>

                </li>
                <li id="rank"><p><a href ="#">Node Rank</a></p>
                    <div id="rankform">
                    </div>
                </li>
                <li id="sparql" ><p><a href="#">SPARQL</a></p>
                    <div id="sparqlform">
                    </div>
                </li>
            </ul>
                </li>
                <li id="filterOption"><a href="#">Filter</a>
                    <ul class="toolTipMenu filter">
                        <li class="toggleOption" id="datatypeFilteringOption"></li>
                        <li class="toggleOption" id="objectPropertyFilteringOption"></li>
                        <li class="toggleOption" id="subclassFilteringOption"></li>
                        <li class="toggleOption" id="disjointFilteringOption"></li>
                        <li class="toggleOption" id="setOperatorFilteringOption"></li>
                        <li class="slideOption" id="nodeDegreeFilteringOption"></li>
                    </ul>
                </li>
                <li id="select"><a href="#">KP Admin</a>
                    <ul class="toolTipMenu select">
                        <li id="knowledgePacksOption">KnowledgePacks:</a>  </li>
                            <#if loadedKnowledgePacks??>
                            <ul id="loadedKPList" class="connectedSortable">
                                <#list loadedKnowledgePacks as kp>
                                    <li class="ui-state-default" id="${kp}">${kp}</li>
                                </#list>
                            </ul>
                            </#if>
                            <#if availableKnowledgePacks??>
                            <ul id="availableKPList" class="connectedSortable" align="left">
                                <#list availableKnowledgePacks as kp>
                                    <li class="toggleOption" id="${kp}"></li>
                                </#list>
                            </ul>
                            </#if>
                        <li class="option" id="converter-option">
                            <form class="converter-form" id="iri-converter-form">
                                <label for="iri-converter-input">Custom Ontology:</label>
                                <input type="text" id="iri-converter-input" placeholder="Enter ontology IRI">
                                <button type="submit" id="iri-converter-button" disabled>Ok</button>
                            </form>
                            <!-- The following  converter works but it does exactly same as Upload knowledgepack button but limited to submit only 1 file. Not very useful. -->
                            <!--   <div class="converter-form">
                                <input class="hidden" type="file" id="file-converter-input" autocomplete="off">
                                <label class="truncate" id="file-converter-label" for="file-converter-input" >Instant Visualize</label>
                                <button type="submit" id="file-converter-button" autocomplete="off" disabled>
                                Visualize
                            </button></div> -->
                            <div class="converter-form">
                                <input class="hidden" type="file" id="file-converter-input2" autocomplete="off" allowdirs multiple />
                                <label class="truncate" id="file-converter-label2" for="file-converter-input2" >Upload KnowledgePack</label>
                                <button type="submit" id="file-converter-button2" autocomplete="off" disabled>
                                Upload
                            </button></div>

                        </li>
                        <li id="removeOption"><a id="remove-button" href="#" type="reset">Clear</a></li>
                        <li><a href="#" download id="exportSvg">Export as SVG</a></li>
                        <li><a href="#" download id="exportJson">Export as JSON</a></li>
                        <li><a href="#" id="exportTTL">Export as TTL</a></li>
                        <!-- <li><a href="#" download id="exportZIP">Export as ZIP</a></li> -->
                    </ul>
                </li>


            </ul>
        </nav>
    </main>


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



    <!-- Create a dialog box -->
    <!-- for SPARQL -->
    <div id="myModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span id="close1" class="close">x</span>
        <!-- <p>Some text in the Modal..</p> -->
        <p>
            <ul class="tab">
              <li><a href="#" class="tablinks" onclick="dialogTabDisplayer(event, 'spqlevel1')" id="sparql-level1">Beginner</a></li>
              <li><a href="#" class="tablinks" onclick="dialogTabDisplayer(event, 'spqlevel2')" id="sparql-level2">Intermediate</a></li>
              <li><a href="#" class="tablinks" onclick="dialogTabDisplayer(event, 'spqlevel3')" id="sparql-level3">Expert</a></li>
            </ul>
        </p>



        <div id="spqlevel1" class="tabcontent">
            <h3>Level 1</h3>
             <form class="SPARQL-form-lv1" id="SPARQL-form-lv1">
                <textarea name="textarea" id="lv1_SPARQL-intput-s" placeholder="Subject" ></textarea>
                <textarea name="textarea" id="lv1_SPARQL-intput-p" placeholder="Property" ></textarea>
                <textarea name="textarea" id="lv1_SPARQL-intput-o" placeholder="Object" ></textarea>
                <button type="submit" id="SPARQL1-button">Get Result</button>
            </form>
            <form class="SPARQL-form" id="lv1_SPARQL-form">
                <textarea name="textarea" id="lv1_SPARQL-output" readonly >Displaying Results * Read Only *</textarea>
            </form>
        </div>

        <div id="spqlevel2" class="tabcontent">
            <!-- Displaying option -->

            <h3>Level 2</h3>

            <form class="SPARQL-form" id="lv2_SPARQL-form">
                <!-- <textarea name="textarea" id="SPARQL-input" placeholder="SPARQL"></textarea> -->
                <p>
                    <#if (availableQueries?size > 0)>
                        <#list availableQueries as query>
                           <a href="queries/${query}"><li class="query">${query}</li></a>
                        </#list>
                    </#if>
                </p>
                <textarea name="textarea" id="lv2_SPARQL-output" readonly >Displaying Results * Read Only *</textarea>
            </form>
        </div>

        <div id="spqlevel3" class="tabcontent">
            <h3>Level 3</h3>

            <form class="SPARQL-form" id="SPARQL-form">
                <textarea name="textarea" id="SPARQL-input" placeholder="SPARQL"></textarea>
                <textarea name="textarea" id="SPARQL-output" readonly >Displaying Results * Read Only *</textarea>
                <button type="submit" id="SPARQL-button">Get Result</button>
            </form>
        </div>

      </div>
    </div>
    
    <!--  for node rank -->
    <div id="myModal2" class="modal">
      <div class="modal-content-nodetable">
        <span id="close2" class="close">x</span>
        <p class="ranking-table-header"> Node Ranking </p>
        <p>
            <div class="nodeTable" id="nodeEntities">this part will be replaced with table</div>
        </p>
      </div>
    </div>

    <div id="spqlevel1" class="tabcontent">
      <h3>Level 1</h3>
      <p>spqlevel1</p>
    </div>

    <div id="spqlevel2" class="tabcontent">
      <h3>Level 2</h3>
      <p>spqlevel2</p> 
    </div>

    <div id="spqlevel3" class="tabcontent">
      <h3>Level 3</h3>
      <p>spqlevel3</p>
    </div>

    <script src="/webresources/scripts/d3.min.js"></script>
    <script src="/webresources/scripts/webvowl.js"></script>
    <script src="/webresources/scripts/webvowl.app.js"></script>
    <script src="/webresources/scripts/jszip.js"></script>
    <script src="/webresources/scripts/jszip.min.js"></script>
    <script>

    window.onload = webvowl.app().initialize;

    var modal = document.getElementById('myModal');
    var btn = document.getElementById("sparql");

    // Get the <span> element that closes the modal
    var span1 = document.getElementById("close1");

    // When the user clicks on the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span1.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    var modal2 = document.getElementById('myModal2');
    var btn2 = document.getElementById("rank");
    var span2 = document.getElementById("close2");

    // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    btn2.onclick = function() {
        modal2.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span2.onclick = function() {
        modal2.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal2.style.display = "none";
        }
    }


    </script>



</body>

</html>