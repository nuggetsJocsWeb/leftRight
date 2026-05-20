export default class EscenaPausa extends Phaser.Scene {
    constructor() {
        super("EscenaPausa");
    }

    create() {
        const { width, height } = this.scale;

        const pausaHTML = `
            <div style="width: ${width}px; height: ${height}px; background-color: rgba(0, 0, 0, 0.6); display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 2rem; font-family: sans-serif;">
                <div style="background-color: #2c3e50; padding: 3rem; border-radius: 15px; border: 3px solid #ffffff; display: flex; flex-direction: column; align-items: center; gap: 2rem; box-shadow: 0px 0px 20px rgba(0,0,0,0.5);">
                    <h1 style="color: #ffffff; margin: 0; font-size: 2.5rem; letter-spacing: 2px;">JUEGO EN PAUSA</h1>
                    
                    <div style="display: flex; flex-direction: column; gap: 1rem; width: 100%;">
                        <button id="btn-reanudar" style="padding: 1rem 2rem; font-size: 1.3rem; cursor: pointer; border-radius: 8px; background-color: #2ecc71; color: white; border: none; font-weight: bold; transition: 0.2s;">
                            REANUDAR
                        </button>
                        <button id="btn-salir" style="padding: 1rem 2rem; font-size: 1.3rem; cursor: pointer; border-radius: 8px; background-color: #e74c3c; color: white; border: none; font-weight: bold; transition: 0.2s;">
                            SALIR AL MENÚ
                        </button>
                    </div>
                </div>
            </div>
        `;

        const domElement = this.add.dom(width / 2, height / 2).createFromHTML(pausaHTML);

        const btnReanudar = domElement.node.querySelector('#btn-reanudar');
        const btnSalir = domElement.node.querySelector('#btn-salir');

        btnReanudar.addEventListener('click', () => {
            this.scene.resume('EscenaJuego');
            this.scene.stop();
        });

        btnSalir.addEventListener('click', () => {
            this.scene.stop('EscenaJuego');
            this.scene.start('EscenaMenu');
        });
    }
}