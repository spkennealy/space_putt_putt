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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _golf_ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./golf_ball */ \"./src/golf_ball.js\");\n\n\nclass Game {\n    constructor(ctx, canvas) {\n        this.ctx = ctx;\n        this.canvas = canvas;\n        this.createBall(this.ctx);\n        this.animate = this.animate.bind(this);\n        \n        this.start();\n        this.getClickPostion = this.getClickPostion.bind(this);\n        this.startHole = this.startHole.bind(this);\n    }\n\n    start() {\n        this.animate(this.ctx);\n        this.startHole();\n    }\n\n    animate() {\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        this.golfBall.draw(this.ctx);\n        requestAnimationFrame(this.animate);\n    }\n    \n    createBall() {\n        this.golfBall = new _golf_ball__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n            pos: [40, 250],\n            vel: [0, 0],\n            radius: 10,\n            canvas: this.canvas\n        });\n    }\n\n    getClickPostion(e) {\n        let mouseX = e.clientX - this.canvas.offsetLeft - 20;\n        let mouseY = e.clientY - this.canvas.offsetLeft - 20;\n    }\n\n    startHole(){\n        this.golfBall.grabBall();\n        this.canvas.addEventListener(\"click\", (e) => {\n            this.golfBall.dropBall();\n        });\n    }\n\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n// document.addEventListener(\"click\", e => {\n//     golfBall.hit();\n// });\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nclass GameView {\n    constructor(ctx, canvas) {\n        this.ctx = ctx;\n        this.canvas = canvas;\n        this.game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, canvas);\n        // this.animate = this.animate.bind(this);\n    }\n\n    // animate() {\n    //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    //     this.game.animate();\n    //     requestAnimationFrame(this.animate);\n    // }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameView);\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/golf_ball.js":
/*!**************************!*\
  !*** ./src/golf_ball.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// import MovingObject from './moving_object';\n\nclass GolfBall {\n    constructor(options) {\n        this.pos = options.pos;\n        this.vel = options.vel;\n        this.radius = options.radius;\n        this.canvas = options.canvas;\n\n        // this.golfBall = new Image();\n        // this.golfBall.src = './images/golf_ball_sprite.png';\n        this.holdBall = this.holdBall.bind(this);\n        this.hit = this.hit.bind(this);\n        this.draw = this.draw.bind(this);\n    }\n    \n    draw(ctx) {\n        ctx.fillStyle = \"white\";\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n        );\n        ctx.fill();\n        ctx.linewidth = 1;\n        ctx.strokeStyle = \"black\";\n        ctx.stroke();\n    }\n\n    holdBall(e) {\n        this.pos[0] = e.clientX - this.canvas.offsetLeft - 20;\n        this.pos[1] = e.clientY - this.canvas.offsetTop - 20;\n    }\n\n    dropBall(canvas) {\n        this.canvas.removeEventListener(\"mousemove\", this.holdBall);\n    }\n\n    grabBall(canvas) {\n        this.canvas.addEventListener(\"mousemove\", this.holdBall);\n    }\n    \n    hit() {\n        this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GolfBall);\n\n\n\n// IF I CAN EVER GET THIS SPRITE SHEET TO WORK CORRECTLY...\n\n// const sprite = options => {\n//     let that = {};\n//     that.ctx = options.ctx;\n//     that.width = options.width;\n//     that.height = options.height;\n//     that.image = options.image;\n//     let frameIndex = 0;\n//     let tickCount = 0;\n//     let ticksPerFrame = options.ticksPerFrame || 0;\n//     let numberOfFrames = options.numberOfFrames || 1;\n//     that.loop = options.loop;\n\n//     that.update = () => {\n//         tickCount += 1;\n//         if (tickCount > ticksPerFrame) {\n//             tickCount = 0;\n\n//             if (frameIndex < numberOfFrames - 1) {\n//                 frameIndex += 1;\n//             } else if (that.loop) {\n//                 frameIndex = 0;\n//             }\n//         }\n//     };\n\n//     that.render = () => {\n//         that.ctx.drawImage(\n//             that.image,\n//             frameIndex * that.width / numberOfFrames,\n//             0,\n//             that.width / numberOfFrames,\n//             that.height,\n//             0,\n//             0,\n//             that.width / numberOfFrames,\n//             that.height\n//         );\n//     };\n\n//     return that;\n// };\n\n// const ball = sprite({\n//     ctx,\n//     width: 16,\n//     height: 16,\n//     image: this.golfBall\n// });\n\n// const ballLoop = () => {\n//     window.requestAnimationFrame(ballLoop);\n//     ball.update();\n//     ball.render();\n// };\n\n//# sourceURL=webpack:///./src/golf_ball.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\n\nwindow.addEventListener(\"DOMContentLoaded\", () => {\n    let canvas = document.getElementById(\"canvas\");\n    canvas.width = 800;\n    canvas.height = 500;\n    let ctx = canvas.getContext(\"2d\");\n\n    new _game_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, canvas);\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });