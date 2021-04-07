class Live {
    constructor() {
        this.x = WIDTH / 2;
        this.y = 0;
        this.yspeed = 3;
        this.width = 10;
        this.height = 10;
        this.state = true;
    }

    draw() {
        if (this.state == true) {
            this.y += this.yspeed;
            noStroke();
            fill(255, 0, 0);
            rect(this.x, this.y, this.width, this.height);
        }

        //detect collision with player and add extra live
        if (this.y + this.height >= game.player.y && this.x >= game.player.x && this.x < game.player.x + game.player.width) {
            game.player.lives++
            game.addExtraLive = false;
            game.updateLives();
            this.state = false;
            
        }
    }
}