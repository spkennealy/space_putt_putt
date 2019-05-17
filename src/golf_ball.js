import * as Util from './util';

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
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(
            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
        );
        ctx.fill();
        ctx.linewidth = 1;
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    holdBall(e) {
        this.pos[0] = e.clientX - this.canvas.offsetLeft - 20;
        this.pos[1] = e.clientY - this.canvas.offsetTop - 20;
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
        const checkTopWall = (this.pos[1] + this.vel[1] < 0);
        const checkBottomWall = (this.pos[1] + this.vel[1] > this.canvas.height);
        const checkLeftWall = (this.pos[0] + this.vel[0] < 0);
        const checkRightWall = (this.pos[0] + this.vel[0] > this.canvas.width);
        if (checkTopWall || checkBottomWall) {
            this.vel[1] = -this.vel[1];
            return true;
        } else if (checkLeftWall || checkRightWall) {
            this.vel[0] = -this.vel[0];
        }
    }

    decelerate(rate) {
        // rate = rate ? rate : 1.02;

        if (this.vel[0] !== 0 || this.vel[1] !== 0) {
            this.vel = [this.vel[0] / rate, this.vel[1] / rate];
            if (Math.abs(this.vel[0]) < 0.1 && Math.abs(this.vel[1]) < 0.1) {
                [this.vel[0], this.vel[1]] = [0, 0];
                this.isMoving = false;
            }
            // this.vel = [this.vel[0], this.vel[1]];
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