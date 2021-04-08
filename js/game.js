class Game {
    constructor() {
        this.rows = 6;
        this.columns = 7;
        this.score = 0;
        this.game = false;
        this.level = 1;
        this.bricksDistance = 4;
        this.bricksColor;
        this.backgroundColor;

        this.paddleBoosterImage;
        this.livesBoosterImage;
        this.ballsBoosterImage;
        this.liveImage
        this.logoImage
    }

    preload() {
        this.paddleBoosterImage = loadImage('assets/paddle-booster.png');
        this.livesBoosterImage = loadImage('assets/lives-booster.png');
        this.ballsBoosterImage = loadImage('assets/balls-booster.png');
        this.liveImage = loadImage('assets/live.png');
        this.logoImage = loadImage('assets/logo.png')
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
            this.backgroundColor = '#470700';

            for (let i = 0; i < this.rows; i++) {

                if (i === 0) {
                    this.bricksColor = '#E6B627';
                } else if (i === 1) {
                    this.bricksColor = '#F0A624';
                } else if (i === 2) {
                    this.bricksColor = '#D97C15';
                } else if (i === 3) {
                    this.bricksColor = '#F06A17';
                } else if (i === 4) {
                    this.bricksColor = '#E64311';
                } else {
                    this.bricksColor = '#DB1212';
                }

                for (let j = 0; j < this.columns; j++) {
                    if (i * j === 6) {
                        this.bricks.push(new Brick(this.bricksColor, j * 81 + this.bricksDistance * (j + 1), i * 40 + this.bricksDistance * (i + 1), 1, 0));
                    } else if (i === j) {
                        this.bricks.push(new Brick(this.bricksColor, j * 81 + this.bricksDistance * (j + 1), i * 40 + this.bricksDistance * (i + 1), 0, 1));
                    } else {
                        this.bricks.push(new Brick(this.bricksColor, j * 81 + this.bricksDistance * (j + 1), i * 40 + this.bricksDistance * (i + 1), 0, 0));
                    }
                }
            }
        }

        //create bricks array for level 2
        if (this.level === 2) {
            this.backgroundColor = '#140054';

            for (let i = 0; i < this.rows; i++) {
                
                if (i === 0) {
                    this.bricksColor = '#4B87E5';
                } else if (i === 1) {
                    this.bricksColor = '#4EBCF0';
                } else if (i === 2) {
                    this.bricksColor = '#4ED5DB';
                } else if (i === 3) {
                    this.bricksColor = '#48F4CC';
                } else if (i === 4) {
                    this.bricksColor = '#41EA96';
                } else {
                    this.bricksColor = '#6AE842';
                }

                for (let j = 0; j < this.columns; j++) {
                    if (i * j === 6) {
                        this.bricks.push(new Brick(this.bricksColor, j * 81 + this.bricksDistance * (j + 1), i * 40 + this.bricksDistance * (i + 1), 1, 0));
                    } else if (i === j) {
                        this.bricks.push(new Brick(this.bricksColor, j * 81 + this.bricksDistance * (j + 1), i * 40 + this.bricksDistance * (i + 1), 0, 1));
                    } else {
                        this.bricks.push(new Brick(this.bricksColor, j * 81 + this.bricksDistance * (j + 1), i * 40 + this.bricksDistance * (i + 1), 0, 0));
                    }
                }
            }

            //create hardBricks
            for (let i = 6; i <= this.rows; i++) {
                for (let j = 0; j < this.columns; j++) {
                    if (j % 2 === 0) {
                        this.hardBricks.push(new HardBrick(this.bricksColor, j * 81 + this.bricksDistance * (j + 1), i * 40 + this.bricksDistance * (i + 1)));
                    }
                }
            }
        }

        //create bricks array for level 3
        if (this.level === 3) {
            this.backgroundColor = '#00211F';

            for (let i = 3; i <= 5; i++) {
                if (i === 3) {
                    this.bricksColor = '#4ED5DB';
                } else if (i === 4) {
                    this.bricksColor = '#48F4CC';
                } else {
                    this.bricksColor = '#41EA96';
                }

                for (let j = 1; j <= this.columns - 2; j++) {
                    if (i * j === 6) {
                        this.bricks.push(new Brick(this.bricksColor, j * 81 + this.bricksDistance * (j + 1), i * 40 + this.bricksDistance * (i + 1), 1, 0));
                    } else if (i === j) {
                        this.bricks.push(new Brick(this.bricksColor, j * 81 + this.bricksDistance * (j + 1), i * 40 + this.bricksDistance * (i + 1), 0, 1));
                    } else {
                        this.bricks.push(new Brick(this.bricksColor, j * 81 + this.bricksDistance * (j + 1), i * 40 + this.bricksDistance * (i + 1), 0, 0));
                    }
                }
            }

            //create hardBricks
            for (let i = 0; i <= 6; i++) {
                if (i === 2 || i === 6) {
                    for (let j = 2; j < this.columns - 2; j++) {
                        this.hardBricks.push(new HardBrick(this.bricksColor, j * 81 + this.bricksDistance * (j + 1), i * 40 + this.bricksDistance * (i + 1)));
                    }
                }
            }
        }
    }

    draw() {

        //game
        if (this.game == true) {
            background(this.backgroundColor);
            textSize(22);
            fill(255, 255, 255, 140);
            text(this.score, 16, HEIGHT - 6);

            image(this.liveImage, WIDTH - 40, HEIGHT - 23, 18, 18);

            textSize(22);
            text(this.player.lives, WIDTH - 10, HEIGHT - 6);

            this.player.draw();
            this.ball.draw();

            this.bricks.forEach(function (brick) {
                brick.draw();
            })

            //collision with bricks
            this.bricks = this.bricks.filter(brick => {
                if (brick.collision(this.ball)) {
                    if (brick.lives === 1) {
                        this.liveBoosters.push(new Live(brick.x + brick.width / 2, brick.y + brick.height / 2, this.livesBoosterImage));
                    } else if (brick.smallBalls === 1) {
                        this.ballBoosters.push(new ExtraBall(brick.x + brick.width / 2, brick.y + brick.height / 2, this.ballsBoosterImage));
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
            background(this.backgroundColor);
            image(this.logoImage, WIDTH / 2 - 200, 0, 400, 250);
            textSize(25);
            fill(255, 255, 255);
            textAlign(CENTER);
            text(`Press 'space' to start`, WIDTH / 2, HEIGHT / 2 + 20);
        }

        //congratulations screen level 1
        if (this.score === this.rows * this.columns && this.level === 1) {
            this.game = false;
            this.liveBoosters = [];
            this.ballBoosters = [];
            this.smallBalls = [];
            background(this.backgroundColor);
            textSize(25);
            fill(255, 255, 255, 190);
            textAlign(CENTER);
            text(`Congratulations`, WIDTH / 2, HEIGHT / 2 - 50);
            text(`Score: ${this.score}`, WIDTH / 2, HEIGHT / 2);
            text(`Press 'space' to start next level`, WIDTH / 2, HEIGHT / 2 + 50);
        }

        //congratulations screen level 2
        if (this.score === 84 && this.level === 2) {
            this.game = false;
            this.liveBoosters = [];
            this.ballBoosters = [];
            this.smallBalls = [];
            background(this.backgroundColor);
            textSize(25);
            fill(255, 255, 255);
            textAlign(CENTER);
            text(`Congratulations`, WIDTH / 2, HEIGHT / 2 - 50);
            text(`Score: ${this.score}`, WIDTH / 2, HEIGHT / 2);
            text(`Press 'space' to start next level`, WIDTH / 2, HEIGHT / 2 + 50);
        }

        //congratulations screen level 3
        if (this.score === 99 && this.level === 3) {
            this.game = false;
            this.liveBoosters = [];
            this.ballBoosters = [];
            this.smallBalls = [];
            background(this.backgroundColor);
            textSize(25);
            fill(255, 255, 255);
            textAlign(CENTER);
            text(`Congratulations, has acabat el joc`, WIDTH / 2, HEIGHT / 2 - 50);
            text(`Score: ${this.score}`, WIDTH / 2, HEIGHT / 2);
            text(`Press 'space' to start again`, WIDTH / 2, HEIGHT / 2 + 50);
        }

        //game over screen
        if (this.player.lives === 0) {
            this.game = false;
            this.liveBoosters = [];
            this.ballBoosters = [];
            this.smallBalls = [];
            background(20);
            image(this.logoImage, WIDTH / 2 - 200, 0, 400, 250);
            textSize(25);
            fill(255, 255, 255);
            textAlign(CENTER);
            text('GAME OVER', WIDTH / 2, HEIGHT / 2 + 20);
            textSize(20);
            text(`Press 'space' to start again`, WIDTH / 2, HEIGHT - 50);
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
                        this.liveBoosters.push(new Live(brick.x + brick.width / 2, brick.y + brick.height / 2, this.livesBoosterImage));
                    } else if (brick.smallBalls === 1) {
                        this.ballBoosters.push(new ExtraBall(brick.x + brick.width / 2, brick.y + brick.height / 2, this.ballsBoosterImage));
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

        //simulate score
        if (keyCode === 76) {
            this.score++;
        }

        if (keyCode === 75) {
            this.score--;
        }

        //first start
        if (keyCode === 32 && this.game == false && this.player.lives === 4 && this.score === 0) {
            this.game = true;
        }

        // start again after next level
        if ((this.score === this.rows * this.columns || this.score === 84) && keyCode === 32 && this.game == false) {
            this.level++;
            this.setup();
            this.game = true;
        }

        //start again after game over
        if (keyCode === 32 && this.game == false && (this.player.lives === 0 || this.score === 99)) {
            this.player.lives = 4;
            this.score = 0;
            this.level = 1;
            this.setup();
            this.game = true;
        }
    }
}