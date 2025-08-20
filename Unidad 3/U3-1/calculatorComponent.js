export class CustomCalculator extends HTMLElement {
    constructor() {
        super();

        // Pantalla
        this.display = document.createElement('input');
        this.display.type = 'text';
        this.display.readOnly = true;

        // Lista de botones
        this.buttons = {};
        const labels = [
            "7", "8", "9", "/",
            "4", "5", "6", "*",
            "1", "2", "3", "-",
            "0", ".", "=", "+"
        ];
        labels.forEach(lbl => {
            this.buttons[lbl] = document.createElement('button');
            this.buttons[lbl].innerText = lbl;
        });
    }

    connectedCallback() {
        // Estilos mínimos
        this.style.display = "grid";
        this.style.gridTemplateColumns = "repeat(4, 50px)";
        this.style.gap = "5px";
        this.style.width = "220px";

        // Agregar display ocupando toda la fila
        this.display.style.gridColumn = "1 / span 4";
        this.appendChild(this.display);

        // Agregar botones
        Object.values(this.buttons).forEach(btn => this.appendChild(btn));

        // Asignar eventos
        for (let [key, btn] of Object.entries(this.buttons)) {
            if (!isNaN(key) || key === ".") {
                btn.onclick = () => this.display.value += key;
            } else if (["+", "-", "*", "/"].includes(key)) {
                btn.onclick = () => this.display.value += key;
            } else if (key === "=") {
                btn.onclick = () => {
                    try {
                        this.display.value = eval(this.display.value);
                    } catch (e) {
                        this.display.value = "Error";
                    }
                };
            }
        }
    }

    disconnectedCallback() { }
    adoptedCallback() { }
    static get observedAttributes() { return []; }
    attributeChangedCallback(attr, oldValue, newValue) { }
}

customElements.define("x-calculator", CustomCalculator);
