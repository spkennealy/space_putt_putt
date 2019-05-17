import GolfBall from "./golf_ball";

class Game {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.createBall(this.ctx);
        this.animate = this.animate.bind(this);
        
        this.start();
        this.getClickPostion = this.getClickPostion.bind(this);
        this.startHole = this.startHole.bind(this);
    }

    start() {
        this.animate(this.ctx);
        this.startHole();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.golfBall.draw(this.ctx);
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

    getClickPostion(e) {
        let mouseX = e.clientX - this.canvas.offsetLeft - 20;
        let mouseY = e.clientY - this.canvas.offsetLeft - 20;
    }

    startHole(){
        this.golfBall.grabBall();
        this.canvas.addEventListener("click", (e) => {
            this.golfBall.dropBall();
        });
    }


}

export default Game;

// document.addEventListener("click", e => {
//     golfBall.hit();
// });