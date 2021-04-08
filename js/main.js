const game = new Game();
const WIDTH = 600;
const HEIGHT = 650

let unicaHass;

function preload() {
  unicaHass = loadFont('assets/NeueHaasUnicaProMedium.otf');
  game.preload();
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
    textFont(unicaHass);
    game.setup();
}

function draw() {  
    game.draw();
}

function keyPressed() {
    game.ball.keyPressed();
    game.keyPressed();
}