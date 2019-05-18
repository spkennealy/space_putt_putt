import GolfBall from "../objects/golf_ball";

class Hole {
    constructor(ctx, canvas, game, options) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.game = game;
        this.walls = options.walls;
        this.holePos = options.holePos;
        this.obstacles = options.obstacles;
        this.ballStopped = true;
        this.ballDropped = false;
        this.golfBall = null;
        
        this.newGolfBall();
        this.draw();
        this.startHole();
        
        this.newGolfBall = this.newGolfBall.bind(this);
        this.drawHole = this.drawHole.bind(this);
        this.drawHoleWalls = this.drawHoleWalls.bind(this);
        this.startHole = this.startHole.bind(this);
    }

    draw() {
        this.drawHole(this.ctx, this.holePos);
        this.drawHoleWalls();
    
        this.golfBall.draw(this.ctx);
        this.golfBall.wallCollision();
        this.golfBall.move();
        this.golfBall.decelerate();

        if (this.golfBall.vel[0] === 0 && this.golfBall.vel[1] === 0) {
            this.ballStopped = true;
        }
    }

    drawHoleWalls() {
        const startPoint = this.walls[0];
        
        this.ctx.beginPath();
        this.ctx.fillStyle = "#faed27";
        this.ctx.moveTo(startPoint[0], startPoint[1]);
        const walls = this.walls.slice(1);
        walls.forEach(wallPos => {
            this.ctx.lineTo(wallPos[0], wallPos[1]);
        });
        this.ctx.lineWidth = 10;
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.lineWidth = 1;
    }


    newGolfBall() {
        this.golfBall = new GolfBall({
            pos: [40, 250],
            vel: [0, 0],
            radius: 6,
            canvas: this.canvas
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

    startHole() {
    
        this.golfBall.grabBall();

        window.addEventListener("click", (e) => {
            if (!this.ballDropped) {
                this.golfBall.dropBall();
                this.ballDropped = true;
            } else if (this.ballDropped && this.ballStopped) {
                this.game.hit(e);
                this.ballStopped = false;
            }
        });
    }
    
}

export default Hole;