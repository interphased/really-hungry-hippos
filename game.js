window.onload = function() {

        var game = new Phaser.Game(960, 640, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

        function preload () {
            game.load.spritesheet('hippo', 'images/hippo.png', 16, 34);
        }

        var level;
        var balls;
        var ui;
        var hippo_pink;

        function create () {

            Phaser.Canvas.setSmoothingEnabled(game.context, false);

            // Set background
            game.stage.backgroundColor = '#000000';
            

            // Set sprites
            hippo_pink = game.add.sprite(game.width/2 - 8, game.height - 34, 'hippo');
            hippo_pink.animations.add('bite');
            

            // Set UI
            ui = game.add.text(game.world.width, 0, "0 Balls", {
                font: "16px slkscr",
                fill: "#ffffff",
                align: "center"
            });

            ui.anchor.setTo(1, 0);
        }

        function update () {

            if (game.input.mousePointer.isDown)
            {
                console.log('bite');
                hippo_pink.animations.play('bite', 30, true);
            }
            else {
                hippo_pink.animations.stop();
            }

        }

    };