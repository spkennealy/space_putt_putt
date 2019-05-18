import GameView from './game_view';
import Game from './game';
import GolfBall from './objects/golf_ball';

window.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById("canvas");
    canvas.width = 800;
    canvas.height = 500;
    let ctx = canvas.getContext("2d");

    new GameView(ctx, canvas);
});
