const game = new Game();
const WIDTH = 600;
const HEIGHT = 650

function setup() {
    createCanvas(WIDTH, HEIGHT)
    game.setup();
}

function draw() {  
    background(225);
    game.draw();
}

function keyPressed() {
    game.ball.keyPressed();
}