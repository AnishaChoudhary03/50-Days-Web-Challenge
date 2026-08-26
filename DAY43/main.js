/* ==========================================
   DAY 43
   MAIN.JS
========================================== */


/* ==========================================
   IMPORT GLOBAL STORE
========================================== */

import {
    globalStore
} from "./core/store.js";


/*
 * Import Web Component.
 */

import "./components/UserCard.js";


/* ==========================================
   DOM ELEMENTS
========================================== */

const addCartButton =
    document.getElementById(
        "add-cart"
    );


const removeCartButton =
    document.getElementById(
        "remove-cart"
    );


const toggleThemeButton =
    document.getElementById(
        "toggle-theme"
    );


const cartCount =
    document.getElementById(
        "cart-count"
    );


const themeValue =
    document.getElementById(
        "theme-value"
    );


/* ==========================================
   SUBSCRIBE MAIN UI
========================================== */

globalStore.subscribe(
    state => {

        /*
         * Update cart count.
         */

        cartCount.textContent =
            state.cartCount;


        /*
         * Update theme text.
         */

        themeValue.textContent =
            state.userTheme;


        console.log(
            "Global state updated:",
            state
        );

    }
);


/* ==========================================
   ADD CART
========================================== */

addCartButton.addEventListener(
    "click",
    () => {

        const currentState =
            globalStore.getState();


        globalStore.setState({

            cartCount:
                currentState.cartCount + 1

        });

    }
);


/* ==========================================
   REMOVE CART
========================================== */

removeCartButton.addEventListener(
    "click",
    () => {

        const currentState =
            globalStore.getState();


        if (
            currentState.cartCount <= 0
        ) {

            return;

        }


        globalStore.setState({

            cartCount:
                currentState.cartCount - 1

        });

    }
);


/* ==========================================
   TOGGLE THEME
========================================== */

toggleThemeButton.addEventListener(
    "click",
    () => {

        const currentState =
            globalStore.getState();


        const newTheme =
            currentState.userTheme ===
            "light"

                ? "dark"

                : "light";


        globalStore.setState({

            userTheme:
                newTheme

        });


        /*
         * Update actual page theme.
         */

        document.body.classList.toggle(
            "dark-theme",
            newTheme === "dark"
        );

    }
);


/* ==========================================
   INITIAL STATE
========================================== */

const initialState =
    globalStore.getState();


cartCount.textContent =
    initialState.cartCount;


themeValue.textContent =
    initialState.userTheme;


console.log(
    "Day 43 - Global State Management loaded."
);