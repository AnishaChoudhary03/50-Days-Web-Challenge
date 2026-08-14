


/* ==========================================
   SELECT ELEMENTS
========================================== */

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
   API URL
========================================== */

const API_URL =
    "https://jsonplaceholder.typicode.com/posts";


/* ==========================================
   POST - CREATE
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

            proposalMessage.className =
                "proposal-message error";

            proposalMessage.textContent =
                "Please fill in all fields.";

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

            const response =
                await fetch(
                    API_URL,
                    {

                        method: "POST",

                        headers: {

                            "Content-type":
                                "application/json; charset=UTF-8"

                        },

                        body:
                            JSON.stringify(
                                newInitiative
                            )

                    }
                );


            if (response.status !== 201) {

                throw new Error(
                    "Failed to create proposal."
                );

            }


            const data =
                await response.json();


            console.log(
                "Created Proposal:",
                data
            );


            proposalMessage.className =
                "proposal-message success";

            proposalMessage.textContent =
                "✅ Proposal created successfully!";


            proposalForm.reset();

        }


        catch (error) {

            proposalMessage.className =
                "proposal-message error";

            proposalMessage.textContent =
                "❌ " + error.message;

            console.error(error);

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
   PUT - UPDATE
========================================== */

async function updateInitiative(id) {

    try {

        /*
           Updated proposal data.
        */

        const updatedInitiative = {

            id: id,

            title:
                "Technical Initiative [UPDATED]",

            body:
                "This initiative has been updated successfully.",

            userId: 1

        };


        /* ==================================
           PUT REQUEST
        ================================== */

        const response =
            await fetch(
                API_URL + "/" + id,
                {

                    method: "PUT",

                    headers: {

                        "Content-type":
                            "application/json; charset=UTF-8"

                    },

                    body:
                        JSON.stringify(
                            updatedInitiative
                        )

                }
            );


        /* ==================================
           CHECK RESPONSE
        ================================== */

        if (!response.ok) {

            throw new Error(
                "Failed to update proposal."
            );

        }


        /* ==================================
           PARSE RESPONSE
        ================================== */

        const data =
            await response.json();


        /* ==================================
           LOG SERVER RESPONSE
        ================================== */

        console.log(
            "Updated Proposal:",
            data
        );


        manageMessage.textContent =
            "✅ Proposal updated successfully!";


        manageMessage.style.color =
            "var(--success)";

    }


    catch (error) {

        manageMessage.textContent =
            "❌ " + error.message;


        manageMessage.style.color =
            "var(--danger)";


        console.error(
            "PUT Error:",
            error
        );

    }

}


/* ==========================================
   DELETE - DESTROY
========================================== */

async function deleteInitiative(id) {

    try {

        /* ==================================
           DELETE REQUEST
        ================================== */

        const response =
            await fetch(
                API_URL + "/" + id,
                {

                    method: "DELETE"

                }
            );


        /* ==================================
           CHECK RESPONSE
        ================================== */

        if (!response.ok) {

            throw new Error(
                "Failed to delete proposal."
            );

        }


        /* ==================================
           SERVER RESPONSE
        ================================== */

        const data =
            await response.json();


        console.log(
            "Delete Response:",
            data
        );


        /* ==================================
           SUCCESS MESSAGE
        ================================== */

        manageMessage.textContent =
            "✅ Proposal deleted successfully!";


        manageMessage.style.color =
            "var(--success)";

    }


    catch (error) {

        manageMessage.textContent =
            "❌ " + error.message;


        manageMessage.style.color =
            "var(--danger)";


        console.error(
            "DELETE Error:",
            error
        );

    }

}


/* ==========================================
   UPDATE BUTTON
========================================== */

updateButton.addEventListener(
    "click",
    () => {

        /*
           Hardcoded ID as required
           by the assignment.
        */

        const id = 1;

        updateInitiative(id);

    }
);


/* ==========================================
   DELETE BUTTON
========================================== */

deleteButton.addEventListener(
    "click",
    () => {

        const id = 1;


        /* ==================================
           CONFIRMATION
        ================================== */

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this initiative? This action cannot be undone."
            );


        if (!confirmed) {

            return;

        }


        deleteInitiative(id);

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


        if (isDark) {

            localStorage.setItem(
                "theme",
                "dark"
            );

            themeToggle.textContent =
                "☀️";

        }

        else {

            localStorage.setItem(
                "theme",
                "light"
            );

            themeToggle.textContent =
                "🌙";

        }

    }
);


/* ==========================================
   CONSOLE
========================================== */

console.log(
    "Day 27 - PUT & DELETE CRUD Project"
);

console.log(
    "POST: Create"
);

console.log(
    "GET: Read"
);

console.log(
    "PUT: Update"
);

console.log(
    "DELETE: Destroy"
);
