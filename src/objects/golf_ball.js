
class GolfBall {
    constructor(options) {
        this.pos = options.pos;
        this.vel = options.vel;
        this.radius = options.radius;
        this.canvas = options.canvas;
        this.hole = options.hole;
        // this.walls = options.walls;
        this.isMoving = false;
        this.sunk = false;

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
        const matTop = this.hole.matPos[1];
        const matRight = this.hole.matPos[0] + this.hole.matPos[2];
        const matBottom = this.hole.matPos[1] + this.hole.matPos[3];
        const matLeft = this.hole.matPos[0];

        const checkTopMat = ((e.clientY - this.canvas.offsetTop - this.radius) < matTop);
        const checkRightMat = ((e.clientX - this.canvas.offsetLeft + this.radius) > matRight);
        const checkBottomMat = ((e.clientY - this.canvas.offsetTop + this.radius) > matBottom);
        const checkLeftMat = ((e.clientX - this.canvas.offsetLeft - this.radius) < matLeft);

        if (checkTopMat && checkLeftMat) {
            this.pos[0] = matLeft + this.radius;
            this.pos[1] = matTop + this.radius;
        } else if (checkTopMat && checkRightMat) {
            this.pos[0] = matRight - this.radius;
            this.pos[1] = matTop + this.radius;
        } else if (checkBottomMat && checkLeftMat) {
            this.pos[0] = matLeft + this.radius;
            this.pos[1] = matBottom - this.radius;
        } else if (checkBottomMat && checkRightMat) {
            this.pos[0] = matRight - this.radius;
            this.pos[1] = matBottom - this.radius;
        } else if (checkTopMat) {
            this.pos[0] = e.clientX - this.canvas.offsetLeft;
            this.pos[1] = matTop + this.radius;
        } else if (checkRightMat) {
            this.pos[0] = matRight - this.radius;
            this.pos[1] = e.clientY - this.canvas.offsetTop;
        } else if (checkBottomMat) {
            this.pos[0] = e.clientX - this.canvas.offsetLeft;
            this.pos[1] = matBottom - this.radius;
        } else if (checkLeftMat) {
            this.pos[0] = matLeft + this.radius;
            this.pos[1] = e.clientY - this.canvas.offsetTop;
        } else if (checkLeftMat) {
            this.pos[0] = matLeft + this.radius;
            this.pos[1] = e.clientY - this.canvas.offsetTop;
        }else {
            this.pos[0] = e.clientX - this.canvas.offsetLeft;
            this.pos[1] = e.clientY - this.canvas.offsetTop;
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
            return true;
        }

        // TODO: CHECK ALL THE DRAWN WALLS FOR THAT LEVEL
        // const topWalls = [];
        // const rightWalls = [];
        // const bottomWalls = [];
        // const leftWalls = [];

        // for (let i = 1; i < this.walls.length; i++) {
        //     const prevWall = this.walls[i-1];
        //     const currentWall = this.walls[i];
        //     const nextWall = this.walls[i+1];
            
        //     const vertical = currentWall[0] === prevWall[0];
        //     const nextVertical = currentWall[0] === nextWall[0];
        //     const horizontal = currentWall[1] === prevWall[1];
        //     const nextHorizontal = currentWall[1] === nextWall[1];

        //     // if (horizontal && )
        // }

        return false;
        
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