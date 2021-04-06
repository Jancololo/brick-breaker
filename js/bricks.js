class Brick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 81;
        this.height = 60;
    }

    collision(ball) {

        //detect collision with brick bottom
        if (ball.y <= this.y + this.height + ball.rad && ball.y >= this.y + this.height && ball.x >= this.x - ball.rad && ball.x <= this.x + this.width + ball.rad) {
            ball.changeY();
            game.score++;
            game.updateScore();
            return true;
        }
        //detect collision with brick top
        else if (ball.y >= this.y - ball.rad && ball.y <= this.y && ball.x >= this.x - ball.rad && ball.x <= this.x + this.width + ball.rad) {
            ball.changeY();
            game.score++;
            game.updateScore();
            return true;
        } 
        //detect collision with brick sides
        else if (ball.y <= this.y + this.height + ball.rad && ball.y >= this.y && ball.x >= this.x - ball.rad && ball.x <= this.x + this.width + ball.rad) {
            ball.xspeed *= -1;
            game.score++;
            game.updateScore();
            return true;
        } else {
            return false;
        }
    }

    draw() {
        noStroke();
        fill(245);
        rect(this.x, this.y, this.width, this.height, 3);
    }
}