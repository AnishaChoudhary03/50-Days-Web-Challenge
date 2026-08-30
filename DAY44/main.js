/* ==========================================
   DAY 44
   MAIN.JS
========================================== */


/*
 * Import the global store.
 */

import {
    globalStore
} from "./core/store.js";


/*
 * Import and register the
 * custom components.
 */

import "./components/CartCounter.js";

import "./components/ProductButton.js";


/* ==========================================
   DEBUG GLOBAL STATE
========================================== */

globalStore.subscribe(
    state => {

        console.log(
            "Global State:",
            state
        );

    }
);


console.log(
    "Day 44 - Reactive Web Components loaded."
);