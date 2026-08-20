/* ==========================================
   MAIN.JS
   DAY 34
========================================== */


/* ==========================================
   IMPORTS
========================================== */

import {
    debounce
} from "./utils.js";


import {
    fetchUserData
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


const searchStatus =
    document.getElementById(
        "search-status"
    );


const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


/* ==========================================
   SEARCH FUNCTION
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
       LOADING UI
    ====================================== */

    profileCard.innerHTML = `

        <div class="loading">

            <div class="loader"></div>

            <h3>
                Loading...
            </h3>

            <p>
                Requesting developer data.
            </p>

        </div>

    `;


    searchStatus.textContent =
        "Checking network...";


    try {


        /* ==================================
           API REQUEST
        ================================== */

        const developer =
            await fetchUserData(
                username
            );


        if (!developer) {

            return;

        }


        /* ==================================
           DISPLAY PROFILE
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

                            ${
                                developer.public_repos
                            }

                            Repositories

                        </span>


                        <span>

                            ${
                                developer.followers
                            }

                            Followers

                        </span>


                        <span>

                            ${
                                developer.following
                            }

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
            "✓ Data loaded successfully.";

    }


    catch (error) {


        profileCard.innerHTML = `

            <div class="api-error">

                <h3>
                    ⚠️ Request Failed
                </h3>

                <p>
                    ${error.message}
                </p>

            </div>

        `;


        searchStatus.textContent =
            "Unable to complete request.";

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
   ONLINE / OFFLINE EVENTS
========================================== */

window.addEventListener(
    "offline",
    () => {

        searchStatus.textContent =
            "⚠️ You are currently offline.";

    }
);


window.addEventListener(
    "online",
    () => {

        searchStatus.textContent =
            "✓ Internet connection restored.";

    }
);


/* ==========================================
   START APPLICATION
========================================== */

console.log(
    "Day 34 - Network Resilience loaded."
);

console.log(
    "Exponential backoff enabled."
);