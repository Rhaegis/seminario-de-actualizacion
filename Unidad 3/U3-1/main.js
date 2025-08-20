import "./calculatorComponent.js";

function main() {
    document.body.appendChild(new (customElements.get("x-calculator"))());
}

window.onload = main;