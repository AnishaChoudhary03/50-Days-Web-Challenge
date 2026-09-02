/* ==========================================
   DAY 45
   MAIN.JS
========================================== */


/*
 * Import Custom Modal.
 */

import "./components/CustomModal.js";


/* ==========================================
   GET ELEMENTS
========================================== */

const warningButton =
    document.getElementById(
        "warning-btn"
    );


const successButton =
    document.getElementById(
        "success-btn"
    );


const warningModal =
    document.getElementById(
        "warning-modal"
    );


const successModal =
    document.getElementById(
        "success-modal"
    );


/* ==========================================
   OPEN WARNING MODAL
========================================== */

warningButton.addEventListener(
    "click",
    () => {

        warningModal.setAttribute(
            "open",
            ""
        );

    }
);


/* ==========================================
   OPEN SUCCESS MODAL
========================================== */

successButton.addEventListener(
    "click",
    () => {

        successModal.setAttribute(
            "open",
            ""
        );

    }
);


/* ==========================================
   ESCAPE KEY
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            warningModal
                .removeAttribute(
                    "open"
                );


            successModal
                .removeAttribute(
                    "open"
                );

        }

    }
);


console.log(
    "Day 45 - Templates & Slots loaded."
);