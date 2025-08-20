export class PricingComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.plans = [
            { name: "Basic", price: "$9.99", features: ["1GB Storage", "Email Support", "Basic Analytics"] },
            { name: "Pro", price: "$19.99", features: ["10GB Storage", "Priority Support", "Advanced Analytics"] },
            { name: "Enterprise", price: "$49.99", features: ["100GB Storage", "Dedicated Support", "Full Analytics"] }
        ];
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() { }

    render() {
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.gap = "16px";

        this.plans.forEach(plan => {
            let card = document.createElement("div");
            card.style.border = "1px solid #ccc";
            card.style.padding = "16px";
            card.style.width = "150px";

            let title = document.createElement("h3");
            title.textContent = plan.name;
            card.appendChild(title);

            let price = document.createElement("p");
            price.textContent = plan.price;
            card.appendChild(price);

            let ul = document.createElement("ul");
            plan.features.forEach(f => {
                let li = document.createElement("li");
                li.textContent = f;
                ul.appendChild(li);
            });
            card.appendChild(ul);

            let btn = document.createElement("button");
            btn.textContent = "Sign Up";
            card.appendChild(btn);

            container.appendChild(card);
        });

        this.shadowRoot.innerHTML = "";
        this.shadowRoot.appendChild(container);
    }
}

customElements.define("pricing-component", PricingComponent);
