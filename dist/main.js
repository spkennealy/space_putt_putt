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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _golf_ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./golf_ball */ \"./src/golf_ball.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n\n\nclass Game {\n    constructor(ctx, canvas) {\n        this.ctx = ctx;\n        this.canvas = canvas;\n        this.ballDropped = false;\n        this.animate = this.animate.bind(this);\n        \n        this.createBall();\n        this.start();\n        this.getClickPostion = this.getClickPostion.bind(this);\n        this.createBall = this.createBall.bind(this);\n        this.startHole = this.startHole.bind(this);\n    }\n\n    start() {\n        this.startHole();\n        this.animate(this.ctx);\n    }\n\n    animate() {\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        this.golfBall.draw(this.ctx);\n        this.golfBall.wallCollision();\n        this.golfBall.move();\n        requestAnimationFrame(this.animate);\n    }\n    \n    createBall() {\n        this.golfBall = new _golf_ball__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n            pos: [40, 250],\n            vel: [0, 0],\n            radius: 10,\n            canvas: this.canvas\n        });\n    }\n\n    // then calculate the velocity to hit the ball\n    // then move the ball at that velocity\n    // -- then add a slow down function to get the ball to stop\n    hit(e) {\n        let pos = this.getClickPostion(e); \n        console.log(`This is the click position: ${pos}`);\n        console.log(`This is the golf ball position: ${this.golfBall.pos}`);\n        let distance = _util__WEBPACK_IMPORTED_MODULE_1__[\"Util\"].calcDistance(pos, this.golfBall.pos);\n        console.log(`This is the distance from the click to the ball: ${distance}`);\n        let vel = _util__WEBPACK_IMPORTED_MODULE_1__[\"Util\"].calcVelocity(pos, this.golfBall.pos);\n        console.log(`This is the velocity: ${vel}`);\n        this.golfBall.isMoving = true;\n        this.golfBall.vel = vel;\n    }\n    \n    getClickPostion(e) {\n        console.log(e);\n        let mouseX = e.clientX - this.canvas.offsetLeft - 20;\n        console.log(`This is the click position X value: ${mouseX}`);\n        let mouseY = e.clientY - this.canvas.offsetTop - 20;\n        console.log(`This is the click position Y value: ${mouseY}`);\n        return [mouseX, mouseY];\n    }\n\n    startHole(){\n        this.golfBall.grabBall();\n        window.addEventListener(\"click\", (e) => {\n            if (!this.ballDropped) {\n                this.golfBall.dropBall();\n                this.ballDropped = true;\n            } else if (this.ballDropped) {\n                console.log(e);\n                this.hit(e);\n            }\n        });\n    }\n\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n// document.addEventListener(\"click\", e => {\n//     golfBall.hit();\n// });\n\n//# sourceURL=webpack:///./src/game.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n\nclass GolfBall {\n    constructor(options) {\n        this.pos = options.pos;\n        this.vel = options.vel;\n        this.radius = options.radius;\n        this.canvas = options.canvas;\n        this.isMoving = false;\n\n        // this.golfBall = new Image();\n        // this.golfBall.src = './images/golf_ball_sprite.png';\n        this.holdBall = this.holdBall.bind(this);\n        this.draw = this.draw.bind(this);\n        this.wallCollision = this.wallCollision.bind(this);\n    }\n    \n    draw(ctx) {\n        ctx.fillStyle = \"white\";\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n        );\n        ctx.fill();\n        ctx.linewidth = 1;\n        ctx.strokeStyle = \"black\";\n        ctx.stroke();\n    }\n\n    holdBall(e) {\n        this.pos[0] = e.clientX - this.canvas.offsetLeft - 20;\n        this.pos[1] = e.clientY - this.canvas.offsetTop - 20;\n    }\n\n    dropBall() {\n        this.canvas.removeEventListener(\"mousemove\", this.holdBall);\n    }\n\n    grabBall() {\n        this.canvas.addEventListener(\"mousemove\", this.holdBall);\n    }\n    \n    move(vel) {\n        this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];\n    }\n\n    wallCollision() {\n        // check if the ball hits the top wall or bottom wall\n        const checkTopWall = (this.pos[1] + this.vel[1] < 0);\n        const checkBottomWall = (this.pos[1] + this.vel[1] > this.canvas.height);\n        const checkLeftWall = (this.pos[0] + this.vel[0] < 0);\n        const checkRightWall = (this.pos[0] + this.vel[0] > this.canvas.width);\n        if (checkTopWall || checkBottomWall) {\n            this.vel[1] = -this.vel[1];\n            return true;\n        } else if (checkLeftWall || checkRightWall) {\n            this.vel[0] = -this.vel[0];\n        }\n    }\n\n    decelerate(rate) {\n        // rate = rate ? rate : 1.02;\n\n        if (this.vel[0] !== 0 || this.vel[1] !== 0) {\n            this.vel = [this.vel[0] / rate, this.vel[1] / rate];\n            if (Math.abs(this.vel[0]) < 0.1 && Math.abs(this.vel[1]) < 0.1) {\n                [this.vel[0], this.vel[1]] = [0, 0];\n                this.isMoving = false;\n            }\n            // this.vel = [this.vel[0], this.vel[1]];\n        }\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GolfBall);\n\n\n\n// IF I CAN EVER GET THIS SPRITE SHEET TO WORK CORRECTLY...\n\n// const sprite = options => {\n//     let that = {};\n//     that.ctx = options.ctx;\n//     that.width = options.width;\n//     that.height = options.height;\n//     that.image = options.image;\n//     let frameIndex = 0;\n//     let tickCount = 0;\n//     let ticksPerFrame = options.ticksPerFrame || 0;\n//     let numberOfFrames = options.numberOfFrames || 1;\n//     that.loop = options.loop;\n\n//     that.update = () => {\n//         tickCount += 1;\n//         if (tickCount > ticksPerFrame) {\n//             tickCount = 0;\n\n//             if (frameIndex < numberOfFrames - 1) {\n//                 frameIndex += 1;\n//             } else if (that.loop) {\n//                 frameIndex = 0;\n//             }\n//         }\n//     };\n\n//     that.render = () => {\n//         that.ctx.drawImage(\n//             that.image,\n//             frameIndex * that.width / numberOfFrames,\n//             0,\n//             that.width / numberOfFrames,\n//             that.height,\n//             0,\n//             0,\n//             that.width / numberOfFrames,\n//             that.height\n//         );\n//     };\n\n//     return that;\n// };\n\n// const ball = sprite({\n//     ctx,\n//     width: 16,\n//     height: 16,\n//     image: this.golfBall\n// });\n\n// const ballLoop = () => {\n//     window.requestAnimationFrame(ballLoop);\n//     ball.update();\n//     ball.render();\n// };\n\n//# sourceURL=webpack:///./src/golf_ball.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _golf_ball__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./golf_ball */ \"./src/golf_ball.js\");\n\n\n\n\nwindow.addEventListener(\"DOMContentLoaded\", () => {\n    let canvas = document.getElementById(\"canvas\");\n    canvas.width = 800;\n    canvas.height = 500;\n    let ctx = canvas.getContext(\"2d\");\n\n    new _game_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, canvas);\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: Util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Util\", function() { return Util; });\nconst Util = {\n\n    calcDistance: (puterPos, ballPos) => {\n        const [xPutter, yPutter] = puterPos;\n        const [xBall, yBall] = ballPos;\n\n        return Math.sqrt(\n            Math.pow(xPutter - xBall, 2) + Math.pow(yPutter - yBall, 2)\n        );\n    },\n\n    calcVelocity: (putterPos, ballPos) => {\n        const xVel = (putterPos[0] - ballPos[0]) / 13;\n        const yVel = (putterPos[1] - ballPos[1]) / 13;\n        return [-xVel, -yVel];\n    },\n\n    // calcAngle: (puterPos, ballPos, vel) => {\n\n    // }\n\n};\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });