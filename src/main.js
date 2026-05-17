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
                    <button class="center" id="btn-left">LEFT</button>
                    <button class="center" id="btn-right">RIGHT</button>
                </div>

                <!-- Añadimos el EXIT en HTML. Le aplicamos estilos inline para el color rojo -->
                <button class="center" id="btn-exit" style="background-color: #ba2d2d; color: #ffffff; border-color: #ffffff; margin-top: 3rem;">
                    EXIT
                </button>
            </div>
        `;

        const menuDOM = this.add.dom(600, 600).createFromHTML(menuHTML);

        const btnLeft = menuDOM.node.querySelector('#btn-left');
        const btnRight = menuDOM.node.querySelector('#btn-right');
        const btnExit = menuDOM.node.querySelector('#btn-exit');

        btnLeft.addEventListener('click', () => {
            console.log("Ir a la escena de Juego");
            this.scene.start('EscenaJuego'); 
        });

        btnRight.addEventListener('click', () => {
            console.log("Ir a la escena de Ranking");
            this.scene.start('EscenaRanquing');
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
    scene: [EscenaMenu, EscenaJuego, EscenaRanquing]
};

const game = new Phaser.Game(config); 