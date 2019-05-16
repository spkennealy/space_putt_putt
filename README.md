# Space Putt Putt

## Background and Overview

`Space Putt Putt` is a mini golf game that is out of this world. The coures is 
made up of 9 holes and is played just like the normal mini golf game you know 
and love. The player will attempt to get the ball in the hole in the least 
amount of strokes as possible. 

The player starts off with a view of the hole and decides where on the starting
mat to place the ball. The player will then use the mouse to go behind the ball
and take a shot (with a click). The distance from the mouse to the ball will 
determine the velocity of the shot. The ball will eventually stop rolling and 
then the player will take another shot until the ball goes in the hole. 

## Functionality and MVP Features
- [ ] Ability to place golf ball on first click and to hit golf ball on second click
- [ ] Acceleration and slow down of golf ball
- [ ] Layout of one single hole
- [ ] Additional holes

## Architecture and Technologies
* Javascript will be used for the game logic
* Canvas will be used to render the holes
* Webpack to bundle

## Implementation Timeline
5/15 - Plan out project and gather information on canvas to use for the rendering.
* Setup project
* Learn canvas

5/16 - Write out javascript that will move the golf ball, drop the golf ball in the
specified location, and bounce off walls.
* Get ball moving on page
* Allow user to click and drop the golf ball in a specified location size
* Hit ball with putter and write velocity script that slows down ball based on user input

5/17 - Build out rendering of holes
* Use canvas to create holes 1-3
* Connect ball movement to the walls on the hole

5/18 = Build out more holes and touch up loose ends
* Use canvas to create holes 4-9
* Additional styling

Bonus Features: 
* Additional levels
* Multi player