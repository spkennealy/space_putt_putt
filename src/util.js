export const Util = {

    calcDistance: (puterPos, ballPos) => {
        const [xPutter, yPutter] = puterPos;
        const [xBall, yBall] = ballPos;

        return Math.sqrt(
            Math.pow(xPutter - xBall, 2) + Math.pow(yPutter - yBall, 2)
        );
    },

    calcVelocity: (putterPos, ballPos, distance) => {
        // console.log(`The sqrt of distance is ${Math.sqrt(distance)}`);
        let n = Math.abs(20 - Math.sqrt(distance));
        if (n < 7) {
            n = 7;
        }
        // console.log(`This is n: ${n}`);

        // console.log(`This is dx: ${putterPos[0] - ballPos[0]}`);
        // console.log(`This is dy: ${putterPos[1] - ballPos[1]}`);

        let xVel = (putterPos[0] - ballPos[0]) / n;
        let yVel = (putterPos[1] - ballPos[1]) / n;
        // console.log(`This is the velocity [${xVel}, ${yVel}]`);

        // TODO: Add a maximum speed, must be porportional to the 
        // distance and not like below.
        // if ((Math.abs(xVel) > 50) || (Math.abs(yVel) > 50)) {
        //     xVel = xVel < 0 ? -50 : 50;
        //     yVel = yVel < 0 ? -50 : 50;
        // }
        // console.log(`This is the velocity [${xVel}, ${yVel}]`);
        
        return [-xVel, -yVel];
    },

};