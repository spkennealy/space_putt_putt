import GolfBall from "./objects/golf_ball";
import { Util } from './util';
import Hole from "./holes/hole";
import holes from './holes/all_holes';

class Game {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.ballDropped = false;
        this.animate = this.animate.bind(this);
        this.currentHoleNum = 0;
        
        this.createBall();
        this.start();
        this.getClickPostion = this.getClickPostion.bind(this);
        this.createBall = this.createBall.bind(this);
        this.startHole = this.startHole.bind(this);
    }

    start() {
        this.currentHoleNum += 1;
        if (this.currentHoleNum > 9) return false;
        this.startHole();
        this.animate(this.ctx);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentHole.draw(this.ctx);
        this.golfBall.draw(this.ctx);
        this.golfBall.wallCollision();
        this.golfBall.move();
        this.golfBall.decelerate();
        requestAnimationFrame(this.animate);
    }
    
    createBall() {
        this.golfBall = new GolfBall({
            pos: [40, 250],
            vel: [0, 0],
            radius: 6,
            canvas: this.canvas
        });
    }

    // then calculate the velocity to hit the ball
    // then move the ball at that velocity
    // -- then add a slow down function to get the ball to stop
    hit(e) {
        let pos = this.getClickPostion(e); 
        // console.log(`This is the click position: [${pos}]`);
        // console.log(`This is the golf ball position: [${this.golfBall.pos}]`);
        let distance = Util.calcDistance(pos, this.golfBall.pos);
        // console.log(`This is the distance from the click to the ball: ${distance}`);
        let vel = Util.calcVelocity(pos, this.golfBall.pos, distance);
        // console.log(`This is the velocity: ${vel}`);
        this.golfBall.isMoving = true;
        this.golfBall.vel = vel;
    }
    
    getClickPostion(e) {
        let mouseX = e.clientX - this.canvas.offsetLeft;
        // console.log(`This is the click position X value: ${mouseX}`);
        let mouseY = e.clientY - this.canvas.offsetTop;
        // console.log(`This is the click position Y value: ${mouseY}`);
        return [mouseX, mouseY];
    }

    startHole(){   
        this.currentHole = new Hole(this.ctx, holes[this.currentHoleNum - 1]);    
        this.golfBall.grabBall();
        window.addEventListener("click", (e) => {
            if (!this.ballDropped) {
                this.golfBall.dropBall();
                this.ballDropped = true;
            } else if (this.ballDropped) {
                this.hit(e);
            }
        });
    }


}

export default Game;

// document.addEventListener("click", e => {
//     golfBall.hit();
// });