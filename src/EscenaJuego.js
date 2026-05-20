export default class EscenaJuego extends Phaser.Scene {
    constructor(){
        super("EscenaJuego");
    }

    preload(){
        // SPRITESHEETS DELS JUGADORS
        this.load.spritesheet(
            'player1',
            'assets/spritesheetJug1.png',
            {
                frameWidth: 192,
                frameHeight: 320
            }
        );

        this.load.spritesheet(
            'player2',
            'assets/spritesheetJug2.png',
            {
                frameWidth: 192,
                frameHeight: 320
            }
        );

        // MARTELL
        this.load.image(
            'hammer',
            'assets/martell.png'
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
    }

    init(data = {}){
        this.alias1 = data.alias1 || "Jugador 1";
        this.alias2 = data.alias2 || "Jugador 2";

        this.initialFallSpeed = data.argumentFallSpeed || 175;
    }

    create(){
        // CONSTANTS
        this.playerSpeed = 300;
        this.jumpForce = 500;

        this.argumentPoints = 5; // Punts que rep un jugador per cada argument recollit
        this.argumentFallSpeed = this.initialFallSpeed; // Velocitat inicial a la que cauen els arguments
        this.argumentLifeSpan = 5000; // Temps (en ms) què un argument roman al joc abans de desaparèixer
        
        this.gameTime = 180;  // Durada de la partida (3 minuts)

        // PUNTUACIONS INICIALS DELS JUGADORS
        this.score1 = 0;
        this.score2 = 0;

        // TEXT DE LES PUNTUACIONS I DEL TEMPORITZADOR DE LA PARTIDA
        this.scoreText1 = this.add.text(16, 16, this.alias1 + ": 0", { fontSize: '20px', color: '#000' });
        this.scoreText2 = this.add.text(750, 16, this.alias2 + ": 0", { fontSize: '20px', color: '#000' });

        this.timerText = this.add.text(400, 16, "Temps: 3:00", { fontSize: '20px', color: '#000' });
        this.timerText.setOrigin(0.5, 0); // Centrem el text del temporitzador a la posició definida

        // FIXEM ELS TEXTOS DE LES PUNTUACIONS I EL TEMPORITZADOR A LA CÀMERA (PER EVITAR QUE ES MOGUIN AMB ELS JUGADORS)
        this.scoreText1.setScrollFactor(0);
        this.scoreText2.setScrollFactor(0);
        this.timerText.setScrollFactor(0);

        // PLATAFORMES
        this.platforms = this.physics.add.staticGroup(); // Creem un grup de plataformes immòbils (a part de no tenir moviment,tampoc tenen gravetat)

        this.platforms.create(500,700,'platform').setDisplaySize(1000,50).refreshBody(); // Creem una plataforma de terra
        this.platforms.create(300,500,'platform').setDisplaySize(300,20).refreshBody(); // Creem una plataforma amb alçada
        this.platforms.create(700,350,'platform').setDisplaySize(300,20).refreshBody();
        
        // JUGADOR 1
        this.player1 = this.physics.add.sprite(200, 100, 'player1');

        this.player1.setScale(0.3);
        this.player1.setCollideWorldBounds(true);

        // Ajust del collider
        this.player1.body.setSize(55, 170);
        this.player1.body.setOffset(58, 145);

        // JUGADOR 2
        this.player2 = this.physics.add.sprite(800, 100, 'player2');

        this.player2.setScale(0.3);
        this.player2.setCollideWorldBounds(true);

        // Ajust del collider
        this.player2.body.setSize(55, 170);
        this.player2.body.setOffset(58, 145);

        // COL·LISIONS
        this.physics.add.collider(this.player1, this.platforms); // Definim les col·lisions entre el jugador 1 i les plataformes creades
        this.physics.add.collider(this.player2, this.platforms); // Definim les col·lisions entre el jugador 2 i les plataformes creades
        this.physics.add.collider(this.player1, this.player2); // Definim una col·lisió entre jugadors
        
        // CONTROLS JUGADOR 1
        this.keys1 = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A, // Per desplaçar-se a l'esquerra el jugador 1 ha de polsar la tecla A
            right: Phaser.Input.Keyboard.KeyCodes.D, // Per desplaçar-se a la dreta el jugador 1 ha de polsar la tecla D 
            up: Phaser.Input.Keyboard.KeyCodes.W // Per saltar cap amunt el jugador 1 ha de polsar la tecla W
        });

        // CONTROLS JUGADOR 2
        this.keys2 = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT, // Per desplaçar-se a l'esquerra el jugador 2 ha de polsar la tecla de fletxa esquerra
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT, // Per desplaçar-se a la dreta el jugador 2 ha de polsar la tecla de fletxa dreta
            up: Phaser.Input.Keyboard.KeyCodes.UP // Per saltar cap amunt el jugador 2 ha de polsar la tecla de fletxa amunt
        });

        // ANIMACIONS JUGADOR 1
        // Idle
        this.anims.create({
            key: 'player1_idle',
            frames: this.anims.generateFrameNumbers(
                'player1',
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
            key: 'player1_walk',
            frames: this.anims.generateFrameNumbers(
                'player1',
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
            key: 'player1_jump',
            frames: this.anims.generateFrameNumbers(
                'player1',
                {
                    start: 10,
                    end: 14
                }
            ),
            frameRate: 8,
            repeat: 0
        });

        // ANIMACIONS PLAYER 2
        // Idle
        this.anims.create({
            key: 'player2_idle',
            frames: this.anims.generateFrameNumbers(
                'player2',
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
            key: 'player2_walk',
            frames: this.anims.generateFrameNumbers(
                'player2',
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
            key: 'player2_jump',
            frames: this.anims.generateFrameNumbers(
                'player2',
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

        // Generem arguments
        this.time.addEvent({
            delay: 1000, // Es genera un argument cada segon
            callback: this.generateArgument,
            callbackScope: this,
            loop: true
        });

        // Detectem les col·lisions entre els arguments i els jugadors (és a dir, la recollida dels arguments)
        this.physics.add.overlap(
            this.player1,
            this.arguments,
            this.collectArgument,
            null,
            this
        );

        this.physics.add.overlap(
            this.player2,
            this.arguments,
            this.collectArgument,
            null,
            this
        );

        // Augment de la dificultat modificant la velocitat de caiguda dels arguments
        this.time.addEvent({
            delay: 10000,
            callback: () =>{
                this.argumentFallSpeed *= 1.5;

                // Actualitzem la velocitat dels arguments ja existents
                this.arguments.getChildren().forEach(argument => {
                    if(argument.body){
                        argument.body.setVelocityY(this.argumentFallSpeed);
                    }
                });

                if(this.argumentLifeSpan > 1000){
                    this.argumentLifeSpan -= 500;
                }

                console.log("Dificultat augmentada! Velocitat actual de caiguda dels arguments: " + this.argumentFallSpeed);
                console.log("Temps de vida actual dels arguments: " + this.argumentLifeSpan);
            },
            callbackScope: this,
            loop: true
        });

        // VARIABLES RELACIONADES AMB EL MARTELL
        this.hammer = null;
        this.canStealHammer = true;

        this.player1HasHammer = false;
        this.player2HasHammer = false;

        this.player1Stunned = false;
        this.player2Stunned = false;

        this.generateHammer(); 

        // Afegim els controls extra per fer servir el martell
        this.keys1.attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys2.attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    
        // Text que indica que es té el martell equipat (inicialment ocult)
        this.hammerText1 = this.add.text(0, 0, "Martell equipat!", {fontSize: '24px'});
        this.hammerText2 = this.add.text(0, 0, "Martell equipat!", {fontSize: '24px'});
        
        this.hammerText1.setVisible(false);
        this.hammerText2.setVisible(false);

        this.hammerText1.setDepth(10);
        this.hammerText2.setDepth(10);

        // COMPTE ENRERE DEL JOC
        this.time.addEvent({
            delay: 1000, // Actualitzem el temporitzador cada segon
            callback: () => {
                this.gameTime --; // Restem un segon al temps total de la partida

                // Convertim el temps restant a minuts i segons
                const minutes = Math.floor(this.gameTime / 60);
                let seconds = this.gameTime % 60;

                // Afegim un zero davant dels segons si són menors a 10 
                seconds = seconds < 10 ? "0" + seconds : seconds;
                
                // Actualitzem el text del temporitzador
                this.timerText.setText("Temps: " + minutes + ":" + seconds);

                // Comprovem si finalitza la partida
                if(this.gameTime <= 0){
                    this.endGame();
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    update(){
        // MOVIMENT JUGADOR 1
        if(!this.player1Stunned){
            this.player1.setVelocityX(0);

            // Comprovem desplaçaments
            if(this.keys1.left.isDown){
                this.player1.setVelocityX(-this.playerSpeed);
                this.player1.setFlipX(true);
            }
            else if(this.keys1.right.isDown){
                this.player1.setVelocityX(this.playerSpeed);
                this.player1.setFlipX(false);
            }
            
            // COMPROVEM EL SALT
            if(Phaser.Input.Keyboard.JustDown(this.keys1.up) && this.player1.body.blocked.down){
                this.player1.setVelocityY(-this.jumpForce);
            }

            // ANIMACIONS
            if(!this.player1.body.blocked.down){
                if(this.player1.anims.currentAnim?.key !== 'player1_jump'){
                    this.player1.anims.play('player1_jump', true);
                }
            }
            else if(this.player1.body.velocity.x !== 0){
                if(this.player1.anims.currentAnim?.key !== 'player1_walk'){
                    this.player1.anims.play('player1_walk', true);
                }
            }
            else{
                if(this.player1.anims.currentAnim?.key !== 'player1_idle'){
                    this.player1.anims.play('player1_idle', true);
                }
            }
        }

        // MOVIMENT JUGADOR 2
        if(!this.player2Stunned){
            this.player2.setVelocityX(0);

            // Comprovem desplaçaments
            if(this.keys2.left.isDown){
                this.player2.setVelocityX(-this.playerSpeed); // Si el jugador 2 prem la tecla de la fletxa esquerra es desplaçarà a l'esquerra
                this.player2.setFlipX(true); // Girem el sprite del jugador 2 cap a l'esquerra
            }
            else if(this.keys2.right.isDown){
                this.player2.setVelocityX(this.playerSpeed); // Si el jugador 2 prem la tecla de la fletxa dreta es desplaçarà cap a la dreta
                this.player2.setFlipX(false); // Girem el sprite del jugador 2 cap a la dreta
            }

            // COMPROVEM SALT
            if(Phaser.Input.Keyboard.JustDown(this.keys2.up) && this.player2.body.blocked.down){ // Si el jugador 2 prem la tecla de fletxa amunt i està tocant el terra o una plataforma, saltarà cap amunt
                this.player2.setVelocityY(-this.jumpForce);
            }

            // ANIMACIONS
            if(!this.player2.body.blocked.down){
                if(this.player2.anims.currentAnim?.key !== 'player2_jump'){
                    this.player2.anims.play('player2_jump', true);
                }
            }
            else if(this.player2.body.velocity.x !== 0){
                if(this.player2.anims.currentAnim?.key !== 'player2_walk'){
                    this.player2.anims.play('player2_walk', true);
                }
            }
            else{
                if(this.player2.anims.currentAnim?.key !== 'player2_idle'){
                    this.player2.anims.play('player2_idle', true);
                }
            }
        }
        
        // ATACS
        if(Phaser.Input.Keyboard.JustDown(this.keys1.attack) && this.player1HasHammer && !this.player1Stunned){
            this.attackPlayer(this.player1, this.player2);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.keys2.attack) && this.player2HasHammer && !this.player2Stunned){
            this.attackPlayer(this.player2, this.player1);
        }

        // ROBAR MARTELL
        this.checkHammerSteal();

        // ELIMINEM ELS ARGUMENTS QUE CAUEN FORA DE LA PANTALLA
        this.arguments.getChildren().forEach(argument => {
            if(argument.y > 800){ // Si un argument cau més enllà de la posició Y 800 (fora de la pantalla), el destruïm
                if(argument.active){
                    argument.destroy();
                }
            }
        });

        // POSICIONAR TEXT
        this.hammerText1.setPosition(this.player1.x - 20, this.player1.y - 50);
        this.hammerText2.setPosition(this.player2.x - 20, this.player2.y - 50);

        // TEXT MARTELL EQUIPAT
        this.hammerText1.setVisible(this.player1HasHammer);
        this.hammerText2.setVisible(this.player2HasHammer);
    }
    
    // CREAR ARGUMENTS
    generateArgument(){
        const x = Phaser.Math.Between(50, 950); // Generem un argument en una posició aleatòria de l'eix X

        // Creem un argument com un rectangle de color verd
        let argument = this.add.image(x, 0, 'argument');
        argument.setScale(0.5); // Reduïm la mida de l'argument per fer-lo més visible i manejable

        // Afegim físiques a l'argument
        this.physics.add.existing(argument);

        this.arguments.add(argument); // Afegim l'argument al grup d'arguments

        argument.body.setVelocityY(this.argumentFallSpeed); // Fem que l'argument caigui a la velocitat definida per la variable argumentFallSpeed
        argument.body.setBounce(0); // Eliminem el rebot dels arguments 
        argument.body.setCollideWorldBounds(true); // Evitem que els arguments surtin dels límits del joc
        
        // Determinem les col·lisions entre l'argument i les plataformes (perquè caiguin i es quedin a les plataformes en comptes de travessar-les)
        this.physics.add.collider(argument, this.platforms);

        // Eliminem l'argument després de cert temps
        this.time.delayedCall(this.argumentLifeSpan, () => {
            if(argument.active){ // Comprovem que l'argument encara existeix abans de destruir-lo
                argument.destroy();
            }
        }); 
    }

    collectArgument(player, argument){
        // Eliminem l'argument del joc
        if(argument.active){
            argument.destroy();
            console.log("Argument recollit per " + (player === this.player1 ? this.alias1 : this.alias2));
        }

        // ACTUALITZEM LA PUNTUACIÓ DEL JUGADOR QUE HA RECOLLIT L'ARGUMENT
        if(player === this.player1){
            this.score1 += this.argumentPoints; // El jugador 1 rep 5 punts per cada argument recollit
            this.scoreText1.setText(this.alias1 + ": " + this.score1); // Actualitzem el text de la puntuació que es mostra per pantalla del jugador 1
            console.log("Puntuació " + this.alias1 + ": " + this.score1);
        }
        else{
            this.score2 += this.argumentPoints; // El jugador 2 rep 5 punts per cada argument recollit
            this.scoreText2.setText(this.alias2 + ": " + this.score2); // Actualitzem el text de la puntuació que es mostra per pantalla del jugador 2
            console.log("Puntuació " + this.alias2 + ": " + this.score2);
        }
    }

    // GENERAR MARTELL
    generateHammer(){
        const randomTime = Phaser.Math.Between(6000, 20000); // El martell apareixerà en intervals aleatoris entre 6 i 20 segons

        this.time.delayedCall(randomTime, () => {
            if(this.hammer === null){
                const x = Phaser.Math.Between(100, this.scale.width - 50); // Generem el martell en una posició aleatòria de l'eix X
                
                this.hammer = this.physics.add.image(x, 0, 'hammer'); // Creem el martell com un rectangle de color groc
                this.hammer.setScale(0.5); // Reduïm la mida del martell per fer-lo més visible i manejable

                // Afegim físiques al martell
                this.hammer.body.setBounce(0); // Eliminem el rebot del martell al col·lisionar
                this.hammer.body.setCollideWorldBounds(true);
                this.physics.add.collider(this.hammer, this.platforms);

                this.physics.add.overlap(
                    this.player1,
                    this.hammer,
                    this.collectHammer,
                    null,
                    this
                );

                this.physics.add.overlap(
                    this.player2,
                    this.hammer,
                    this.collectHammer,
                    null,
                    this
                );
            }

            this.generateHammer(); // Programem la generació del pròxim martell 
        });
    }

    // RECOLLIR MARTELL
    collectHammer(player, hammer){
        if(player === this.player1){
            this.player1HasHammer = true; // El jugador 1 ha recollit el martell
            this.player2HasHammer = false; // El jugador 2 no té el martell
            console.log(this.alias1 + " ha recollit el martell!");
        }
        else{
            this.player2HasHammer = true; // El jugador 2 ha recollit el martell
            this.player1HasHammer = false; // El jugador 1 no té el martell
            console.log(this.alias2 + " ha recollit el martell!");
        }

        hammer.destroy(); // Eliminem el martell del joc un cop recollit
        this.hammer = null; // Resetejem la variable del martell

        // Eliminem el martell després de 6 segons
        this.time.delayedCall(6000, () => {
            this.player1HasHammer = false; // El jugador 1 deixa de tenir el martell
            this.player2HasHammer = false; // El jugador 2 deixa de tenir el martell

            console.log("El martell ha desaparegut!");
        });
    }

    // ATACAR AMB EL MARTELL
    attackPlayer(attacker, victim){
        const distance = Phaser.Math.Distance.Between(
            attacker.x, attacker.y, 
            victim.x, victim.y
        );

        // En el cas de que els jugadors estiguin a una distància menor a 50 píxels, l'atac serà vàlid
        if(distance < 50){
            if(victim === this.player1){
                if(!this.player1Stunned){
                    this.player1Stunned = true;
                    console.log(this.alias1 + " està atordit!");

                    this.time.delayedCall(2000, () => {
                        this.player1Stunned = false;
                    });
                }
            }
            else{
                if(!this.player2Stunned){
                    this.player2Stunned = true;
                    console.log(this.alias2 + " està atordit!");

                    this.time.delayedCall(2000, () => {
                        this.player2Stunned = false;
                    });
                }
            }
        }
    }

    // COMPROVAR ROBATORI MARTELL
    checkHammerSteal(){
        // Evitem que es pugui robar continuament el martell
        if(!this.canStealHammer){
            return;
        }

        // Distància entre els jugadors
        const distance = Phaser.Math.Distance.Between(
            this.player1.x, this.player1.y,
            this.player2.x, this.player2.y 
        );

        // El jugador 2 roba el martell al jugador 1
        if(this.player1HasHammer && // El jugador 1 té el martell
            this.player2.body.velocity.y > 0 && // El jugador 2 està caient 
            this.player2.y < this.player1.y - 20 && // El jugador 2 està per sobre del jugador 1 (per evitar que es pugui robar el martell desplaçant-se cap a un costat)
            distance < 50 // Els jugadors estan a una distància menor a 50 píxels
        ){
            this.player1HasHammer = false;
            this.player2HasHammer = true;
            console.log(this.alias2 + " ha robat el martell a " + this.alias1 + "!");     
        
            // Cooldown del robatori
            this.canStealHammer = false;

            this.time.delayedCall(1000, () => {
                this.canStealHammer = true;
            });
        }

        // El jugador 1 roba el martell al jugador 2
        else if(this.player2HasHammer && // El jugador 2 té el martell
            this.player1.body.velocity.y > 0 && // El jugador 1 està caient 
            this.player1.y < this.player2.y - 20 && // El jugador 1 està per sobre del jugador 2 (per evitar que es pugui robar el martell desplaçant-se cap a un costat)
            distance < 50 // Els jugadors estan a una distància menor a 50 píxels
        ){
            this.player1HasHammer = true;
            this.player2HasHammer = false;
            console.log(this.alias1 + " ha robat el martell a " + this.alias2 + "!");     
        
            // Cooldown del robatori
            this.canStealHammer = false;

            this.time.delayedCall(1000, () => {
                this.canStealHammer = true;
            });
        }
    }

    // FINAL DE LA PARTIDA
    endGame(){
        this.scene.pause();

        let winnerText = "";
        if(this.score1 > this.score2){
            winnerText = "La justicia está en tus manos " + this.alias1 + "!";
        }
        else if(this.score2 > this.score1){
            winnerText = "La justicia está en tus manos " + this.alias2 + "!";
        }
        else{
            winnerText = "Sea la justicia para todos! Bien jugado!";
        }

        // Mostrem text del resultat final
        this.add.text(
            this.scale.width / 2,
            this.scale.height / 2,
            winnerText, {
                fontSize: '36px',
                color: '#000',
        }).setOrigin(0.5);
    }
}