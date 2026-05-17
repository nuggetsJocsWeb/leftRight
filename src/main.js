class EscenaMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'EscenaMenu' });
    }

    preload(){

    }

    create(){
        
        const exitButton = this.add.text(600, 600, 'EXIT', {
            fontSize: '40px',
            fill: '#ffffff',
            backgroundColor: '#ba2d2d',
            padding: { x: 30, y: 15 },
            fontFamily: 'Arial'
        });

        exitButton.setOrigin(0.5);

        exitButton.setInteractive({ useHandCursor: true });

        exitButton.on('pointerover', () => {
            exitButton.setStyle({ fill: '#ba2d2d', backgroundColor: '#ffffff' });
        });

        exitButton.on('pointerout', () => {
            exitButton.setStyle({ fill: '#ffffff', backgroundColor: '#ba2d2d' });
        });

        exitButton.on('pointerdown', () => {
            this.salirDelJuego();
        });


    }

    update(){

    }

    salirDelJuego(){
        this.game.destroy(true);
    }

    


}
class EscenaJuego extends Phaser.Scene {
    constructor(){
        super({ key: 'EscenaJuego' });
    }

    preload(){

    }

    create(){

    }
}

class EscenaRanquing extends Phaser.Scene {
    constructor(){
        super({ key: 'EscenaRanquing' });
    }

    preload(){

    }
    
    create(){

    }
}

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 1200,
    parent: 'game-container',
    backgroundColor: '#97a3a6',
    dom: {
        createContainer: true
    },
    scene: [EscenaMenu, EscenaJuego, EscenaRanquing]
};

const game = new Phaser.Game(config); 