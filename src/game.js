import { Util } from './util';
import Hole from "./holes/hole";
import holes from './holes/all_holes';

class Game {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.currentHole = null;
        this.currentHoleNum = 0;
        this.totalStrokes = 0;

        this.start();

        this.getClickPostion = this.getClickPostion.bind(this);
        this.newHole = this.newHole.bind(this);
        this.showHoleNum = this.showHoleNum.bind(this);
        this.hit = this.hit.bind(this);
    }

    start() {
        if (this.currentHoleNum === 0) {
            this.currentHoleNum += 1;
        }
        if (this.currentHoleNum > 9) return false;
        this.newHole();
        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentHole.draw();
        this.showHoleNum();
        requestAnimationFrame(this.animate.bind(this));
    }

    hit(e) {
        let pos = this.getClickPostion(e); 
        // console.log(`This is the click position: [${pos}]`);
        // console.log(`This is the golf ball position: [${this.currentHole.golfBall.pos}]`);
        let distance = Util.calcDistance(pos, this.currentHole.golfBall.pos);
        // console.log(`This is the distance from the click to the ball: ${distance}`);
        let vel = Util.calcVelocity(pos, this.currentHole.golfBall.pos, distance);
        // console.log(`This is the velocity: ${vel}`);
        this.currentHole.golfBall.isMoving = true;
        this.currentHole.golfBall.vel = vel;
        this.currentHole.strokes += 1;
        this.totalStrokes += 1;

        console.log(`Stroke #${this.currentHole.strokes}`);
        console.log(`Total Strokes: ${this.totalStrokes}`);
    }
    
    getClickPostion(e) {
        // debugger;
        let mouseX = e.pageX - this.canvas.offsetLeft;
        // console.log(`This is the click position X value: ${mouseX}`);
        let mouseY = e.pageY - this.canvas.offsetTop;
        // console.log(`This is the click position Y value: ${mouseY}`);
        // console.log(`Canvas offsetLeft: ${this.canvas.offsetLeft}`);
        // console.log(`Canvas offsetTop: ${this.canvas.offsetTop}`);
        return [mouseX, mouseY];
    }

    newHole(){   
        this.currentHole = new Hole(
            this.ctx, 
            this.canvas, 
            this,
            holes[this.currentHoleNum - 1]
        );      
    }

    showHoleNum() {
        const tableHole = document.getElementById("current-hole");
        tableHole.innerHTML = this.currentHoleNum;
    }

    nextHole() {
        if (this.currentHole.golfBall.sunk) {
            this.currentHoleNum += 1;
            this.start();
        }
    }

}

export default Game;