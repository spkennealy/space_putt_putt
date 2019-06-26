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

        this.newGame();

        this.getClickPostion = this.getClickPostion.bind(this);
        this.newHole = this.newHole.bind(this);
        this.showHoleNum = this.showHoleNum.bind(this);
        this.hit = this.hit.bind(this);
        this.newGame = this.newGame.bind(this);
        this.start = this.start.bind(this);
    }

    newGame() {
        const newGame = document.querySelectorAll(".new-game");
        const welcomeMessage = document.getElementById("welcome-message");
        const howToPlayButton = document.getElementById("instruction");
        const howToPlayMessage = document.getElementById("instructions");
        const instructionsBack = document.getElementById("instructions-back");
        const nextHole = document.getElementById("next-hole");

        nextHole.onclick = e => {
            this.nextHole();
        };

        howToPlayButton.onclick = e => {
            setTimeout(() => {
                howToPlayMessage.style.display = "flex";
                welcomeMessage.style.display = "none";
            }, 200);
        };

        instructionsBack.onclick = e => {
            setTimeout(() => {
                howToPlayMessage.style.display = "none";
                welcomeMessage.style.display = "flex";
            }, 200);
        };

        newGame.forEach(button => {
            button.onclick = e => {
                setTimeout(() => {
                    welcomeMessage.style.display = "none";
                    howToPlayMessage.style.display = "none";
                    const sunkMessage = document.getElementById("sink-message-container");
                    sunkMessage.style.display = "none";
                    e.stopPropagation();
                    this.currentHoleNum = 1;
                    this.totalStrokes = 0;
                    const eachHoleScorecard = document.querySelectorAll(".scorecard-data");
                    eachHoleScorecard.forEach(scorecard => {
                        scorecard.innerHTML = "";
                    });
                    this.start();
                }, 200);
            };
        });
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
        const totalScore = document.getElementById("total-score");
        totalScore.innerHTML = this.totalStrokes;
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
        this.totalStrokes += 1;
    }
    
    getClickPostion(e) {
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
        console.log(`Current Hole: ${this.currentHoleNum}`);
    }

    showHoleNum() {
        const tableHole = document.getElementById("current-hole");
        tableHole.innerHTML = this.currentHoleNum;
    }

    nextHole() {
        if (this.currentHole.golfBall.sunk) {
            this.currentHoleNum += 1;
            const sunkMessage = document.getElementById("sink-message-container");
            sunkMessage.style.display = "none";
            this.start();
        }
    }

    setHoleScore(score) {
        let currHoleScorecard = document.getElementById(`score-${this.currentHoleNum}`);
        currHoleScorecard.innerHTML = score;
    }

}

export default Game;