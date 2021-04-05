class Game {
    constructor() {
        this.rows = 5;
        this.columns = 5;
    }

    setup() {
        this.player = new Player();
        this.ball = new Ball();
        this.bricks = [];
        //this.brick = new Brick();

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.bricks.push(new Brick(j * 100 + 10 * (j + 1), i * 70 + 10 * (i + 1)));
                //console.log(this.bricks[2]);
            }
        }
    }

    draw() {
        this.player.draw();
        this.ball.draw();

        this.bricks.forEach(function (brick) {
            brick.draw();
        })

        this.bricks = this.bricks.filter(brick => {
            if (brick.collision(this.ball)) {
                return false
            } else {
                return true
            }
        })
    }
}