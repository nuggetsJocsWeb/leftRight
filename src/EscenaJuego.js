export default class EscenaJuego extends Phaser.Scene {
    constructor(){
        super("EscenaJuego");
    }

    create(){
        // CONSTANTS
        this.playerSpeed = 300;
        this.jumpForce = 500;
    
        // PLATAFORMES
        this.platforms = this.physics.add.staticGroup(); // Creem un grup de plataformes immòbils (a part de no tenir moviment,tampoc tenen gravetat)

        this.platforms.create(500,700,null).setDisplaySize(1000,50).refreshBody(); // Creem una plataforma de terra
        this.platforms.create(300,500,null).setDisplaySize(300,20).refreshBody(); // Creem una plataforma amb alçada
        this.platforms.create(700,350,null).setDisplaySize(300,20).refreshBody();
        
        // JUGADOR 1
        this.player1 = this.add.rectangle(200,100,40,40,0x0000ff);
        this.physics.add.existing(this.player1); // Afegim físiques al jugador 1
        this.player1.body.setCollideWorldBounds(true); // Per evitar que el jugador surti dels límits definits del joc
        
        // JUGADOR 2
        this.player2 = this.add.rectangle(800,100,40,40,0xff0000);
        this.physics.add.existing(this.player2); // Afegim físiques al segon jugador
        this.player2.body.setCollideWorldBounds(true); // Per evitar que el jugador surti dels límits definits del joc

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
    }

    update(){
        // MOVIMENT JUGADOR 1
        this.player1.body.setVelocityX(0); // Quan el jugador 1 no prem cap tecla no es mou

        // Comprovem desplaçaments
        if(this.keys1.left.isDown){
            this.player1.body.setVelocityX(-this.playerSpeed); // Si el jugador 1 prem la tecla A es desplaçarà a l'esquerra
        }
        else if(this.keys1.right.isDown){
            this.player1.body.setVelocityX(this.playerSpeed); // Si el jugador 1 prem la tecla D es desplaçarà cap a la dreta
        }

        // COMPROVEM SALT
        if(this.keys1.up.isDown && this.player1.body.blocked.down){ // Si el jugador 1 prem la tecla W i està tocant el terra o una plataforma, saltarà cap amunt
            this.player1.body.setVelocityY(-this.jumpForce); 
        }

        // MOVIMENT JUGADOR 2
        this.player2.body.setVelocityX(0); // Quan el jugador 2 no prem cap tecla no es mou

        // Comprovem desplaçaments
        if(this.keys2.left.isDown){
            this.player2.body.setVelocityX(-this.playerSpeed); // Si el jugador 2 prem la tecla de la fletxa esquerra es desplaçarà a l'esquerra
        }
        else if(this.keys2.right.isDown){
            this.player2.body.setVelocityX(this.playerSpeed); // Si el jugador 2 prem la tecla de la fletxa dreta es desplaçarà cap a la dreta
        }

        // COMPROVEM SALT
        if(this.keys2.up.isDown && this.player2.body.blocked.down){ // Si el jugador 2 prem la tecla de fletxa amunt i està tocant el terra o una plataforma, saltarà cap amunt
            this.player2.body.setVelocityY(-this.jumpForce); 
        }
    }
}