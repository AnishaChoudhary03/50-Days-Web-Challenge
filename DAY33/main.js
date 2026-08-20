/* ==========================================
   MAIN.JS
   DAY 33
========================================== */


/* ==========================================
   IMPORT MODULES
========================================== */

import {
    debounce
} from "./utils.js";


import {
    fetchUserData,
    createInitiative,
    updateInitiative,
    deleteInitiative
} from "./api.js";


/* ==========================================
   SELECT ELEMENTS
========================================== */

const usernameInput =
    document.getElementById(
        "github-username"
    );


const profileCard =
    document.getElementById(
        "dev-profile-card"
    );


const searchStatus =
    document.getElementById(
        "search-status"
    );


const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


/* ==========================================
   SEARCH DEVELOPER
========================================== */

async function searchDeveloper(
    username
) {


    /* ======================================
       EMPTY INPUT
    ====================================== */

    if (username === "") {

        profileCard.innerHTML = "";

        searchStatus.textContent = "";

        return;

    }


    /* ======================================
       LOADING
    ====================================== */

    profileCard.innerHTML = `

        <div class="loading">

            <div class="loader"></div>

            <h3>
                Loading...
            </h3>

            <p>
                Checking cache and GitHub...
            </p>

        </div>

    `;


    searchStatus.textContent =
        "Searching...";


    try {


        /* ==================================
           API MODULE
        ================================== */

        const developer =
            await fetchUserData(
                username
            );


        if (!developer) {

            return;

        }


        /* ==================================
           RENDER PROFILE
        ================================== */

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

                            <strong>
                                ${developer.public_repos}
                            </strong>

                            Repositories

                        </span>


                        <span>

                            <strong>
                                ${developer.followers}
                            </strong>

                            Followers

                        </span>


                        <span>

                            <strong>
                                ${developer.following}
                            </strong>

                            Following

                        </span>


                    </div>


                    <a
                        href="${developer.html_url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn primary-btn">

                        <i class="fab fa-github"></i>

                        View GitHub

                    </a>


                </div>

            </div>

        `;


        searchStatus.textContent =
            "Profile loaded successfully.";

    }


    catch (error) {

        profileCard.innerHTML = `

            <div class="api-error">

                <h3>
                    ⚠️ Error
                </h3>

                <p>
                    ${error.message}
                </p>

            </div>

        `;


        searchStatus.textContent =
            "Request failed.";

    }

}


/* ==========================================
   DEBOUNCE SEARCH
========================================== */

const debouncedSearch =
    debounce(
        searchDeveloper,
        500
    );


/* ==========================================
   INPUT EVENT
========================================== */

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
   TEST MODULE
========================================== */

console.log(
    "Day 33 application loaded."
);

console.log(
    "Client-side cache enabled."
);