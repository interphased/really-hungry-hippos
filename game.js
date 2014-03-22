window.onload = function() {

        var game = new Phaser.Game(640, 640, Phaser.AUTO, '', { preload: preload, create: create, update: update });

        function preload () {
            game.load.spritesheet('hippo_pink', 'images/hippo_pink.png', 128, 272);
            game.load.spritesheet('hippo_yellow', 'images/hippo_yellow.png', 128, 272);
            game.load.spritesheet('hippo_green', 'images/hippo_green.png', 128, 272);
            game.load.spritesheet('hippo_blue', 'images/hippo_blue.png', 128, 272);
            game.load.image('ball', 'images/ball.png');
        }

        var ball_count = 0;
        var timer = 0;
        var ui;
        var hippo_pink;
        var hippo_yellow;
        var hippo_green;
        var hippo_blue;

        function create () {

            game.physics.startSystem(Phaser.Physics.ARCADE);

            // Set background
            game.stage.backgroundColor = '#c3574c';
            
            // Set balls
            Ball();

            // Set sprites
            hippo_pink = game.add.sprite(game.width/2 - 64, game.height - 272, 'hippo_pink', 0);
            hippo_pink.animations.add('bite');

            hippo_yellow = game.add.sprite(game.width - 272, game.height/2 - 64, 'hippo_yellow', 6);
            hippo_yellow.anchor.setTo(1, 0);
            hippo_yellow.angle = 270;
            hippo_yellow.animations.add('bite');

            hippo_green = game.add.sprite(game.width/2 - 64, 272, 'hippo_green', 12);
            hippo_green.anchor.setTo(1, 0);
            hippo_green.angle = 180;
            hippo_green.animations.add('bite');

            hippo_blue = game.add.sprite(272, game.height - 272, 'hippo_blue', 18);
            hippo_blue.anchor.setTo(1, 0);
            hippo_blue.angle = 90;
            hippo_blue.animations.add('bite');

            // Set UI
            ui = game.add.text(game.world.centerX + 64, game.world.height - 24, "0 Balls", {
                font: "18px slkscr",
                fill: "#ffffff",
                align: "center"
            });

            ui.anchor.setTo(0, 0);
        }

        function Ball() {
            var ball = game.add.sprite(game.world.randomX, game.world.randomY, 'ball');
            
            game.physics.enable([ball], Phaser.Physics.ARCADE);

            ball.body.velocity.setTo((Math.random() + 10) * 40, (Math.random() + 10) * 40);
            ball.body.collideWorldBounds = true;
            ball.body.bounce.setTo(1, 1);

            ball_count++;
            timer = game.time.now + 100;
        }

        function update () {

            if (ball_count < 50) {
                Ball();
            }

            if (game.input.mousePointer.isDown)
            {
                hippo_pink.animations.play('bite', 30, true);
            }
            else {
                hippo_pink.animations.stop();
            }

        }

    };