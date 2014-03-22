window.onload = function() {

        var game = new Phaser.Game(640, 640, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

        function preload () {
            game.load.spritesheet('hippo_pink', 'images/hippo_pink.png', 128, 272);
            game.load.spritesheet('hippo_yellow', 'images/hippo_yellow.png', 128, 272);
            game.load.spritesheet('hippo_green', 'images/hippo_green.png', 128, 272);
            game.load.spritesheet('hippo_blue', 'images/hippo_blue.png', 128, 272);
            game.load.image('ball', 'images/ball.png');
        }

        var balls;
        var ball_count = 0;
        var timer = 0;
        var ui;
        var score = 0;
        var hippos;
        var hippo_pink;
        var hippo_yellow;
        var hippo_green;
        var hippo_blue;

        function create () {

            game.physics.startSystem(Phaser.Physics.ARCADE);

            // Set background
            game.stage.backgroundColor = '#c3574c';
            
            // Set balls
            balls = game.add.group();
            balls.z = 1;
            Ball();

            // Set sprites
            hippos = game.add.group();
            
            hippo_pink = game.add.sprite(game.width/2 - 40, game.height - 188, 'hippo_pink', 0);
            hippo_pink.animations.add('bite');
            hippo_pink.anchor.setTo(1, 0);
            hippo_pink.isEating = false;
            hippos.add(hippo_pink);

            hippo_yellow = game.add.sprite(game.width - 188, game.height/2 - 40, 'hippo_yellow', 6);
            hippo_yellow.anchor.setTo(1, 0);
            hippo_yellow.angle = 270;
            hippo_yellow.animations.add('bite');
            hippo_yellow.isEating = false;
            hippos.add(hippo_yellow);

            hippo_green = game.add.sprite(game.width/2 - 40, 0, 'hippo_green', 12);
            hippo_green.anchor.setTo(1, 0);
            hippo_green.angle = 180;
            hippo_green.animations.add('bite');
            hippo_green.isEating = false;
            hippos.add(hippo_green);

            hippo_blue = game.add.sprite(0, game.height - 272 - 80, 'hippo_blue', 18);
            hippo_blue.anchor.setTo(1, 0);
            hippo_blue.angle = 90;
            hippo_blue.animations.add('bite');
            hippo_blue.isEating = false;
            hippos.add(hippo_blue);
            
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
            ui = game.add.text(game.world.centerX + 64, game.world.height - 24, "0 Balls", {
                font: "24px slkscr",
                fill: "#ffffff",
                align: "center"
            });
            ui.anchor.setTo(0, 0);
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

        function update () {

            game.physics.arcade.collide(balls, hippo_pink, collisionHandler, null, this);
            game.physics.arcade.collide(balls, hippo_yellow, collisionHandler, null, this);
            game.physics.arcade.collide(balls, hippo_green, collisionHandler, null, this);
            game.physics.arcade.collide(balls, hippo_blue, collisionHandler, null, this);

            if (ball_count < 10) {
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

        function eatingAnimation() {
            if (hippo_pink.isEating) {
                hippo_pink.animations.play('bite', 40, true);
            }
            else {
                hippo_pink.animations.stop();
            }
            if (hippo_yellow.isEating) {
                hippo_yellow.animations.play('bite', 40, true);
            }
            else {
                hippo_yellow.animations.stop();
            }
            if (hippo_green.isEating) {
                hippo_green.animations.play('bite', 40, true);
            }
            else {
                hippo_green.animations.stop();
            }
            if (hippo_blue.isEating) {
                hippo_blue.animations.play('bite', 40, true);
            }
            else {
                hippo_blue.animations.stop();
            }
        }

        function collisionHandler (obj1, obj2) {

            if (hippo_pink.isEating && obj1.key == 'hippo_pink') {
                score += 1;
                ui.setText(score + " Balls");
                obj2.exists = false;
            }
            else if (hippo_yellow.isEating && obj1.key == 'hippo_yellow') {
                score += 1;
                ui.setText(score + " Balls");
                obj2.exists = false;
            }
            else if (hippo_green.isEating && obj1.key == 'hippo_green') {
                score += 1;
                ui.setText(score + " Balls");
                obj2.exists = false;
            }
            else if (hippo_blue.isEating && obj1.key == 'hippo_blue') {
                score += 1;
                ui.setText(score + " Balls");
                obj2.exists = false;
            }

        }

        // function processHandler (obj1, obj2) {

        //     game.stage.backgroundColor = '#992d2d';

        // }

        function render() {
            // game.debug.body(hippo_pink);
            // game.debug.body(hippo_yellow);
            // game.debug.body(hippo_green);
            // game.debug.body(hippo_blue);
        }


    };