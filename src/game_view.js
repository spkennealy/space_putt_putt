import Game from './game';

class GameView {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        
        this.animate = this.animate.bind(this);

        this.start();
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
}

export default GameView;