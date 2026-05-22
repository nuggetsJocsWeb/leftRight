export default class EscenaJuegoUnJugador extends Phaser.Scene{
    constructor(){
        super("EscenaJuegoUnJugador");
    }

    preload(){
        // SPRITESHEETS DEL JUGADOR
        this.load.spritesheet(
            'player',
            'assets/spritesheetJug1.png',
            {
                frameWidth: 192,
                frameHeight: 320
            }
        );

        // ARGUMENT
        this.load.image(
            'argument',
            'assets/argument.png'
        );

        // PLATAFORMA
        this.load.image(
            'platform',
            'assets/platforms.png'
        );

        // BOMBA
        this.load.image(
            'bomb',
            'assets/lawBook.png'
        );
    }

    init(data = {}){
        this.initialFallSpeed = data.argumentFallSpeed || 175;
    }

    create(){
        this.input.keyboard.enabled = true;

        // CONSTANTS
        this.playerSpeed = 200;
        this.jumpForce = 400;
        this.gameOver = false;

        // Dificultat
        this.difficultyLevel = 1;
        this.argumentPenalty = 10;
        this.argumentSpawnDelay = 1000;

        this.argumentPoints = 5; // Punts que rep un jugador per cada argument recollit
        this.argumentFallSpeed = this.initialFallSpeed; // Velocitat inicial a la que cauen els arguments

        // PUNTUACIÓ INICIAL
        this.score = 0;

        // TEXT DE LES PUNTUACIONS I DEL TEMPORITZADOR DE LA PARTIDA
        this.scoreText = this.add.text(16, 16, "PUNTUACIÓN: 0", { fontSize: '20px', color: '#fff5d1' });
        this.scoreText.setOrigin(0,0);

        // FIXEM ELS TEXTOS DE LES PUNTUACIONS I EL TEMPORITZADOR A LA CÀMERA (PER EVITAR QUE ES MOGUIN AMB ELS JUGADORS)
        this.scoreText.setScrollFactor(0);

        // PLATAFORMES
        this.platforms = this.physics.add.staticGroup(); // Creem un grup de plataformes immòbils (a part de no tenir moviment,tampoc tenen gravetat)
        this.generateRandomPlatforms(4);
       
        // JUGADOR
        this.player = this.physics.add.sprite(200,100,'player');
        this.player.setOrigin(0.5,0.5);

        this.player.setScale(0.35);
        this.player.setCollideWorldBounds(true);

        // COL·LISIONS
        this.physics.add.collider(this.player,this.platforms); // Definim les col·lisions entre el jugador i les plataformes creades

        // CONTROLS JUGADOR 1
        this.keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A, // Per desplaçar-se a l'esquerra el jugador 1 ha de polsar la tecla A
            right: Phaser.Input.Keyboard.KeyCodes.D, // Per desplaçar-se a la dreta el jugador 1 ha de polsar la tecla D
            up: Phaser.Input.Keyboard.KeyCodes.W // Per saltar cap amunt el jugador 1 ha de polsar la tecla W
        });

        // ANIMACIONS JUGADOR 
        // Idle
        this.anims.create({
            key: 'player_idle',
            frames: this.anims.generateFrameNumbers(
                'player',
                {
                    start: 0,
                    end: 4
                }
            ),
            frameRate: 5,
            repeat: -1
        });

        // Walk
        this.anims.create({
            key: 'player_walk',
            frames: this.anims.generateFrameNumbers(
                'player',
                {
                    start: 5,
                    end: 9
                }
            ),
            frameRate: 10,
            repeat: -1
        });

        // Jump
        this.anims.create({
            key: 'player_jump',
            frames: this.anims.generateFrameNumbers(
                'player',
                {
                    start: 10,
                    end: 14
                }
            ),
            frameRate: 8,
            repeat: 0
        });

        // ARGUMENTS
        this.arguments = this.physics.add.group(); // Creem un grup d'arguments
        this.argumentSpawnTimer = this.time.addEvent({
            delay: this.argumentSpawnDelay,
            callback: this.generateArgument,
            callbackScope: this,
            loop: true
        });

        this.physics.add.collider(
            this.arguments,
            this.platforms,
            this.argumentHitsGround,
            null,
            this
        );

        // Detectem les col·lisions entre els arguments i el jugador (és a dir, la recollida dels arguments)
        this.physics.add.overlap(
            this.player,
            this.arguments,
            this.collectArgument,
            null,
            this
        );
    
        // BOMBES
        this.bombs = this.physics.add.group();

        // Generació de bombes cada 5 i 20 segons
        this.bombTimer = this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.generateBomb();
                this.bombTimer.delay = Phaser.Math.Between(5000,20000);
            },
            loop: true
        });

        // Col·lisió entre la bomba i les plataformes
        this.physics.add.collider(
            this.bombs,
            this.platforms,
            this.bombHitsGround,
            null,
            this
        );

        // Col·lisió entre la bomba i el jugador
        this.physics.add.overlap(
            this.player,
            this.bombs,
            this.bombHitsPlayer,
            null,
            this
        );

        // Dificultat progressiva
        this.time.addEvent({
            delay: 15000,
            callback: this.increaseDifficulty,
            callbackScope: this,
            loop: true
        });

        // Tecla per redirigir els jugadors a l'escena de pausa
        this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update(){
        // ESCENA PAUSA
        if(Phaser.Input.Keyboard.JustDown(this.keyEsc)){
            this.scene.pause();
            this.scene.launch('EscenaPausa');
            return;
        }

        // MOVIMENT JUGADOR 
        this.player.setVelocityX(0);

        // Comprovem desplaçaments
        if(this.keys.left.isDown){
            this.player.setVelocityX(-this.playerSpeed);
            this.player.setFlipX(true);
        }
        else if(this.keys.right.isDown){
            this.player.setVelocityX(this.playerSpeed);           
            this.player.setFlipX(false);
        }
           
        // COMPROVEM EL SALT
        if(Phaser.Input.Keyboard.JustDown(this.keys.up) && this.player.body.blocked.down){
            this.player.setVelocityY(-this.jumpForce);
        }

        // ANIMACIONS
        if(!this.player.body.blocked.down){
            if(this.player.anims.currentAnim?.key !== 'player_jump'){
                this.player.play('player_jump', true);
            }
        }
        else if(this.player.body.velocity.x !== 0){
            if(this.player.anims.currentAnim?.key !== 'player_walk'){
                this.player.play('player_walk', true);
            }
        }
        else{
            if(this.player.anims.currentAnim?.key !== 'player_idle'){
                this.player.play('player_idle', true);
            }
        }
    }

    // GENERAR PLATAFORMES ALEATÒRIES
    generateRandomPlatforms(count){
        const minY = 120;   // separació vertical mínima
        const minX = 150;   // separació horitzontal mínima

        let placed = [];
        for(let i = 0; i < count; i++){
            let x, y, width;
            let valid = false;

            while(!valid){
                x = Phaser.Math.Between(100, 900);
                y = Phaser.Math.Between(150, 700);
                width = Phaser.Math.Between(150, 400);

                valid = true;

                for(let p of placed){
                    if(Math.abs(y - p.y) < minY){
                        valid = false;
                        break;
                    }
                    if(Math.abs(x - p.x) < minX){
                        valid = false;
                        break;
                    }
                }
            }

            let platform = this.platforms.create(x, y, 'platform');
            platform.setDisplaySize(width, 20);
            platform.refreshBody();
            placed.push({x, y});
        }

        // Terra
        let ground = this.platforms.create(500,750,'platform');
        ground.setDisplaySize(1000,50);
        ground.refreshBody();
    }
       
    // CREAR ARGUMENTS
    generateArgument(){
        const x = Phaser.Math.Between(50,950); // Generem un argument en una posició aleatòria de l'eix X

        // Creem un argument
        let argument = this.physics.add.image(x,0,'argument');
        argument.setScale(0.5); // Reduïm la mida de l'argument per fer-lo més visible i manejable
        argument.body.setVelocityY(this.argumentFallSpeed);
        argument.body.setBounce(0);
        
        this.arguments.add(argument); // Afegim l'argument al grup d'arguments
    }

    collectArgument(player, argument){
        // Eliminem l'argument del joc
        if(argument.active){
            argument.destroy();
        }

        // ACTUALITZEM LA PUNTUACIÓ DEL JUGADOR 
        this.score += this.argumentPoints; // El jugador rep 5 punts per cada argument recollit
        this.scoreText.setText("PUNTUACIÓN: " + this.score); // Actualitzem el text de la puntuació que es mostra per pantalla del jugador 
    }

    argumentHitsGround(argument){
        if(argument.active){
            argument.destroy();
        }

        this.score = Math.max(0,this.score - this.argumentPenalty);
        this.scoreText.setText("PUNTUACIÓN: " + this.score);

        if(this.score <= 0){
            this.gameOver = true;
            this.endGame();
        }
    }

    // GENEREM LES BOMBES
    generateBomb(){
        const x = Phaser.Math.Between(50,950);
        let bomb = this.physics.add.image(x,0,'bomb');

        bomb.setScale(0.4);
        bomb.body.setVelocityY(300);
        bomb.body.setBounce(0);
        
        this.bombs.add(bomb);
    }

    bombHitsGround(bomb, platform){
        if(!bomb.active){
            return;
        }

        bomb.destroy();
        this.movePlayerToNewZone(); // Transportem el jugador a una nova zona inferior
    }

    bombHitsPlayer(player, bomb){
        bomb.destroy();
        this.endGame();
    }

    movePlayerToNewZone(){
        this.platforms.clear(true,true); // Eliminem les plataformes actuals

        // Creem la nova disposició de plataformes
        this.generateRandomPlatforms(Phaser.Math.Between(2,5));

        this.player.setPosition(500,100); // Reposicionem el jugador
    }

    increaseDifficulty(){
        this.difficultyLevel++;

        this.argumentFallSpeed *= 1.2;
        this.argumentPenalty = Math.floor(this.argumentPenalty*1.25);
        this.argumentSpawnDelay = Math.max(300, this.argumentSpawnDelay - 100);
        this.argumentSpawnTimer.delay = this.argumentSpawnDelay;

        this.bombTimer.delay = Math.max(2000, this.bombTimer.delay - 500);
    }

    endGame(){
        if(this.gameOver){
            return;
        }

        this.gameOver = true;

        this.physics.pause();
        this.anims.pauseAll();
        this.input.keyboard.enabled = false; // Desectivem els controls

        let text = "¡CULPABLE! ¡Que se haga justicia!";
        
        // Mostrem text del resultat final
        const textFinal = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2,
            text, {
                fontSize: '36px',
                color: '#fff5d1',
        }).setOrigin(0.5).setDepth(10);

        this.time.delayedCall(8000, () => {
            textFinal.destroy(); // Esborrem el text
            this.scene.stop();
            this.scene.start("EscenaMenu");
        });
    }
}
