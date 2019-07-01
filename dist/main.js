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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _radial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./radial */ \"./src/radial.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _load__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./load */ \"./src/load.js\");\n\r\n\r\n\r\n\r\nObject(_load__WEBPACK_IMPORTED_MODULE_2__[\"initLoad\"])();\r\nwindow.state = null;\r\n\r\nconst input = document.querySelector(\"#seed-input\");\r\nconst helpIcon = document.querySelector(\"#help-icon\");\r\nconst helpText = document.querySelector(\".help-text\");\r\nconst loading = document.querySelector(\".loading\");\r\nconst info = document.querySelector(\".info\");\r\nconst infoChange = document.querySelector(\".info-change\");\r\ninput.setAttribute(\"disabled\", true);\r\n\r\nd3.select(\"#count\")\r\n    .transition()\r\n        .duration(20000)\r\n        .tween(\"text\", function() {\r\n            const that = d3.select(this);\r\n            return t => that.text(d3.format(\",d\")(d3.interpolateNumber(0, 946866)(t)))\r\n        })\r\n\r\nd3.json(\"https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/catena-db/by_etym.json\")\r\n    .then(data => {\r\n        window.state = data;\r\n\r\n        const seed = _util__WEBPACK_IMPORTED_MODULE_1__[\"find\"](\"catena\");\r\n        _radial__WEBPACK_IMPORTED_MODULE_0__[\"update\"](seed);\r\n\r\n        loading.setAttribute(\"style\", \"display: none\");\r\n        helpText.classList.add(\"hidden\");\r\n        helpIcon.classList.remove(\"help-icon-dark\");\r\n        helpIcon.classList.add(\"help-icon\");\r\n        info.removeAttribute(\"style\");\r\n    });\r\n\r\ninput.addEventListener(\"keydown\", e => {\r\n    if (e.key === \"Enter\") {\r\n        e.preventDefault();\r\n        const seed = _util__WEBPACK_IMPORTED_MODULE_1__[\"find\"](input.value);\r\n        if (seed) {\r\n            _radial__WEBPACK_IMPORTED_MODULE_0__[\"update\"](seed)\r\n        } else {\r\n            alert(\"don't have that word in the database :(\")\r\n        }   \r\n        input.value = \"\";\r\n        infoChange.textContent = \"Enter your word above.\"\r\n    }    \r\n});\r\n\r\ninput.addEventListener(\"input\", e => {\r\n    if (e.currentTarget.value.length > 0) {\r\n        infoChange.textContent = \"Press Enter to build your chain.\"\r\n    } else {\r\n        infoChange.textContent = \"Enter your word above.\"\r\n    }\r\n});\r\n\r\ninput.addEventListener(\"focus\", e => {\r\n    e.currentTarget.placeholder = \"\";\r\n});\r\n\r\ninput.addEventListener(\"blur\", e => {\r\n    e.currentTarget.placeholder = \"/caˈtē.na/\";\r\n})\r\n\r\nhelpIcon.addEventListener(\"mouseenter\", e => {\r\n    helpText.classList.remove(\"hidden\");\r\n});\r\n\r\nhelpIcon.addEventListener(\"mouseleave\", e => {\r\n    helpText.classList.add(\"hidden\");\r\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/load.js":
/*!*********************!*\
  !*** ./src/load.js ***!
  \*********************/
/*! exports provided: initLoad, drawLoad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initLoad\", function() { return initLoad; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawLoad\", function() { return drawLoad; });\nconst initLoad = () => {\r\n\r\n    let pathLength;\r\n    const width = 50;\r\n    const height = 50;\r\n    const radius = 25;\r\n    const numDashes = 2;\r\n    const spacing = .5;\r\n    \r\n    const svg = d3.select(\"#svg\")\r\n        .append(\"svg\")\r\n        .classed(\"load\", true)\r\n        .attr(\"width\", 100)\r\n        .attr(\"height\", 100);\r\n    \r\n    const wheel = svg.append(\"path\")\r\n        .attr(\"d\", `M ${width / 2 + radius}, ${height / 2}\r\n            a ${radius} ${radius} 0 1 1 0 ${radius * 2}\r\n            ${radius} ${radius} 0 1 1 0 ${-radius * 2} z`)\r\n        .attr(\"fill\", \"none\")\r\n        .attr(\"stroke-width\", 5)\r\n        .attr(\"stroke-dasharray\", function () {\r\n            pathLength = this.getTotalLength();\r\n            return [(pathLength / numDashes) * (1 - spacing), (pathLength / numDashes) * spacing].join(' ');\r\n        })\r\n        .attr(\"stroke-dashoffset\", (pathLength / numDashes) * (1 - spacing) / 2);\r\n    \r\n    const forwardTween = () => {\r\n        return d3.interpolateString(`rotate(0, 50, 50)`, `rotate(360, 50, 50)`);\r\n    };\r\n\r\n    const backwardTween = () => {\r\n        return d3.interpolateString(`rotate(360, 50, 50)`, `rotate(0, 50, 50)`);\r\n    };\r\n    \r\n    wheel.attr(\"stroke\", \"black\")\r\n        .transition()\r\n            .on(\"start\", function repeat() {\r\n                d3.active(this)\r\n                    .transition()\r\n                        .duration(4000)\r\n                        .attr(\"stroke\", \"#dcdcdc\")\r\n                        .attrTween(\"transform\", forwardTween)\r\n                    .transition()\r\n                        .duration(4000)\r\n                        .attr(\"stroke\", \"black\")\r\n                        .attrTween(\"transform\", backwardTween)\r\n                    .on(\"start\", repeat);\r\n            });\r\n\r\n}\r\n\r\nconst drawLoad = seed => {\r\n    const svg = d3.select(\"#svg\")\r\n        .append(\"svg\")\r\n    \r\n    const text = svg.append(\"text\")\r\n        .classed(\"building\", true)\r\n            .text(`Building chain: ${seed.word}`)\r\n\r\n    const box = text.node().getBBox();\r\n\r\n    svg.attr(\"viewBox\", `${box.x} ${box.y} ${box.width} ${box.height}`)\r\n        .attr(\"width\", `${box.width}`)\r\n        .attr(\"height\", `${box.height}`);\r\n}\n\n//# sourceURL=webpack:///./src/load.js?");

/***/ }),

/***/ "./src/radial.js":
/*!***********************!*\
  !*** ./src/radial.js ***!
  \***********************/
/*! exports provided: draw, getBoxMeasure, drawNodes, discard, update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"draw\", function() { return draw; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getBoxMeasure\", function() { return getBoxMeasure; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawNodes\", function() { return drawNodes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"discard\", function() { return discard; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"update\", function() { return update; });\n/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tree */ \"./src/tree.js\");\n/* harmony import */ var _load__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./load */ \"./src/load.js\");\n\r\n\r\n\r\nconst draw = source => {\r\n\r\n    const svg = d3.select(\"#svg\")\r\n        .append(\"svg\")\r\n            .attr(\"width\", 800)\r\n            .attr(\"height\", 800);\r\n\r\n    const windowScale = d3.scaleLinear()\r\n        .domain([0, 2000])\r\n        .range([500, 2000]);\r\n\r\n    const box = getBoxMeasure(svg, source);\r\n    svg.attr(\"viewBox\", `${box.x} ${box.y} ${box.width} ${box.height}`)\r\n        .attr(\"width\", `${windowScale(box.width)}`)\r\n        .attr(\"height\", `${windowScale(box.height)}`);\r\n\r\n    const t = svg.transition()\r\n        .duration(300);\r\n\r\n    let pathLength;\r\n    const pathTween = () => d3.interpolateNumber(pathLength, 0);\r\n\r\n    svg.selectAll(\"path\")\r\n        .data(source.links(), d => d.source.id)\r\n        .enter()\r\n        .append(\"path\")\r\n            .classed(\"path\", true)\r\n            .attr(\"stroke\", \"none\")\r\n            .attr(\"d\", d3.linkRadial()\r\n                .angle(d => (d.x * Math.PI / 180))\r\n                .radius(d => d.y))\r\n            .attr(\"stroke-dasharray\", function () {\r\n                return pathLength = this.getTotalLength();\r\n            })\r\n            .attr(\"stroke-dashoffset\", 0)\r\n            .transition(t)\r\n                .ease(d3.easeLinear)\r\n                .attr(\"stroke\", \"black\")\r\n                .attrTween(\"stroke-dashoffset\", pathTween);\r\n\r\n    const nodes = svg.selectAll(\"g\")\r\n        .data(source.descendants(), d => d.id)\r\n        .enter()\r\n        .append(\"g\")\r\n            .classed(\"node\", true)\r\n            .attr(\"opacity\", 0)\r\n            .attr(\"transform\", d => `\r\n                    rotate(${d.x - 90})\r\n                    translate(${d.y}, 0)\r\n                `)\r\n        .call(\r\n            select => select.transition(t)\r\n                .transition(t)\r\n                    .delay((d, i) => i * 20)\r\n                    .ease(d3.easeLinear)\r\n                    .attr(\"opacity\", 1)\r\n        );\r\n    \r\n    drawNodes(nodes);\r\n\r\n}\r\n\r\nconst getBoxMeasure = (svg, source) => {\r\n\r\n    const nodes = svg.selectAll(\"g\")\r\n        .data(source.descendants(), d => d.id)\r\n        .enter().append(\"g\")\r\n            .attr(\"opacity\", 0)\r\n            .attr(\"fill\", \"none\")\r\n            .attr(\"transform\", d => `\r\n                    rotate(${d.x - 90})\r\n                    translate(${d.y}, 0)\r\n                `);\r\n    \r\n    drawNodes(nodes);\r\n\r\n    const box = svg.node().getBBox(); \r\n    nodes.remove();\r\n    return box;\r\n\r\n}\r\n\r\nconst drawNodes = nodes => {\r\n\r\n    nodes.call(\r\n        select => select.append(\"circle\")\r\n                .classed(\"circle\", true)\r\n                .attr(\"r\", d => (d.height + 5))\r\n        )\r\n    .call(\r\n        select => select.append(\"text\")\r\n                .text(d => d.data.word)\r\n                .classed(\"text\", true)\r\n                .attr(\"font-size\", d => (10 + (3 * d.height)))\r\n                .attr(\"x\", d => ((d.x < 180) === !d.children ? (d.height + 8) : -(d.height + 8)))\r\n                .attr(\"text-anchor\", d => ((d.x < 180) === !d.children ? \"start\" : \"end\"))\r\n                .attr(\"transform\", d => {\r\n                    if (d.children) {\r\n                        return `rotate(${-(d.x - 90)})`\r\n                    } else {\r\n                        return (d.x >= 180 ? \"rotate(180)\" : null)\r\n                    }\r\n                })\r\n            .clone(true).lower()\r\n                .classed(\"text-shadow\", true)\r\n                .attr(\"stroke-width\", d => (d.height + 1))\r\n                .attr(\"font-size\", d => (10 + (3 * d.height)))\r\n        )\r\n    .call(\r\n        select => select.append(\"text\")\r\n                .text(d => `(${d.data.source})`)\r\n                .classed(\"text\", true)\r\n                .attr(\"dy\", \"1em\")\r\n                .attr(\"font-size\", d => (7 + (d.height)))\r\n                .attr(\"x\", d => ((d.x < 180) === !d.children ? (d.height + 8) : -(d.height + 8)))\r\n                .attr(\"text-anchor\", d => ((d.x < 180) === !d.children ? \"start\" : \"end\"))\r\n                .attr(\"transform\", d => {\r\n                    if (d.children) {\r\n                        return `rotate(${-(d.x - 90)})`\r\n                    } else {\r\n                        return (d.x >= 180 ? \"rotate(180)\" : null)\r\n                    }\r\n                })\r\n            .clone(true).lower()\r\n                .classed(\"text-shadow\", true)\r\n                .attr(\"stroke-width\", d => (d.height + 1))\r\n                .attr(\"font-size\", d => (7 + (d.height)))\r\n        );\r\n\r\n}\r\n\r\nconst discard = svg => {\r\n    if (!svg.empty()) {\r\n        return svg.transition()\r\n                .duration(300)\r\n                .attrTween(\"opacity\", d => d3.interpolateNumber(1, 0.0001))\r\n            .end();\r\n    } else {\r\n        return Promise.resolve(true);\r\n    }\r\n}\r\n\r\nconst update = seed => {\r\n    \r\n    const svg = d3.select(\"svg\");\r\n    const input = document.querySelector(\"#seed-input\");\r\n    input.setAttribute(\"disabled\", true);\r\n\r\n    discard(svg).then(\r\n        res => {\r\n            svg.remove();\r\n            Object(_load__WEBPACK_IMPORTED_MODULE_1__[\"drawLoad\"])(seed);\r\n            const sizeScale = d3.scaleLinear()\r\n                .domain([0, 100])\r\n                .range([50, 800]);\r\n        \r\n            Object(_tree__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(seed, state).then(\r\n                root => {\r\n                    const tree = d3.tree()\r\n                        .size([360, sizeScale(root.descendants().length)])\r\n                        .separation((a, b) => ((a.parent == b.parent ? 1 : 2) / a.depth))\r\n                        (root);\r\n                \r\n                    root.descendants().forEach(d => (d.y = d.depth * 65));\r\n    \r\n                    discard(d3.select(\"svg\")).then(res => {\r\n                        d3.select(\"svg\").remove();\r\n                        draw(root);\r\n                        input.removeAttribute(\"disabled\");\r\n                        setTimeout(() => input.focus(), 10);\r\n                    })\r\n                },\r\n                rej => {\r\n                    input.removeAttribute(\"disabled\");\r\n                    d3.select(\"svg\").remove();\r\n                    setTimeout(() => input.focus(), 10);\r\n                }\r\n            );\r\n        }\r\n    )\r\n}\n\n//# sourceURL=webpack:///./src/radial.js?");

/***/ }),

/***/ "./src/tree.js":
/*!*********************!*\
  !*** ./src/tree.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// for console testing\r\n\r\n// let state, seed;\r\n\r\n// d3.json(\"assets/data/by_etym.json\").then(function(data) {\r\n//     state = data;\r\n//     console.log(\"ready\");\r\n//   });\r\n\r\nconst buildTrunk = (seed, state) => {\r\n    const ancestors = [seed];\r\n    let currentNode = seed;\r\n    let parentNode = state.find(datum => (\r\n        datum.word === currentNode.targetWord &&\r\n        datum.source === currentNode.targetSource &&\r\n        datum.rel === \"from\"\r\n    ));\r\n\r\n    while (parentNode) {\r\n        ancestors.push(parentNode);\r\n        currentNode = parentNode;\r\n        parentNode = state.find(datum => (\r\n            datum.word === currentNode.targetWord &&\r\n            datum.source === currentNode.targetSource &&\r\n            datum.rel === \"from\" &&\r\n            !ancestors.includes(datum)\r\n        ));\r\n    }\r\n\r\n    const last = ancestors[ancestors.length - 1];\r\n\r\n    ancestors.push({\r\n        word: last.targetWord,\r\n        source: last.targetSource,\r\n        rel: \"from\",\r\n        targetWord: undefined,\r\n        targetSource: undefined\r\n    })\r\n\r\n    return ancestors;\r\n}\r\n\r\nconst buildBranches = (seed, state) => {\r\n    let branches = [seed];\r\n\r\n    const children = state.filter(datum => (\r\n        datum.targetWord === seed.word &&\r\n        datum.targetSource === seed.source &&\r\n        datum.rel === \"from\"\r\n    ));\r\n\r\n    if (children.length > 0) {\r\n        children.forEach(child => {\r\n            branches = branches.concat(buildBranches(child, state));\r\n        })\r\n    };\r\n\r\n    return branches;\r\n}\r\n\r\nconst buildHierarchy = branches => {\r\n    try {\r\n        return d3.stratify()\r\n            .id(d => ([d.word, d.source].join(\"\")))\r\n            .parentId(d => ([d.targetWord, d.targetSource].join(\"\")))\r\n            (branches);\r\n    } catch (e) {\r\n        alert(\"database did an oopsie :( try a different word?\");\r\n        return false;\r\n    }\r\n}\r\n\r\nconst buildTree = (seed, state) => {\r\n    return new Promise((resolve, reject) => {\r\n        const ancestors = buildTrunk(seed, state);\r\n        const root = ancestors[ancestors.length - 1];\r\n        const tree = buildBranches(root, state);\r\n        const rootNode = buildHierarchy(tree);\r\n        rootNode ? resolve(rootNode) : reject(rootNode);\r\n    })\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (buildTree);\n\n//# sourceURL=webpack:///./src/tree.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: find */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"find\", function() { return find; });\nconst find = word => {\r\n    return state.find(datum =>\r\n        datum.word === word &&\r\n        datum.rel === \"from\" &&\r\n        datum.targetWord.slice(0, 1) !== \"-\"\r\n    );\r\n}\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });