window.onload = function() {

        var game = new Phaser.Game(640, 640, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

        function preload () {
            game.load.spritesheet('hippo_pink', 'images/hippo_pink.png', 128, 272);
            game.load.spritesheet('hippo_yellow', 'images/hippo_yellow.png', 128, 272);
            game.load.spritesheet('hippo_green', 'images/hippo_green.png', 128, 272);
            game.load.spritesheet('hippo_blue', 'images/hippo_blue.png', 128, 272);
            game.load.image('ball', 'images/ball.png');
            game.load.spritesheet('button', 'images/button.png', 200, 70);
        }

        var balls;
        var ball_count = 0;
        var timer = 4;
        var hippos;
        var hippo_pink;
        var hippo_yellow;
        var hippo_green;
        var hippo_blue;
        var ui_pink;
        var ui_yellow;
        var ui_green;
        var ui_blue;
        var ui_timer;
        var ui_showscore;
        var button;

        function create () {

            game.physics.startSystem(Phaser.Physics.ARCADE);

            // Set background
            game.stage.backgroundColor = '#c3574c';
            
            // Set balls
            balls = game.add.group();
            balls.z = 1;
            Ball();

            // Set sprites
            hippo_pink = game.add.sprite(game.width/2 - 40, game.height - 188, 'hippo_pink', 0);

            hippo_yellow = game.add.sprite(game.width - 188, game.height/2 - 40, 'hippo_yellow', 6);
            hippo_yellow.angle = 270;

            hippo_green = game.add.sprite(game.width/2 - 40, 0, 'hippo_green', 12);
            hippo_green.angle = 180;

            hippo_blue = game.add.sprite(0, game.height - 272 - 80, 'hippo_blue', 18);
            hippo_blue.angle = 90;
            
            hippos = game.add.group();
            hippos.add(hippo_pink);
            hippos.add(hippo_yellow);
            hippos.add(hippo_green);
            hippos.add(hippo_blue);

            hippos.forEach(function(hippo) {
                hippo.score = 0;
                hippo.isEating = false;
                hippo.animations.add('bite');
                hippo.anchor.setTo(1, 0);
            });
            
            hippos.z = 2;
            hippos.enableBody = true;
            hippos.physicsBodyType = Phaser.Physics.ARCADE;
            game.physics.enable([hippo_pink, hippo_yellow, hippo_green, hippo_blue]);
            
            hippo_pink.body.setSize(80, 188, 104, -84);
            hippo_pink.body.immovable = true;
            
            hippo_yellow.body.setSize(188, 80, -84, -24);
            hippo_yellow.body.immovable = true;

            hippo_green.body.setSize(80, 188, -24, 272);
            hippo_green.body.immovable = true;

            hippo_blue.body.setSize(188, 80, 272, 104);
            hippo_blue.body.immovable = true;

            // Set UI
            ui_timer = game.add.text(0, game.world.height, timer.toString(), {
                font: "72px slkscr",
                fill: "#ffffff",
                align: "right"
            });
            ui_timer.anchor.setTo(0, 1);

            ui_pink = game.add.text(game.world.width, game.world.height - 96, "0 Balls", {
                font: "24px slkscr",
                fill: "#f2989b",
                align: "right"
            });
            ui_pink.anchor.setTo(1, 0);
            
            ui_yellow = game.add.text(game.world.width, game.world.height - 72, "0 Balls", {
                font: "24px slkscr",
                fill: "#f8e792",
                align: "right"
            });
            ui_yellow.anchor.setTo(1, 0);
            
            ui_green = game.add.text(game.world.width, game.world.height - 48, "0 Balls", {
                font: "24px slkscr",
                fill: "#90e192",
                align: "right"
            });
            ui_green.anchor.setTo(1, 0);
            
            ui_blue = game.add.text(game.world.width, game.world.height - 24, "0 Balls", {
                font: "24px slkscr",
                fill: "#91cae7",
                align: "right"
            });
            ui_blue.anchor.setTo(1, 0);

            // Set timers
            game.time.events.loop(Phaser.Timer.SECOND/2, hippoLogic, this);
            game.time.events.loop(Phaser.Timer.SECOND, gameTimer, this);
        }

        function update () {

            game.physics.arcade.collide(balls, hippo_pink, collisionHandler, null, this);
            game.physics.arcade.collide(balls, hippo_yellow, collisionHandler, null, this);
            game.physics.arcade.collide(balls, hippo_green, collisionHandler, null, this);
            game.physics.arcade.collide(balls, hippo_blue, collisionHandler, null, this);

            if (ball_count < 100) {
                Ball();
            }

            if (game.input.mousePointer.isDown) {
                hippo_pink.isEating = true;   
            }
            else {
                hippo_pink.isEating = false;
            }
            
            eatingAnimation();

        }

        function Ball() {
            
            var ball = game.add.sprite((Math.random() * 100) + game.world.width/2 - 50, (Math.random() * 100) + game.world.height/2 - 50, 'ball');
            
            game.physics.enable([ball], Phaser.Physics.ARCADE);

            ball.body.velocity.setTo((Math.random() - 0.5) * 600, (Math.random() - 0.5) * 600);
            ball.body.collideWorldBounds = true;
            ball.body.bounce.setTo(1, 1);

            balls.add(ball);

            ball_count++;
        }

        function gameTimer() {
            if (timer <= 0) {
                hippos.removeAll();
                balls.removeAll();
                showScore();
            }
            else {
                timer -= 1;
                ui_timer.setText(timer.toString());
            }
        }
        
        function showScore() {
            ui_showscore = game.add.text(game.world.width/2, game.world.height/2 - 50, "Game Over", {
                font: "56px slkscr",
                fill: "#ffffff",
                align: "center"
            });
            ui_showscore.anchor.setTo(0.5, 0.5);
            button = game.add.button(game.world.width/2 - 100, game.world.height/2 + 50, 'button', buttonPlay, this, 2, 2, 0);
        }

        function buttonPlay() {
            console.log('button play');
            ball_count = 0;
            timer = 4;
            hippos.forEach(function(hippo) {
                hippo.isEating = false;
                hippo.score = 0;
            });
            ui_showscore.exists = false;
            button.exists = false;
            create();
        }

        function hippoLogic() {
           
            hippos.forEach(function(hippo) {
                var timeToEat = Math.random() < 0.5 ? true : false;
                if (timeToEat) {
                    hippo.isEating = true;
                }
                else {
                    hippo.isEating = false;
                }
            });
        }

        function eatingAnimation() {
            
            hippos.forEach(function(hippo) {
                if (hippo.isEating) {
                    hippo.animations.play('bite', 40, true);
                }
                else {
                    hippo.animations.stop();
                }
            });
        }

        function collisionHandler (obj1, obj2) {
            
            hippos.forEach(function(hippo) {
                if (hippo.isEating && obj1.key == hippo.key) {
                    hippo.score += 1;
                    obj2.exists = false;

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

        }

        function render() {
            // game.debug.body(hippo_pink);
            // game.debug.body(hippo_yellow);
            // game.debug.body(hippo_green);
            // game.debug.body(hippo_blue);
        }


    };