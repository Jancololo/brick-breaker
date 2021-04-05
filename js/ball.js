class Ball {
    constructor() {
        this.x = 0;
        this.y = 0;
        //this.xdirection = 1;
        //this.ydirection = -1;
        this.xspeed = 0;
        this.yspeed = -4;
        this.diameter = 16;
        this.rad = this.diameter / 2;

        this.counter = 0;

    }

    goLeft() {
        this.xspeed = -4;
    }

    goRight() {
        this.xspeed = 4;
    }

    changeY() {
        this.yspeed *= -1
    }

    draw() {
        console.log(this.counter, this.x, this.y, this.yspeed)

        //initial position
        if (this.counter === 0) {
            this.x = game.player.x + game.player.width / 2;
            this.y = game.player.y - this.rad;
        }

        if (this.counter === 1) {
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
            if (this.y >= game.player.y - this.rad && this.x >= game.player.x && this.x <= game.player.x + game.player.width / 3) {
                console.log('left')
                this.goLeft();
                this.changeY();
            }

            //collision with center of the player
            if (this.y >= game.player.y - this.rad && this.x >= game.player.x + game.player.width / 3 && this.x <= game.player.x + game.player.width * 2 / 3) {
                console.log('center')
                this.changeY();
            }

            //collision with right side of the player
            if (this.y >= game.player.y - this.rad && this.x >= game.player.x + game.player.width * 2 / 3 && this.x <= game.player.x + game.player.width) {
                console.log('right')
                this.goRight();
                this.changeY();
            }

            //ball reset if goes below the paddle
            if (this.y >= HEIGHT) {
                this.counter = 0;
                this.changeY();
            }

        }

        noStroke();
        fill(65);
        circle(this.x, this.y, this.diameter)
    }

    keyPressed() {
        if (keyCode === 32) {
            this.counter = 1;
        }

        if (keyCode === 83) {
            this.counter = 0;
        }
    }
}