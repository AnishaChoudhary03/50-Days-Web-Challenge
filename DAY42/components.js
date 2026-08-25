/* ==========================================
   DAY 42
   USER CARD WEB COMPONENT
========================================== */


class UserCard extends HTMLElement {


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

    }


    /* ======================================
       OBSERVED ATTRIBUTES
       BONUS
    ====================================== */

    static get observedAttributes() {

        return [
            "name",
            "role"
        ];

    }


    /* ======================================
       CONNECTED CALLBACK
    ====================================== */

    connectedCallback() {

        this.render();

    }


    /* ======================================
       ATTRIBUTE CHANGED CALLBACK
       BONUS
    ====================================== */

    attributeChangedCallback(
        name,
        oldValue,
        newValue
    ) {

        /*
         * Don't render unnecessarily
         * when the value hasn't changed.
         */

        if (
            oldValue !== newValue
        ) {

            this.render();

        }

    }


    /* ======================================
       RENDER COMPONENT
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

                :host {

                    display: block;

                }


                .card {

                    padding: 30px;

                    background: #1e293b;

                    border:
                        1px solid #334155;

                    border-radius: 18px;

                    text-align: left;

                    color: #f8fafc;

                    box-shadow:
                        0 10px 25px
                        rgba(0, 0, 0, 0.2);

                    transition:
                        transform 0.3s ease,
                        border-color 0.3s ease;

                }


                .card:hover {

                    transform:
                        translateY(-5px);

                    border-color:
                        #8b5cf6;

                }


                .avatar {

                    width: 65px;

                    height: 65px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    margin-bottom: 20px;

                    border-radius: 50%;

                    background:
                        linear-gradient(
                            135deg,
                            #8b5cf6,
                            #6366f1
                        );

                    color: white;

                    font-size: 24px;

                    font-weight: bold;

                }


                h3 {

                    margin-bottom: 8px;

                    font-size: 1.3rem;

                }


                .role {

                    color: #a78bfa;

                    font-size: 0.95rem;

                }


                .description {

                    margin-top: 15px;

                    color: #94a3b8;

                    font-size: 0.9rem;

                    line-height: 1.6;

                }

            </style>


            <div class="card">

                <div class="avatar">

                    ${this.getInitials(name)}

                </div>


                <h3>
                    ${name}
                </h3>


                <div class="role">

                    ${role}

                </div>


                <p class="description">

                    Professional contributor
                    at Synexus Core.

                </p>

            </div>

        `;

    }


    /* ======================================
       GET USER INITIALS
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
   REGISTER CUSTOM ELEMENT
========================================== */

customElements.define(
    "user-card",
    UserCard
);