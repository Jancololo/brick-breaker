class Booster {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.yspeed = 3;
        this.width = 10;
        this.height = 10;
        this.state = true;
        this.color = '#FF0000';
    }

    draw() {
        if (this.state) {
            this.y += this.yspeed;
            noStroke();
            fill(this.color);
            rect(this.x, this.y, this.width, this.height);
        }
    }
}

class Live extends Booster {
    constructor(x, y) {
        super(x, y);
        this.color = '#FF00B4';
    }

    draw() {
        super.draw();

        //detect collision with player and add extra feature
        if (this.y + this.height >= game.player.y && this.x >= game.player.x && this.x < game.player.x + game.player.width) {
            game.player.lives++
            game.updateLives();
            this.state = false;
            game.removeLiveBooster();
        }

        if (this.y > HEIGHT) {
            this.state = false;
            game.removeBallBooster();
        }
    }
}

class ExtraBall extends Booster {
    constructor(x, y) {
        super(x, y);
        this.color = '#00FFB8';
    }

    draw() {
        super.draw();

        //check if player catches it
        if (this.y + this.height >= game.player.y && this.x >= game.player.x && this.x < game.player.x + game.player.width) {
            this.createBalls();
            this.state = false;
            game.removeBallBooster();
        }

        if (this.y > HEIGHT) {
            this.state = false;
            game.removeBallBooster();
        }
    }

    createBalls() {
        for (let i = 0; i < 7; i++) {
            game.smallBalls.push(new SmallBall())
        }
    }
}