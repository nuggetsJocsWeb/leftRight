export default class EscenaAlias extends Phaser.Scene{
    constructor(){
        super("EscenaAlias");
    }
    
    init(data){
        this.argumentFallSpeed = data.argumentFallSpeed;
    }

    create() {
        const { width, height } = this.scale;

        const aliasHTML = `
            <div style="width: ${width}px; height: ${height}px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 2rem; font-family: sans-serif; color: white;">
                <h2 style="margin: 0; font-size: 2rem;">ALIAS DE LOS JUGADORES</h2>
                
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div style="display: flex; flex-direction: column;">
                        <label>Jugador 1 (Azul):</label>
                        <input type="text" id="input-alias1" placeholder="Nombre..." style="padding: 10px; border-radius: 5px; border: none; font-size: 1.2rem;">
                    </div>
                    
                    <div style="display: flex; flex-direction: column;">
                        <label>Jugador 2 (Rojo):</label>
                        <input type="text" id="input-alias2" placeholder="Nombre..." style="padding: 10px; border-radius: 5px; border: none; font-size: 1.2rem;">
                    </div>
                </div>

                <button id="btn-empezar" style="padding: 1rem 3rem; font-size: 1.5rem; cursor: pointer; border-radius: 10px; background-color: #f0e6d2; border: 2px solid #5b5b5b; font-weight: bold; margin-top: 1rem;">
                    ¡A JUGAR!
                </button>
            </div>
        `;

        const domElement = this.add.dom(width / 2, height / 2).createFromHTML(aliasHTML);

        const btnEmpezar = domElement.node.querySelector('#btn-empezar');
        const input1 = domElement.node.querySelector('#input-alias1');
        const input2 = domElement.node.querySelector('#input-alias2');

        btnEmpezar.addEventListener('click', () => {
            const alias1 = input1.value || "Jugador 1";
            const alias2 = input2.value || "Jugador 2";

            // Pasamos los nombres y la velocidad a la escena final de 2 jugadores
            this.scene.start('EscenaJuego', { alias1: alias1, alias2: alias2, argumentFallSpeed: this.argumentFallSpeed });
        });
    }
}