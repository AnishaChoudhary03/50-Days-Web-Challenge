/* ==========================================
   DAY 44
   PRODUCT BUTTON
========================================== */

import {
    globalStore
} from "../core/store.js";


class ProductButton extends HTMLElement {


    constructor() {

        super();


        /*
         * Create Shadow DOM
         */

        this.attachShadow({
            mode: "open"
        });


        this.handleClick =
            this.handleClick.bind(
                this
            );

    }


    /* ======================================
       CONNECTED CALLBACK
    ====================================== */

    connectedCallback() {

        this.render();


        const button =
            this.shadowRoot.querySelector(
                "button"
            );


        button.addEventListener(
            "click",
            this.handleClick
        );

    }


    /* ======================================
       DISCONNECTED CALLBACK
    ====================================== */

    disconnectedCallback() {

        const button =
            this.shadowRoot.querySelector(
                "button"
            );


        if (button) {

            button.removeEventListener(
                "click",
                this.handleClick
            );

        }

    }


    /* ======================================
       HANDLE CLICK
    ====================================== */

    handleClick() {

        const currentState =
            globalStore.getState();


        /*
         * Publish new state.
         */

        globalStore.setState({

            cartCount:
                currentState.cartCount + 1

        });

    }


    /* ======================================
       RENDER
    ====================================== */

    render() {

        const productName =
            this.getAttribute(
                "product"
            ) ||
            "Add Product";


        this.shadowRoot.innerHTML = `

            <style>

                button {

                    padding: 14px 25px;

                    border: none;

                    border-radius: 10px;

                    background: #8b5cf6;

                    color: white;

                    font-size: 16px;

                    font-weight: 600;

                    cursor: pointer;

                    transition:
                        transform 0.2s,
                        background 0.2s;

                }


                button:hover {

                    background: #7c3aed;

                    transform:
                        translateY(-2px);

                }


                button:active {

                    transform:
                        scale(0.97);

                }

            </style>


            <button>

                🛒 Add
                ${productName}

            </button>

        `;

    }

}


/* ==========================================
   REGISTER COMPONENT
========================================== */

customElements.define(
    "product-button",
    ProductButton
);