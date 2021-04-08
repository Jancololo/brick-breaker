class Game {
    constructor() {
        this.rows = 5;
        this.columns = 7;
        this.score = 0;
        this.game = false;
        this.level = 1;
        this.bricksDistance = 4;

        this.addMoreBalls = false;
        this.addExtraLive = false;

        this.catalyst = false;

    }

    setup() {
        this.player = new Player();
        this.ball = new Ball();
        this.bricks = [];
        this.smallBalls = [];
        this.hardBricks = [];
        this.live = new Live();
        this.extraBalls = new ExtraBall();

        //create bricks for level 1
        if (this.level === 1) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.columns; j++) {
                    if (i === 4 && j === 3) {
                        this.bricks.push(new Brick(j * 81 + this.bricksDistance * (j + 1), i * 50 + this.bricksDistance * (i + 1), 1, 0));
                    } else if (i === 2 && j === 3) {
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

            //collision with bricks opcio 1
            this.bricks = this.bricks.filter(brick => {
                if (brick.collision(this.ball)) {
                    if(brick.lives === 1) {
                       this.addExtraLive = true;
                    } else if (brick.smallBalls ===1) {
                        this.addMoreBalls = true;
                    }
                    return false
                } else {
                    return true
                }
            })
        }

        //level 2 (add hard bricks)
        if (this.level === 2 && this.game == true) {
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

        //congratulations screen
        if (this.score === this.rows * this.columns && this.level === 1 || this.score === 56 && this.level ===2) {
            this.game = false;
            this.addMoreBalls = false;
            this.catalyst = false;
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
            this.addMoreBalls = false;
            background(20);
            textSize(30);
            fill(250);
            textAlign(CENTER);
            text('game over', WIDTH / 2, HEIGHT / 2 - 20);
            text(`Press 'space' to start again`, WIDTH / 2, HEIGHT / 2 + 20);
        }

        //drop more small balls if brick has extra property
        if (this.addMoreBalls) {
            this.extraBalls.state = true;
            this.extraBalls.draw();
        }

        if (this.catalyst) {

            this.smallBalls.forEach(function (smallBall) {
                smallBall.draw();
            })

            //collision with normal bricks
            this.bricks = this.bricks.filter(brick => {

                for (let i = 0; i < this.smallBalls.length; i++) {
                    if (brick.collision(this.smallBalls[i])) {
                        if (brick.lives === 1) {
                            this.addExtraLive = true;
                        } else if (brick.smallBalls ===1) {
                            this.addMoreBalls = true;
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

        //drop live if brick has extra live property
        if (this.addExtraLive) {
            this.live.state = true;
            this.live.draw();
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

        // start again after next level
        if (keyCode === 32 && this.score === this.rows * this.columns && this.game == false) {
            this.level++;
            this.setup();
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
}