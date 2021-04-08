class Game {
    constructor() {
        this.rows = 5;
        this.columns = 7;
        this.score = 0;
        this.game = false;
        this.level = 1;
        this.bricksDistance = 4;
    }

    setup() {
        this.player = new Player();
        this.ball = new Ball();
        this.bricks = [];
        this.smallBalls = [];
        this.hardBricks = [];
        this.liveBoosters = [];
        this.ballBoosters = [];

        //create bricks array for level 1
        if (this.level === 1) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.columns; j++) {
                    if (i * j === 6) {
                        this.bricks.push(new Brick(j * 81 + this.bricksDistance * (j + 1), i * 50 + this.bricksDistance * (i + 1), 1, 0));
                    } else if (i === j) {
                        this.bricks.push(new Brick(j * 81 + this.bricksDistance * (j + 1), i * 50 + this.bricksDistance * (i + 1), 0, 1));
                    } else {
                        this.bricks.push(new Brick(j * 81 + this.bricksDistance * (j + 1), i * 50 + this.bricksDistance * (i + 1), 0, 0));
                    }
                }
            }
        }

        //create bricks array for level 2
        if (this.level === 2) {
            for (let i = 0; i < this.rows - 2; i++) {
                for (let j = 0; j < this.columns; j++) {
                    if (i * j === 6) {
                        this.bricks.push(new Brick(j * 81 + this.bricksDistance * (j + 1), i * 50 + this.bricksDistance * (i + 1), 1, 0));
                    } else if (i === j) {
                        this.bricks.push(new Brick(j * 81 + this.bricksDistance * (j + 1), i * 50 + this.bricksDistance * (i + 1), 0, 1));
                    } else {
                        this.bricks.push(new Brick(j * 81 + this.bricksDistance * (j + 1), i * 50 + this.bricksDistance * (i + 1), 0, 0));
                    }
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

        //create bricks array for level 3
        if (this.level === 3) {
            for (let i = 3; i <= 5; i++) {
                for (let j = 1; j <= this.columns - 2; j++) {
                    if (i * j === 6) {
                        this.bricks.push(new Brick(j * 81 + this.bricksDistance * (j + 1), i * 50 + this.bricksDistance * (i + 1), 1, 0));
                    } else if (i === j) {
                        this.bricks.push(new Brick(j * 81 + this.bricksDistance * (j + 1), i * 50 + this.bricksDistance * (i + 1), 0, 1));
                    } else {
                        this.bricks.push(new Brick(j * 81 + this.bricksDistance * (j + 1), i * 50 + this.bricksDistance * (i + 1), 0, 0));
                    }
                }
            }

            //create hardBricks
            for (let i = 0; i <= 6; i++) {
                if (i === 2 || i === 6) {
                    for (let j = 2; j < this.columns - 2; j++) {
                        this.hardBricks.push(new HardBrick(j * 81 + this.bricksDistance * (j + 1), i * 50 + this.bricksDistance * (i + 1)));
                    }
                }
            }
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
                    if (brick.lives === 1) {
                        this.liveBoosters.push(new Live(brick.x + brick.width / 2, brick.y + brick.height / 2));
                    } else if (brick.smallBalls === 1) {
                        this.ballBoosters.push(new ExtraBall(brick.x + brick.width / 2, brick.y + brick.height / 2));
                    }
                    return false
                } else {
                    return true
                }
            })
        }

        //level 2 and 3 add hard bricks
        if (this.level === 2 || this.level === 3 && this.game == true) {
            this.hardBricks.forEach(function (hardBrick) {
                hardBrick.draw();
            })

            for (let i = 0; i < this.hardBricks.length; i++) {
                this.hardBricks[i].collision(this.ball);
            }
        }

        //landing screen 1
        if (this.game == false && this.score === 0) {
            background(225);
            textSize(30);
            fill(250);
            textAlign(CENTER);
            text(`Press 'space' to start`, WIDTH / 2, HEIGHT / 2 + 20);
        }

        //congratulations screen level 1
        if (this.score === this.rows * this.columns && this.level === 1) {
            this.game = false;
            this.liveBoosters = [];
            this.ballBoosters = [];
            this.smallBalls = [];
            background(225);
            textSize(30);
            fill(250);
            textAlign(CENTER);
            text(`Congratulations`, WIDTH / 2, HEIGHT / 2 - 40);
            text(`Score: ${this.score}`, WIDTH / 2, HEIGHT / 2);
            text(`Press 'space' to start next level`, WIDTH / 2, HEIGHT / 2 + 40);
        }

        //congratulations screen level 2
        if (this.score === 56 && this.level === 2) {
            this.game = false;
            this.liveBoosters = [];
            this.ballBoosters = [];
            this.smallBalls = [];
            background(225);
            textSize(30);
            fill(250);
            textAlign(CENTER);
            text(`Congratulations`, WIDTH / 2, HEIGHT / 2 - 40);
            text(`Score: ${this.score}`, WIDTH / 2, HEIGHT / 2);
            text(`Press 'space' to start next level`, WIDTH / 2, HEIGHT / 2 + 40);
        }

        //congratulations screen level 3
        if (this.score === 71 && this.level === 3) {
            this.game = false;
            this.liveBoosters = [];
            this.ballBoosters = [];
            this.smallBalls = [];
            background(225);
            textSize(30);
            fill(250);
            textAlign(CENTER);
            text(`Congratulations, has acabat el joc`, WIDTH / 2, HEIGHT / 2 - 40);
            text(`Score: ${this.score}`, WIDTH / 2, HEIGHT / 2);
            text(`Press 'space' to start again`, WIDTH / 2, HEIGHT / 2 + 40);
        }

        //game over screen
        if (this.player.lives === 0) {
            this.game = false;
            this.liveBoosters = [];
            this.ballBoosters = [];
            this.smallBalls = [];
            background(20);
            textSize(30);
            fill(250);
            textAlign(CENTER);
            text('game over', WIDTH / 2, HEIGHT / 2 - 20);
            text(`Press 'space' to start again`, WIDTH / 2, HEIGHT / 2 + 20);
        }

        //draw live booster
        this.liveBoosters.forEach(function (liveBooster) {
            liveBooster.draw();
        })

        //draw ballsBooster
        this.ballBoosters.forEach(function (ballBooster) {
            ballBooster.draw();
        })

        // draw extra small balls
        this.smallBalls.forEach(function (smallBall) {
            smallBall.draw();
        })

        //collision with normal bricks
        this.bricks = this.bricks.filter(brick => {

            for (let i = 0; i < this.smallBalls.length; i++) {
                if (brick.collision(this.smallBalls[i])) {
                    if (brick.lives === 1) {
                        this.liveBoosters.push(new Live(brick.x + brick.width / 2, brick.y + brick.height / 2));
                    } else if (brick.smallBalls === 1) {
                        this.ballBoosters.push(new ExtraBall(brick.x + brick.width / 2, brick.y + brick.height / 2));
                    }
                    return false
                }
            }
            return true
        })

        //collision with hard bricks
        for (let i = 0; i < this.hardBricks.length; i++) {
            for (let j = 0; j < this.smallBalls.length; j++) {
                this.hardBricks[i].collision(this.smallBalls[j]);
            }
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

    removeLiveBooster() {
        this.liveBoosters = this.liveBoosters.filter(liveBooster => {
            if (liveBooster.state == false) {
                return false
            }
            return true
        })
    }

    removeBallBooster() {
        this.ballBoosters = this.ballBoosters.filter(ballBooster => {
            if (ballBooster.state == false) {
                return false
            }
            return true
        })
    }

    removeSmallBalls() {
        this.smallBalls = this.smallBalls.filter(smallBall => {
            if (smallBall.state == false) {
                return false
            }
            return true
        })
    }

    keyPressed() {

        //simular score
        if (keyCode === 76) {
            this.score++;
            this.updateScore();
        }

        if (keyCode === 75) {
            this.score--;
            this.updateScore();
        }

        //first start
        if (keyCode === 32 && this.game == false && this.player.lives === 4 && this.score === 0) {
            this.game = true;
        }

        // start again after next level
        if ((this.score === this.rows * this.columns || this.score === 56) && keyCode === 32 && this.game == false) {
            this.level++;
            this.setup();
            this.game = true;
        }

        //start again after game over
        if (keyCode === 32 && this.game == false && (this.player.lives === 0 || this.score === 71)) {
            this.player.lives = 4;
            this.score = 0;
            this.level = 1;
            this.updateLives();
            this.updateScore();
            this.setup();
            this.game = true;
        }
    }
}