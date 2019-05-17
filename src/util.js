export const Util = {

    calcDistance: (puterPos, ballPos) => {
        const [xPutter, yPutter] = puterPos;
        const [xBall, yBall] = ballPos;

        return Math.sqrt(
            Math.pow(xPutter - xBall, 2) + Math.pow(yPutter - yBall, 2)
        );
    },

    calcVelocity: (putterPos, ballPos) => {
        const xVel = (putterPos[0] - ballPos[0]) / 13;
        const yVel = (putterPos[1] - ballPos[1]) / 13;
        return [-xVel, -yVel];
    },

    // calcAngle: (puterPos, ballPos, vel) => {

    // }

};