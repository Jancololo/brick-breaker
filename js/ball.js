class Ball {
    constructor() {
        this.xspeed = 0;
        this.yspeed = -5;
        this.diameter = 16;
        this.rad = this.diameter / 2;
        this.starter = 0;

        this.x = game.player.x + game.player.width / 2;
        this.y = game.player.y - this.rad;
    }

    goLeft() {
        this.xspeed = -5;
    }

    goLeftCenter() {
        this.xspeed = -3;
    }

    goRight() {
        this.xspeed = 5;
    }

    goRightCenter() {
        this.xspeed = 3;
    }

    goCenter() {
        this.xspeed = 0;
    }

    changeY() {
        this.yspeed *= -1
    }

    draw() {
        //initial position
        if (this.starter === 0) {
            this.x = game.player.x + game.player.width / 2;
            this.y = game.player.y - this.rad;
        }

        if (this.starter === 1) {
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
            if (this.y >= game.player.y - this.rad && this.y < game.player.y && this.x >= game.player.x && this.x < game.player.x + game.player.width / 5) {
                this.goLeft();
                this.changeY();
            }

            //collision with left-center side of the player
            if (this.y >= game.player.y - this.rad && this.y < game.player.y && this.x >= game.player.x + game.player.width / 5 && this.x < game.player.x + game.player.width * 2 / 5) {
                this.goLeftCenter();
                this.changeY();
            }

            //collision with center of the player
            if (this.y >= game.player.y - this.rad && this.y < game.player.y && this.x >= game.player.x + game.player.width * 2 / 5 && this.x < game.player.x + game.player.width * 3 / 5) {
                this.changeY();
                this.goCenter();
            }

            //collision with center-right side of the player
            if (this.y >= game.player.y - this.rad && this.y < game.player.y && this.x >= game.player.x + game.player.width * 3 / 5 && this.x < game.player.x + game.player.width * 4 / 5) {
                this.goRightCenter();
                this.changeY();
            }

            //collision with right side of the player
            if (this.y >= game.player.y - this.rad && this.y < game.player.y && this.x >= game.player.x + game.player.width * 4 / 5 && this.x <= game.player.x + game.player.width) {
                this.goRight();
                this.changeY();
            }

            //ball reset if goes below the paddle
            if (this.y >= HEIGHT) {
                game.player.lives--;
                game.liveBoosters = [];
                game.ballBoosters = [];
                game.smallBalls = [];
                this.xspeed = 0;
                this.starter = 0;
                this.changeY();
            }
        }
        noStroke();
        fill(255);
        circle(this.x, this.y, this.diameter)
    }

    keyPressed() {
        if (keyCode === 32 && game.game == true) {
            this.starter = 1;
        }

        if (keyCode === 83) {
            this.starter = 0;
        }
    }
}