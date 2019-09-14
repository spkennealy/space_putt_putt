import { Util } from './util';
import Hole from "./holes/hole";
import holes from './holes/course_1'; // have selectCourse() chose the holes

class Game {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.currentHole = null;
        this.currentHoleNum = 0;
        this.totalStrokes = 0;
        this.totalHoles = holes.length;
        this.course = null;

        this.newGame();
        
        this.getClickPostion = this.getClickPostion.bind(this);
        this.newHole = this.newHole.bind(this);
        this.showHoleNum = this.showHoleNum.bind(this);
        this.hit = this.hit.bind(this);
        this.newGame = this.newGame.bind(this);
        this.start = this.start.bind(this);
        this.gameOver = this.gameOver.bind(this);
        this.gameOverMessage = this.gameOverMessage.bind(this);   
    }

    // selectCourse() {

    // }

    newGame() {
        const newGame = document.querySelectorAll(".new-game");
        const welcomeMessage = document.getElementById("welcome-message");
        const howToPlayButton = document.getElementById("instruction");
        const howToPlayMessage = document.getElementById("instructions");
        const instructionsBack = document.getElementById("instructions-back");
        const nextHole = document.getElementById("next-hole");
        const gameOverDisplay = document.getElementById("game-over");

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
                    gameOverDisplay.style.display = "none";
                    const sunkMessage = document.getElementById("sink-message-container");
                    sunkMessage.style.display = "none";
                    e.stopPropagation();
                    this.currentHoleNum = 10;
                    this.totalStrokes = 0;
                    const eachHoleScorecard = document.querySelectorAll(".scorecard-data");
                    eachHoleScorecard.forEach(scorecard => {
                        scorecard.innerHTML = "";
                    });
                    this.start();
                }, 200);
            };
        });

        this.animate();
    }

    start() {
        if (this.currentHoleNum === 0) {
            this.currentHoleNum += 1;
        }
        if (this.currentHoleNum > holes.length + 1) return false;
        this.newHole();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.currentHole) this.currentHole.draw();
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

        const hitSound = document.getElementById("hit-sound");
        hitSound.src = "sounds/ball_hit.mp3";
        hitSound.pause();
        hitSound.currentTime = 0;
        hitSound.play();
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

    gameOver() {
        this.currentHole = null;
        this.currentHoleNum = 0;
        const sunkMessage = document.getElementById("sink-message-container");
        sunkMessage.style.display = "none";
        const gameOverDisplay = document.getElementById("game-over");
        gameOverDisplay.style.display = "flex";
        const gameOverMessage = document.getElementById("game-over-message");
        gameOverMessage.innerHTML = this.gameOverMessage();
        const resultScore = document.getElementById("result-score");
        resultScore.innerHTML = this.calcScore();
        const totalResultScore = document.getElementById("total-result-score");
        totalResultScore.innerHTML = this.totalStrokes;
    }

    calcScore() {
        if (this.totalStrokes > 26) {
            return `+ ${this.totalStrokes - 26}`;
        } else if (this.totalStrokes < 26) {
            return `- ${26 - this.totalStrokes}`;
        } else {
            return "E";
        }
    }

    gameOverMessage() {
        if (this.totalStrokes === 26) {
            return "Par golf, good job.";
        } else if (26 > this.totalStrokes && this.totalStrokes > 22) {
            return "Under par! Great job!";
        } else if (22 >= this.totalStrokes && this.totalStrokes > 19) {
            return "Excellent 9 holes! <br> You're a champ!";
        } else if (19 >= this.totalStrokes) {
            return "What a game! <br> You might be the best space <br> putt putter out there!";
        } else if (26 < this.totalStrokes && this.totalStrokes <= 29) {
            return "So close to par, <br> you'll get there.";
        } else if (30 < this.totalStrokes && this.totalStrokes <= 34) {
            return "At least you played <br> under bogey golf...";
        } else {
            return "Rough game... try again";
        }
    }

    

}

export default Game;