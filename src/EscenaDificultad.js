export default class EscenaDificultad extends Phaser.Scene {
    constructor() {
        super("EscenaDificultad");
    }

    create() {
        const { width, height } = this.scale;

        const dificultadHTML = `
            <div style="width: ${width}px; height: ${height}px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 3rem; font-family: sans-serif;">
                <h1 style="color: #ffffff; text-align: center; font-size: 2.5rem; margin: 0;">
                    SELECCIONA LA DIFICULTAD
                </h1>
                
                <div style="display: flex; gap: 2rem;">
                    <button id="btn-facil" style="padding: 1rem 2rem; font-size: 1.5rem; cursor: pointer; border-radius: 10px; background-color: #a3e2a5; border: 2px solid #5b5b5b;">
                        FÁCIL
                    </button>
                    <button id="btn-normal" style="padding: 1rem 2rem; font-size: 1.5rem; cursor: pointer; border-radius: 10px; background-color: #f0e6d2; border: 2px solid #5b5b5b;">
                        NORMAL
                    </button>
                    <button id="btn-dificil" style="padding: 1rem 2rem; font-size: 1.5rem; cursor: pointer; border-radius: 10px; background-color: #e2a3a3; border: 2px solid #5b5b5b;">
                        DIFÍCIL
                    </button>
                </div>
            </div>
        `;

        const domElement = this.add.dom(width / 2, height / 2).createFromHTML(dificultadHTML);

        const btnFacil = domElement.node.querySelector('#btn-facil');
        const btnNormal = domElement.node.querySelector('#btn-normal');
        const btnDificil = domElement.node.querySelector('#btn-dificil');

        btnFacil.addEventListener('click', () => {
            this.scene.start('EscenaSeleccion', { argumentFallSpeed: 100 });
        });

        btnNormal.addEventListener('click', () => {
            this.scene.start('EscenaSeleccion', { argumentFallSpeed: 175 });
        });

        btnDificil.addEventListener('click', () => {
            this.scene.start('EscenaSeleccion', { argumentFallSpeed: 275 });
        });
    }
}