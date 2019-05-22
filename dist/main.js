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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _holes_hole__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./holes/hole */ \"./src/holes/hole.js\");\n/* harmony import */ var _holes_all_holes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./holes/all_holes */ \"./src/holes/all_holes.js\");\n\n\n\n\nclass Game {\n    constructor(ctx, canvas) {\n        this.ctx = ctx;\n        this.canvas = canvas;\n        this.currentHole = null;\n        this.currentHoleNum = 2;\n        this.totalStrokes = 0;\n\n        this.start();\n        this.newGame();\n\n        this.getClickPostion = this.getClickPostion.bind(this);\n        this.newHole = this.newHole.bind(this);\n        this.showHoleNum = this.showHoleNum.bind(this);\n        this.hit = this.hit.bind(this);\n        this.newGame = this.newGame.bind(this);\n    }\n\n    newGame() {\n        const newGame = document.getElementById(\"new-game\");\n        newGame.onclick = e => {\n            e.stopPropagation();\n            this.currentHoleNum = 1;\n            this.totalStrokes = 0;\n            this.start();\n        };\n    }\n\n    start() {\n        if (this.currentHoleNum === 0) {\n            this.currentHoleNum += 1;\n        }\n        if (this.currentHoleNum > 9) return false;\n        this.newHole();\n        this.animate();\n    }\n\n    animate() {\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        this.currentHole.draw();\n        this.showHoleNum();\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n    hit(e) {\n        let pos = this.getClickPostion(e); \n        // console.log(`This is the click position: [${pos}]`);\n        // console.log(`This is the golf ball position: [${this.currentHole.golfBall.pos}]`);\n        let distance = _util__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].calcDistance(pos, this.currentHole.golfBall.pos);\n        // console.log(`This is the distance from the click to the ball: ${distance}`);\n        let vel = _util__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].calcVelocity(pos, this.currentHole.golfBall.pos, distance);\n        // console.log(`This is the velocity: ${vel}`);\n        this.currentHole.golfBall.isMoving = true;\n        this.currentHole.golfBall.vel = vel;\n        this.currentHole.strokes += 1;\n        this.totalStrokes += 1;\n    }\n    \n    getClickPostion(e) {\n        // debugger;\n        let mouseX = e.pageX - this.canvas.offsetLeft;\n        // console.log(`This is the click position X value: ${mouseX}`);\n        let mouseY = e.pageY - this.canvas.offsetTop;\n        // console.log(`This is the click position Y value: ${mouseY}`);\n        // console.log(`Canvas offsetLeft: ${this.canvas.offsetLeft}`);\n        // console.log(`Canvas offsetTop: ${this.canvas.offsetTop}`);\n        return [mouseX, mouseY];\n    }\n\n    newHole(){   \n        this.currentHole = new _holes_hole__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\n            this.ctx, \n            this.canvas, \n            this,\n            _holes_all_holes__WEBPACK_IMPORTED_MODULE_2__[\"default\"][this.currentHoleNum - 1]\n        );      \n    }\n\n    showHoleNum() {\n        const tableHole = document.getElementById(\"current-hole\");\n        tableHole.innerHTML = this.currentHoleNum;\n    }\n\n    nextHole() {\n        if (this.currentHole.golfBall.sunk) {\n            this.currentHoleNum += 1;\n            console.log(`Current Hole: ${this.currentHoleNum}`);\n            this.start();\n        }\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nclass GameView {\n    constructor(ctx, canvas) {\n        this.ctx = ctx;\n        this.canvas = canvas;\n        this.game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, canvas);\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameView);\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/holes/all_holes.js":
/*!********************************!*\
  !*** ./src/holes/all_holes.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _hole_1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hole_1 */ \"./src/holes/hole_1.js\");\n/* harmony import */ var _hole_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hole_2 */ \"./src/holes/hole_2.js\");\n\n\n// import hole3 from './hole_3';\n// import hole4 from './hole_4';\n// import hole5 from './hole_5';\n// import hole6 from './hole_6';\n// import hole7 from './hole_7';\n// import hole8 from './hole_8';\n// import hole9 from './hole_9';\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ([\n    _hole_1__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    _hole_2__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n]);\n\n//# sourceURL=webpack:///./src/holes/all_holes.js?");

/***/ }),

/***/ "./src/holes/hole.js":
/*!***************************!*\
  !*** ./src/holes/hole.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _objects_golf_ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/golf_ball */ \"./src/objects/golf_ball.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ \"./src/util.js\");\n\n\n\nclass Hole {\n    constructor(ctx, canvas, game, options) {\n        this.ctx = ctx;\n        this.canvas = canvas;\n        this.game = game;\n        this.golfBallColor = options.golfBallColor;\n        this.ballPos = options.ballPos;\n        this.holePos = options.holePos;\n        this.matPos = options.matPos;\n        this.walls = options.walls;\n        this.wallColor = options.wallColor;\n        this.par = options.par;\n        this.ballStopped = true;\n        this.ballDropped = false;\n        this.golfBall = null;\n        this.strokes = 0;\n        \n        this.newGolfBall();\n        this.draw();\n        this.startHole();\n        this.showPar();\n        this.showStrokes();\n        \n        this.newGolfBall = this.newGolfBall.bind(this);\n        this.drawHole = this.drawHole.bind(this);\n        this.drawMat = this.drawMat.bind(this);\n        this.drawPutterArrow = this.drawPutterArrow.bind(this);\n        this.drawWalls = this.drawWalls.bind(this);\n        this.startHole = this.startHole.bind(this);\n        this.sunkBall = this.sunkBall.bind(this);\n        this.draw = this.draw.bind(this);\n    }\n\n    draw() {\n        this.drawHole(this.ctx, this.holePos);\n        this.drawMat();\n        this.drawWalls();\n        this.showStrokes();\n\n        if (!this.golfBall.sunk) {\n            this.golfBall.draw(this.ctx);\n            this.golfBall.boundaryCollision();\n            this.golfBall.wallCollision();\n            this.golfBall.move();\n            this.golfBall.decelerate();\n            this.sunkBall();\n        }\n        \n        if (this.golfBall.vel[0] === 0 && this.golfBall.vel[1] === 0) {\n            this.ballStopped = true;\n        }\n\n        if (this.ballStopped && this.ballDropped) {\n            this.drawPutterArrow();\n        }\n    }\n\n    drawWalls() {\n        this.walls.forEach(obst => {\n            this.ctx.beginPath();\n            this.ctx.rect(...obst);\n            this.ctx.fillStyle = this.wallColor;\n            this.ctx.fill();\n            this.ctx.closePath();\n        });\n    }\n\n    drawMat() {\n        this.ctx.beginPath();\n        this.ctx.rect(...this.matPos);\n        this.ctx.fillStyle = \"rgb(51, 51, 255, 0.6)\";\n        this.ctx.fill();\n        this.ctx.closePath();\n    }\n\n    newGolfBall() {\n        this.golfBall = new _objects_golf_ball__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n            pos: this.ballPos,\n            vel: [0, 0],\n            radius: 6,\n            canvas: this.canvas,\n            hole: this,\n            walls: this.walls\n        });\n        \n    }\n\n    drawHole(ctx, pos) {\n        let grd = ctx.createRadialGradient(pos[0] + 2, pos[1] + 2, 10, pos[0] + 10, pos[1] + 10, 5);\n        grd.addColorStop(0, \"white\");\n        grd.addColorStop(1, \"black\");\n        ctx.fillStyle = grd;\n\n        ctx.beginPath();\n        ctx.arc(\n            pos[0], pos[1], 10, 0, 2 * Math.PI, true\n        );\n        ctx.fill();\n        ctx.linewidth = 0;\n        ctx.strokeStyle = \"whitesmoke\";\n        ctx.stroke();\n        ctx.closePath();\n    }\n\n    drawPutterArrow() {\n        this.ctx.beginPath();\n        const ballX = this.golfBall.pos[0];\n        const ballY = this.golfBall.pos[1];\n        \n        this.ctx.moveTo(ballX, ballY);\n        const mouseX = this.mousePos[0] - this.canvas.offsetLeft;\n        const mouseY = this.mousePos[1] - this.canvas.offsetTop;\n        const diffX = ballX - mouseX;\n        const diffY = ballY - mouseY;\n        const arrowX = ballX + diffX;\n        const arrowY = ballY + diffY;\n        \n        this.ctx.lineTo(arrowX, arrowY);\n        \n        this.ctx.lineWidth = 3;\n        this.ctx.strokeStyle = \"whitesmoke\";\n        this.ctx.stroke();\n        this.ctx.lineWidth = 1;\n        this.ctx.strokeStyle = \"none\";\n        this.ctx.closePath();\n    }\n\n    startHole() {\n        window.addEventListener(\"mousemove\", e => {\n            this.mousePos = [e.pageX, e.pageY];\n            if (!this.ballDropped) {\n                this.golfBall.holdBall(e);\n            }\n        });\n\n        window.addEventListener(\"click\", (e) => {\n            if (!this.ballDropped) {\n                this.ballDropped = true;\n            } else if (this.ballDropped && this.ballStopped) {\n                this.game.hit(e);\n                this.ballStopped = false;\n            }\n        });\n    }\n\n    sunkBall() {\n        const checkDistance = _util__WEBPACK_IMPORTED_MODULE_1__[\"Util\"].calcDistance(this.holePos, this.golfBall.pos) < 8;\n        const checkVelocity = (\n            (Math.abs(this.golfBall.vel[0]) < 5) && \n            (Math.abs(this.golfBall.vel[1]) < 5)\n        );\n\n        if (this.golfBall.isMoving && checkDistance) {\n            // console.log(`Check velocity: ${checkVelocity}`);\n            // console.log(`Golfball vel: ${this.golfBall.vel}`);\n            // console.log(`Is ${this.golfBall.vel[0]} less than 7: ${Math.abs(this.golfBall.vel[0]) < 7 ? \"true\" : \"false\"}`);\n            if (checkVelocity === true) {\n                this.golfBall.sunk = true;\n                \n            }\n        }\n    }\n\n\n    showPar() {\n        const tablePar = document.getElementById(\"current-par\");\n        tablePar.innerHTML = this.par;\n    }\n\n    showStrokes() {\n        const tableStrokes = document.getElementById(\"current-strokes\");\n        tableStrokes.innerHTML = this.strokes;\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Hole);\n\n//# sourceURL=webpack:///./src/holes/hole.js?");

/***/ }),

/***/ "./src/holes/hole_1.js":
/*!*****************************!*\
  !*** ./src/holes/hole_1.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    holePos: [700, 250],\n    walls: [],\n    wallColor: \"\",\n    golfBallColor: \"#39ff14\",\n    matPos: [40, 190, 50, 100],\n    ballPos: [70, 250],\n    par: 2\n});\n\n//# sourceURL=webpack:///./src/holes/hole_1.js?");

/***/ }),

/***/ "./src/holes/hole_2.js":
/*!*****************************!*\
  !*** ./src/holes/hole_2.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    holePos: [700, 100],\n    walls: [\n        [400, 200, 50, 300],\n    ],\n    wallColor: \"rgb(128, 128, 128, 0.6)\",\n    golfBallColor: \"#0000FF\",\n    matPos: [40, 420, 100, 50],\n    ballPos: [70, 425],\n    par: 2\n});\n\n//# sourceURL=webpack:///./src/holes/hole_2.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\n\nwindow.addEventListener(\"DOMContentLoaded\", () => {\n    let canvas = document.getElementById(\"canvas\");\n    canvas.width = 800;\n    canvas.height = 500;\n    let ctx = canvas.getContext(\"2d\");\n\n    new _game_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, canvas);\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/objects/golf_ball.js":
/*!**********************************!*\
  !*** ./src/objects/golf_ball.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nclass GolfBall {\n    constructor(options) {\n        this.pos = options.pos;\n        this.vel = options.vel;\n        this.radius = options.radius;\n        this.canvas = options.canvas;\n        this.hole = options.hole;\n        this.walls = options.walls;\n        this.isMoving = false;\n        this.sunk = false;\n\n        // this.golfBall = new Image();\n        // this.golfBall.src = './images/golf_ball_sprite.png';\n        this.holdBall = this.holdBall.bind(this);\n        this.draw = this.draw.bind(this);\n        this.boundaryCollision = this.boundaryCollision.bind(this);\n    }\n    \n    draw(ctx) {\n        ctx.fillStyle = \"#39ff14\";\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n        );\n        ctx.fill();\n        ctx.linewidth = 1;\n        ctx.strokeStyle = \"black\";\n        ctx.stroke();\n        ctx.closePath();\n    }\n\n    holdBall(e) {\n        const matTop = this.hole.matPos[1];\n        const matRight = this.hole.matPos[0] + this.hole.matPos[2];\n        const matBottom = this.hole.matPos[1] + this.hole.matPos[3];\n        const matLeft = this.hole.matPos[0];\n\n        const checkTopMat = ((e.pageY - this.canvas.offsetTop - this.radius) < matTop);\n        const checkRightMat = ((e.pageX - this.canvas.offsetLeft + this.radius) > matRight);\n        const checkBottomMat = ((e.pageY - this.canvas.offsetTop + this.radius) > matBottom);\n        const checkLeftMat = ((e.pageX - this.canvas.offsetLeft - this.radius) < matLeft);\n\n        if (checkTopMat && checkLeftMat) {\n            this.pos[0] = matLeft + this.radius;\n            this.pos[1] = matTop + this.radius;\n        } else if (checkTopMat && checkRightMat) {\n            this.pos[0] = matRight - this.radius;\n            this.pos[1] = matTop + this.radius;\n        } else if (checkBottomMat && checkLeftMat) {\n            this.pos[0] = matLeft + this.radius;\n            this.pos[1] = matBottom - this.radius;\n        } else if (checkBottomMat && checkRightMat) {\n            this.pos[0] = matRight - this.radius;\n            this.pos[1] = matBottom - this.radius;\n        } else if (checkTopMat) {\n            this.pos[0] = e.pageX - this.canvas.offsetLeft;\n            this.pos[1] = matTop + this.radius;\n        } else if (checkRightMat) {\n            this.pos[0] = matRight - this.radius;\n            this.pos[1] = e.pageY - this.canvas.offsetTop;\n        } else if (checkBottomMat) {\n            this.pos[0] = e.pageX - this.canvas.offsetLeft;\n            this.pos[1] = matBottom - this.radius;\n        } else if (checkLeftMat) {\n            this.pos[0] = matLeft + this.radius;\n            this.pos[1] = e.pageY - this.canvas.offsetTop;\n        } else if (checkLeftMat) {\n            this.pos[0] = matLeft + this.radius;\n            this.pos[1] = e.pageY - this.canvas.offsetTop;\n        } else {\n            this.pos[0] = e.pageX - this.canvas.offsetLeft;\n            this.pos[1] = e.pageY - this.canvas.offsetTop;\n        }\n    }\n    \n    move() {\n        this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];\n    }\n\n    boundaryCollision() {\n        // check if the ball hits the top wall or bottom wall\n        const checkTopWall = ((this.pos[1] + this.vel[1] - this.radius) < 0);\n        const checkBottomWall = ((this.pos[1] + this.vel[1] + this.radius) > this.canvas.height);\n        // check if the ball hits the left or right wall\n        const checkLeftWall = ((this.pos[0] + this.vel[0] - this.radius) < 0);\n        const checkRightWall = ((this.pos[0] + this.vel[0] + this.radius) > this.canvas.width);\n        // if so, change the x velocity or y velocity to its inverse\n        if (checkTopWall || checkBottomWall) {\n            this.vel[1] = -this.vel[1];\n        } else if (checkLeftWall || checkRightWall) {\n            this.vel[0] = -this.vel[0];\n        }\n    }\n\n    wallCollision() {\n        for (let i = 0; i < this.walls.length; i++) {\n            let wallDimensions = this.walls[i];\n            \n            const checkWallWidth = (\n                (this.pos[0] + this.vel[0] + this.radius) > wallDimensions[0] &&\n                (this.pos[0] + this.vel[0] - this.radius) < (wallDimensions[0] + wallDimensions[2])\n            );\n\n            const checkWallHeight = (\n                (this.pos[1] + this.vel[1] + this.radius) > wallDimensions[1] &&\n                (this.pos[1] + this.vel[1] + this.radius) < (wallDimensions[1] + wallDimensions[3])\n            );\n\n            const checkVerticalDirection = (\n                (this.pos[1] < wallDimensions[1]) || (this.pos[1] > (wallDimensions[1] + wallDimensions[3]))\n            );\n\n            if (checkWallWidth && checkWallHeight) {\n                if (checkVerticalDirection) {\n                    this.vel[1] = -this.vel[1];\n                } else {\n                    this.vel[0] = -this.vel[0];\n                }\n            }\n        }\n    }\n\n    decelerate() {\n        let rate = 1.0008;\n        let xVel = this.vel[0];\n        let yVel = this.vel[1];\n\n        // console.log(`This is xVel: ${xVel}`);\n        // console.log(`This is yVel: ${yVel}`);\n        if (xVel <  8 || yVel < 8) {\n            rate = 1.02;\n        }\n\n        if (xVel !== 0 || yVel !== 0) {\n\n            this.vel = [xVel / rate, yVel / rate];\n\n            if (Math.abs(xVel) < 0.1 && Math.abs(yVel) < 0.1) {\n                this.vel = [0, 0];\n                this.isMoving = false;\n                // console.log(`End ball position: [${this.pos}]`);\n            }\n        }\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GolfBall);\n\n\n\n// IF I CAN EVER GET THIS SPRITE SHEET TO WORK CORRECTLY...\n\n// const sprite = options => {\n//     let that = {};\n//     that.ctx = options.ctx;\n//     that.width = options.width;\n//     that.height = options.height;\n//     that.image = options.image;\n//     let frameIndex = 0;\n//     let tickCount = 0;\n//     let ticksPerFrame = options.ticksPerFrame || 0;\n//     let numberOfFrames = options.numberOfFrames || 1;\n//     that.loop = options.loop;\n\n//     that.update = () => {\n//         tickCount += 1;\n//         if (tickCount > ticksPerFrame) {\n//             tickCount = 0;\n\n//             if (frameIndex < numberOfFrames - 1) {\n//                 frameIndex += 1;\n//             } else if (that.loop) {\n//                 frameIndex = 0;\n//             }\n//         }\n//     };\n\n//     that.render = () => {\n//         that.ctx.drawImage(\n//             that.image,\n//             frameIndex * that.width / numberOfFrames,\n//             0,\n//             that.width / numberOfFrames,\n//             that.height,\n//             0,\n//             0,\n//             that.width / numberOfFrames,\n//             that.height\n//         );\n//     };\n\n//     return that;\n// };\n\n// const ball = sprite({\n//     ctx,\n//     width: 16,\n//     height: 16,\n//     image: this.golfBall\n// });\n\n// const ballLoop = () => {\n//     window.requestAnimationFrame(ballLoop);\n//     ball.update();\n//     ball.render();\n// };\n\n//# sourceURL=webpack:///./src/objects/golf_ball.js?");

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