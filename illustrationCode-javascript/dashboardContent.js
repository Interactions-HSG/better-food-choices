// Simulation Models Explorer
// (c) Simon Mayer | Pro2Future GmbH
// Based on work by Ralf Mosshammer / Siemens AG, 2015
//
// Main UI controls and handlers, talks to Cognitive Infrastructure via osfInterface.js

// Intervals for backend inferencing in ms
var inferenceInterval = 5000

function copy(that){
  var inp = document.createElement('input');
  document.body.appendChild(inp)
  inp.value = encodeURIComponent(that.textContent)
  inp.select();
  document.execCommand('copy', false);
  inp.remove();
}

var content = {

  // jquery shortcuts
  $loadingOverlay: $('#overlay'),
  $inspector_header: $('#inspector-header'),
  $inspector: $('#inspector-content'),
  $tasks_header: $('#tasks-header'),
  $backButton: $('#back-button'),
  $headerOptionsContainer: $('#header-options-container'),
  $showTestModelTypesButton: $('#show-test-model-types-button'),
  $showTestResourceTypesButton: $('#show-test-resource-types-button'),
  $showTestOrderTypesButton: $('#show-test-order-types-button'),
  $languageChooser: $('#language-chooser'),
  $deviceChooser: $('#device-chooser'),
  $roleChooser: $('#roleChooser'),
  $ruleCreationButton: $('#ruleCreationButton'),
  $eventTypeChooser: $('#event-type-chooser'),
  $componentTypeChooser: $('#componentTypeChooser'),

  // Dialogs
  $rulesDialog: $('#rulesDialog'),
  $createEventsDialog: $('#createEventsDialog'),
  $filterEventsDialog: $('#filterEventsDialog'),

  // Buttons
  $createEventButton: $('#createEventButton'),
  $filterEventsButton: $('#filterEventsButton'),

  /** Handlebars Template IDs **/
  templateIds: {
    'assetInspector' : 'assetInspector',
    'resourceAssetInspector' : 'resourceAssetInspector',
    'createRuleDialog' : 'createRuleDialog',
    'inspectorContainer': 'inspectorContainer',
    'knowledgepackInfo': 'knowledgepackInfo',
    'knowledgepackTests': 'knowledgepackTests',
    'testModuleTypesStack': 'testModuleTypesStack',
    'testResourceTypesStack': 'testResourceTypesStack',
    'testOrdersForCharacteristics': 'testOrdersForCharacteristics',
    'moduleInTestOrderForCharacteristic': 'moduleInTestOrderForCharacteristic',
    'moduleInTestOrderInformation': 'moduleInTestOrderInformation',
    'testOrdersForCharacteristicsHeader': 'testOrdersForCharacteristicsHeader',
    'testStagesForCharacteristics': 'testStagesForCharacteristics',
    'testModulesStack': 'testModulesStack',
    'testResourcesStack': 'testResourcesStack',
    'testOrdersInspector' : 'testOrdersInspector',
    'testStageOrderForCharacteristic': 'testStageOrderForCharacteristic'
  },

  filterSettings: {
    'filterTimestamps' : false,
    'filterEventTypes' : false
  },

  init: function () {
    log.debug('Initializing the dashboard and loading data from CI...')

    content.currentLanguage = 'en'
    content.currentObjectType = 'reset'

    // Setup interface elements
    content.resetLanguageChooser()

    content.addInitialClickHandlers()

    // Check that the correct KnowledgePack is loaded - this triggers loading the correct KnowledgePack and loading the asset. When the asset is loaded, the dashboard is revealed
    osfInterface.fetchLoadedKnowledgepacks(content.currentLanguage, content.checkKnowledgePacksCallback)
  },

  revealDashboard: function () {
    window.setTimeout(function () {
      dashboard.$loading.fadeOut(300)
      dashboard.$container.fadeIn(300)
      content.$headerOptionsContainer.removeClass("hidden")
      content.$headerOptionsContainer.addClass("centered-element")
    }, 1000)
  },

  clickHandler: function (event) {
    log.debug("User selected '" + event.data.name + " / " + event.data.type + "'")


    if (event.data.type == 'testModuleType') {
      if (event.data.keepInHistory) content.recordHistory()

      // Move logic to new element
      content.currentObject = event.data.name
      content.currentObjectType = event.data.type

      content.currentTestModuleType = content.currentObject

      content.highlightSelectedModuleType()
      osfInterface.fetchModulesForModuleType(content.currentTestModuleType, content.currentLanguage, content.fetchedTestModulesCallback);
    }
    else if (event.data.type == 'testModuleInstance') {
      if (event.data.keepInHistory) content.recordHistory()

      // Move logic to new element
      content.currentObject = event.data.name
      content.currentObjectType = event.data.type

      content.currentTestModuleInstance = content.currentObject

      content.highlightSelectedModuleInstance()
      osfInterface.fetchModuleInformation(event.data.name, content.currentLanguage, content.fetchedTestModuleInformationCallback);
    }
    else if (event.data.type == 'testResourceInstance') {
      if (event.data.keepInHistory) content.recordHistory()

      // Move logic to new element
      content.currentObject = event.data.name
      content.currentObjectType = event.data.type

      content.currentTestResourceInstance = content.currentObject

      content.highlightSelectedResourceInstance()
      osfInterface.fetchResourceInformation(event.data.name, content.currentLanguage, content.fetchedTestResourceInformationCallback);
    }
    else if (event.data.type == 'createTestModule') {
      content.currentObject = event.data.name
      content.currentObjectType = event.data.type

      log.debug(event.data.name)
      osfInterface.createTestModuleInstance(event.data.name, content.currentLanguage).then(function (outputsResponse) {
        var mockedClickEvent = { "data": { name: event.data.name, type: 'testModuleType', keepInHistory: false } }
        content.clickHandler(mockedClickEvent);
      })
    }
    else if (event.data.type == 'createTestResource') {
      content.currentObject = event.data.name
      content.currentObjectType = event.data.type

      log.debug(event.data.name)
      osfInterface.createTestResourceInstance(event.data.name, content.currentLanguage).then(function (outputsResponse) {
        var mockedClickEvent = { "data": { name: event.data.name, type: 'testResourceType', keepInHistory: false } }
        content.clickHandler(mockedClickEvent);
      })
    }
    else if (event.data.type == 'deleteTestResource') {
      content.currentObject = event.data.name
      content.currentObjectType = event.data.type

      log.debug(event.data.name)
      osfInterface.deleteTestResourceInstance(event.data.name.testResource.value, content.currentLanguage).then(function (outputsResponse) {
        var mockedClickEvent = { "data": { name: event.data.name.reflectTestResourceType.value, type: 'testResourceType', keepInHistory: false } }
        content.clickHandler(mockedClickEvent);
      })
    }
    else if (event.data.type == 'testResourceType') {
      if (event.data.keepInHistory) content.recordHistory()

      // Move logic to new element
      content.currentObject = event.data.name
      content.currentObjectType = event.data.type

      content.currentTestResourceType = content.currentObject

      content.highlightSelectedResourceType()
      osfInterface.fetchResourcesForResourceType(content.currentTestResourceType, content.currentLanguage, content.fetchedTestResourcesCallback);
    }
    else if (event.data.type == 'showTestOrders') {
      if (event.data.keepInHistory) content.recordHistory()

      // Move logic to new element
      content.currentObject = event.data.name
      content.currentObjectType = event.data.type

      osfInterface.fetchCharacteristicValues(content.currentLanguage).then(function (outputsResponse) {
        log.debug(outputsResponse.results.bindings)

        content.showTestOrderTypes(outputsResponse.results.bindings, event.data.animate)
        content.updateTestOrdersInspector(true)
      })
    }
    else if (event.data.type == 'showModelTypes') {
      if (event.data.keepInHistory) content.recordHistory()

      content.currentObject = event.data.name
      content.currentObjectType = event.data.type

      log.debug("Show modules types")
      content.showTestModuleTypes(event.data.animate)
    }
    else if (event.data.type == 'showResourceTypes') {
      if (event.data.keepInHistory) content.recordHistory()

      content.currentObject = event.data.name
      content.currentObjectType = event.data.type

      log.debug("Show resources types")
      content.showTestResourceTypes(event.data.animate)
    }
    else if (event.data.type == 'retrieveTestOrderForCharacteristics') {
      if (event.data.keepInHistory) content.recordHistory()

      content.currentObject = event.data.name
      content.currentObjectType = event.data.type

      log.debug("Retrieve test order for characteristics")
      var selectedValues = $('#characteristics-chooser').val()
      log.debug(selectedValues)

      var $testOrdersHeader = $(Handlebars.templates[content.templateIds.testOrdersForCharacteristicsHeader]({ selectedValues: selectedValues }))
      $('#inspector-content').empty().append($testOrdersHeader)

      if (selectedValues != null) {
        var numOfSelectedValues = selectedValues.length

        content.moduleInstancesInTestOrders = {}
        content.modulesInTestOrders = {}
          var valueIndex = 0;
          var selectedValue = selectedValues[valueIndex]
          osfInterface.fetchTestOrderForCharacteristic(selectedValues, valueIndex, content.currentLanguage, content.showTestOrderForCharacteristicCallback)
      }

    }
    else if (event.data.type == 'initializeTestStageOrderForCharacteristics') {
      if (event.data.keepInHistory) content.recordHistory()

      content.currentObject = event.data.name
      content.currentObjectType = event.data.type

      log.debug("Initialize test stage order for characteristics")
      var selectedValues = $('#characteristics-chooser').val()
      log.debug(selectedValues)

      var $testOrdersHeader = $(Handlebars.templates[content.templateIds.testOrdersForCharacteristicsHeader]({ selectedValues: selectedValues }))
      $('#inspector-content').empty().append($testOrdersHeader)

      if (selectedValues != null) {
        var numOfSelectedValues = selectedValues.length

        content.moduleInstancesInTestOrders = {}
        content.modulesInTestOrders = {}
        var valueIndex = 0;
        var selectedValue = selectedValues[valueIndex]
        //TODO v2 osfInterface.fetchTestOrderForCharacteristic(selectedValues, valueIndex, content.currentLanguage, content.showTestOrderForCharacteristicCallback)
        osfInterface.fetchTestStagesForCharacteristic(selectedValues, valueIndex, content.currentLanguage).then(function (outputsReponse) {
          var testStages = outputsReponse.results.bindings;
          log.debug(testStages)

          var $testStages = $(Handlebars.templates[content.templateIds.testStagesForCharacteristics]({ testStages: testStages, selectedValue: selectedValue }))
          $('#inspector-container').append($testStages)

          // Add click handlers to
          $("#query-test-stages-order-for-characteristics-button").click({ name: 'findTestStageOrderForCharacteristic', type: 'findTestStageOrderForCharacteristic', keepInHistory: true, characteristicValue: selectedValue }, content.clickHandler)

        })
      }

    }
    else if (event.data.type == 'findTestStageOrderForCharacteristic') {
      if (event.data.keepInHistory) content.recordHistory()

      content.currentObject = event.data.name
      content.currentObjectType = event.data.type

      log.debug("Find test stage order for characteristic")

      var selectedStage = $("select[id='select-starting-stage-" + event.data.characteristicValue + "']").val()
      var selectedMaturity = $("input[id='starting-maturity-in-stage-" + event.data.characteristicValue + "']").val()

      //TODO add cost of first module
      osfInterface.fetchTestStageFollowerForCurrentState(0, selectedStage, 1, 0, selectedMaturity, 0, 0, content.currentLanguage, content.validateAndExtendStartingNode)
    }
    else {
      log.error("##### UNHANDLED EVENT: " + event.data.type)
    }
  },

  validateAndExtendPath: function(pathToValidateIndex) {
    log.debug("validateAndExtendPath " + pathToValidateIndex)
    var lastStageInfo = content.pathsToValidate[pathToValidateIndex][1]
    var path = content.pathsToValidate[pathToValidateIndex][0]

    if (lastStageInfo.newMaturity.value >= 95) {
      // pareto algorithm - pareto optimal front
      // var newPathIndex = content.resultPaths.length
      // content.resultPaths[newPathIndex] = [
      //   lastStageInfo.newMaturity.value,
      //   lastStageInfo.newSumDuration.value,
      //   lastStageInfo.newSumPrice.value,
      //   lastStageInfo.newProbability.value,
      //   path
      // ]

      var shouldBeAdded = true
      for (var i = content.resultPaths.length-1; i >= 0; i--) {
        if ((Number(content.resultPaths[i][0]) > Number(lastStageInfo.newMaturity.value)) &&
            (Number(content.resultPaths[i][1]) < Number(lastStageInfo.newSumDuration.value)) &&
            (Number(content.resultPaths[i][2]) < Number(lastStageInfo.newSumPrice.value)) &&
            (Number(content.resultPaths[i][3]) > Number(lastStageInfo.newProbability.value))) {
                  shouldBeAdded = false
                  break
        } else {
          if ((Number(content.resultPaths[i][0]) < Number(lastStageInfo.newMaturity.value)) &&
              (Number(content.resultPaths[i][1]) > Number(lastStageInfo.newSumDuration.value)) &&
              (Number(content.resultPaths[i][2]) > Number(lastStageInfo.newSumPrice.value)) &&
              (Number(content.resultPaths[i][3]) < Number(lastStageInfo.newProbability.value))) {
                content.resultPaths.splice(i, 1);
          }
        }
      }
      if (shouldBeAdded) {
        var newPathIndex = content.resultPaths.length
        content.resultPaths[newPathIndex] = [
          lastStageInfo.newMaturity.value,
          lastStageInfo.newSumDuration.value,
          lastStageInfo.newSumPrice.value,
          lastStageInfo.newProbability.value,
          path
        ]
      }

      content.goToNextPath(pathToValidateIndex)
    } else {
      osfInterface.fetchTestStageFollowerForCurrentState(pathToValidateIndex,
                                                          lastStageInfo.nextTestStageType.value,
                                                          lastStageInfo.newProbability.value,
                                                          parseInt(lastStageInfo.currLevel.value) + 1 ,
                                                          lastStageInfo.newMaturity.value,
                                                          lastStageInfo.newSumDuration.value,
                                                          lastStageInfo.newSumPrice.value,
                                                          content.currentLanguage,
                                                          content.extendPath)
    }
  },

  goToNextPath: function(pathToValidateIndex) {
    log.debug("goToNextPath " + pathToValidateIndex)
    pathToValidateIndex++
    if (pathToValidateIndex < content.pathsToValidate.length) {
      content.validateAndExtendPath(pathToValidateIndex)
    } else {
      content.pathsToValidate = content.newPathsToValidate
      content.newPathsToValidate = []

      if (content.pathsToValidate.length>0) {
        content.validateAndExtendPath(0)
      } else {
        // print content.resultPaths
        content.resultPaths.sort(function(a, b){return b[3]-a[3]});
        var $testOrders = $(Handlebars.templates[content.templateIds.testStageOrderForCharacteristic]({ testStageOrders: content.resultPaths }))
        $('#test-stage-order-container').empty().append($testOrders)
      }
    }
  },

  extendPath: function(outputsReponse, pathToValidateIndex) {
    log.debug("extendPath " + pathToValidateIndex)
    var validPaths = outputsReponse.results.bindings;

    var k = content.newPathsToValidate.length

    for(var j = 0; j < validPaths.length; j++) {
      content.newPathsToValidate[k] = []
      content.newPathsToValidate[k][0] = []
      for (var p = 0; p < content.pathsToValidate[pathToValidateIndex][0].length; p++) {
        content.newPathsToValidate[k][0][p] = content.pathsToValidate[pathToValidateIndex][0][p]
      }
      content.newPathsToValidate[k][0][content.pathsToValidate[pathToValidateIndex][0].length] = validPaths[j].nextTestStageLabel.value
      content.newPathsToValidate[k][1] = validPaths[j]
      k++
    }

    content.goToNextPath(pathToValidateIndex)
  },

  validateAndExtendStartingNode: function(outputsReponse, pathToValidateIndex) {
    log.debug("validateAndExtendStartingNode " + pathToValidateIndex)
    var validPaths = outputsReponse.results.bindings;

    content.pathsToValidate = []

    for(var i = 0; i < validPaths.length; i++) {
      content.pathsToValidate[i] = []
      content.pathsToValidate[i][0] = [validPaths[i].targetTestStageLabel.value, validPaths[i].nextTestStageLabel.value]
      content.pathsToValidate[i][1] = validPaths[i]
    }

    content.resultPaths = []

    content.newPathsToValidate = []
    content.validateAndExtendPath(pathToValidateIndex)
  },

  calculateTestOrderInformationForCurrentSelection: function(event) {
    var characteristicValue = event.data.characteristic
    var testModulesInOrder = content.modulesInTestOrders[characteristicValue]

    var price = 0
    var time = 0

    for (var i = 0; i < testModulesInOrder.length; i++) {
      var testModuleType = testModulesInOrder[i]
      var selectedModuleInstance = $("select[id='" + characteristicValue + "###" + testModuleType.participatingTestModuleType2.value + "']").val()
      if (selectedModuleInstance != "none") {
        var modulePrice = content.moduleInstancesInTestOrders[testModuleType.participatingTestModuleType2.value][selectedModuleInstance].testModuleCost.value
        var moduleTime = content.moduleInstancesInTestOrders[testModuleType.participatingTestModuleType2.value][selectedModuleInstance].testModuleAvailability.value

        price = Number(price) + Number(modulePrice)
        if (moduleTime > time) {
          time = moduleTime
        }
      } else {
        price = undefined
        time = undefined
        break
      }
    }

    log.debug(price)
    log.debug(time)

    $("span[id='serializable-test-modules-list-price-" + characteristicValue + "']").empty().append("PRICE: " + price)
    $("span[id='serializable-test-modules-list-time-" + characteristicValue + "']").empty().append("TIME: " + time)
  },

  updateView: function (animate) {
    log.debug('Updating Dashboard')

    if (content.currentTestModuleTypes != null) {
      content.updateModuleTypes(animate)

      if (content.currentTestModules != null) {
        content.updateTestModules(animate)
      }
    }
  },

  updateModuleTypes: function (doAnimate) {
    var testModuleTypes = content.currentTestModuleTypes
    var numTestModuleTypes = testModuleTypes.length

    log.debug(numTestModuleTypes + ' test module types loaded...')
    log.debug(testModuleTypes)

    content.$showTestModelTypesButton.click({ name: 'showModelTypes', type: 'showModelTypes', keepInHistory: true, animate: doAnimate }, content.clickHandler)
  },

  showTestOrderTypes: function (characteristicValues, doAnimate) {
    log.debug(characteristicValues)

    var $testOrderTypes = $(Handlebars.templates[content.templateIds.knowledgepackTests]({ characteristicValuesList: characteristicValues }))
    $('#knowledge-packs-scroll-container').empty().append($testOrderTypes)

    // Add click handlers to
    //TODO v2 $("#query-test-order-for-characteristics-button").click({ name: 'retrieveTestOrderForCharacteristics', type: 'retrieveTestOrderForCharacteristics', keepInHistory: true, animate: doAnimate }, content.clickHandler)
    $("#query-test-order-for-characteristics-button").click({ name: 'initializeTestStageOrderForCharacteristics', type: 'initializeTestStageOrderForCharacteristics', keepInHistory: true, animate: doAnimate }, content.clickHandler)
  },

  showTestModuleTypes: function (doAnimate) {
    var testModuleTypes = content.currentTestModuleTypes
    var numTestModuleTypes = testModuleTypes.length
    var $knowledgepackContainerPlaceholder = $(Handlebars.templates[content.templateIds.knowledgepackInfo]({ }))
    $('#knowledge-packs-scroll-container').empty().append($knowledgepackContainerPlaceholder)
    var $moduleTypes = $(Handlebars.templates[content.templateIds.testModuleTypesStack]({ testModules: testModuleTypes, animate: doAnimate }))
    $('#events-scroll-container').empty().append($moduleTypes)
    var $inspectorPlaceholder = $(Handlebars.templates[content.templateIds.inspectorContainer]({ }))
    $('#inspector-scroll-container').empty().append($inspectorPlaceholder)

    // Add click handlers to module types
    for (var i = 0; i < numTestModuleTypes; i++) {
      var testModuleTypeName = testModuleTypes[i].testingModuleType.value

      // log.debug("Attaching click handler to " + testModuleTypeName)
      $("div[id='" + testModuleTypeName + "']").click({ name: testModuleTypeName, type: 'testModuleType', keepInHistory: true }, content.clickHandler);

      // log.debug("Attaching click handler to " + testModuleTypeName + " button")
      $("[id=createModuleInstanceButton][moduleType='" + testModuleTypeName + "']").click({ name: testModuleTypeName, type: 'createTestModule', keepInHistory: false }, content.clickHandler);
    }
  },

  showTestResourceTypes: function (doAnimate) {
    var testResourcesTypes = content.currentTestResourcesTypes
    var numTestResourcesTypes = testResourcesTypes.length
    var $knowledgepackContainerPlaceholder = $(Handlebars.templates[content.templateIds.knowledgepackInfo]({ }))
    $('#knowledge-packs-scroll-container').empty().append($knowledgepackContainerPlaceholder)
    var $resourceTypes = $(Handlebars.templates[content.templateIds.testResourceTypesStack]({ testResources: testResourcesTypes, animate: doAnimate }))
    $('#events-scroll-container').empty().append($resourceTypes)
    var $inspectorPlaceholder = $(Handlebars.templates[content.templateIds.inspectorContainer]({ }))
    $('#inspector-scroll-container').empty().append($inspectorPlaceholder)

    // Add click handlers to resource types
    for (var i = 0; i < numTestResourcesTypes; i++) {
      var testResourceTypeName = testResourcesTypes[i].testResourceType.value

      // log.debug("Attaching click handler to " + testModuleTypeName)
      $("div[id='" + testResourceTypeName + "']").click({ name: testResourceTypeName, type: 'testResourceType', keepInHistory: true }, content.clickHandler);

      // log.debug("Attaching click handler to " + testModuleTypeName + " button")
      $("[id=createResourceInstanceButton][resourceType='" + testResourceTypeName + "']").click({ name: testResourceTypeName, type: 'createTestResource', keepInHistory: false }, content.clickHandler);
    }
  },

  showTestOrdersForCharacteristic: function (connectionsBetweenTestModulesInOrder, selectedValue) {
    log.debug(connectionsBetweenTestModulesInOrder)
    log.debug(selectedValue)
    var $testOrder = $(Handlebars.templates[content.templateIds.testOrdersForCharacteristics]({ characteristicValue: selectedValue, connectionsBetweenTestModules: connectionsBetweenTestModulesInOrder }))
    $('#inspector-container').append($testOrder)
  },

  updateTestModules: function (doAnimate) {
    var testModules = content.currentTestModules
    var numTestModules = testModules.length

    log.debug(numTestModules + ' test modules loaded...')
    log.debug(testModules)

    // Update Tasks Container
    var $tasks = $(Handlebars.templates[content.templateIds.testModulesStack]({ testModules: testModules, animate: doAnimate }))
    $('#tasks-scroll-container').empty().append($tasks)

    // Add click handlers to module types
    for (var i = 0; i < numTestModules; i++) {
      var testModule = testModules[i].testModule.value
      // log.debug("Attaching click handler to " + testModule)
      $("div[id='" + testModule + "']").click({ name: testModule, type: 'testModuleInstance', keepInHistory: true }, content.clickHandler);
    }
  },

  updateTestResources: function (doAnimate) {
    var testResources = content.currentTestResources
    log.debug(testResources)
    var numTestResources = testResources.length

    log.debug(numTestResources + ' test resources loaded...')
    log.debug(testResources)

    // Update Tasks Container
    var $tasks = $(Handlebars.templates[content.templateIds.testResourcesStack]({ testResources: testResources, animate: doAnimate }))
    $('#tasks-scroll-container').empty().append($tasks)

    // Add click handlers to resource types
    for (var i = 0; i < numTestResources; i++) {
      var testResource = testResources[i]
      // log.debug("Attaching click handler to " + testModule)
      $("div[id='" + testResource.testResource.value + "']").click({ name: testResource.testResource.value, type: 'testResourceInstance', keepInHistory: true }, content.clickHandler);

      $("[id=deleteResourceInstanceButton][resourceInstance='" + testResource.testResource.value + "']").click({ name: testResource, type: 'deleteTestResource', keepInHistory: false }, content.clickHandler);
    }
  },

  updateResourcesTypes: function (doAnimate) {
    var testResourcesTypes = content.currentTestResourcesTypes
    var numTestResourcesTypes = testResourcesTypes.length

    log.debug(numTestResourcesTypes + ' test resources types loaded...')
    log.debug(testResourcesTypes)

    content.$showTestResourceTypesButton.click({ name: 'showResourceTypes', type: 'showResourceTypes', keepInHistory: true, animate: doAnimate }, content.clickHandler)
  },

  updateOrdersTypes: function (doAnimate) {
    var testOrdersTypes = content.currentTestOrderTypes
    var numTestOrdersTypes = testOrdersTypes.length

    log.debug(numTestOrdersTypes + ' test orders types loaded...')
    log.debug(testOrdersTypes)

    content.$showTestOrderTypesButton.click({ name: 'showTestOrders', type: 'showTestOrders', keepInHistory: true, animate: doAnimate }, content.clickHandler)
  },

  updateTestOrdersInspector: function (doAnimate) {
    var testOrderTypes = content.currentTestOrderTypes
    // Update Inspector
    var $inspectorPlaceholder = $(Handlebars.templates[content.templateIds.inspectorContainer]({ }))
    $('#inspector-scroll-container').empty().append($inspectorPlaceholder)
    //TODO v2 var $inspectorContent = $(Handlebars.templates[content.templateIds.testOrdersInspector]({ testOrders: testOrderTypes}))
    //TODO v2 $('#inspector').empty().append($inspectorContent)
  },

  updateAssetInspector: function (doAnimate) {
    var testModuleInformation = content.currentTestModuleInformation
    var testModuleOutputs = content.currentTestModuleOutputs
    var testModuleInputs = content.currentTestModuleInputs
    var downstreamModules = content.downstreamModules
    var upstreamModules = content.upstreamModules

    log.debug('Updating inspector with information on test module...')
    log.debug(testModuleInformation)
    log.debug(testModuleOutputs)
    log.debug(testModuleInputs)
    log.debug(downstreamModules)

    var linkedModuleURIs = []

    // Process upstream modules into testModuleOutputs
    for (i = 0; i < testModuleInputs.length; i++) {
      // log.debug("Checking dependencies of " + testModuleInputs[i].testModuleInput.value)

      if (upstreamModules[testModuleInputs[i].testModuleInput.value] !== undefined) {
        // log.debug("There are dependencies for " + testModuleInputs[i].testModuleInput.value)
        testModuleInputs[i].testModuleInput.upstreams = upstreamModules[testModuleInputs[i].testModuleInput.value]

        // Create list of all upstream modules (for adding click handlers later)
        for (j = 0; j < testModuleInputs[i].testModuleInput.upstreams.length; j++) {
          if (!linkedModuleURIs.includes(testModuleInputs[i].testModuleInput.upstreams[j].uri)) linkedModuleURIs.push(testModuleInputs[i].testModuleInput.upstreams[j].uri)
        }
      }
    }

    // Process downstream modules into testModuleOutputs
    for (i = 0; i < testModuleOutputs.length; i++) {
      // log.debug("Checking dependencies of " + testModuleOutputs[i].testModuleOutput.value)

      if (downstreamModules[testModuleOutputs[i].testModuleOutput.value] !== undefined) {
        // log.debug("There are dependencies for " + testModuleOutputs[i].testModuleOutput.value)
        testModuleOutputs[i].testModuleOutput.downstreams = downstreamModules[testModuleOutputs[i].testModuleOutput.value]

        // Create list of all downstream modules (for adding click handlers later)
        for (j = 0; j < testModuleOutputs[i].testModuleOutput.downstreams.length; j++) {
          if (!linkedModuleURIs.includes(testModuleOutputs[i].testModuleOutput.downstreams[j].uri)) linkedModuleURIs.push(testModuleOutputs[i].testModuleOutput.downstreams[j].uri)
        }
      }
    }

    // Update Inspector
    var $inspectorContent = $(Handlebars.templates[content.templateIds.assetInspector]({ testModuleInformation: testModuleInformation, testModuleUri: content.currentTestModuleInstance, outputs: testModuleOutputs, inputs: testModuleInputs }))
    $('#inspector').empty().append($inspectorContent)

    content.addClickHandlersToLinkedTestModules(linkedModuleURIs)
  },

  updateResourceAssetInspector: function (doAnimate) {
    var testResourceInformation = content.currentTestResourceInformation

    log.debug('Updating inspector with information on test resource...')
    log.debug(testResourceInformation)

    // Update Inspector
    var $inspectorContent = $(Handlebars.templates[content.templateIds.resourceAssetInspector]({ testResourceInformation: testResourceInformation, testResourceUri: content.currentTestResourceInstance }))
    $('#inspector').empty().append($inspectorContent)
  },

  addInitialClickHandlers: function () {
    // TODO
    // for now, handlers are added when buttons are showing
    // maybe change it later
    // $("#show-test-orders-button").addClass("satisfied-link").click({ name: 'showTestOrders', type: 'showTestOrders', keepInHistory: true }, content.clickHandler);
  },

  addClickHandlersToLinkedTestModules: function (linkedModuleURIs) {
    var numTestModules = linkedModuleURIs.length

    // Add click handlers to module links
    for (var i = 0; i < numTestModules; i++) {
      var testModule = linkedModuleURIs[i]
      // log.debug("Attaching click handler to " + testModule)
      $("span[id='" + testModule + "']").addClass("satisfied-link").click({ name: testModule, type: 'testModuleInstance', keepInHistory: true }, content.clickHandler);
    }
  },

  /* OSF Interface Callbacks */

  checkKnowledgePacksCallback: function (knowledgePacksInformationResponse) {
    log.debug(knowledgePacksInformationResponse)

    var knowledgePacks = knowledgePacksInformationResponse.loadedKnowledgePacks

    log.debug(knowledgePacks)

    var found = false
    for(var i = 0; i < knowledgePacks.length; i++) {
      if (knowledgePacks[i] == osfKnowledgepackName) {
        found = true
        log.debug(osfKnowledgepackName + ' KP is already loaded!')
        osfInterface.fetchAllTestModuleTypes(content.currentLanguage, content.fetchedTestModuleTypesCallback)
        osfInterface.fetchAllTestResourceTypes(content.currentLanguage, content.fetchedTestResourceTypesCallback)
        osfInterface.fetchAllTestOrderTypes(content.currentLanguage, content.fetchedTestOrderTypesCallback)
        content.revealDashboard()
        break
      }
    }

    if (!found) {
      $("#loadMessage").empty().append("Loading Knowledge Pack '" + osfKnowledgepackName + "'...")
      log.debug(osfKnowledgepackName + ' is NOT LOADED in the OSF backend! Loading it...')
      osfInterface.loadRequiredKnowledgepacks(content.currentLanguage, content.loadRequiredKnowledgepacksCallback)
    }
  },

  loadRequiredKnowledgepacksCallback: function (knowledgepacksLoadedResponse) { //TODO KACA kada se ovo poziva?
    log.debug(knowledgepacksLoadedResponse)

    // KPs have been loaded - now carry on and load the assets!
    $("#loadMessage").empty().append("Loading Assets and Events...")
    osfInterface.fetchAllTestModuleTypes(content.currentLanguage, content.fetchedTestModuleTypesCallback)
    osfInterface.fetchAllTestResourceTypes(content.currentLanguage, content.fetchedTestResourceTypesCallback)
    osfInterface.fetchAllTestOrderTypes(content.currentLanguage, content.fetchedTestOrderTypesCallback)
    content.revealDashboard()
  },

  ruleRegisteredCallback: function (ruleRegisteredResponse) {
    log.debug("Rule Registered: " + ruleRegisteredResponse)
  },

  spinRuleRegisteredCallback: function (spinRuleRegisteredResponse) {
    log.debug("SPIN Rule Registered: " + ruleRegisteredResponse)
  },

  fetchedTestOrderTypesCallback: function (fetchedTestOrdersResponse) {
    log.debug(fetchedTestOrdersResponse)

    content.currentTestOrderTypes = fetchedTestOrdersResponse.results.bindings
    content.updateOrdersTypes(true)
  },

  fetchedTestModuleTypesCallback: function (fetchedTestModulesResponse) {
    log.debug(fetchedTestModulesResponse)

    content.currentTestModuleTypes = fetchedTestModulesResponse.results.bindings
    content.updateModuleTypes(true)
  },

  fetchedTestResourceTypesCallback: function (fetchedTestResourcesResponse) {
    log.debug(fetchedTestResourcesResponse)

    content.currentTestResourcesTypes = fetchedTestResourcesResponse.results.bindings
    content.updateResourcesTypes(true)
  },

  fetchedTestModulesCallback: function (response, moduleType, animateTasks) {
    log.debug(response)
    log.debug(animateTasks)
    content.currentTestModules = response.results.bindings;
    content.updateTestModules(animateTasks)
  },

  fetchedTestResourcesCallback: function (response, animateTasks) {
    log.debug(response)
    log.debug(animateTasks)
    content.currentTestResources = response.results.bindings;
    content.updateTestResources(animateTasks)
  },

  fetchedTestModuleInformationCallback: function (response, animateTasks) {
    content.currentTestModuleInformation = response.results.bindings;

    osfInterface.fetchTestModuleOutputs(content.currentTestModuleInstance, content.currentLanguage).then(function (outputsReponse) {
      content.currentTestModuleOutputs = outputsReponse.results.bindings;

      osfInterface.fetchTestModuleInputs(content.currentTestModuleInstance, content.currentLanguage).then(function(inputsResponse) {
        content.currentTestModuleInputs = inputsResponse.results.bindings;

        if (content.currentTestModuleOutputs.length > 0) {
          // Fetch dependent test modules
          content.fetchDownstreamTestModules()
          content.fetchUpstreamTestModules()
        } else {
          content.updateAssetInspector()
        }

        console.log("Success!", response);
      }, function(error) {
        console.error("Failed!", error);
      })
    })
  },

  fetchedTestResourceInformationCallback: function (response, animateTasks) {
    content.currentTestResourceInformation = response.results.bindings;

    content.updateResourceAssetInspector()
  },

  fetchDownstreamTestModules: function () {
    content.downstreamModules = {}

    for (i = 0; i < content.currentTestModuleOutputs.length; i++) {
      outputURI = content.currentTestModuleOutputs[i].testModuleOutput.value

      osfInterface.fetchTestModulesWithInput(outputURI, content.currentLanguage, function (downstreamModulesResponse) {
        if (downstreamModulesResponse.results.bindings.length > 0) {
          reflectOutputURI = downstreamModulesResponse.results.bindings[0].reflectInput.value
          content.downstreamModules[reflectOutputURI] = []
          for (j = 0; j < downstreamModulesResponse.results.bindings.length; j++) {
            downstreamForOutput = { 'value' : downstreamModulesResponse.results.bindings[j].testModuleLabel.value, 'uri' : downstreamModulesResponse.results.bindings[j].testModule.value}
            content.downstreamModules[reflectOutputURI].push(downstreamForOutput)
            // log.debug("Adding downstream module for " + reflectOutputURI)
          }
        }

        // FIXME This is being called n times at the moment
        content.updateAssetInspector()
      });
    }
  },

  fetchUpstreamTestModules: function () {
    content.upstreamModules = {}

    for (i = 0; i < content.currentTestModuleInputs.length; i++) {
      inputURI = content.currentTestModuleInputs[i].testModuleInput.value

      osfInterface.fetchTestModulesWithOutput(inputURI, content.currentLanguage, function (upstreamModulesResponse) {
        log.debug("Length: " + upstreamModulesResponse.results.bindings.length)

        if (upstreamModulesResponse.results.bindings.length > 0) {
          reflectInputURI = upstreamModulesResponse.results.bindings[0].reflectOutput.value
          content.upstreamModules[reflectInputURI] = []
          for (j = 0; j < upstreamModulesResponse.results.bindings.length; j++) {
            upstreamForOutput = { 'value' : upstreamModulesResponse.results.bindings[j].testModuleLabel.value, 'uri' : upstreamModulesResponse.results.bindings[j].testModule.value}
            content.upstreamModules[reflectInputURI].push(upstreamForOutput)
            log.debug("Adding downstream module for " + reflectInputURI)
          }
        }

        // FIXME This is being called n times at the moment
        content.updateAssetInspector()
      });
    }
  },

  simpleRequestCallback: function (response) {
    log.debug(response)
  },

  showTestOrderForCharacteristicCallback: function (outputsResponse, selectedValues, valueIndex) {
    var connectionsBetweenTestModulesInOrder = outputsResponse.results.bindings
    log.debug(connectionsBetweenTestModulesInOrder)
    log.debug(selectedValues[valueIndex])

    var currentTestOrderForCharacteristicValue
    for (var i = 0; i < content.currentTestOrderTypes.length; i++) {
      if (content.currentTestOrderTypes[i].testOrderTargetCharacteristic.value == selectedValues[valueIndex]) {
        currentTestOrderForCharacteristicValue = content.currentTestOrderTypes[i];
        break
      }
    }

    osfInterface.fetchMissingResourcesForCharacteristic(selectedValues[valueIndex], content.currentLanguage).then(function (outputsReponse) {
      var missingTestResources = outputsReponse.results.bindings;
      log.debug(missingTestResources)

      var $testOrder = $(Handlebars.templates[content.templateIds.testOrdersForCharacteristics]({ testOrder: currentTestOrderForCharacteristicValue, missingTestResources: missingTestResources, connectionsBetweenTestModules: connectionsBetweenTestModulesInOrder }))
      $('#inspector-container').append($testOrder)

      osfInterface.fetchSerializedModulePathForCharacteristic(selectedValues, valueIndex, content.currentLanguage, content.showSerializedModulePathForCharacteristicCallback)
    })
  },

  showModuleInSerializedPathForCharacteristicCallback: function (outputsResponse, testModulesInOrder, moduleIndex, characteristicValues, valueIndex) {
    var testModulesInstances = outputsResponse.results.bindings
    log.debug(characteristicValues[valueIndex])
    log.debug(testModulesInOrder[moduleIndex])
    log.debug(testModulesInstances)

    // show testing module instances for current module type in current test order
    for(var i = 0; i < testModulesInstances.length; i++) {
      content.moduleInstancesInTestOrders[testModulesInOrder[moduleIndex].participatingTestModuleType2.value][testModulesInstances[i].testModule.value] = testModulesInstances[i];
      log.debug(content.moduleInstancesInTestOrders)
    }

    var $testModuleInOrder = $(Handlebars.templates[content.templateIds.moduleInTestOrderForCharacteristic]({ addLineBefore:(moduleIndex!=0), characteristicValue: characteristicValues[valueIndex], testModuleType: testModulesInOrder[moduleIndex], testModulesInstances: testModulesInstances }))
    $("div[id='serializable-test-modules-list-" + characteristicValues[valueIndex] + "']").append($testModuleInOrder)

    // continue to the next module type in current test order, if exists
    // or continue to the next test order if this is the last module type in current test order
    moduleIndex++
    if (moduleIndex < testModulesInOrder.length) {
      var moduleInOrder = testModulesInOrder[moduleIndex]
      content.moduleInstancesInTestOrders[moduleInOrder.participatingTestModuleType2.value] = {};

      osfInterface.fetchOrderModulesForModuleType(testModulesInOrder, moduleIndex, characteristicValues, valueIndex, content.currentLanguage, content.showModuleInSerializedPathForCharacteristicCallback);
    }
    else {
      var $testModulesInOrderInfo = $(Handlebars.templates[content.templateIds.moduleInTestOrderInformation]({ characteristicValue: characteristicValues[valueIndex] }))
      $("div[id='serializable-test-modules-list-" + characteristicValues[valueIndex] + "']").append($testModulesInOrderInfo)

      $("div[id='show-test-order-info-button-" + characteristicValues[valueIndex] + "']").click({ characteristic: characteristicValues[valueIndex] }, content.calculateTestOrderInformationForCurrentSelection)

      valueIndex++
      if (valueIndex < characteristicValues.length) {
        var selectedValue = characteristicValues[valueIndex]
        log.debug(selectedValue)

        osfInterface.fetchTestOrderForCharacteristic(characteristicValues, valueIndex, content.currentLanguage, content.showTestOrderForCharacteristicCallback)
      }
    }
  },

  showSerializedModulePathForCharacteristicCallback: function (outputsResponse, selectedValues, valueIndex) {
    var testModulesInOrder = outputsResponse.results.bindings
    log.debug(selectedValues[valueIndex])

    var modulIndex = 0
    var moduleInOrder = testModulesInOrder[modulIndex]
    log.debug(moduleInOrder)

    if (testModulesInOrder[modulIndex].result.value != 0) {
      content.moduleInstancesInTestOrders[moduleInOrder.participatingTestModuleType2.value] = {}
      log.debug(content.moduleInstancesInTestOrders)
      content.modulesInTestOrders[selectedValues[valueIndex]] = testModulesInOrder
      log.debug(content.modulesInTestOrders)
      osfInterface.fetchOrderModulesForModuleType(testModulesInOrder, modulIndex, selectedValues, valueIndex, content.currentLanguage, content.showModuleInSerializedPathForCharacteristicCallback);
    } else {
      $("div[id='serializable-test-modules-list-" + selectedValues[valueIndex] + "']").append("<span>  No test order for selected characteristic value!</span>")

      valueIndex++
      if (valueIndex < selectedValues.length) {
        var selectedValue = selectedValues[valueIndex]
        log.debug(selectedValue)

        osfInterface.fetchTestOrderForCharacteristic(selectedValues, valueIndex, content.currentLanguage, content.showTestOrderForCharacteristicCallback)
      }
    }
  },

  /** Handling History **/

  simpleHistory : [],

  clickPreviousHandler: function (event) {
    log.debug(content.simpleHistory)
    var step = content.simpleHistory.pop()
    log.debug(step)

    // Go back one step, don't keep this transition in the history
    content.currentLanguage = step.interfaceLanguage
    var mockedClickEvent = { "data": { name: step.elementName, type: step.elementType, keepInHistory: false } }
    content.$languageChooser.val(step.interfaceLanguage);

    content.clickHandler(mockedClickEvent);

    if (content.simpleHistory.length == 0) {
      content.setHistoryActive(false)
    }
  },

  setHistoryActive: function (setActive) {
    if (setActive) {
      log.debug("Activating History")
      content.$backButton.off("click").click({ }, content.clickPreviousHandler)
      content.$backButton.removeClass().addClass("back-button").addClass("button-active")
    } else {
      log.debug("Deactivating History")
      content.$backButton.off("click")
      content.$backButton.removeClass().addClass("back-button")
    }
  },

  recordHistory: function () {
    // TODO Implement later
    // var topHistoryElement = content.simpleHistory[content.simpleHistory.length - 1];
    // var newHistoryElement = { 'elementName' : content.currentObject, 'elementType' : content.currentObjectType, 'interfaceLanguage' : content.currentLanguage }
    //
    // if ( JSON.stringify(topHistoryElement) === JSON.stringify(newHistoryElement) ) {
    //   log.debug("Skipping history recording - no change!")
    // } else {
    //   log.debug("Adding to history: [" + content.currentObject + " / " + content.currentObjectType + " / " + content.currentLanguage + "]")
    //   content.simpleHistory.push( newHistoryElement )
    //   if (content.simpleHistory.length == 1) content.setHistoryActive(true)
    // }
  },

  /** Utilities **/

  highlightSelectedModuleType: function () {
    log.debug("Trigger: " + content.currentTestModuleType)
    $("[element=testingModuleType]").each(function() {
      if ($(this).attr('id') === content.currentTestModuleType) $(this).addClass("highlightBold")
      else $(this).removeClass("highlightBold")
    })
  },

  highlightSelectedResourceType: function () {
    log.debug("Trigger: " + content.currentTestResourceType)
    $("[element=testResourceType]").each(function() {
      if ($(this).attr('id') === content.currentTestResourceType) $(this).addClass("highlightBold")
      else $(this).removeClass("highlightBold")
    })
  },

  highlightSelectedModuleInstance: function () {
    log.debug("Trigger: " + content.currentTestModuleInstance)
    $("[element=testModuleInstance]").each(function() {
      if ($(this).attr('id') === content.currentTestModuleInstance) {
        log.debug("Highlighting " + content.currentTestModuleInstance)
        $(this).addClass("highlightBold")
      }
      else $(this).removeClass("highlightBold")
    })
  },

  highlightSelectedResourceInstance: function () {
    log.debug("Trigger: " + content.currentTestResourceInstance)
    $("[element=testResourceInstance]").each(function() {
      if ($(this).attr('id') === content.currentTestResourceInstance) {
        log.debug("Highlighting " + content.currentTestResourceInstance)
        $(this).addClass("highlightBold")
      }
      else $(this).removeClass("highlightBold")
    })
  },

  resetLanguageChooser: function () {
      // Add change handler to language chooser
      content.$languageChooser.off("change").change(function(e) {
        log.debug("Language changed to " + this.options[e.target.selectedIndex].text);

        // Keep history
        content.recordHistory()
        content.currentLanguage = this.options[e.target.selectedIndex].value;

        content.updateView(true);
      });
    },

  scrollAllListsToTop: function() {
    $('body, html, #variables-content').scrollTop(0);
    $('body, html, #commands-content').scrollTop(0);
    $('body, html, #methods-content').scrollTop(0);
  },

  getFormattedDate: function () {
    var d = new Date();
    d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + "T" + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
    return d;
  },

  uuidv4: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

}
