import "./CalculatorComponent.js";
import "./LoginComponent.js";
import "./PricingComponent.js";

window.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("app");

    let calc = document.createElement("calculator-component");
    let login = document.createElement("login-component");
    let pricing = document.createElement("pricing-component");

    root.appendChild(calc);
    root.appendChild(document.createElement("hr"));
    root.appendChild(login);
    root.appendChild(document.createElement("hr"));
    root.appendChild(pricing);
});
