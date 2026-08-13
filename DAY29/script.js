


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

const message =
    document.getElementById(
        "proposal-message"
    );

const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


/* ==========================================
   POST INITIATIVE FUNCTION
========================================== */

async function submitInitiative(
    newInitiative
) {

    /*
       BONUS:
       Disable button while request
       is being processed.
    */

    submitButton.disabled = true;

    submitButton.innerHTML = `

        <i class="fas fa-spinner fa-spin"></i>

        Submitting...

    `;


    message.className =
        "proposal-message";

    message.textContent = "";


    try {

        /* ==================================
           POST REQUEST
        ================================== */

        const response = await fetch(

            "https://jsonplaceholder.typicode.com/posts",

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


        /* ==================================
           CHECK RESPONSE
        ================================== */

        if (response.status !== 201) {

            throw new Error(
                "Failed to submit initiative."
            );

        }


        /* ==================================
           PARSE SERVER RESPONSE
        ================================== */

        const data =
            await response.json();


        console.log(
            "Server Response:",
            data
        );


        /* ==================================
           SUCCESS MESSAGE
        ================================== */

        message.className =
            "proposal-message success";

        message.textContent =
            "✅ Initiative submitted successfully!";


        /* ==================================
           RESET FORM
        ================================== */

        proposalForm.reset();

    }


    catch (error) {

        /* ==================================
           ERROR MESSAGE
        ================================== */

        message.className =
            "proposal-message error";

        message.textContent =
            "❌ " + error.message;


        console.error(
            "POST Request Error:",
            error
        );

    }


    finally {

        /*
           ALWAYS re-enable button,
           whether request succeeds
           or fails.
        */

        submitButton.disabled = false;

        submitButton.innerHTML = `

            <i class="fas fa-paper-plane"></i>

            Submit Proposal

        `;

    }

}


/* ==========================================
   FORM SUBMIT EVENT
========================================== */

proposalForm.addEventListener(
    "submit",
    (event) => {

        /*
           Prevent normal form submission
           and page reload.
        */

        event.preventDefault();


        /* ==================================
           EXTRACT FORM VALUES
        ================================== */

        const title =
            titleInput.value.trim();

        const description =
            descriptionInput.value.trim();


        /* ==================================
           BASIC VALIDATION
        ================================== */

        if (
            title === "" ||
            description === ""
        ) {

            message.className =
                "proposal-message error";

            message.textContent =
                "❌ Please fill in all fields.";

            return;

        }


        /* ==================================
           CONSTRUCT PAYLOAD
        ================================== */

        const newInitiative = {

            title: title,

            body: description,

            userId: 1

        };


        console.log(
            "Sending Payload:",
            newInitiative
        );


        /* ==================================
           SEND POST REQUEST
        ================================== */

        submitInitiative(
            newInitiative
        );

    }
);


/* ==========================================
   DARK MODE
========================================== */

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-theme"
    );

    themeToggle.textContent = "☀️";

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
    "Day 26 - POST Request Project Loaded"
);

console.log(
    "HTTP Method: POST"
);

console.log(
    "Content-Type: application/json"
);

console.log(
    "JSON.stringify(): Enabled"
);
