/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/domManager.js":
/*!***************************!*\
  !*** ./src/domManager.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\n\n\nlet DomManger = (WeatherLoader) => {\n  let currentWeatherIcon = document.getElementById(\"currentWeatherIcon\");\n  let currentWeatherDiv = document.getElementById(\"currentWeatherDiv\");\n  let weatherForecastDiv = document.getElementById(\"weatherForecastDiv\");\n  let submitFormButton = document.getElementById(\"submitFormButton\");\n  let unitSelector = document.getElementById(\"unitSelector\")\n\n  let cityName = document.getElementById(\"cityName\");\n  let countryName = document.getElementById(\"countryName\");\n  \n  let initiate = () => {\n    submitFormButton.addEventListener(\"click\", (event) => {\n      event.preventDefault();\n      let city = cityName.value\n      let country=countryName.value\n      if (!(/([^\\s])/.test(city))) {\n        alert(\"City name can't empty!\");\n        return;\n      }\n      if (!(/([^\\s])/.test(country))) {\n        country=null;\n      }\n      \n      let units = unitSelector.options[unitSelector.selectedIndex].value;\n      loadWeather({\n        city,\n        country,\n        units\n      })\n    })\n  }\n\n  let loadWeather = ({\n    city,\n    country,\n    units\n  }) => {\n\n    WeatherLoader.loadCurrentWeather({\n      city,\n      country,\n      units\n    }).then(\n      (response) => {\n        currentWeatherDiv.innerHTML = '';\n        currentWeatherIcon.classList.remove(\"d-none\")\n        currentWeatherIcon.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`\n        currentWeatherDiv.appendChild(currentWeatherIcon)\n        renderResultsInsideCards({\n          div: currentWeatherDiv,\n          results: response,\n          location: true\n        })\n      }\n    ).catch(\n      (error) => {\n        currentWeatherDiv.innerHTML = `\n        <div class=\"bg-danger p-5 text-center\">\n          The following error occured :<br/>  \n          ${ error }\n        </div>\n        `\n      }\n    )\n    WeatherLoader.load5DaysWeather({\n      city,\n      country,\n      units\n    }).then(\n      (response) => {\n        weatherForecastDiv.innerHTML = '';\n        response.list.forEach(\n          (element) => {\n            let cardBody = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n              type: \"div\"\n            })\n            renderResultsInsideCards({\n              div: cardBody,\n              results: element,\n              date: true,\n              icon: true\n            })\n            let card = createCard(cardBody.innerHTML)\n            weatherForecastDiv.appendChild(card);\n          }\n        )\n      }\n    ).catch(\n      (error) => {\n        weatherForecastDiv.innerHTML = `\n        <div class=\"bg-danger w-100 mt-3 p-5 text-center\">\n          The following error occured :<br/>  \n          ${ error }\n        </div>\n        `\n      }\n    )\n  }\n\n  let createCard = (content) => {\n    let card = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n      type: \"div\"\n    })\n    card.classList.add(\"col-md-4\")\n    card.classList.add(\"p-1\")\n    card.innerHTML = `\n    <div class=\"card\">\n        <div class=\"card-body p-1\">\n        ${content}\n        </div>\n    </div>\n    `\n    return card;\n  }\n  let renderResultsInsideCards = ({\n    div,\n    results,\n    date = false,\n    location = false,\n    icon = false\n  }) => {\n    if (icon) {\n      let img = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n        type: \"img\",\n      })\n      img.src = `http://openweathermap.org/img/wn/${results.weather[0].icon}@2x.png`\n      img.classList.add(\"m-auto\");\n      img.classList.add(\"d-block\");\n      div.appendChild(img)\n    }\n    if (location) {\n      div.appendChild(Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n        type: \"p\",\n        text: `Location : ${results.name} (${results.sys.country})`,\n        _class: \"card-text\"\n      }))\n    }\n    let description = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n      type: \"div\"\n    })\n    description.innerHTML = `\n    \n    <p class=\"card-text mb-2\"> \n      ${results.weather[0].main}\n      <small>(${results.weather[0].description})</small>\n    </p>\n    `\n    div.appendChild(description)\n\n    let temp = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n      type: \"div\"\n    })\n    temp.classList.add(\"d-flex\", \"flex-wrap\")\n    temp.innerHTML = `\n    <div class=\"d-flex flex-nowrap\">\n      <i class=\"fas fa-temperature-low\"></i>${results.main.temp}°\n    </div>\n    <div class=\"d-flex flex-nowrap\">\n      <i class=\"fas fa-arrow-circle-up\"></i>${results.main.temp_min}°\n    </div>\n    <div class=\"d-flex flex-nowrap\">\n      <i class=\"fas fa-arrow-circle-down\"></i>${results.main.temp_max}°\n    </div>\n    `\n    div.appendChild(temp)\n    let wind = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n      type: \"div\"\n    })\n    wind.classList.add(\"d-flex\", \"flex-wrap\")\n    wind.innerHTML = `\n    <div class=\"d-flex flex-nowrap\">\n    <i class=\"fas fa-wind\"></i> \n    ${results.wind.speed} Km/h\n    </div>\n    <div class=\"d-flex flex-nowrap\">\n    <i class=\"far fa-compass\"></i> \n    ${results.wind.deg} °\n    </div>\n    `\n    div.appendChild(wind)\n\n    let humidityAndPressure = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n      type: \"div\"\n    })\n    humidityAndPressure.classList.add(\"d-flex\", \"flex-wrap\")\n    humidityAndPressure.innerHTML = `\n    <div class=\"d-flex flex-nowrap\">\n    <i class=\"fas fa-tachometer-alt\"></i>\n    ${results.main.pressure}\n    </div>\n    <div class=\"d-flex flex-nowrap\">\n    <i class=\"fas fa-tint\"></i>\n    ${results.main.humidity}\n    </div>\n    `\n    div.appendChild(humidityAndPressure)\n\n    if (date) {\n      let dateDiv = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n        type: \"div\"\n      })\n      dateDiv.innerHTML = `\n      <i class=\"far fa-clock\"></i>\n      ${results.dt_txt}\n      `\n      div.appendChild(dateDiv)\n    }\n  }\n  return {\n    initiate,\n    loadWeather\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DomManger);\n\n//# sourceURL=webpack:///./src/domManager.js?");

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst createElement = ({type, text = null, value = null, _class = null}) => {\n  const node = document.createElement(type);\n  if (text !== null) {\n    const textNode = document.createTextNode(text);\n    node.appendChild(textNode);\n  }\n  if (value !== null) {\n    node.setAttribute('value', value);\n  }\n  if (_class !== null) {\n    node.classList.add(_class);\n  }\n  return node;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createElement);\n\n\n//# sourceURL=webpack:///./src/helpers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _weather_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather-loader */ \"./src/weather-loader.js\");\n/* harmony import */ var _domManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domManager */ \"./src/domManager.js\");\n\n\n\nlet domManager=Object(_domManager__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_weather_loader__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\ndomManager.initiate()\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/weather-loader.js":
/*!*******************************!*\
  !*** ./src/weather-loader.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst WeatherLoader = (() => {\n  let key = \"d244c1a420bbb9c01c0c9d14d0126fe0\"\n  let baseUrl = \"http://api.openweathermap.org/data/2.5\"\n\n  let loadCurrentWeather = ({\n    city,\n    country = null,\n    units = null\n  }) => {\n    return loadWeather({\n      city,\n      country,\n      units,\n      path: \"weather\"\n    })\n  }\n  let load5DaysWeather = ({\n    city,\n    country = null,\n    units = null\n  }) => {\n    return loadWeather({\n      city,\n      country,\n      units,\n      path: \"forecast\"\n    })\n  }\n\n  let loadWeather = ({\n    city,\n    country = null,\n    units = null,\n    path\n  }) => {\n    let url;\n    let tempsUnits = (units == \"F\") ? \"imperial\" : \"metric\";\n    if (country !== null) {\n      url = `${baseUrl}/${path}?q=${city},${country}&units=${tempsUnits}&APPID=${key}`\n    } else {\n      url = `${baseUrl}/${path}?q=${city}&units=${tempsUnits}&APPID=${key}`\n    }\n    return (\n      fetch(url).then(\n        response =>\n        response.json()\n      )\n    ).then(\n      response => {\n        console.log(response)\n        if (response.cod != 200) {\n          throw Error(response.message)\n        }\n        return response;\n      }\n    )\n\n  };\n  return {\n    loadCurrentWeather,\n    load5DaysWeather\n  }\n})()\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (WeatherLoader);\n\n//# sourceURL=webpack:///./src/weather-loader.js?");

/***/ })

/******/ });