export class LoginComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() { }

    render() {
        const container = document.createElement("div");
        container.style.border = "1px solid #ccc";
        container.style.padding = "16px";
        container.style.width = "300px";

        let title = document.createElement("h2");
        title.textContent = "Login Form";
        container.appendChild(title);

        // Username
        let labelUser = document.createElement("label");
        labelUser.textContent = "Username";
        container.appendChild(labelUser);
        let inputUser = document.createElement("input");
        inputUser.type = "text";
        inputUser.placeholder = "Enter Username";
        inputUser.required = true;
        container.appendChild(inputUser);

        // Password
        let labelPass = document.createElement("label");
        labelPass.textContent = "Password";
        container.appendChild(labelPass);
        let inputPass = document.createElement("input");
        inputPass.type = "password";
        inputPass.placeholder = "Enter Password";
        inputPass.required = true;
        container.appendChild(inputPass);

        // Botón login
        let btnLogin = document.createElement("button");
        btnLogin.textContent = "Login";
        btnLogin.style.marginTop = "10px";
        container.appendChild(btnLogin);

        this.shadowRoot.innerHTML = "";
        this.shadowRoot.appendChild(container);
    }
}

customElements.define("login-component", LoginComponent);
