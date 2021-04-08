class SmallBall {
    constructor() {
        this.xspeed = Math.floor(Math.random() * (7 - (-7)) + (-7));
        this.yspeed = Math.floor(Math.random() * (-2 - (-6)) + (-6));
        this.diameter = 10;
        this.rad = this.diameter / 2;
        this.x = game.player.x + game.player.width / 2;
        this.y = game.player.y - this.rad;
        this.state = true;
    }

    goLeft() {
        this.xspeed = -6;
    }

    goRight() {
        this.xspeed = 6;
    }

    goCenter() {
        this.xspeed = 0;
    }

    changeY() {
        this.yspeed *= -1
    }

    draw() {
        //initial position

        this.x += this.xspeed;
        this.y += this.yspeed;

        //right margins
        if (this.x >= WIDTH - this.rad) {
            this.goLeft();
        }

        //left margins
        if (this.x <= this.rad) {
            this.goRight();
        }

        //top margin
        if (this.y <= this.rad) {
            this.changeY();
        }

        //collision with left side of the player
        if (this.y >= game.player.y - this.rad && this.y < game.player.y && this.x >= game.player.x && this.x <= game.player.x + game.player.width / 3) {
            this.goLeft();
            this.changeY();
        }

        //collision with center of the player
        if (this.y >= game.player.y - this.rad && this.y < game.player.y && this.x >= game.player.x + game.player.width / 3 && this.x <= game.player.x + game.player.width * 2 / 3) {
            this.changeY();
            this.goCenter();
        }

        //collision with right side of the player
        if (this.y >= game.player.y - this.rad && this.y < game.player.y && this.x >= game.player.x + game.player.width * 2 / 3 && this.x <= game.player.x + game.player.width) {
            this.goRight();
            this.changeY();
        }

        //ball don't reset if goes below the paddle
        if (this.y >= HEIGHT) {
            this.state = false;
            game.removeSmallBalls();
        }

        //draw Ball
        noStroke();
        fill(255, 0, 0);
        circle(this.x, this.y, this.diameter)
    }
}