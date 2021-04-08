class Booster {
    constructor() {
        this.x = WIDTH / 2;
        this.y = 0;
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
    constructor() {
        super();
        this.color = '#FF00B4';
    }

    draw() {
        super.draw();

        //detect collision with player and add extra feature
        if (this.y + this.height >= game.player.y && this.x >= game.player.x && this.x < game.player.x + game.player.width) {
            game.player.lives++
            game.addExtraLive = false;
            game.updateLives();
            this.state = false;

        }
    }
}

class ExtraBall extends Booster {
    constructor() {
        super();
        this.color = '#00FFB8';
    }

    draw() {
        super.draw();

        //check if player catches it
        if (this.y + this.height >= game.player.y && this.x >= game.player.x && this.x < game.player.x + game.player.width) {
            game.catalyst = true;
            this.state = false;
        }
    }
}