import GolfBall from "../objects/golf_ball";
import { Util } from '../util';

class Hole {
    constructor(ctx, canvas, game, options) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.game = game;
        this.walls = options.walls;
        this.wallColor = options.wallColor;
        this.golfBallColor = options.golfBallColor;
        this.ballPos = options.ballPos;
        this.holePos = options.holePos;
        this.matPos = options.matPos;
        this.obstacles = options.obstacles;
        this.par = options.par;
        this.ballStopped = true;
        this.ballDropped = false;
        this.golfBall = null;
        this.strokes = 0;
        
        this.newGolfBall();
        this.draw();
        this.startHole();
        this.showPar();
        this.showStrokes();
        
        this.newGolfBall = this.newGolfBall.bind(this);
        this.drawHole = this.drawHole.bind(this);
        this.drawHoleWalls = this.drawHoleWalls.bind(this);
        this.drawMat = this.drawMat.bind(this);
        this.drawPutterArrow = this.drawPutterArrow.bind(this);
        this.startHole = this.startHole.bind(this);
        this.sunkBall = this.sunkBall.bind(this);
        this.draw = this.draw.bind(this);
    }

    draw() {
        this.drawHole(this.ctx, this.holePos);
        // this.drawHoleWalls();
        this.drawMat();
        this.showStrokes();
        
        if (!this.golfBall.sunk) {
            this.golfBall.draw(this.ctx);
            this.golfBall.wallCollision();
            this.golfBall.move();
            this.golfBall.decelerate();
            this.sunkBall();
        }
        
        if (this.golfBall.vel[0] === 0 && this.golfBall.vel[1] === 0) {
            this.ballStopped = true;
        }

        // this.drawPutterArrow();
        // this.golfBall.grabBall();
    }

    drawHoleWalls() {
        const startPoint = this.walls[0];
        
        this.ctx.beginPath();
        this.ctx.moveTo(startPoint[0], startPoint[1]);
        const walls = this.walls.slice(1);
        walls.forEach(wallPos => {
            this.ctx.lineTo(wallPos[0], wallPos[1]);
        });
        this.ctx.lineWidth = 10;
        this.ctx.strokeStyle = this.wallColor;
        this.ctx.shadowColor = 'yellow';
        this.ctx.shadowBlur = 10;
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.lineWidth = 1;
        this.ctx.shadowColor = 'none';
        this.ctx.shadowBlur = 0;
    }

    drawMat() {
        this.ctx.beginPath();
        this.ctx.rect(...this.matPos);
        this.ctx.fillStyle = "rgb(51, 51, 255, 0.6)";
        this.ctx.fill();
        this.ctx.closePath();
    }

    newGolfBall() {
        this.golfBall = new GolfBall({
            pos: this.ballPos,
            vel: [0, 0],
            radius: 6,
            canvas: this.canvas,
            hole: this
        });
        
    }

    drawHole(ctx, pos) {
        let grd = ctx.createRadialGradient(pos[0] + 2, pos[1] + 2, 10, pos[0] + 10, pos[1] + 10, 5);
        grd.addColorStop(0, "white");
        grd.addColorStop(1, "black");
        ctx.fillStyle = grd;

        ctx.beginPath();
        ctx.arc(
            pos[0], pos[1], 10, 0, 2 * Math.PI, true
        );
        ctx.fill();
        ctx.linewidth = 0;
        ctx.strokeStyle = "whitesmoke";
        ctx.stroke();
        ctx.closePath();
    }

    drawPutterArrow(e) {
        // TODO: get arrow to stop being cleared by the hole draw;
        if (this.ballStopped && this.ballDropped) {
            // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.beginPath();
            const ballX = this.golfBall.pos[0];
            const ballY = this.golfBall.pos[1];
            
            this.ctx.moveTo(ballX, ballY);
            const mouseX = this.game.getClickPostion(e)[0];
            // const mouseX = e.pageX - this.canvas.offsetLeft;
            const mouseY = this.game.getClickPostion(e)[1];
            // const mouseY = e.pageY - this.canvas.offsetTop;
            const diffX = ballX - mouseX;
            const diffY = ballY - mouseY;
            const arrowX = ballX + diffX;
            const arrowY = ballY + diffY;
            
            // console.log(`ballX: ${ballX}`);
            // console.log(`ballY: ${ballY}`);
            // console.log(`MouseX: ${mouseX}`);
            // console.log(`MouseY: ${mouseY}`);
            // console.log(`diffX: ${diffX}`);
            // console.log(`diffY: ${diffY}`);
            // console.log(`arrowX: ${arrowX}`);
            // console.log(`arrowY: ${arrowY}`);
            
            this.ctx.lineTo(arrowX, arrowY);
            
            this.ctx.lineWidth = 3;
            this.ctx.strokeStyle = "whitesmoke";
            this.ctx.stroke();
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "none";
            this.ctx.closePath();
            // debugger;

        }
    }

    startHole() {
        window.addEventListener("mousemove", e => {
            if (this.ballDropped) {
                this.drawPutterArrow(e);
            } else {
                this.golfBall.holdBall(e);
            }
        });

        window.addEventListener("click", (e) => {
            if (!this.ballDropped) {
                // this.golfBall.dropBall();
                this.ballDropped = true;
            } else if (this.ballDropped && this.ballStopped) {
                this.game.hit(e);
                this.ballStopped = false;
            }
        });
    }

    sunkBall() {
        const checkDistance = Util.calcDistance(this.holePos, this.golfBall.pos) < 8;
        const checkVelocity = (
            (Math.abs(this.golfBall.vel[0]) < 5) && 
            (Math.abs(this.golfBall.vel[1]) < 5)
        );

        if (this.golfBall.isMoving && checkDistance) {
            // console.log(`Check velocity: ${checkVelocity}`);
            // console.log(`Golfball vel: ${this.golfBall.vel}`);
            // console.log(`Is ${this.golfBall.vel[0]} less than 7: ${Math.abs(this.golfBall.vel[0]) < 7 ? "true" : "false"}`);
            if (checkVelocity === true) {
                this.golfBall.sunk = true;
            }
        }
    }


    showPar() {
        const tablePar = document.getElementById("current-par");
        tablePar.innerHTML = this.par;
    }

    showStrokes() {
        const tableStrokes = document.getElementById("current-strokes");
        tableStrokes.innerHTML = this.strokes;
    }

}

export default Hole;