import GolfBall from './golf_ball';
import GameView from './game_view';
import Game from './game';

window.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById("canvas");
    canvas.width = 800;
    canvas.height = 500;
    let ctx = canvas.getContext("2d");

    // const gameView = new GameView(ctx, canvas);

    const game = new Game(ctx, canvas);
});
