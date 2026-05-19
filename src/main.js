import EscenaJuego from './EscenaJuego.js';
import EscenaJuegoUnJugador from './EscenaJuegoUnJugador.js';
import EscenaSeleccion from './EscenaSeleccion.js';
import EscenaDificultad from './EscenaDificultad.js';

class EscenaMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'EscenaMenu' });
    }

    preload(){

    }

    create() {
        const{ width, height } = this.scale;

        const menuHTML = `
            <div style="width: ${width}px; height: ${height}px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 2rem;">
                <h1 id="mainTitle" style="text-align: center; margin: 0; color: #ffffff;">LEFT&RIGHT MENU</h1>
                
                <div id="contenidorBotons" style="display: flex; gap: 2rem; justify-content: center;">
                    <button class="center" id="play-button">PLAY</button>
                </div>

                <button class="center" id="exit-button" style="background-color: #ba2d2d; color: #ffffff; border-color: #ffffff; margin-top: 3rem;">
                    EXIT
                </button>
            </div>
        `;

        const menuDOM = this.add.dom(width / 2, height / 2).createFromHTML(menuHTML);

        const playButton = menuDOM.node.querySelector('#play-button');
        const exitButton = menuDOM.node.querySelector('#exit-button');

        playButton.addEventListener('click', () => {
            this.scene.start('EscenaDificultad');
        });

        exitButton.addEventListener('click', () => {
            this.salirDelJuego();
        });
    }
    update(){

    }

    salirDelJuego(){
        this.game.destroy(true);
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
    scene: [EscenaMenu, EscenaJuego, EscenaSeleccion, EscenaDificultad, EscenaJuegoUnJugador]
};

const game = new Phaser.Game(config); 