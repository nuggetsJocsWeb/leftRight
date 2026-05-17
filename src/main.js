import EscenaJuego from './EscenaJuego.js';

class EscenaMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'EscenaMenu' });
    }

    preload(){

    }

    create() {
        const menuHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 2rem;">
                <h1 id="mainTitle">LEFT&RIGHT MENU</h1>
                
                <div id="contenidorBotons">
                    <button class="center" id="play-button">PLAY</button>
                    <button class="center" id="alias-button">ALIAS</button>
                </div>

                <!-- Añadimos el EXIT en HTML. Le aplicamos estilos inline para el color rojo -->
                <button class="center" id="btn-exit" style="background-color: #ba2d2d; color: #ffffff; border-color: #ffffff; margin-top: 3rem;">
                    EXIT
                </button>
            </div>
        `;

        const menuDOM = this.add.dom(600, 600).createFromHTML(menuHTML);

        const playButtom = menuDOM.node.querySelector('#play-button');
        const aliasButton = menuDOM.node.querySelector('#alias-button');
        const exitButton = menuDOM.node.querySelector('#exit-button');

        playButtom.addEventListener('click', () => {
            this.scene.start('EscenaJuego');
        });

        btnRight.addEventListener('click', () => {

        });

        btnExit.addEventListener('click', () => {
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
    scene: [EscenaMenu, EscenaJuego]
};

const game = new Phaser.Game(config); 