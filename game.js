window.onload = function() {

        var game = new Phaser.Game(640, 640, Phaser.AUTO, '');
        var game_state = {};

        game_state.main = function () {};
        game_state.end = function () {};

        game_state.end.prototype = {
            
            preload: function () {
                this.game.load.spritesheet('button', 'images/button.png', 200, 70);
            },

            create: function () {
                ui_showscore = this.game.add.text(this.game.world.width/2, this.game.world.height/2 - 50, "Game Over", {
                    font: "56px slkscr",
                    fill: "#ffffff",
                    align: "center"
                });
                ui_showscore.anchor.setTo(0.5, 0.5);
                button = this.game.add.button(this.game.world.width/2 - 100, this.game.world.height/2 + 50, 'button', this.buttonPlay, this, 2, 2, 0);
            },
            buttonPlay: function () {
                game.state.start('main');
            }
        }

        game_state.main.prototype = {

            preload: function () {
                this.game.load.spritesheet('hippo_pink', 'images/hippo_pink.png', 128, 272);
                this.game.load.spritesheet('hippo_yellow', 'images/hippo_yellow.png', 128, 272);
                this.game.load.spritesheet('hippo_green', 'images/hippo_green.png', 128, 272);
                this.game.load.spritesheet('hippo_blue', 'images/hippo_blue.png', 128, 272);
                this.game.load.image('ball', 'images/ball.png');
                this.game.load.spritesheet('button', 'images/button.png', 200, 70);
                this.game.load.audio('powerup', 'data/powerup.wav');
            },

            create: function () {

                // var balls;
                this.ball_count = 0;
                this.timer = 5;
                this.powerup = game.add.audio('powerup',1,false);

                // var hippos;
                // var hippo_pink;
                // var hippo_yellow;
                // var hippo_green;
                // var hippo_blue;
                // var ui_pink;
                // var ui_yellow;
                // var ui_green;
                // var ui_blue;
                // var ui_timer;
                // var ui_showscore;
                // var button;

                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                // Set background
                this.game.stage.backgroundColor = '#c3574c';
                
                // Set balls
                this.balls = game.add.group();
                this.balls.z = 1;
                this.Ball();

                // Set sprites
                this.hippo_pink = this.game.add.sprite(this.game.width/2 - 40, this.game.height - 188, 'hippo_pink', 0);

                this.hippo_yellow = this.game.add.sprite(this.game.width - 188, this.game.height/2 - 40, 'hippo_yellow', 6);
                this.hippo_yellow.angle = 270;

                this.hippo_green = this.game.add.sprite(this.game.width/2 - 40, 0, 'hippo_green', 12);
                this.hippo_green.angle = 180;

                this.hippo_blue = this.game.add.sprite(0, this.game.height - 272 - 80, 'hippo_blue', 18);
                this.hippo_blue.angle = 90;
                
                this.hippos = game.add.group();
                this.hippos.add(this.hippo_pink);
                this.hippos.add(this.hippo_yellow);
                this.hippos.add(this.hippo_green);
                this.hippos.add(this.hippo_blue);

                this.hippos.forEach(function(hippo) {
                    hippo.score = 0;
                    hippo.isEating = false;
                    hippo.animations.add('bite');
                    hippo.anchor.setTo(1, 0);
                });
                
                this.hippos.z = 2;
                this.hippos.enableBody = true;
                this.hippos.physicsBodyType = Phaser.Physics.ARCADE;
                this.game.physics.enable([this.hippo_pink, this.hippo_yellow, this.hippo_green, this.hippo_blue]);
                
                this.hippo_pink.body.setSize(80, 188, 104, -84);
                this.hippo_pink.body.immovable = true;
                
                this.hippo_yellow.body.setSize(188, 80, -84, -24);
                this.hippo_yellow.body.immovable = true;

                this.hippo_green.body.setSize(80, 188, -24, 272);
                this.hippo_green.body.immovable = true;

                this.hippo_blue.body.setSize(188, 80, 272, 104);
                this.hippo_blue.body.immovable = true;

                // Set UI
                this.ui_timer = this.game.add.text(0, this.game.world.height, this.timer.toString(), {
                    font: "72px slkscr",
                    fill: "#ffffff",
                    align: "right"
                });
                this.ui_timer.anchor.setTo(0, 1);

                this.ui_pink = game.add.text(this.game.world.width, this.game.world.height - 96, "0 Balls", {
                    font: "24px slkscr",
                    fill: "#f2989b",
                    align: "right"
                });
                this.ui_pink.anchor.setTo(1, 0);
                
                this.ui_yellow = this.game.add.text(this.game.world.width, this.game.world.height - 72, "0 Balls", {
                    font: "24px slkscr",
                    fill: "#f8e792",
                    align: "right"
                });
                this.ui_yellow.anchor.setTo(1, 0);
                
                this.ui_green = this.game.add.text(this.game.world.width, this.game.world.height - 48, "0 Balls", {
                    font: "24px slkscr",
                    fill: "#90e192",
                    align: "right"
                });
                this.ui_green.anchor.setTo(1, 0);
                
                this.ui_blue = this.game.add.text(this.game.world.width, this.game.world.height - 24, "0 Balls", {
                    font: "24px slkscr",
                    fill: "#91cae7",
                    align: "right"
                });
                this.ui_blue.anchor.setTo(1, 0);

                // Set timers
                // this.hippoLogicTimer = game.time.events.loop(Phaser.Timer.SECOND/2, this.hippoLogic, this);
                // this.gameTimer = game.time.events.loop(Phaser.Timer.SECOND, this.timeLeft, this);

                this.gameTimer = game.time.events.repeat(Phaser.Timer.SECOND, this.timer + 1, this.updateTimer, this);
                this.hippoLogicTimer = game.time.events.repeat(Phaser.Timer.SECOND / 2, this.timer + 1, this.hippoLogic, this);

                // this.gameTimer.timer.repeatCount = 5;
            },

            update: function () {

                this.game.physics.arcade.collide(this.balls, this.hippo_pink, this.collisionHandler, null, this);
                this.game.physics.arcade.collide(this.balls, this.hippo_yellow, this.collisionHandler, null, this);
                this.game.physics.arcade.collide(this.balls, this.hippo_green, this.collisionHandler, null, this);
                this.game.physics.arcade.collide(this.balls, this.hippo_blue, this.collisionHandler, null, this);

                if (this.ball_count < 100) {
                    this.Ball();
                }

                if (this.game.input.mousePointer.isDown) {
                    this.hippo_pink.isEating = true;   
                }
                else {
                    this.hippo_pink.isEating = false;
                }
                
                this.eatingAnimation();

            },

            Ball: function () {
                
                var ball = this.game.add.sprite((Math.random() * 100) + this.game.world.width/2 - 50, (Math.random() * 100) + this.game.world.height/2 - 50, 'ball');
                
                this.game.physics.enable([ball], Phaser.Physics.ARCADE);

                ball.body.velocity.setTo((Math.random() - 0.5) * 600, (Math.random() - 0.5) * 600);
                ball.body.collideWorldBounds = true;
                ball.body.bounce.setTo(1, 1);

                this.balls.add(ball);

                this.ball_count++;
            },

            updateTimer: function () {

                if (this.timer <= 0) {
                    this.hippos.removeAll();
                    this.balls.removeAll();
                    // this.gameTimer.timer.stop();
                    // this.hippoLogicTimer.timer.stop();
                    this.showScore();
                }
                else {
                    this.timer -= 1;
                    this.ui_timer.setText(this.timer.toString());
                }
            },
            
            showScore: function () {
                game.state.start('end');
            },

            hippoLogic: function () {
               
                this.hippos.forEach(function(hippo) {
                    var timeToEat = Math.random() < 0.5 ? true : false;
                    if (timeToEat) {
                        hippo.isEating = true;
                    }
                    else {
                        hippo.isEating = false;
                    }
                });
            },

            eatingAnimation: function () {
                
                this.hippos.forEach(function(hippo) {
                    if (hippo.isEating) {
                        hippo.animations.play('bite', 40, true);
                    }
                    else {
                        hippo.animations.stop();
                    }
                });
            },

            collisionHandler: function (obj1, obj2) {
                
                var ui_pink = this.ui_pink;
                var ui_yellow = this.ui_yellow;
                var ui_green = this.ui_green;
                var ui_blue = this.ui_blue;
                var powerup = this.powerup;

                this.hippos.forEach(function(hippo) {
                    if (hippo.isEating && obj1.key == hippo.key) {
                        hippo.score += 1;
                        obj2.exists = false;
                        powerup.play();

                        if (hippo.key == 'hippo_pink') {
                            ui_pink.setText(hippo.score + " Balls");
                        }
                        else if (hippo.key == 'hippo_yellow') {
                            ui_yellow.setText(hippo.score + " Balls");
                        }
                        else if (hippo.key == 'hippo_green') {
                            ui_green.setText(hippo.score + " Balls");
                        }
                        else if (hippo.key == 'hippo_blue') {
                            ui_blue.setText(hippo.score + " Balls");
                        }
                    }
                });

                this.ui_pink = ui_pink;
                this.ui_yellow = ui_yellow;
                this.ui_green = ui_green;
                this.ui_blue = ui_blue;

            }

        }

        game.state.add('main', game_state.main);
        game.state.add('end', game_state.end);
        game.state.start('main');
        


    };