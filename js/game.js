class Game {
    constructor() {
        this.rows = 5;
        this.columns = 7;
        this.score = 0;
        this.lives = 0;
        this.game = false;
        this.level = 2;
        this.moreBalls = false;
        this.bricksDistance = 4;
    }

    setup() {
        this.player = new Player();
        this.ball = new Ball();
        this.bricks = [];
        this.smallBalls = [];
        this.hardBricks = [];


        //create bricks for level 1
        if (this.level === 1) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.columns; j++) {
                    this.bricks.push(new Brick(j * 81 + this.bricksDistance * (j + 1), i * 50 + this.bricksDistance * (i + 1)));
                }
            }
        }

        //create bricks array for level 2
        if (this.level === 2) {
            for (let i = 0; i < this.rows - 2; i++) {
                for (let j = 0; j < this.columns; j++) {
                    this.bricks.push(new Brick(j * 81 + this.bricksDistance * (j + 1), i * 50 + this.bricksDistance * (i + 1)));
                }
            }

            //create hardBricks

            for (let i = 4; i < this.rows; i++) {
                for (let j = 0; j < this.columns; j++) {
                    if (j % 2 === 0) {
                        this.hardBricks.push(new HardBrick(j * 81 + this.bricksDistance * (j + 1), i * 50 + this.bricksDistance * (i + 1)));
                    }
                }
            }
        }

        for (let i = 0; i < 7; i++) {
            this.smallBalls.push(new SmallBall())
        }
    }

    draw() {

        //game
        if (this.game == true) {
            background(225);
            this.player.draw();
            this.ball.draw();

            this.bricks.forEach(function (brick) {
                brick.draw();
            })

            //collision with bricks
            this.bricks = this.bricks.filter(brick => {
                if (brick.collision(this.ball)) {
                    return false
                } else {
                    return true
                }
            })

        }

        //level 2
        if (this.level === 2 && this.game == true) {
            this.hardBricks.forEach(function (hardBrick) {
                hardBrick.draw();
                //hardBrick.collision(this.ball);
            })

            for (let i = 0; i < this.hardBricks.length; i++) {
                this.hardBricks[i].collision(this.ball);
            }

            //collision with hard bricks
            //this.hardBricks.forEach(function (hardBrick) {
                //hardBrick.collision(this.ball);
                // for (let i = 0; i < this.smallBalls.length; i++) {
                //     brick.collision(this.smallBalls[i]);
                // }
            //})
        }

        //landing screen 1
        if (this.game == false && this.score === 0) {
            background(225);
            textSize(30);
            fill(250);
            textAlign(CENTER);
            text(`Press 'space' to start`, WIDTH / 2, HEIGHT / 2 + 20);
        }

        //congratulatins screen
        if (this.score === this.rows * this.columns) {
            this.game = false;
            this.moreBalls = false;
            this.level = 2;
            background(225);
            textSize(30);
            fill(250);
            textAlign(CENTER);
            text(`Congratulations`, WIDTH / 2, HEIGHT / 2 - 40);
            text(`Score: ${this.score}`, WIDTH / 2, HEIGHT / 2);
            text(`Press 'space' to start next level`, WIDTH / 2, HEIGHT / 2 + 40);
        }

        //game over screen
        if (this.player.lives === 0) {
            this.game = false;
            this.moreBalls = false;
            background(20);
            textSize(30);
            fill(250);
            textAlign(CENTER);
            text('game over', WIDTH / 2, HEIGHT / 2 - 20);
            text(`Press 'space' to start again`, WIDTH / 2, HEIGHT / 2 + 20);
        }

        //more balls
        if (this.score === 3 || this.score === 45) {
            this.balls();
        }

        if (this.moreBalls == true) {

            this.smallBalls.forEach(function (smallBall) {
                smallBall.draw();
            })

            this.bricks = this.bricks.filter(brick => {

                for (let i = 0; i < this.smallBalls.length; i++) {
                    if (brick.collision(this.smallBalls[i])) {
                        return false
                    }
                }
                return true
            })
        }
    }

    updateScore() {
        const score = document.querySelector('.score span');
        score.innerText = this.score;
    }

    updateLives() {
        const lives = document.querySelector('.lives span');
        lives.innerText = this.player.lives;
    }

    keyPressed() {

        //first start
        if (keyCode === 32 && this.game == false && this.player.lives === 4 && this.score === 0) {
            this.game = true;
        }

        // start again after congrats (go to next level)
        if (keyCode === 32 && this.score === this.rows * this.columns && this.game == false) {
            // this.player.lives = 4;
            // this.score = 0;
            // this.updateLives();
            // this.updateScore();
            this.setup();
            this.moreBalls = false;
            this.game = true;
        }

        //start again after game over
        if (keyCode === 32 && this.player.lives === 0 && this.game == false) {
            this.player.lives = 4;
            this.score = 0;
            this.updateLives();
            this.updateScore();
            this.setup();
            this.game = true;
        }
    }

    levels() {

    }

    balls() {
        this.moreBalls = true;
    }

}