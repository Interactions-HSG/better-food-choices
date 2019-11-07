// Cognitive Infrastructure Interface
// (c) Simon Mayer | Pro2Future GmbH
//
// This module handles all CI callbacks. We use CI's (faster, cacheable, etc.) simple query endpoint (GET; see /webresources/apidoc/#semanticQuery)
// for queries that are safe not to violate the URL length limit and its POST (see /webresources/apidoc/#semanticQueryAlt) endpoint for the others.

var osfHostname = 'localhost'
var osfPort = '8080'
var osfKnowledgepackName = 'avl-testing'

var osfInterface = {

  // OSF settings
  osfURL: window.location.protocol + '//' + osfHostname + ':' + osfPort,

  default_timeout: 5000,
  init_timeout: 20000,    // Higher timeout for initialization because of device model loading

  keepInferencing: function () {
    log.debug("Triggering inferences (interval: " + inferenceInterval + "ms)")
    setInterval(osfInterface.triggerInferences, inferenceInterval)
  },

  triggerInferences: function () {
    log.debug("Triggering OSF Inferences")

    $.ajax({
      type: 'PUT',
      url: osfInterface.osfURL + '/v1/inference/',
      cache: false,
      async: true,
      timeout: osfInterface.default_timeout,
    }).done(function (result) {
      log.debug("Success: triggerInferences")
    }).fail(function (jqXHR, textStatus, errorThrown) {
      log.error('Failure triggerInferences: ' + jqXHR.statusText);
    })
  },

  fetchLoadedKnowledgepacks: function (currentLanguage, callback) {
    log.debug("Loading loaded knowledge packs (language: " + currentLanguage + ")")

    $.ajax({
      type: 'GET',
      url: osfInterface.osfURL + '/v1/knowledgepacks/',
      headers: {
        'Accept-Language': currentLanguage,
      },
      dataType: 'json',
      cache: false,
      async: true,
      timeout: osfInterface.default_timeout,
    }).done(function (result) {
      log.debug("Success: loadLoadedKnowledgepacks")
      callback(result)
    }).fail(function (jqXHR, textStatus, errorThrown) {
      log.error('Failure loadLoadedKnowledgepacks: ' + jqXHR.statusText);
    })
  },

  loadRequiredKnowledgepacks: function (currentLanguage, callback) {
    log.debug("Loading knowledge pack " + osfKnowledgepackName + " (language: " + currentLanguage + ")")

    $.ajax({
      type: 'PUT',
      url: osfInterface.osfURL + '/v1/knowledgepacks/',
      headers: {
        'Accept-Language': currentLanguage,
      },
      contentType: 'application/json',
      data: JSON.stringify({
        "loadedKnowledgePacks": [ osfKnowledgepackName ]
      }),
      cache: false,
      async: true,
      timeout: osfInterface.default_timeout,
    }).done(function (result) {
      log.debug("Success: checkKnowledgePacks")
      callback(result)
    }).fail(function (jqXHR, textStatus, errorThrown) {
      log.error('Failure checkKnowledgePacks: ' + jqXHR.statusText);
    })
  },

  fetchAllTestModuleTypes: function (currentLanguage, callback) {
    log.debug("Fetching AVL test module types (language: " + currentLanguage + ")")

    $.ajax({
      type: 'GET',
      url: osfInterface.osfURL + '/v1/queries/AllTestingModuleTypes',
      headers: {
        'Accept-Language': currentLanguage,
      },
      dataType: 'json',
      cache: false,
      async: true,
      timeout: osfInterface.default_timeout,
    }).done(function (result) {
      log.debug("Success: fetchModules")
      callback(result)
    }).fail(function (jqXHR, textStatus, errorThrown) {
      log.error('Failure fetching module types: ' + jqXHR.statusText);
    })
  },

  fetchAllTestResourceTypes: function (currentLanguage, callback) {
    log.debug("Fetching AVL test resource types (language: " + currentLanguage + ")")

    $.ajax({
      type: 'GET',
        url: osfInterface.osfURL + '/v1/queries/AllTestResourceTypes',
      headers: {
        'Accept-Language': currentLanguage,
      },
      dataType: 'json',
      cache: false,
      async: true,
      timeout: osfInterface.default_timeout,
    }).done(function (result) {
      log.debug("Success: fetchResources")
      callback(result)
    }).fail(function (jqXHR, textStatus, errorThrown) {
      log.error('Failure fetching resource types: ' + jqXHR.statusText);
    })
  },

  fetchAllTestOrderTypes: function (currentLanguage, callback) {
    log.debug("Fetching AVL test order types (language: " + currentLanguage + ")")

    $.ajax({
      type: 'GET',
        url: osfInterface.osfURL + '/v1/queries/AllTestOrders',
      headers: {
        'Accept-Language': currentLanguage,
      },
      dataType: 'json',
      cache: false,
      async: true,
      timeout: osfInterface.default_timeout,
    }).done(function (result) {
      log.debug("Success: fetchOrders")
      callback(result)
    }).fail(function (jqXHR, textStatus, errorThrown) {
      log.error('Failure fetching order types: ' + jqXHR.statusText);
    })
  },

  fetchModulesForModuleType: function (moduleType, currentLanguage, callback) {
    log.debug("Fetching AVL test modules with type " + moduleType + " (language: " + currentLanguage + ")")

    moduleTypeURLencoded = encodeURIComponent(moduleType);

    $.ajax({
      type: 'GET',
      url: osfInterface.osfURL + '/v1/queries/TestModulesWithType?testModuleType=' + moduleTypeURLencoded,
      headers: {
        'Accept-Language': currentLanguage,
      },
      dataType: 'json',
      cache: false,
      async: true,
      timeout: osfInterface.default_timeout,
    }).done(function (result) {
      log.debug("Success: fetchModules")
      callback(result)
    }).fail(function (jqXHR, textStatus, errorThrown) {
      log.error('Failure fetching module with given type: ' + jqXHR.statusText);
    })
  },

  fetchOrderModulesForModuleType: function (testModulesInOrder, moduleIndex, characteristicValues, valueIndex, currentLanguage, callback) {
    moduleType = testModulesInOrder[moduleIndex].participatingTestModuleType2.value
    log.debug("Fetching AVL test modules with type " + moduleType + " (language: " + currentLanguage + ")")

    moduleTypeURLencoded = encodeURIComponent(moduleType);

    $.ajax({
      type: 'GET',
      url: osfInterface.osfURL + '/v1/queries/TestModulesWithType?testModuleType=' + moduleTypeURLencoded,
      headers: {
        'Accept-Language': currentLanguage,
      },
      dataType: 'json',
      cache: false,
      async: true,
      timeout: osfInterface.default_timeout,
    }).done(function (result) {
      log.debug("Success: fetchModules")
      callback(result, testModulesInOrder, moduleIndex, characteristicValues, valueIndex)
    }).fail(function (jqXHR, textStatus, errorThrown) {
      log.error('Failure fetching module with given type: ' + jqXHR.statusText);
    })
  },

  fetchResourcesForResourceType: function (resourceType, currentLanguage, callback) {
    log.debug("Fetching AVL test resources with type " + resourceType + " (language: " + currentLanguage + ")")

    resourceTypeURLencoded = encodeURIComponent(resourceType);

    $.ajax({
      type: 'GET',
      url: osfInterface.osfURL + '/v1/queries/TestResourcesWithType?testResourceType=' + resourceTypeURLencoded,
      headers: {
        'Accept-Language': currentLanguage,
      },
      dataType: 'json',
      cache: false,
      async: true,
      timeout: osfInterface.default_timeout,
    }).done(function (result) {
      log.debug("Success: fetchResources")
      callback(result)
    }).fail(function (jqXHR, textStatus, errorThrown) {
      log.error('Failure fetching resource with given type: ' + jqXHR.statusText);
    })
  },

  fetchModuleInformation: function (moduleURL, currentLanguage, callback) {
    log.debug("Fetching information on module " + moduleURL + " (language: " + currentLanguage + ")")

    moduleURLurlEncoded = encodeURIComponent(moduleURL);

    $.ajax({
      type: 'GET',
      url: osfInterface.osfURL + '/v1/queries/TestModuleInformation?testModule=' + moduleURLurlEncoded,
      headers: {
        'Accept-Language': currentLanguage,
      },
      dataType: 'json',
      cache: false,
      async: true,
      timeout: osfInterface.default_timeout,
    }).done(function (result) {
      log.debug("Success: fetchModules")
      callback(result)
    }).fail(function (jqXHR, textStatus, errorThrown) {
      log.error('Failure fetching module information: ' + jqXHR.statusText);
    })
  },

  fetchResourceInformation: function (resourceURL, currentLanguage, callback) {
    log.debug("Fetching information on resource " + resourceURL + " (language: " + currentLanguage + ")")

    resourceURLurlEncoded = encodeURIComponent(resourceURL);

    $.ajax({
      type: 'GET',
      url: osfInterface.osfURL + '/v1/queries/TestResourceInformation?testResource=' + resourceURLurlEncoded,
      headers: {
        'Accept-Language': currentLanguage,
      },
      dataType: 'json',
      cache: false,
      async: true,
      timeout: osfInterface.default_timeout,
    }).done(function (result) {
      log.debug("Success: fetchResources")
      callback(result)
    }).fail(function (jqXHR, textStatus, errorThrown) {
      log.error('Failure fetching resource information: ' + jqXHR.statusText);
    })
  },

  fetchTestModuleOutputs: function (moduleURL, currentLanguage) {
    log.debug("Fetching outputs of module " + moduleURL + " (language: " + currentLanguage + ")")

    moduleURLurlEncoded = encodeURIComponent(moduleURL);

    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'GET',
        url: osfInterface.osfURL + '/v1/queries/TestModuleOutputs?testModule=' + moduleURLurlEncoded,
        headers: {
          'Accept-Language': currentLanguage,
        },
        dataType: 'json',
        cache: false,
        async: true,
        timeout: osfInterface.default_timeout,
      }).done(function (result) {
        log.debug("Success: fetchModuleOutputs")
        resolve(result)
      }).fail(function (jqXHR, textStatus, errorThrown) {
        log.error('Failure fetching outputs of module: ' + jqXHR.statusText);
        reject(Error(jqXHR.statusText))
      })
    })
  },

  fetchTestModuleInputs: function (moduleURL, currentLanguage) {
    log.debug("Fetching inputs of module " + moduleURL + " (language: " + currentLanguage + ")")

    moduleURLurlEncoded = encodeURIComponent(moduleURL);

    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'GET',
        url: osfInterface.osfURL + '/v1/queries/TestModuleInputs?testModule=' + moduleURLurlEncoded,
        headers: {
          'Accept-Language': currentLanguage,
        },
        dataType: 'json',
        cache: false,
        async: true,
        timeout: osfInterface.default_timeout,
      }).done(function (result) {
        log.debug("Success: fetchModuleInputs")
        resolve(result)
      }).fail(function (jqXHR, textStatus, errorThrown) {
        log.error('Failure fetching inputs of module: ' + jqXHR.statusText);
        reject(Error(jqXHR.statusText))
      })
    })
  },

  fetchTestModulesWithInput: function (inputURL, currentLanguage, callback) {
    log.debug("Fetching test modules with input " + inputURL + " (language: " + currentLanguage + ")")

    inputURLurlEncoded = encodeURIComponent(inputURL);

    $.ajax({
      type: 'GET',
      url: osfInterface.osfURL + '/v1/queries/TestModulesWithInput?input=' + inputURLurlEncoded,
      headers: {
        'Accept-Language': currentLanguage,
      },
      dataType: 'json',
      cache: false,
      async: true,
      timeout: osfInterface.default_timeout,
    }).done(function (result) {
      log.debug("Success: fetch modules with input " + inputURL)
      callback(result)
    }).fail(function (jqXHR, textStatus, errorThrown) {
      log.error('Failure fetching module with input: ' + jqXHR.statusText);
    })
  },

  fetchTestModulesWithOutput: function (outputURI, currentLanguage, callback) {
    log.debug("Fetching test modules with output " + outputURI + " (language: " + currentLanguage + ")")

    outputURLurlEncoded = encodeURIComponent(outputURI);

    $.ajax({
      type: 'GET',
      url: osfInterface.osfURL + '/v1/queries/TestModulesWithOutput?output=' + outputURLurlEncoded,
      headers: {
        'Accept-Language': currentLanguage,
      },
      dataType: 'json',
      cache: false,
      async: true,
      timeout: osfInterface.default_timeout,
    }).done(function (result) {
      log.debug("Success: fetch modules with output " + outputURI)
      log.debug(result)
      callback(result)
    }).fail(function (jqXHR, textStatus, errorThrown) {
      log.error('Failure fetching module with output: ' + jqXHR.statusText);
    })
  },

  createTestModuleInstance: function (moduleTypeURI, currentLanguage) {
    log.debug("Creating new test module instance of module " + moduleTypeURI + " (language: " + currentLanguage + ")")
    moduleTypeURIurlEncoded = encodeURIComponent(moduleTypeURI);

    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'GET',
        url: osfInterface.osfURL + '/v1/queries/CreateTestingModuleInstance?testingModuleType=' + moduleTypeURIurlEncoded,
        headers: {
          'Accept-Language': currentLanguage,
        },
        dataType: 'json',
        cache: false,
        async: true,
        timeout: osfInterface.default_timeout,
      }).done(function (result) {
        log.debug("Success: createTestModuleInstance")
        resolve(result)
      }).fail(function (jqXHR, textStatus, errorThrown) {
        // FIXME This is a parsing problem...
        resolve()
      })
    })
  },

  createTestResourceInstance: function (resourceTypeURI, currentLanguage) {
    log.debug("Creating new test resource instance of resource " + resourceTypeURI + " (language: " + currentLanguage + ")")
    resourceTypeURIurlEncoded = encodeURIComponent(resourceTypeURI);

    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'GET',
        url: osfInterface.osfURL + '/v1/queries/CreateTestResourceInstance?testResourceType=' + resourceTypeURIurlEncoded,
        headers: {
          'Accept-Language': currentLanguage,
        },
        dataType: 'json',
        cache: false,
        async: true,
        timeout: osfInterface.default_timeout,
      }).done(function (result) {
        log.debug("Success: createTestResourceInstance")
        resolve(result)
      }).fail(function (jqXHR, textStatus, errorThrown) {
        // FIXME This is a parsing problem...
        resolve()
      })
    })
  },

  deleteTestResourceInstance: function (resourceTypeURI, currentLanguage) {
    log.debug("Deleting test resource instance of resource " + resourceTypeURI + " (language: " + currentLanguage + ")")
    resourceTypeURIurlEncoded = encodeURIComponent(resourceTypeURI);

    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'GET',
        url: osfInterface.osfURL + '/v1/queries/DeleteTestResourceInstance?testResourceInstance=' + resourceTypeURIurlEncoded,
        headers: {
          'Accept-Language': currentLanguage,
        },
        dataType: 'json',
        cache: false,
        async: true,
        timeout: osfInterface.default_timeout,
      }).done(function (result) {
        log.debug("Success: deleteTestResourceInstance")
        resolve(result)
      }).fail(function (jqXHR, textStatus, errorThrown) {
        // FIXME This is a parsing problem...
        resolve()
      })
    })
  },

  fetchCharacteristicValues: function (currentLanguage) {
    log.debug("Fetching characteristic values (language: " + currentLanguage + ")")

    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'GET',
        url: osfInterface.osfURL + '/v1/queries/AllCharacteristicValues',
        headers: {
          'Accept-Language': currentLanguage,
        },
        dataType: 'json',
        cache: false,
        async: true,
        timeout: osfInterface.default_timeout,
      }).done(function (result) {
        log.debug("Success: loadCharacteristicValues")
        resolve(result)
      }).fail(function (jqXHR, textStatus, errorThrown) {
        log.error('Failure fetching characteristic values: ' + jqXHR.statusText);
      })
    })
  },

  fetchTestOrderForCharacteristic: function (characteristicValues, valueIndex, currentLanguage, callback) {
    log.debug("Fetching test order for selected characteristics (language: " + currentLanguage + ")")

    characteristicValue = characteristicValues[valueIndex]
    characteristicValueURLencoded = encodeURIComponent(characteristicValue)

    $.ajax({
      type: 'GET',
      url: osfInterface.osfURL + '/v1/queries/TestModuleConnectionsForCharacteristic?targetCharacteristic=' + characteristicValueURLencoded,
      headers: {
        'Accept-Language': currentLanguage,
      },
      dataType: 'json',
      cache: false,
      async: true,
      timeout: osfInterface.default_timeout,
    }).done(function (result) {
      log.debug("Success: Fetching test order")
      callback(result, characteristicValues, valueIndex)
    }).fail(function (jqXHR, textStatus, errorThrown) {
      log.error('Failure fetching test orders: ' + jqXHR.statusText);
    })
  },

  fetchTestStagesForCharacteristic: function (characteristicValues, valueIndex, currentLanguage) {
    log.debug("Fetching test stages for selected characteristics (language: " + currentLanguage + ")")

    characteristicValue = characteristicValues[valueIndex]
    characteristicValueURLencoded = encodeURIComponent(characteristicValue)
    log.debug(characteristicValue)
    log.debug(characteristicValueURLencoded)

    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'GET',
        url: osfInterface.osfURL + '/v1/queries/TestModuleForCharacteristic?testOrderTargetCharacteristic=' + characteristicValueURLencoded,
        headers: {
          'Accept-Language': currentLanguage,
        },
        dataType: 'json',
        cache: false,
        async: true,
        timeout: osfInterface.default_timeout,
      }).done(function (result) {
        log.debug("Success: fetchTestStages")
        log.debug(osfInterface.osfURL + '/v1/queries/TestModuleForCharacteristic?testOrderTargetCharacteristic=' + characteristicValueURLencoded)
        resolve(result)
      }).fail(function (jqXHR, textStatus, errorThrown) {
        log.error('Failure fetching test stages: ' + jqXHR.statusText);
      })
    })
  },

  fetchTestStageFollowerForCurrentState: function (index, currentStage, currentProbability, currentLevel, currentMaturity, sumDuration, sumPrice, currentLanguage, calback) {
    log.debug("Fetching test stage follower for current state (language: " + currentLanguage + ")")

    currentStageURLencoded = encodeURIComponent(currentStage)

    $.ajax({
      type: 'GET',
      url: osfInterface.osfURL + '/v1/queries/StageFollowerForCurrentState?targetTestStageType=' + currentStageURLencoded
                                + '&currentProbability=' + currentProbability
                                + '&currentLevel=' + currentLevel
                                + '&currentMaturity=' + currentMaturity
                                + '&sumDuration=' + sumDuration
                                + '&?sumPrice=' + sumPrice,
      headers: {
        'Accept-Language': currentLanguage,
      },
      dataType: 'json',
      cache: false,
      async: true,
      timeout: osfInterface.default_timeout,
    }).done(function (result) {
      log.debug("Success: fetchTestStageFollowerForCurrentState")
      calback(result, index)
    }).fail(function (jqXHR, textStatus, errorThrown) {
      log.error('Failure fetching test stage follower for current state: ' + jqXHR.statusText);
    })
  },

  fetchMissingResourcesForCharacteristic: function (characteristicValue, currentLanguage) {
    log.debug("Fetching missing test resources for characteristic values (language: " + currentLanguage + ")")

    characteristicValueURLencoded = encodeURIComponent(characteristicValue)

    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'GET',
        url: osfInterface.osfURL + '/v1/queries/TestOrderMissingResources?characteristicValue=' + characteristicValueURLencoded,
        headers: {
          'Accept-Language': currentLanguage,
        },
        dataType: 'json',
        cache: false,
        async: true,
        timeout: osfInterface.default_timeout,
      }).done(function (result) {
        log.debug("Success: fetchMissingResources")
        resolve(result)
      }).fail(function (jqXHR, textStatus, errorThrown) {
        log.error('Failure fetching missing test resources: ' + jqXHR.statusText);
      })
    })
  },

  fetchSerializedModulePathForCharacteristic: function (characteristicValues, valueIndex, currentLanguage, callback) {
    log.debug("Fetching modules order for selected characteristics (language: " + currentLanguage + ")")

    characteristicValue = characteristicValues[valueIndex]
    characteristicValueURLencoded = encodeURIComponent(characteristicValue)

    $.ajax({
      type: 'GET',
      url: osfInterface.osfURL + '/v1/queries/TestModuleSerializedPathForCharacteristic?targetCharacteristic=' + characteristicValueURLencoded,
      headers: {
        'Accept-Language': currentLanguage,
      },
      dataType: 'json',
      cache: false,
      async: true,
      timeout: osfInterface.default_timeout,
    }).done(function (result) {
      log.debug("Success: Fetching modules order")
      callback(result, characteristicValues, valueIndex)
    }).fail(function (jqXHR, textStatus, errorThrown) {
      log.error('Failure fetching modules orders: ' + jqXHR.statusText);
    })
  }

}
