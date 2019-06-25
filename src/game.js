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

        // this.welcomeMessage();
        // this.start();
        this.newGame();

        this.getClickPostion = this.getClickPostion.bind(this);
        this.newHole = this.newHole.bind(this);
        this.showHoleNum = this.showHoleNum.bind(this);
        this.hit = this.hit.bind(this);
        this.newGame = this.newGame.bind(this);
        this.start = this.start.bind(this);
        // this.welcomeMessage = this.welcomeMessage.bind(this);
    }

    newGame() {
        const newGame = document.querySelectorAll(".new-game");
        const welcomeMessage = document.getElementById("welcome-message");
        const howToPlayButton = document.getElementById("instruction");
        const howToPlayMessage = document.getElementById("instructions");

        howToPlayButton.onclick = e => {
            howToPlayMessage.style.display = "flex";
            welcomeMessage.style.display = "none";
        };
        // debugger;
        newGame.forEach(button => {
            button.onclick = e => {
                console.log("Clicked");
                welcomeMessage.style.display = "none";
                howToPlayMessage.style.display = "none";
                e.stopPropagation();
                this.currentHoleNum = 1;
                this.totalStrokes = 0;
                this.start();
            };
        });
    }

    // welcomeMessage() {
    //     // canvas 800 x 500

    //     this.ctx.beginPath();
    //     this.ctx.rect(100, 100, 600, 300);
    //     this.ctx.fillStyle = "whitesmoke";
    //     this.ctx.fill();
    //     this.ctx.closePath();

    //     this.ctx.font = '48px Monoton';
    //     this.ctx.fillStyle = "black";
    //     this.ctx.fillText('Welcome to', 200, 160);
    //     this.ctx.fillText('Space Putt Putt', 150, 210);
    // }

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
            console.log(`Current Hole: ${this.currentHoleNum}`);
            this.start();
        }
    }

}

export default Game;