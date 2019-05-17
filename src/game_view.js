import Game from './game';

class GameView {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.game = new Game(ctx, canvas);
        // this.animate = this.animate.bind(this);
    }

    // animate() {
    //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //     this.game.animate();
    //     requestAnimationFrame(this.animate);
    // }
}

export default GameView;