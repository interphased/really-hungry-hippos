window.onload = function() {

        var game = new Phaser.Game(640, 640, Phaser.AUTO, '');

        var mainState = {

            preload: function() {
                this.game.load.spritesheet('hippo_pink', 'images/hippo_pink.png', 128, 272);
                this.game.load.spritesheet('hippo_yellow', 'images/hippo_yellow.png', 128, 272);
                this.game.load.spritesheet('hippo_green', 'images/hippo_green.png', 128, 272);
                this.game.load.spritesheet('hippo_blue', 'images/hippo_blue.png', 128, 272);
                this.game.load.image('ball', 'images/ball.png');

                this.balls;
                this.ball_count = 0;
                this.timer = 10;
                this.hippos;
                this.hippo_pink;
                this.hippo_yellow;
                this.hippo_green;
                this.hippo_blue;
                this.ui_pink;
                this.ui_yellow;
                this.ui_green;
                this.ui_blue;
                this.ui_timer;
            },
            create: function() {
                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                // Set background
                this.game.stage.backgroundColor = '#c3574c';
                
                // Set balls
                this.balls = this.game.add.group();
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
                
                this.hippos = this.game.add.group();
                this.hippos.add(hippo_pink);
                this.hippos.add(hippo_yellow);
                this.hippos.add(hippo_green);
                this.hippos.add(hippo_blue);

                this.hippos.forEach(function(hippo) {
                    hippo.score = 0;
                    hippo.isEating = false;
                    hippo.animations.add('bite');
                    hippo.anchor.setTo(1, 0);
                });
                console.log(this.hippos);
                this.hippos.z = 2;
                this.hippos.enableBody = true;
                this.hippos.physicsBodyType = Phaser.Physics.ARCADE;
                this.game.physics.enable([hippo_pink, hippo_yellow, hippo_green, hippo_blue]);
                
                this.hippo_pink.body.setSize(80, 188, 104, -84);
                this.hippo_pink.body.immovable = true;
                
                this.hippo_yellow.body.setSize(188, 80, -84, -24);
                this.hippo_yellow.body.immovable = true;

                this.hippo_green.body.setSize(80, 188, -24, 272);
                this.hippo_green.body.immovable = true;

                this.hippo_blue.body.setSize(188, 80, 272, 104);
                this.hippo_blue.body.immovable = true;

                // Set UI
                this.ui_timer = this.game.add.text(0, this.game.world.height, timer.toString(), {
                    font: "72px slkscr",
                    fill: "#ffffff",
                    align: "right"
                });
                this.ui_timer.anchor.setTo(0, 1);

                this.ui_pink = this.game.add.text(this.game.world.width, this.game.world.height - 96, "0 Balls", {
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
                this.game.time.events.loop(Phaser.Timer.SECOND/2, this.hippoLogic(), this);
                this.game.time.events.loop(Phaser.Timer.SECOND, this.gameTimer(), this);
            },
            create: function() {
                this.game.physics.arcade.collide(this.balls, this.hippo_pink, this.collisionHandler(), null, this);
                this.game.physics.arcade.collide(this.balls, this.hippo_yellow, this.collisionHandler(), null, this);
                this.game.physics.arcade.collide(this.balls, this.hippo_green, this.collisionHandler(), null, this);
                this.game.physics.arcade.collide(this.balls, this.hippo_blue, this.collisionHandler(), null, this);

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
            Ball: function() {
                var ball = this.game.add.sprite((Math.random() * 100) + this.game.world.width/2 - 50, (Math.random() * 100) + this.game.world.height/2 - 50, 'ball');
                
                this.game.physics.enable([ball], Phaser.Physics.ARCADE);

                ball.body.velocity.setTo((Math.random() - 0.5) * 600, (Math.random() - 0.5) * 600);
                ball.body.collideWorldBounds = true;
                ball.body.bounce.setTo(1, 1);

                this.balls.add(ball);
                this.ball_count += 1;
            },
            gameTimer: function() {
                if (this.timer <= 0) {

                }

                this.timer -= 1;
                this.ui_timer.setText(this.timer.toString());
            },
            hippoLogic: function() {
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
            eatingAnimation: function() {
                this.hippos.forEach(function(hippo) {
                    if (hippo.isEating) {
                        hippo.animations.play('bite', 40, true);
                    }
                    else {
                        hippo.animations.stop();
                    }
                });
            },
            collisionHandler: function(obj1, obj2) {
                console.log(this.hippos);
                this.hippos.forEach(function(hippo) {
                    if (hippo.isEating && obj1.key == hippo.key) {
                        hippo.score += 1;
                        obj2.exists = false;

                        if (hippo.key == 'hippo_pink') {
                            this.ui_pink.setText(hippo.score + " Balls");
                        }
                        else if (hippo.key == 'hippo_yellow') {
                            this.ui_yellow.setText(hippo.score + " Balls");
                        }
                        else if (hippo.key == 'hippo_green') {
                            this.ui_green.setText(hippo.score + " Balls");
                        }
                        else if (hippo.key == 'hippo_blue') {
                            this.ui_blue.setText(hippo.score + " Balls");
                        }
                    }
                });
            },
            render: function() {
                // game.debug.body(hippo_pink);
                // game.debug.body(hippo_yellow);
                // game.debug.body(hippo_green);
                // game.debug.body(hippo_blue);
            }

        };

        game.state.add('main', mainState);  
        game.state.start('main');


    };