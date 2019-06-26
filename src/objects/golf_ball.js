
class GolfBall {
    constructor(options) {
        this.pos = options.pos;
        this.vel = options.vel;
        this.radius = options.radius;
        this.canvas = options.canvas;
        this.hole = options.hole;
        this.walls = options.walls;
        this.objects = options.objects;
        this.isMoving = false;
        this.sunk = false;

        // this.golfBall = new Image();
        // this.golfBall.src = './images/golf_ball_sprite.png';
        this.holdBall = this.holdBall.bind(this);
        this.draw = this.draw.bind(this);
        this.boundaryCollision = this.boundaryCollision.bind(this);
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

        const checkTopMat = ((e.pageY - this.canvas.offsetTop - this.radius) < matTop);
        const checkRightMat = ((e.pageX - this.canvas.offsetLeft + this.radius) > matRight);
        const checkBottomMat = ((e.pageY - this.canvas.offsetTop + this.radius) > matBottom);
        const checkLeftMat = ((e.pageX - this.canvas.offsetLeft - this.radius) < matLeft);

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
            this.pos[0] = e.pageX - this.canvas.offsetLeft;
            this.pos[1] = matTop + this.radius;
        } else if (checkRightMat) {
            this.pos[0] = matRight - this.radius;
            this.pos[1] = e.pageY - this.canvas.offsetTop;
        } else if (checkBottomMat) {
            this.pos[0] = e.pageX - this.canvas.offsetLeft;
            this.pos[1] = matBottom - this.radius;
        } else if (checkLeftMat) {
            this.pos[0] = matLeft + this.radius;
            this.pos[1] = e.pageY - this.canvas.offsetTop;
        } else if (checkLeftMat) {
            this.pos[0] = matLeft + this.radius;
            this.pos[1] = e.pageY - this.canvas.offsetTop;
        } else {
            this.pos[0] = e.pageX - this.canvas.offsetLeft;
            this.pos[1] = e.pageY - this.canvas.offsetTop;
        }
    }
    
    move() {
        this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    }

    boundaryCollision() {
        // check if the ball hits the top wall or bottom wall
        const checkTopWall = ((this.pos[1] + this.vel[1] - this.radius) < 0);
        const checkBottomWall = ((this.pos[1] + this.vel[1] + this.radius) > this.canvas.height);
        // check if the ball hits the left or right wall
        const checkLeftWall = ((this.pos[0] + this.vel[0] - this.radius) < 0);
        const checkRightWall = ((this.pos[0] + this.vel[0] + this.radius) > this.canvas.width);
        // if so, change the x velocity or y velocity to its inverse
        if (checkTopWall || checkBottomWall) {
            this.vel[1] = -this.vel[1];
        } else if (checkLeftWall || checkRightWall) {
            this.vel[0] = -this.vel[0];
        }
    }

    wallCollision() {
        for (let i = 0; i < this.walls.length; i++) {
            let wallDimensions = this.walls[i];
            
            const checkWallWidth = (
                (this.pos[0] + this.vel[0] + this.radius) > wallDimensions[0] &&
                (this.pos[0] + this.vel[0] - this.radius) < (wallDimensions[0] + wallDimensions[2])
            );

            const checkWallHeight = (
                (this.pos[1] + this.vel[1] + this.radius) > wallDimensions[1] &&
                (this.pos[1] + this.vel[1] - this.radius) < (wallDimensions[1] + wallDimensions[3])
            );

            const checkVerticalDirection = (
                (this.pos[1] < wallDimensions[1]) || (this.pos[1] > (wallDimensions[1] + wallDimensions[3]))
            );

            if (checkWallWidth && checkWallHeight) {
                if (checkVerticalDirection) {
                    this.vel[1] = -this.vel[1];
                } else {
                    this.vel[0] = -this.vel[0];
                }
            }
        }
    }

    // TODO: edit to make bounce off of triangle
    objectCollision() {
        this.objects.forEach(object => {
            const checkWallWidth = (
                (this.pos[0] + this.vel[0] + this.radius) > object[0] &&
                (this.pos[0] + this.vel[0] - this.radius) < (object[0] + object[2])
            );

            const checkWallHeight = (
                (this.pos[1] + this.vel[1] + this.radius) > object[1] &&
                (this.pos[1] + this.vel[1] + this.radius) < (object[1] + object[3])
            );

            const checkVerticalDirection = (
                (this.pos[1] < object[1]) || (this.pos[1] > (object[1] + object[3]))
            );

            if (checkWallWidth && checkWallHeight) {
                if (checkVerticalDirection) {
                    this.vel[1] = -this.vel[1];
                } else {
                    this.vel[0] = -this.vel[0];
                }
            }
        });
    }

    decelerate() {
        let rate = 1.03;
        let xVel = this.vel[0];
        let yVel = this.vel[1];

        // console.log(`This is xVel: ${xVel}`);
        // console.log(`This is yVel: ${yVel}`);
        if ((xVel > 3.5 && xVel <= 8) || (yVel > 3.5 && yVel <= 8) || 
            (xVel < -3.5 && xVel >= -8) || (yVel < -3.5 && yVel >= -8)) {
            rate = 1.035;
        } else if (xVel > 8 || yVel > 8 || xVel < -8 || yVel < -8) {
            rate = 1.04;
        } else if ((xVel > 0 && xVel <= 3.5) || (yVel > 0 && yVel <= 3.5) ||
            (xVel < 0 && xVel >= -3.5) || (yVel < 0 && yVel >= 3.5)) {
            rate = 1.05;
        }
        // console.log(`This is the rate: ${rate}`);

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