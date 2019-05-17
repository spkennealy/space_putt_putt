import GolfBall from "./golf_ball";
import { Util } from './util';

class Game {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.ballDropped = false;
        this.animate = this.animate.bind(this);
        
        this.createBall();
        this.start();
        this.getClickPostion = this.getClickPostion.bind(this);
        this.createBall = this.createBall.bind(this);
        this.startHole = this.startHole.bind(this);
    }

    start() {
        this.startHole();
        this.animate(this.ctx);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.golfBall.draw(this.ctx);
        this.golfBall.wallCollision();
        this.golfBall.move();
        requestAnimationFrame(this.animate);
    }
    
    createBall() {
        this.golfBall = new GolfBall({
            pos: [40, 250],
            vel: [0, 0],
            radius: 10,
            canvas: this.canvas
        });
    }

    // then calculate the velocity to hit the ball
    // then move the ball at that velocity
    // -- then add a slow down function to get the ball to stop
    hit(e) {
        let pos = this.getClickPostion(e); 
        console.log(`This is the click position: ${pos}`);
        console.log(`This is the golf ball position: ${this.golfBall.pos}`);
        let distance = Util.calcDistance(pos, this.golfBall.pos);
        console.log(`This is the distance from the click to the ball: ${distance}`);
        let vel = Util.calcVelocity(pos, this.golfBall.pos);
        console.log(`This is the velocity: ${vel}`);
        this.golfBall.isMoving = true;
        this.golfBall.vel = vel;
    }
    
    getClickPostion(e) {
        console.log(e);
        let mouseX = e.clientX - this.canvas.offsetLeft - 20;
        console.log(`This is the click position X value: ${mouseX}`);
        let mouseY = e.clientY - this.canvas.offsetTop - 20;
        console.log(`This is the click position Y value: ${mouseY}`);
        return [mouseX, mouseY];
    }

    startHole(){
        this.golfBall.grabBall();
        window.addEventListener("click", (e) => {
            if (!this.ballDropped) {
                this.golfBall.dropBall();
                this.ballDropped = true;
            } else if (this.ballDropped) {
                console.log(e);
                this.hit(e);
            }
        });
    }


}

export default Game;

// document.addEventListener("click", e => {
//     golfBall.hit();
// });