class Brick {
    constructor(color, x, y, lives, smallBalls) {
        this.x = x;
        this.y = y;
        this.width = 81;
        this.height = 40;
        this.color = color;
        this.lives = lives;
        this.smallBalls = smallBalls;
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
        else if (ball.y <= this.y + this.height && ball.y >= this.y && ball.x >= this.x - ball.rad && ball.x <= this.x + this.width + ball.rad) {
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
        fill(this.color);
        rect(this.x, this.y, this.width, this.height, 2);
    }
}