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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _holes_hole__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./holes/hole */ \"./src/holes/hole.js\");\n/* harmony import */ var _holes_all_holes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./holes/all_holes */ \"./src/holes/all_holes.js\");\n\n\n\n\nclass Game {\n    constructor(ctx, canvas) {\n        this.ctx = ctx;\n        this.canvas = canvas;\n        this.currentHole = null;\n        this.currentHoleNum = 0;\n\n        this.start();\n\n        this.getClickPostion = this.getClickPostion.bind(this);\n        this.newHole = this.newHole.bind(this);\n        this.hit = this.hit.bind(this);\n    }\n\n    start() {\n        this.currentHoleNum += 1;\n        if (this.currentHoleNum > 9) return false;\n        this.newHole();\n        this.animate();\n    }\n\n    animate() {\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        this.currentHole.draw(this.ctx);\n        requestAnimationFrame(this.animate.bind(this));\n    }\n    \n    \n\n    hit(e) {\n        let pos = this.getClickPostion(e); \n        // console.log(`This is the click position: [${pos}]`);\n        // console.log(`This is the golf ball position: [${this.currentHole.golfBall.pos}]`);\n        let distance = _util__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].calcDistance(pos, this.currentHole.golfBall.pos);\n        // console.log(`This is the distance from the click to the ball: ${distance}`);\n        let vel = _util__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].calcVelocity(pos, this.currentHole.golfBall.pos, distance);\n        // console.log(`This is the velocity: ${vel}`);\n        this.currentHole.golfBall.isMoving = true;\n        this.currentHole.golfBall.vel = vel;\n    }\n    \n    getClickPostion(e) {\n        let mouseX = e.clientX - this.canvas.offsetLeft;\n        // console.log(`This is the click position X value: ${mouseX}`);\n        let mouseY = e.clientY - this.canvas.offsetTop;\n        // console.log(`This is the click position Y value: ${mouseY}`);\n        return [mouseX, mouseY];\n    }\n\n    newHole(){   \n        this.currentHole = new _holes_hole__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\n            this.ctx, \n            this.canvas, \n            this,\n            _holes_all_holes__WEBPACK_IMPORTED_MODULE_2__[\"default\"][this.currentHoleNum - 1]\n        );      \n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

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

/***/ "./src/holes/all_holes.js":
/*!********************************!*\
  !*** ./src/holes/all_holes.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _hole_1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hole_1 */ \"./src/holes/hole_1.js\");\n\n// import hole2 from './hole_2';\n// import hole3 from './hole_3';\n// import hole4 from './hole_4';\n// import hole5 from './hole_5';\n// import hole6 from './hole_6';\n// import hole7 from './hole_7';\n// import hole8 from './hole_8';\n// import hole9 from './hole_9';\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ([\n    _hole_1__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n]);\n\n//# sourceURL=webpack:///./src/holes/all_holes.js?");

/***/ }),

/***/ "./src/holes/hole.js":
/*!***************************!*\
  !*** ./src/holes/hole.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _objects_golf_ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/golf_ball */ \"./src/objects/golf_ball.js\");\n\n\nclass Hole {\n    constructor(ctx, canvas, game, options) {\n        this.ctx = ctx;\n        this.canvas = canvas;\n        this.game = game;\n        this.walls = options.walls;\n        this.holePos = options.holePos;\n        this.obstacles = options.obstacles;\n        this.ballStopped = true;\n        this.ballDropped = false;\n        this.golfBall = null;\n        \n        this.newGolfBall();\n        this.draw();\n        this.startHole();\n        \n        this.newGolfBall = this.newGolfBall.bind(this);\n        this.drawHole = this.drawHole.bind(this);\n        this.drawHoleWalls = this.drawHoleWalls.bind(this);\n        this.startHole = this.startHole.bind(this);\n    }\n\n    draw() {\n        this.drawHole(this.ctx, this.holePos);\n        this.drawHoleWalls();\n    \n        this.golfBall.draw(this.ctx);\n        this.golfBall.wallCollision();\n        this.golfBall.move();\n        this.golfBall.decelerate();\n\n        if (this.golfBall.vel[0] === 0 && this.golfBall.vel[1] === 0) {\n            this.ballStopped = true;\n        }\n    }\n\n    drawHoleWalls() {\n        const startPoint = this.walls[0];\n        \n        this.ctx.beginPath();\n        this.ctx.fillStyle = \"#faed27\";\n        this.ctx.moveTo(startPoint[0], startPoint[1]);\n        const walls = this.walls.slice(1);\n        walls.forEach(wallPos => {\n            this.ctx.lineTo(wallPos[0], wallPos[1]);\n        });\n        this.ctx.lineWidth = 10;\n        this.ctx.stroke();\n        this.ctx.closePath();\n        this.ctx.lineWidth = 1;\n    }\n\n\n    newGolfBall() {\n        this.golfBall = new _objects_golf_ball__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n            pos: [40, 250],\n            vel: [0, 0],\n            radius: 6,\n            canvas: this.canvas\n        });\n        \n    }\n\n    drawHole(ctx, pos) {\n        let grd = ctx.createRadialGradient(pos[0] + 2, pos[1] + 2, 10, pos[0] + 10, pos[1] + 10, 5);\n        grd.addColorStop(0, \"white\");\n        grd.addColorStop(1, \"black\");\n        ctx.fillStyle = grd;\n\n        ctx.beginPath();\n        ctx.arc(\n            pos[0], pos[1], 10, 0, 2 * Math.PI, true\n        );\n        ctx.fill();\n        ctx.linewidth = 0;\n        ctx.strokeStyle = \"whitesmoke\";\n        ctx.stroke();\n        ctx.closePath();\n    }\n\n    startHole() {\n    \n        this.golfBall.grabBall();\n\n        window.addEventListener(\"click\", (e) => {\n            if (!this.ballDropped) {\n                this.golfBall.dropBall();\n                this.ballDropped = true;\n            } else if (this.ballDropped && this.ballStopped) {\n                this.game.hit(e);\n                this.ballStopped = false;\n            }\n        });\n    }\n    \n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Hole);\n\n//# sourceURL=webpack:///./src/holes/hole.js?");

/***/ }),

/***/ "./src/holes/hole_1.js":
/*!*****************************!*\
  !*** ./src/holes/hole_1.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    walls: [\n        [20, 140],\n        [750, 140],\n        [750, 345],\n        [20, 345],\n        [20, 140]\n    ],\n    holePos: [725, 250],\n    obstacles: []\n});\n\n//# sourceURL=webpack:///./src/holes/hole_1.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _objects_golf_ball__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./objects/golf_ball */ \"./src/objects/golf_ball.js\");\n\n\n\n\nwindow.addEventListener(\"DOMContentLoaded\", () => {\n    let canvas = document.getElementById(\"canvas\");\n    canvas.width = 800;\n    canvas.height = 500;\n    let ctx = canvas.getContext(\"2d\");\n\n    new _game_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, canvas);\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/objects/golf_ball.js":
/*!**********************************!*\
  !*** ./src/objects/golf_ball.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// import * as Util from '../util';\n\nclass GolfBall {\n    constructor(options) {\n        this.pos = options.pos;\n        this.vel = options.vel;\n        this.radius = options.radius;\n        this.canvas = options.canvas;\n        this.isMoving = false;\n\n        // this.golfBall = new Image();\n        // this.golfBall.src = './images/golf_ball_sprite.png';\n        this.holdBall = this.holdBall.bind(this);\n        this.draw = this.draw.bind(this);\n        this.wallCollision = this.wallCollision.bind(this);\n    }\n    \n    draw(ctx) {\n        ctx.fillStyle = \"#39ff14\";\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n        );\n        ctx.fill();\n        ctx.linewidth = 1;\n        ctx.strokeStyle = \"black\";\n        ctx.stroke();\n        ctx.closePath();\n    }\n\n    holdBall(e) {\n        // TODO: change wallCollision to matBoundaries and have ball stay inside\n        // no matter where the mouse is\n        if (this.wallCollision()) {\n            this.pos[0] = e.clientX - this.canvas.offsetLeft - 5;\n            this.pos[1] = e.clientY - this.canvas.offsetTop - 5;\n        } else {\n            this.pos[0] = e.clientX - this.canvas.offsetLeft - 5;\n            this.pos[1] = e.clientY - this.canvas.offsetTop - 5;\n        }\n    }\n\n    dropBall() {\n        this.canvas.removeEventListener(\"mousemove\", this.holdBall);\n    }\n\n    grabBall() {\n        this.canvas.addEventListener(\"mousemove\", this.holdBall);\n    }\n    \n    move(vel) {\n        this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];\n    }\n\n    wallCollision() {\n        // check if the ball hits the top wall or bottom wall\n        const checkTopWall = ((this.pos[1] + this.vel[1] - this.radius) < 0);\n        const checkBottomWall = ((this.pos[1] + this.vel[1] + this.radius) > this.canvas.height);\n        // check if the ball hits the left or right wall\n        const checkLeftWall = ((this.pos[0] + this.vel[0] - this.radius) < 0);\n        const checkRightWall = ((this.pos[0] + this.vel[0] + this.radius) > this.canvas.width);\n        // if so, change the x velocity or y velocity to its inverse\n        if (checkTopWall || checkBottomWall) {\n            this.vel[1] = -this.vel[1];\n            return true;\n        } else if (checkLeftWall || checkRightWall) {\n            this.vel[0] = -this.vel[0];\n        }\n    }\n\n    decelerate() {\n        let rate = 1.0008;\n        let xVel = this.vel[0];\n        let yVel = this.vel[1];\n\n        // console.log(`This is xVel: ${xVel}`);\n        // console.log(`This is yVel: ${yVel}`);\n        if (xVel <  8 || yVel < 8) {\n            rate = 1.02;\n        }\n\n        if (xVel !== 0 || yVel !== 0) {\n\n            this.vel = [xVel / rate, yVel / rate];\n\n            if (Math.abs(xVel) < 0.1 && Math.abs(yVel) < 0.1) {\n                this.vel = [0, 0];\n                this.isMoving = false;\n                // console.log(`End ball position: [${this.pos}]`);\n            }\n        }\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GolfBall);\n\n\n\n// IF I CAN EVER GET THIS SPRITE SHEET TO WORK CORRECTLY...\n\n// const sprite = options => {\n//     let that = {};\n//     that.ctx = options.ctx;\n//     that.width = options.width;\n//     that.height = options.height;\n//     that.image = options.image;\n//     let frameIndex = 0;\n//     let tickCount = 0;\n//     let ticksPerFrame = options.ticksPerFrame || 0;\n//     let numberOfFrames = options.numberOfFrames || 1;\n//     that.loop = options.loop;\n\n//     that.update = () => {\n//         tickCount += 1;\n//         if (tickCount > ticksPerFrame) {\n//             tickCount = 0;\n\n//             if (frameIndex < numberOfFrames - 1) {\n//                 frameIndex += 1;\n//             } else if (that.loop) {\n//                 frameIndex = 0;\n//             }\n//         }\n//     };\n\n//     that.render = () => {\n//         that.ctx.drawImage(\n//             that.image,\n//             frameIndex * that.width / numberOfFrames,\n//             0,\n//             that.width / numberOfFrames,\n//             that.height,\n//             0,\n//             0,\n//             that.width / numberOfFrames,\n//             that.height\n//         );\n//     };\n\n//     return that;\n// };\n\n// const ball = sprite({\n//     ctx,\n//     width: 16,\n//     height: 16,\n//     image: this.golfBall\n// });\n\n// const ballLoop = () => {\n//     window.requestAnimationFrame(ballLoop);\n//     ball.update();\n//     ball.render();\n// };\n\n//# sourceURL=webpack:///./src/objects/golf_ball.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: Util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Util\", function() { return Util; });\nconst Util = {\n\n    calcDistance: (puterPos, ballPos) => {\n        const [xPutter, yPutter] = puterPos;\n        const [xBall, yBall] = ballPos;\n\n        return Math.sqrt(\n            Math.pow(xPutter - xBall, 2) + Math.pow(yPutter - yBall, 2)\n        );\n    },\n\n    calcVelocity: (putterPos, ballPos, distance) => {\n        // console.log(`The sqrt of distance is ${Math.sqrt(distance)}`);\n        let n = Math.abs(20 - Math.sqrt(distance));\n        if (n < 7) {\n            n = 7;\n        }\n        // console.log(`This is n: ${n}`);\n\n        // console.log(`This is dx: ${putterPos[0] - ballPos[0]}`);\n        // console.log(`This is dy: ${putterPos[1] - ballPos[1]}`);\n\n        let xVel = (putterPos[0] - ballPos[0]) / n;\n        let yVel = (putterPos[1] - ballPos[1]) / n;\n        // console.log(`This is the velocity [${xVel}, ${yVel}]`);\n\n        // TODO: Add a maximum speed, must be porportional to the \n        // distance and not like below.\n        // if ((Math.abs(xVel) > 50) || (Math.abs(yVel) > 50)) {\n        //     xVel = xVel < 0 ? -50 : 50;\n        //     yVel = yVel < 0 ? -50 : 50;\n        // }\n        // console.log(`This is the velocity [${xVel}, ${yVel}]`);\n        \n        return [-xVel, -yVel];\n    },\n\n};\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });