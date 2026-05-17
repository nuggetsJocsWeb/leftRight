export default class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene");
    }

    create(){
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
        this.player2 = this.add.rectangle(1000,100,40,40,0xff0000);
        this.physics.add.existing(this.player2); // Afegim físiques al segon jugador
        this.player2.body.setCollideWorldBounds(true); // Per evitar que el jugador surti dels límits definits del joc

        // COL·LISIONS

        // CONTROLS JUGADOR 1

        // CONTROLS JUGADOR 2
    
    }

    update(){
        // JUGADOR 1

        // JUGADOR 2

    }
}