class HardBrick extends Brick {
    constructor(x, y) {
        super(x, y);
        this.color = '#FFFF00';
    }

    collision(ball) {

        //detect collision with brick bottom
        if (ball.y <= this.y + this.height + ball.rad && ball.y >= this.y + this.height && ball.x > this.x - ball.rad && ball.x < this.x + this.width + ball.rad) {
            ball.changeY();
            console.log('bottom')
        }
        //detect collision with brick top
        if (ball.y >= this.y - ball.rad && ball.y < this.y && ball.x >= this.x - ball.rad && ball.x <= this.x + this.width + ball.rad) {
            ball.changeY();
            console.log('top')
        }
        //detect collision with brick sides
        if (ball.y <= this.y + this.height && ball.y >= this.y && ball.x >= this.x - ball.rad && ball.x <= this.x + this.width + ball.rad) {
            ball.xspeed *= -1;
            console.log('sides')
        } 
    }

    draw() {
        super.draw();
    }
}