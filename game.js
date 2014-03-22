window.onload = function() {

        var game = new Phaser.Game(960, 640, Phaser.AUTO, '', { preload: preload, create: create, update: update });

        function preload () {
            game.load.spritesheet('hippo', 'images/hippo.png', 128, 272);
            game.load.image('ball', 'images/ball.png');
        }

        var ball_count = 0;
        var timer = 0;
        var ui;
        var hippo_pink;

        function create () {

            game.physics.startSystem(Phaser.Physics.ARCADE);

            // Set background
            game.stage.backgroundColor = '#000000';
            
            // Set balls
            Ball();

            // Set sprites
            hippo_pink = game.add.sprite(game.width/2 - 64, game.height - 272, 'hippo');
            hippo_pink.animations.add('bite');

            // Set UI
            ui = game.add.text(game.world.width, 0, "0 Balls", {
                font: "16px slkscr",
                fill: "#ffffff",
                align: "center"
            });

            ui.anchor.setTo(1, 0);
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

            if (ball_count < 40) {
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