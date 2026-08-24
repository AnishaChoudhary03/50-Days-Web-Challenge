import {
    createInitiative
} from "./api.js";

import {
    getOfflineData
} from "./db.js";


const form = document.getElementById(
    "proposal-form"
);

const titleInput = document.getElementById(
    "title"
);

const descriptionInput = document.getElementById(
    "description"
);

const message = document.getElementById(
    "message"
);

const showOfflineButton = document.getElementById(
    "show-offline-btn"
);

const offlineDataContainer = document.getElementById(
    "offline-data"
);


/* SUBMIT PROPOSAL */

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const payload = {

            title: titleInput.value.trim(),

            body: descriptionInput.value.trim(),

            userId: 1,

            savedAt: new Date().toLocaleString()

        };


        message.textContent =
            "Submitting proposal...";


        try {

            const result =
                await createInitiative(payload);


            if (result.offline) {

                message.textContent =
                    "You are offline. Proposal saved locally!";

            }

            else {

                message.textContent =
                    "Proposal submitted successfully!";

            }


            form.reset();


        }

        catch (error) {

            console.error(error);

            message.textContent =
                "Something went wrong.";

        }

    }
);


/* SHOW OFFLINE DATA */

showOfflineButton.addEventListener(
    "click",
    async function () {

        try {

            const proposals =
                await getOfflineData();


            offlineDataContainer.innerHTML = "";


            if (proposals.length === 0) {

                offlineDataContainer.innerHTML =
                    "<p>No offline proposals found.</p>";

                return;

            }


            proposals.forEach(function (proposal) {

                offlineDataContainer.innerHTML += `

                    <div class="offline-card">

                        <h3>
                            ${proposal.title}
                        </h3>

                        <p>
                            ${proposal.body}
                        </p>

                        <br>

                        <small>
                            Saved: ${proposal.savedAt}
                        </small>

                    </div>

                `;

            });


        }

        catch (error) {

            console.error(error);

        }

    }
);


/* CHECK WHEN USER RETURNS ONLINE */

window.addEventListener(
    "online",
    async function () {

        console.log(
            "Internet connection restored!"
        );


        const offlineData =
            await getOfflineData();


        console.log(
            "Saved offline proposals:",
            offlineData
        );

    }
);


/* CHECK WHEN USER GOES OFFLINE */

window.addEventListener(
    "offline",
    function () {

        console.log(
            "You are currently offline."
        );

        message.textContent =
            "You are offline. New proposals will be saved locally.";

    }
);