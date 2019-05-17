// import MovingObject from './moving_object';

class GolfBall {
    constructor(options) {
        this.pos = options.pos;
        this.vel = options.vel;
        this.radius = options.radius;
        this.canvas = options.canvas;

        // this.golfBall = new Image();
        // this.golfBall.src = './images/golf_ball_sprite.png';
        this.holdBall = this.holdBall.bind(this);
        this.hit = this.hit.bind(this);
        this.draw = this.draw.bind(this);
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
        // e.preventDefault();
        this.pos[0] = e.clientX - this.canvas.offsetLeft - 20;
        this.pos[1] = e.clientY - this.canvas.offsetTop - 20;
    }

    dropBall(canvas) {
        this.canvas.removeEventListener("mousemove", this.holdBall);
    }

    grabBall(canvas) {
        this.canvas.addEventListener("mousemove", this.holdBall);
    }
    
    hit() {
        this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
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