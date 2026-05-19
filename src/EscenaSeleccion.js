export default class EscenaSeleccion extends Phaser.Scene {
    constructor(){
        super("EscenaSeleccion");
    }

    Infinity(data){
        this.argumentFallSpped = data.argumentFallSpped || 175;
    }

    create(){
        const { width, height } = this.scale;

        const seleccionHTML = `
            <div style="width: ${width}px; height: ${height}px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 3rem; font-family: sans-serif;">
                
                <h1 style="color: #ffffff; text-align: center; font-size: 2.5rem; margin: 0;">
                    NÚMERO DE JUGADORES
                </h1>
                
                <div style="display: flex; gap: 2rem;">
                    <button id="btn-1jugador" style="padding: 1rem 2rem; font-size: 1.5rem; cursor: pointer; border-radius: 10px; background-color: #f0e6d2; border: 2px solid #5b5b5b;">
                        1 JUGADOR
                    </button>
                    
                    <button id="btn-2jugadores" style="padding: 1rem 2rem; font-size: 1.5rem; cursor: pointer; border-radius: 10px; background-color: #f0e6d2; border: 2px solid #5b5b5b;">
                        2 JUGADORES
                    </button>
                </div>
            </div>
        `;

        const domElement = this.add.dom(width / 2, height / 2).createFromHTML(seleccionHTML);

        const btn1 = domElement.node.querySelector('#btn-1jugador');
        const btn2 = domElement.node.querySelector('#btn-2jugadores');



        btn1.addEventListener('click', () => {
            this.scene.start('EscenaJuegoUnJugador', {argumentFallSpped: this.argumentFallSpped });
        });

        btn2.addEventListener('click', () => {
            this.scene.start('EscenaAlias', {argumentFallSpped: this.argumentFallSpped });
        });
    }




}