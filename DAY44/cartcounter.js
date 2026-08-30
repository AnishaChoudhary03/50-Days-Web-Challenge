/* ==========================================
   DAY 44
   CART COUNTER
========================================== */

import {
    globalStore
} from "../core/store.js";


class CartCounter extends HTMLElement {


    constructor() {

        super();


        /*
         * Create Shadow DOM
         */

        this.attachShadow({
            mode: "open"
        });


        /*
         * Store unsubscribe function
         */

        this.unsubscribe = null;

    }


    /* ======================================
       CONNECTED CALLBACK
    ====================================== */

    connectedCallback() {

        /*
         * First render the current state.
         * This is the bonus requirement.
         */

        const initialState =
            globalStore.getState();


        this.render(
            initialState.cartCount
        );


        /*
         * Subscribe to future changes.
         */

        this.unsubscribe =
            globalStore.subscribe(
                state => {

                    this.render(
                        state.cartCount
                    );

                }
            );

    }


    /* ======================================
       DISCONNECTED CALLBACK
    ====================================== */

    disconnectedCallback() {

        /*
         * CRITICAL:
         * Remove the subscription when
         * the component leaves the DOM.
         */

        if (this.unsubscribe) {

            this.unsubscribe();

            this.unsubscribe = null;

        }

    }


    /* ======================================
       RENDER
    ====================================== */

    render(cartCount) {

        this.shadowRoot.innerHTML = `

            <style>

                .counter {

                    display: flex;

                    align-items: center;

                    gap: 10px;

                    padding: 10px 18px;

                    border-radius: 30px;

                    background: #1e293b;

                    color: white;

                    font-weight: 600;

                }


                .icon {

                    font-size: 20px;

                }


                .count {

                    min-width: 28px;

                    height: 28px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    border-radius: 50%;

                    background: #8b5cf6;

                    color: white;

                    font-size: 14px;

                }

            </style>


            <div class="counter">

                <span class="icon">
                    🛒
                </span>

                <span>
                    Cart
                </span>

                <span class="count">

                    ${cartCount}

                </span>

            </div>

        `;

    }

}


/* ==========================================
   REGISTER COMPONENT
========================================== */

customElements.define(
    "cart-counter",
    CartCounter
);