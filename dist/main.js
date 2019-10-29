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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _radial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./radial */ \"./src/radial.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _load__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./load */ \"./src/load.js\");\n\n\n\n\nObject(_load__WEBPACK_IMPORTED_MODULE_2__[\"initLoad\"])();\nwindow.state = null;\n\nconst input = document.querySelector(\"#seed-input\");\nconst helpIcon = document.querySelector(\"#help-icon\");\nconst helpText = document.querySelector(\".help-text\");\nconst loading = document.querySelector(\".loading\");\nconst info = document.querySelector(\".info\");\nconst infoChange = document.querySelector(\".info-change\");\ninput.setAttribute(\"disabled\", true);\n\nd3.select(\"#count\")\n    .transition()\n        .duration(20000)\n        .tween(\"text\", function() {\n            const that = d3.select(this);\n            return t => that.text(d3.format(\",d\")(d3.interpolateNumber(0, 946866)(t)))\n        })\n\nd3.json(\"https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/catena-db/by_etym.json\")\n    .then(data => {\n        window.state = data;\n\n        const seed = _util__WEBPACK_IMPORTED_MODULE_1__[\"find\"](\"catena\");\n        _radial__WEBPACK_IMPORTED_MODULE_0__[\"update\"](seed);\n\n        loading.setAttribute(\"style\", \"display: none\");\n        helpText.classList.add(\"hidden\");\n        helpIcon.classList.remove(\"help-icon-dark\");\n        helpIcon.classList.add(\"help-icon\");\n        info.removeAttribute(\"style\");\n    });\n\ninput.addEventListener(\"keydown\", e => {\n    if (e.key === \"Enter\") {\n        e.preventDefault();\n        const seed = _util__WEBPACK_IMPORTED_MODULE_1__[\"find\"](input.value);\n        if (seed) {\n            _radial__WEBPACK_IMPORTED_MODULE_0__[\"update\"](seed)\n        } else {\n            alert(\"don't have that word in the database :(\")\n        }   \n        input.value = \"\";\n        infoChange.textContent = \"Enter your word above.\"\n    }    \n});\n\ninput.addEventListener(\"input\", e => {\n    if (e.currentTarget.value.length > 0) {\n        infoChange.textContent = \"Press Enter to build your chain.\"\n    } else {\n        infoChange.textContent = \"Enter your word above.\"\n    }\n});\n\ninput.addEventListener(\"focus\", e => {\n    e.currentTarget.placeholder = \"\";\n});\n\ninput.addEventListener(\"blur\", e => {\n    e.currentTarget.placeholder = \"/caˈtē.na/\";\n})\n\nhelpIcon.addEventListener(\"mouseenter\", e => {\n    helpText.classList.remove(\"hidden\");\n});\n\nhelpIcon.addEventListener(\"mouseleave\", e => {\n    helpText.classList.add(\"hidden\");\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/load.js":
/*!*********************!*\
  !*** ./src/load.js ***!
  \*********************/
/*! exports provided: initLoad, drawLoad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initLoad\", function() { return initLoad; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawLoad\", function() { return drawLoad; });\nconst initLoad = () => {\n\n    let pathLength;\n    const width = 50;\n    const height = 50;\n    const radius = 25;\n    const numDashes = 2;\n    const spacing = .5;\n    \n    const svg = d3.select(\"#svg\")\n        .append(\"svg\")\n        .classed(\"load\", true)\n        .attr(\"width\", 100)\n        .attr(\"height\", 100);\n    \n    const wheel = svg.append(\"path\")\n        .attr(\"d\", `M ${width / 2 + radius}, ${height / 2}\n            a ${radius} ${radius} 0 1 1 0 ${radius * 2}\n            ${radius} ${radius} 0 1 1 0 ${-radius * 2} z`)\n        .attr(\"fill\", \"none\")\n        .attr(\"stroke-width\", 5)\n        .attr(\"stroke-dasharray\", function () {\n            pathLength = this.getTotalLength();\n            return [(pathLength / numDashes) * (1 - spacing), (pathLength / numDashes) * spacing].join(' ');\n        })\n        .attr(\"stroke-dashoffset\", (pathLength / numDashes) * (1 - spacing) / 2);\n    \n    const forwardTween = () => {\n        return d3.interpolateString(`rotate(0, 50, 50)`, `rotate(360, 50, 50)`);\n    };\n\n    const backwardTween = () => {\n        return d3.interpolateString(`rotate(360, 50, 50)`, `rotate(0, 50, 50)`);\n    };\n    \n    wheel.attr(\"stroke\", \"black\")\n        .transition()\n            .on(\"start\", function repeat() {\n                d3.active(this)\n                    .transition()\n                        .duration(4000)\n                        .attr(\"stroke\", \"#dcdcdc\")\n                        .attrTween(\"transform\", forwardTween)\n                    .transition()\n                        .duration(4000)\n                        .attr(\"stroke\", \"black\")\n                        .attrTween(\"transform\", backwardTween)\n                    .on(\"start\", repeat);\n            });\n\n}\n\nconst drawLoad = seed => {\n    const svg = d3.select(\"#svg\")\n        .append(\"svg\")\n    \n    const text = svg.append(\"text\")\n        .classed(\"building\", true)\n            .text(`Building chain: ${seed.word}`)\n\n    const box = text.node().getBBox();\n\n    svg.attr(\"viewBox\", `${box.x} ${box.y} ${box.width} ${box.height}`)\n        .attr(\"width\", `${box.width}`)\n        .attr(\"height\", `${box.height}`);\n}\n\n//# sourceURL=webpack:///./src/load.js?");

/***/ }),

/***/ "./src/radial.js":
/*!***********************!*\
  !*** ./src/radial.js ***!
  \***********************/
/*! exports provided: draw, getBoxMeasure, drawNodes, discard, update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"draw\", function() { return draw; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getBoxMeasure\", function() { return getBoxMeasure; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawNodes\", function() { return drawNodes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"discard\", function() { return discard; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"update\", function() { return update; });\n/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tree */ \"./src/tree.js\");\n/* harmony import */ var _load__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./load */ \"./src/load.js\");\n\n\n\nconst draw = source => {\n\n    const svg = d3.select(\"#svg\")\n        .append(\"svg\")\n            .attr(\"width\", 800)\n            .attr(\"height\", 800);\n\n    const windowScale = d3.scaleLinear()\n        .domain([0, 2000])\n        .range([500, 2000]);\n\n    const box = getBoxMeasure(svg, source);\n    svg.attr(\"viewBox\", `${box.x} ${box.y} ${box.width} ${box.height}`)\n        .attr(\"width\", `${windowScale(box.width)}`)\n        .attr(\"height\", `${windowScale(box.height)}`);\n\n    const t = svg.transition()\n        .duration(300);\n\n    let pathLength;\n    const pathTween = () => d3.interpolateNumber(pathLength, 0);\n\n    svg.selectAll(\"path\")\n        .data(source.links(), d => d.source.id)\n        .enter()\n        .append(\"path\")\n            .classed(\"path\", true)\n            .attr(\"stroke\", \"none\")\n            .attr(\"d\", d3.linkRadial()\n                .angle(d => (d.x * Math.PI / 180))\n                .radius(d => d.y))\n            .attr(\"stroke-dasharray\", function () {\n                return pathLength = this.getTotalLength();\n            })\n            .attr(\"stroke-dashoffset\", 0)\n            .transition(t)\n                .ease(d3.easeLinear)\n                .attr(\"stroke\", \"black\")\n                .attrTween(\"stroke-dashoffset\", pathTween);\n\n    const nodes = svg.selectAll(\"g\")\n        .data(source.descendants(), d => d.id)\n        .enter()\n        .append(\"g\")\n            .classed(\"node\", true)\n            .attr(\"opacity\", 0)\n            .attr(\"transform\", d => `\n                    rotate(${d.x - 90})\n                    translate(${d.y}, 0)\n                `)\n        .call(\n            select => select.transition(t)\n                .transition(t)\n                    .delay((d, i) => i * 20)\n                    .ease(d3.easeLinear)\n                    .attr(\"opacity\", 1)\n        );\n\n    drawNodes(nodes);\n\n}\n\nconst getBoxMeasure = (svg, source) => {\n\n    const nodes = svg.selectAll(\"g\")\n        .data(source.descendants(), d => d.id)\n        .enter().append(\"g\")\n            .attr(\"opacity\", 0)\n            .attr(\"fill\", \"none\")\n            .attr(\"transform\", d => `\n                    rotate(${d.x - 90})\n                    translate(${d.y}, 0)\n                `);\n\n    drawNodes(nodes);\n\n    const box = svg.node().getBBox();\n    nodes.remove();\n    return box;\n\n}\n\nconst drawNodes = nodes => {\n\n    nodes.call(\n        select => select.append(\"circle\")\n                .classed(\"circle\", true)\n                .attr(\"r\", d => (d.height + 5))\n        )\n    .call(\n        select => select.append(\"text\")\n                .text(d => d.data.word)\n                .classed(\"text\", true)\n                .attr(\"font-size\", d => (10 + (3 * d.height)))\n                .attr(\"x\", d => ((d.x < 180) === !d.children ? (d.height + 8) : -(d.height + 8)))\n                .attr(\"text-anchor\", d => ((d.x < 180) === !d.children ? \"start\" : \"end\"))\n                .attr(\"transform\", d => {\n                    if (d.children) {\n                        return `rotate(${-(d.x - 90)})`\n                    } else {\n                        return (d.x >= 180 ? \"rotate(180)\" : null)\n                    }\n                })\n            .clone(true).lower()\n                .classed(\"text-shadow\", true)\n                .attr(\"stroke-width\", d => (d.height + 1))\n                .attr(\"font-size\", d => (10 + (3 * d.height)))\n        )\n    .call(\n        select => select.append(\"text\")\n                .text(d => `(${d.data.source})`)\n                .classed(\"text\", true)\n                .attr(\"dy\", \"1em\")\n                .attr(\"font-size\", d => (7 + (d.height)))\n                .attr(\"x\", d => ((d.x < 180) === !d.children ? (d.height + 8) : -(d.height + 8)))\n                .attr(\"text-anchor\", d => ((d.x < 180) === !d.children ? \"start\" : \"end\"))\n                .attr(\"transform\", d => {\n                    if (d.children) {\n                        return `rotate(${-(d.x - 90)})`\n                    } else {\n                        return (d.x >= 180 ? \"rotate(180)\" : null)\n                    }\n                })\n            .clone(true).lower()\n                .classed(\"text-shadow\", true)\n                .attr(\"stroke-width\", d => (d.height + 1))\n                .attr(\"font-size\", d => (7 + (d.height)))\n        );\n\n}\n\nconst discard = async svg => {\n    if (!svg.empty()) {\n        const res = await svg.transition()\n                .duration(300)\n                .attrTween(\"opacity\", d => d3.interpolateNumber(1, 0.0001))\n            .end();\n    } else {\n        return true;\n    };\n}\n\nconst update = async seed => {\n    const svg = d3.select(\"svg\");\n    const input = document.querySelector(\"#seed-input\");\n    input.setAttribute(\"disabled\", true);\n\n    await discard(svg);\n\n    svg.remove();\n    Object(_load__WEBPACK_IMPORTED_MODULE_1__[\"drawLoad\"])(seed);\n    const sizeScale = d3.scaleLinear()\n        .domain([0, 100])\n        .range([50, 800]);\n\n    const root = await Object(_tree__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(seed, state)\n\n    if (root) {\n        const tree = d3.tree()\n            .size([360, sizeScale(root.descendants().length)])\n            .separation((a, b) => ((a.parent == b.parent ? 1 : 2) / a.depth))\n            (root);\n\n        root.descendants().forEach(d => (d.y = d.depth * 65));\n\n        await discard(d3.select(\"svg\"));\n\n        d3.select(\"svg\").remove();\n        draw(root);\n        input.removeAttribute(\"disabled\");\n        setTimeout(() => input.focus(), 10);\n    } else {\n        input.removeAttribute(\"disabled\");\n        d3.select(\"svg\").remove();\n        setTimeout(() => input.focus(), 10);\n    };\n}\n\n\n//# sourceURL=webpack:///./src/radial.js?");

/***/ }),

/***/ "./src/tree.js":
/*!*********************!*\
  !*** ./src/tree.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n\nconst buildTrunk = (seed, state) => {\n    const ancestors = [seed];\n    let currentNode = seed;\n    let parentNode = state.find(datum => (\n        datum.word === currentNode.targetWord &&\n        datum.source === currentNode.targetSource &&\n        datum.rel === \"from\"\n    ));\n\n    while (parentNode) {\n        ancestors.push(parentNode);\n        currentNode = parentNode;\n        parentNode = state.find(datum => (\n            datum.word === currentNode.targetWord &&\n            datum.source === currentNode.targetSource &&\n            datum.rel === \"from\" &&\n            !ancestors.includes(datum)\n        ));\n    }\n\n    const last = ancestors[ancestors.length - 1];\n\n    ancestors.push({\n        word: last.targetWord,\n        source: last.targetSource,\n        rel: \"from\",\n        targetWord: undefined,\n        targetSource: undefined\n    })\n\n    return ancestors;\n}\n\nconst buildBranches = (seed, state) => {\n    let branches = [seed];\n\n    const children = state.filter(datum => (\n        datum.targetWord === seed.word &&\n        datum.targetSource === seed.source &&\n        datum.rel === \"from\"\n    ));\n\n    if (children.length > 0) {\n        children.forEach(child => {\n            branches = branches.concat(buildBranches(child, state));\n        })\n    };\n    return branches;\n}\n\nconst filterUnique = arr => {\n    const memo = {}\n    const output = []\n\n    for (const element of arr) {\n        const key = element.word + element.source\n\n        if (memo[key]) {\n            continue\n        } else {\n            memo[key] = element\n            output.push(element)\n        }\n    }\n    return output\n}\n\nconst buildHierarchy = branches => {\n    try {\n        return d3.stratify()\n            .id(d => (d.word + d.source))\n            .parentId(d => (d.targetWord + d.targetSource || ''))\n            (branches);\n    } catch (e) {\n        alert(\"database did an oopsie :( try a different word?\");\n        return false;\n    };\n}\n\nconst buildTree = async (seed, state) => {\n    const ancestors = buildTrunk(seed, state);\n    const root = ancestors[ancestors.length - 1];\n    let { tree } = await Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"fetchTree\"])(root);\n    if (!tree) {\n        tree = buildBranches(root, state);\n        await Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"postTree\"])(root, tree);\n    }\n    const rootNode = buildHierarchy(filterUnique(tree));\n    return (rootNode ? rootNode : false);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (buildTree);\n\n\n//# sourceURL=webpack:///./src/tree.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: find, fetchTree, postTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"find\", function() { return find; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchTree\", function() { return fetchTree; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"postTree\", function() { return postTree; });\nconst find = word => {\n    return state.find(datum =>\n        datum.word === word &&\n        datum.rel === \"from\" &&\n        datum.targetWord.slice(0, 1) !== \"-\"\n    );\n}\n\nconst fetchTree = async (seed) => {\n    const url = `https://catena-exp.herokuapp.com/chains/${seed.word + seed.source}`\n    try {\n        const res = await fetch(url, { mode: 'cors' });\n        const data = await res.json();\n        if (data.rows.length) {\n            return data.rows[0].tree;\n        } else {\n            return false;\n        }\n    } catch (error) {\n        throw new Error(error);\n    };\n}\n\nconst postTree = async (seed, tree) => {\n    const url = 'https://catena-exp.herokuapp.com/chains/';\n    const body = JSON.stringify({\n        ancestor: seed.word + seed.source,\n        tree: { tree }\n    });\n    try {\n        const res = await fetch(url,\n            {\n                method: 'POST',\n                mode: 'cors',\n                headers: { 'Content-Type': 'application/json' },\n                body\n            }\n        );\n        const data = await res.json();\n        if (data.rows.length) {\n            return data.rows[0].tree;\n        } else {\n            return false;\n        };\n    } catch (error) {\n        throw new Error(error);\n    };\n}\n\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });