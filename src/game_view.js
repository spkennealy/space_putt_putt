import Game from './game';

class GameView {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.game = new Game(ctx, canvas);
    }
}

export default GameView;