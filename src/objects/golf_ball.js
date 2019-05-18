// import * as Util from '../util';

class GolfBall {
    constructor(options) {
        this.pos = options.pos;
        this.vel = options.vel;
        this.radius = options.radius;
        this.canvas = options.canvas;
        this.isMoving = false;

        // this.golfBall = new Image();
        // this.golfBall.src = './images/golf_ball_sprite.png';
        this.holdBall = this.holdBall.bind(this);
        this.draw = this.draw.bind(this);
        this.wallCollision = this.wallCollision.bind(this);
    }
    
    draw(ctx) {
        ctx.fillStyle = "#39ff14";
        ctx.beginPath();
        ctx.arc(
            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
        );
        ctx.fill();
        ctx.linewidth = 1;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }

    holdBall(e) {
        // TODO: change wallCollision to matBoundaries and have ball stay inside
        // no matter where the mouse is
        if (this.wallCollision()) {
            this.pos[0] = e.clientX - this.canvas.offsetLeft - 5;
            this.pos[1] = e.clientY - this.canvas.offsetTop - 5;
        } else {
            this.pos[0] = e.clientX - this.canvas.offsetLeft - 5;
            this.pos[1] = e.clientY - this.canvas.offsetTop - 5;
        }
    }

    dropBall() {
        this.canvas.removeEventListener("mousemove", this.holdBall);
    }

    grabBall() {
        this.canvas.addEventListener("mousemove", this.holdBall);
    }
    
    move(vel) {
        this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    }

    wallCollision() {
        // check if the ball hits the top wall or bottom wall
        const checkTopWall = ((this.pos[1] + this.vel[1] - this.radius) < 0);
        const checkBottomWall = ((this.pos[1] + this.vel[1] + this.radius) > this.canvas.height);
        // check if the ball hits the left or right wall
        const checkLeftWall = ((this.pos[0] + this.vel[0] - this.radius) < 0);
        const checkRightWall = ((this.pos[0] + this.vel[0] + this.radius) > this.canvas.width);
        // if so, change the x velocity or y velocity to its inverse
        if (checkTopWall || checkBottomWall) {
            this.vel[1] = -this.vel[1];
            return true;
        } else if (checkLeftWall || checkRightWall) {
            this.vel[0] = -this.vel[0];
        }
    }

    decelerate() {
        let rate = 1.0008;
        let xVel = this.vel[0];
        let yVel = this.vel[1];

        // console.log(`This is xVel: ${xVel}`);
        // console.log(`This is yVel: ${yVel}`);
        if (xVel <  8 || yVel < 8) {
            rate = 1.02;
        }

        if (xVel !== 0 || yVel !== 0) {

            this.vel = [xVel / rate, yVel / rate];

            if (Math.abs(xVel) < 0.1 && Math.abs(yVel) < 0.1) {
                this.vel = [0, 0];
                this.isMoving = false;
                // console.log(`End ball position: [${this.pos}]`);
            }
        }
    }
}

export default GolfBall;



// IF I CAN EVER GET THIS SPRITE SHEET TO WORK CORRECTLY...

// const sprite = options => {
//     let that = {};
//     that.ctx = options.ctx;
//     that.width = options.width;
//     that.height = options.height;
//     that.image = options.image;
//     let frameIndex = 0;
//     let tickCount = 0;
//     let ticksPerFrame = options.ticksPerFrame || 0;
//     let numberOfFrames = options.numberOfFrames || 1;
//     that.loop = options.loop;

//     that.update = () => {
//         tickCount += 1;
//         if (tickCount > ticksPerFrame) {
//             tickCount = 0;

//             if (frameIndex < numberOfFrames - 1) {
//                 frameIndex += 1;
//             } else if (that.loop) {
//                 frameIndex = 0;
//             }
//         }
//     };

//     that.render = () => {
//         that.ctx.drawImage(
//             that.image,
//             frameIndex * that.width / numberOfFrames,
//             0,
//             that.width / numberOfFrames,
//             that.height,
//             0,
//             0,
//             that.width / numberOfFrames,
//             that.height
//         );
//     };

//     return that;
// };

// const ball = sprite({
//     ctx,
//     width: 16,
//     height: 16,
//     image: this.golfBall
// });

// const ballLoop = () => {
//     window.requestAnimationFrame(ballLoop);
//     ball.update();
//     ball.render();
// };