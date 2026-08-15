/* ==========================================
   MAIN.JS
========================================== */


/* ==========================================
   IMPORT MODULES
========================================== */

import {
    debounce
} from "./utils.js";


import {
    fetchContributor,
    createInitiative,
    updateInitiative,
    deleteInitiative
} from "./api.js";


/* ==========================================
   DOM ELEMENTS
========================================== */

const usernameInput =
    document.getElementById(
        "github-username"
    );

const profileCard =
    document.getElementById(
        "dev-profile-card"
    );


const proposalForm =
    document.getElementById(
        "proposal-form"
    );

const titleInput =
    document.getElementById(
        "proposal-title"
    );

const descriptionInput =
    document.getElementById(
        "proposal-description"
    );

const submitButton =
    document.getElementById(
        "submit-proposal"
    );

const proposalMessage =
    document.getElementById(
        "proposal-message"
    );


const updateButton =
    document.getElementById(
        "update-btn"
    );

const deleteButton =
    document.getElementById(
        "delete-btn"
    );

const manageMessage =
    document.getElementById(
        "manage-message"
    );


const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


/* ==========================================
   GITHUB SEARCH
========================================== */

async function searchDeveloper(
    username
) {

    if (username === "") {

        profileCard.innerHTML = "";

        return;

    }


    profileCard.innerHTML = `

        <div class="loading">

            <h3>
                Loading...
            </h3>

            <p>
                Fetching GitHub developer.
            </p>

        </div>

    `;


    try {

        const developer =
            await fetchContributor(
                username
            );


        if (!developer) {
            return;
        }


        profileCard.innerHTML = `

            <div class="developer-card">

                <img
                    src="${developer.avatar_url}"
                    alt="${developer.login}"
                    class="developer-avatar"
                >


                <div class="developer-info">

                    <h3>

                        ${
                            developer.name ||
                            developer.login
                        }

                    </h3>


                    <p class="username">

                        @${developer.login}

                    </p>


                    <p class="bio">

                        ${
                            developer.bio ||
                            "No bio available."
                        }

                    </p>


                    <div class="stats">

                        <span>

                            ${developer.public_repos}
                            Repositories

                        </span>

                        <span>

                            ${developer.followers}
                            Followers

                        </span>

                        <span>

                            ${developer.following}
                            Following

                        </span>

                    </div>


                    <a
                        href="${developer.html_url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn primary-btn">

                        View GitHub

                    </a>

                </div>

            </div>

        `;

    }


    catch (error) {

        profileCard.innerHTML = `

            <div class="api-error">

                <h3>
                    Search Error
                </h3>

                <p>
                    ${error.message}
                </p>

            </div>

        `;

    }

}


/* ==========================================
   DEBOUNCED SEARCH
========================================== */

const debouncedSearch =
    debounce(
        searchDeveloper,
        500
    );


usernameInput.addEventListener(
    "input",
    (event) => {

        const username =
            event.target.value.trim();

        debouncedSearch(
            username
        );

    }
);


/* ==========================================
   CREATE PROPOSAL
========================================== */

proposalForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const title =
            titleInput.value.trim();

        const description =
            descriptionInput.value.trim();


        if (
            title === "" ||
            description === ""
        ) {

            proposalMessage.textContent =
                "Please fill in all fields.";

            proposalMessage.className =
                "message error";

            return;

        }


        const newInitiative = {

            title: title,

            body: description,

            userId: 1

        };


        submitButton.disabled = true;

        submitButton.textContent =
            "Submitting...";


        try {

            const result =
                await createInitiative(
                    newInitiative
                );


            console.log(
                "Created:",
                result
            );


            proposalMessage.textContent =
                "Initiative submitted successfully!";


            proposalMessage.className =
                "message success";


            proposalForm.reset();

        }


        catch (error) {

            proposalMessage.textContent =
                error.message;


            proposalMessage.className =
                "message error";

        }


        finally {

            submitButton.disabled = false;

            submitButton.innerHTML = `

                <i class="fas fa-paper-plane"></i>

                Submit Proposal

            `;

        }

    }
);


/* ==========================================
   UPDATE
========================================== */

updateButton.addEventListener(
    "click",
    async () => {

        const id = 1;


        try {

            const result =
                await updateInitiative(
                    id
                );


            console.log(
                "Updated:",
                result
            );


            manageMessage.textContent =
                "Proposal updated successfully!";


            manageMessage.className =
                "message success";

        }


        catch (error) {

            manageMessage.textContent =
                error.message;


            manageMessage.className =
                "message error";

        }

    }
);


/* ==========================================
   DELETE
========================================== */

deleteButton.addEventListener(
    "click",
    async () => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this initiative? This action cannot be undone."
            );


        if (!confirmed) {

            return;

        }


        try {

            const result =
                await deleteInitiative(
                    1
                );


            console.log(
                "Deleted:",
                result
            );


            manageMessage.textContent =
                "Proposal deleted successfully!";


            manageMessage.className =
                "message success";

        }


        catch (error) {

            manageMessage.textContent =
                error.message;


            manageMessage.className =
                "message error";

        }

    }
);


/* ==========================================
   DARK MODE
========================================== */

const savedTheme =
    localStorage.getItem(
        "theme"
    );


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-theme"
    );

    themeToggle.textContent =
        "☀️";

}


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-theme"
        );


        const isDark =
            document.body.classList.contains(
                "dark-theme"
            );


        localStorage.setItem(
            "theme",
            isDark
                ? "dark"
                : "light"
        );


        themeToggle.textContent =
            isDark
                ? "☀️"
                : "🌙";

    }
);


/* ==========================================
   APPLICATION START
========================================== */

console.log(
    "Day 32 application initialized."
);

console.log(
    "ES6 Modules successfully loaded."
);
