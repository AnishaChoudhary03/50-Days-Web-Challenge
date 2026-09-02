/* ==========================================
   DAY 45
   CUSTOM MODAL
========================================== */


class CustomModal extends HTMLElement {


    /* ======================================
       CONSTRUCTOR
    ====================================== */

    constructor() {

        super();


        /*
         * Create Shadow DOM
         */

        this.attachShadow({
            mode: "open"
        });


        /*
         * Get the template from index.html
         */

        const template =
            document.getElementById(
                "modal-template"
            );


        /*
         * Clone the template contents
         */

        const templateContent =
            template.content.cloneNode(
                true
            );


        /*
         * Put cloned template
         * inside Shadow DOM
         */

        this.shadowRoot.appendChild(
            templateContent
        );


        /*
         * Bind close method
         */

        this.close =
            this.close.bind(this);

    }


    /* ======================================
       CONNECTED CALLBACK
    ====================================== */

    connectedCallback() {

        /*
         * Find close button
         */

        const closeButton =
            this.shadowRoot.querySelector(
                ".close-btn"
            );


        /*
         * Add click listener
         */

        closeButton.addEventListener(
            "click",
            this.close
        );

    }


    /* ======================================
       DISCONNECTED CALLBACK
    ====================================== */

    disconnectedCallback() {

        const closeButton =
            this.shadowRoot.querySelector(
                ".close-btn"
            );


        if (closeButton) {

            closeButton.removeEventListener(
                "click",
                this.close
            );

        }

    }


    /* ======================================
       CLOSE MODAL
    ====================================== */

    close() {

        this.removeAttribute(
            "open"
        );

    }

}


/* ==========================================
   REGISTER CUSTOM ELEMENT
========================================== */

customElements.define(
    "custom-modal",
    CustomModal
);