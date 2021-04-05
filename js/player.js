class Player {
    constructor() {
        this.width = 150;
        this.height = 15
        this.x = (WIDTH - this.width) / 2;
        this.y = HEIGHT - (this.height + 5);

        this.speed = 10;
    }

    draw() {
        noStroke();
        fill(255);
        rect(this.x, this.y, this.width, this.height, 3);

        if (keyIsDown(RIGHT_ARROW) && this.x < WIDTH - this.width - (this.speed - 1)) {
            this.x += this.speed;
        }

        if (keyIsDown(LEFT_ARROW) && this.x > this.speed - (this.speed - 1)) {
            this.x -= this.speed;
        }
    }
}