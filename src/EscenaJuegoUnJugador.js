export default class EscenaJuegoUnJugador extends Phaser.Scene{
    constructor(){
        super("EscenaJuegoUnJugador");
    }

    create(){
        // CONSTANTS
        this.playerSpeed = 300;
        this.jumpForce = 500;

        // CONTROLS JUGADOR
        this.keys = this.input.Keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            up: Phaser.Input.Keyboard.KeyCodes.W
        });

        // ELEMENTS PUNTUACIÓ
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#000' });
    
        // PLAYER
        this.player = this.physics.add.rectangle(100, 450, 40, 60, 0x0000ff);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

        // PLATFORMS
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400,500,null).setDisplaySize(1000,50).refreshBody();
        this.platforms.create(200,300,null).setDisplaySize(300,20).refreshBody();
        this.platforms.create(600,200,null).setDisplaySize(300,20).refreshBody();

        // BOMB
        this.bombs = this.physics.add.group();

        // Generem bombes en una franja de temps aleatòria cada 8-30 segons
        this.time.addEvent({
            delay: Phaser.Math.Between(8000,30000),
            callback: this.generateBomb,
            callbackScope: this,
            loop: true
        });

        // ARGUMENTS
        this.arguments = this.physics.add.group();

        // Generem arguments cada segon
        this.time.addEvent({
            delay: 1000,
            callback: this.generateArgument,
            callbackScope: this,
            loop: true
        });

        // Detectem la recollida dels arguments
        this.physics.add.overlap(
            this.player,
            this.arguments,
            this.collectArgument,
            null,
            this
        );

        // COL·LISIONS
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.bombs);

    }

    update(){
        // MOVIMENT JUGADOR
        this.player.body.setVelocityX(0);

        if(this.keys.left.isDown){
            this.player.body.setVelocityX(-this.playerSpeed);
        }
        else if(this.keys.right.isDown){
            this.player.body.setVelocityX(this.playerSpeed);   
        }
        else if(this.keys.up.isDown && this.player.body.blocked.down){
            this.player.body.setVelocityY(-this.jumpForce);
        }
    }

    // CREAR ARGUMENTS
    generateArgument(){
        const x = Phaser.Math.Between(50, 750);
        let argument = this.add.rectangle(x, 0, 20, 20, 0x00ff00);
        this.physics.add.existing(argument);
        argument.body.setBounce(0);

        this.arguments.add(argument);
        this.physics.add.collider(argument, this.platforms);
        this.time.delayedCall(5000, () =>{
            if(argument.active){
                argument.destroy();

                if(this.score > 0){
                    this.score -= 10;
                    this.scoreText.setText('Score: ' + this.score);
                }
            }
        });
    }

    // RECOLLIR ARGUMENT
    collectArgument(player, argument){
        if(argument.active){
            argument.destroy();

            this.score += 5;
            this.scoreText.setText('Score: ' + this.score);
        }
    }
}