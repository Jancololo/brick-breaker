class Booster {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.yspeed = 3;
        this.width = 27;
        this.height = this.width;
        this.state = true;
        this.color = '#FF0000';
    }

    draw() {
        if (this.state) {
            this.y += this.yspeed;
            image(this.image, this.x, this.y, this.width, this.height)
            // noStroke();
            // fill(this.color);
            // rect(this.x, this.y, this.width, this.height);
        }
    }
}

class Live extends Booster {
    constructor(x, y, image) {
        super(x, y, image);
        this.color = '#FF00B4';
    }

    draw() {
        super.draw();

        //detect collision with player and add extra feature
        if (this.y + this.height >= game.player.y && this.y + this.height <= game.player.y + game.player.height && this.x >= game.player.x && this.x < game.player.x + game.player.width) {
            game.player.lives++
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
    constructor(x, y, image) {
        super(x, y, image);
        this.color = '#00FFB8';
    }

    draw() {
        super.draw();

        //check if player catches it
        if (this.y + this.height >= game.player.y && this.y + this.height <= game.player.y + game.player.height && this.x >= game.player.x && this.x < game.player.x + game.player.width) {
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