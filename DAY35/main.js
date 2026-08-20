/* ==========================================
   MAIN.JS
   DAY 35
========================================== */


/* ==========================================
   IMPORT
========================================== */

import {
    secureDeleteResource
} from "./api.js";


/* ==========================================
   DOM ELEMENTS
========================================== */

const deleteButton =
    document.getElementById(
        "secure-delete-btn"
    );


const message =
    document.getElementById(
        "security-message"
    );


const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


/* ==========================================
   SECURE DELETE EVENT
========================================== */

deleteButton.addEventListener(
    "click",
    async () => {


        const confirmed =
            window.confirm(
                "Are you sure you want to delete resource #1?"
            );


        if (!confirmed) {

            return;

        }


        /* ==================================
           DISABLE BUTTON
        ================================== */

        deleteButton.disabled = true;

        deleteButton.innerHTML = `

            <i class="fas fa-spinner fa-spin"></i>

            Deleting...

        `;


        message.textContent = "";

        message.className =
            "message";


        try {


            /* ==============================
               SECURE API CALL
            ============================== */

            const result =
                await secureDeleteResource(
                    1
                );


            console.log(
                "Delete response:",
                result
            );


            /* ==============================
               SUCCESS
            ============================== */

            message.textContent =
                "✅ Resource deleted successfully.";

            message.className =
                "message success";

        }


        catch (error) {


            console.error(
                "Secure DELETE error:",
                error
            );


            /* ==============================
               ERROR
            ============================== */

            message.textContent =
                "❌ " + error.message;

            message.className =
                "message error";

        }


        finally {


            /* ==============================
               RESTORE BUTTON
            ============================== */

            deleteButton.disabled = false;

            deleteButton.innerHTML = `

                <i class="fas fa-trash"></i>

                Secure Delete

            `;

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


if (
    savedTheme === "dark"
) {

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
    "Day 35 - API Security loaded."
);

console.log(
    "Bearer token authentication enabled."
);