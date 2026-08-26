/* ==========================================
   DAY 43
   USER CARD
========================================== */

import {
    globalStore
} from "../core/store.js";


class UserCard extends HTMLElement {


    constructor() {

        super();


        this.attachShadow({
            mode: "open"
        });


        /*
         * Store unsubscribe function.
         */

        this.unsubscribe = null;

    }


    /* ======================================
       CONNECTED
    ====================================== */

    connectedCallback() {

        this.render();


        /*
         * Subscribe to global state.
         */

        this.unsubscribe =
            globalStore.subscribe(
                state => {

                    this.updateFromState(
                        state
                    );

                }
            );

    }


    /* ======================================
       DISCONNECTED
    ====================================== */

    disconnectedCallback() {

        /*
         * Remove listener when
         * component leaves DOM.
         */

        if (this.unsubscribe) {

            this.unsubscribe();

        }

    }


    /* ======================================
       RENDER
    ====================================== */

    render() {

        const name =
            this.getAttribute(
                "name"
            ) ||
            "Unknown User";


        const role =
            this.getAttribute(
                "role"
            ) ||
            "Team Member";


        this.shadowRoot.innerHTML = `

            <style>

                .card {

                    padding: 25px;

                    background: #1e293b;

                    border:
                        1px solid #334155;

                    border-radius: 16px;

                    color: white;

                }


                .avatar {

                    width: 60px;

                    height: 60px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    margin-bottom: 15px;

                    border-radius: 50%;

                    background: #8b5cf6;

                    font-weight: bold;

                    font-size: 20px;

                }


                h3 {

                    margin-bottom: 5px;

                }


                .role {

                    color: #a78bfa;

                }


                .state {

                    margin-top: 15px;

                    padding-top: 15px;

                    border-top:
                        1px solid #334155;

                    color: #94a3b8;

                }

            </style>


            <div class="card">

                <div class="avatar">

                    ${this.getInitials(name)}

                </div>


                <h3>

                    ${name}

                </h3>


                <p class="role">

                    ${role}

                </p>


                <div class="state">

                    Cart:

                    <strong class="cart-count">
                        0
                    </strong>

                    <br>

                    Theme:

                    <strong class="theme">
                        light
                    </strong>

                </div>

            </div>

        `;

    }


    /* ======================================
       UPDATE FROM GLOBAL STATE
    ====================================== */

    updateFromState(state) {

        const cartCount =
            this.shadowRoot.querySelector(
                ".cart-count"
            );


        const theme =
            this.shadowRoot.querySelector(
                ".theme"
            );


        if (cartCount) {

            cartCount.textContent =
                state.cartCount;

        }


        if (theme) {

            theme.textContent =
                state.userTheme;

        }

    }


    /* ======================================
       INITIALS
    ====================================== */

    getInitials(name) {

        return name
            .split(" ")
            .map(
                word =>
                    word.charAt(0)
            )
            .join("")
            .substring(0, 2)
            .toUpperCase();

    }

}


/* ==========================================
   REGISTER COMPONENT
========================================== */

customElements.define(
    "user-card",
    UserCard
);