class Brick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        //this.color random
        this.width = 100;
        this.height = 70;
    }

    collision(ball) {

        //detect collision with brick bottom
        if (ball.y <= this.y + this.height + ball.rad && ball.y >= this.y + this.height && ball.x >= this.x - ball.rad && ball.x <= this.x + this.width + ball.rad) {
            ball.changeY();
            console.log('collision-bottom');
            return true;
        }
        //detect collision with brick top
        else if (ball.y >= this.y - ball.rad && ball.y <= this.y && ball.x >= this.x - ball.rad && ball.x <= this.x + this.width + ball.rad) {
            ball.changeY();
            console.log('collision-top');
            return true;
        } 
        //detect collision with brick sides
        else if (ball.y <= this.y + this.height + ball.rad && ball.y >= this.y && ball.x >= this.x - ball.rad && ball.x <= this.x + this.width + ball.rad) {
            ball.xspeed *= -1;
            console.log('collision-lateral', ball.xspeed, ball.yspeed);
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