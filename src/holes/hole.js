
class Hole {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.walls = options.walls;
        this.holePos = options.holePos;
        this.obstacles = options.obstacles;
        this.draw();

        this.drawHole = this.drawHole.bind(this);
        this.drawHoleWalls = this.drawHoleWalls.bind(this);
    }

    draw() {
        this.drawHole(this.ctx, this.holePos);
        this.drawHoleWalls();
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
}

export default Hole;