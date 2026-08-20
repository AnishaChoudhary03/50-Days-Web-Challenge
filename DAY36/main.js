/* ==========================================
   MAIN.JS
   DAY 36
   DEEP LINKING
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


const urlStatus =
    document.getElementById(
        "url-status"
    );


const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


/* ==========================================
   SEARCH FUNCTION
========================================== */

async function searchDeveloper(
    username,
    updateURL = true
) {

    username =
        username.trim();


    /* ======================================
       EMPTY INPUT
    ====================================== */

    if (username === "") {

        profileCard.innerHTML = "";


        urlStatus.textContent = "";


        /* ==================================
           REMOVE USER FROM URL
           BONUS
        ================================== */

        if (updateURL) {

            const url =
                new URL(
                    window.location
                );


            url.searchParams.delete(
                "user"
            );


            window.history.pushState(
                {},
                "",
                url
            );

        }


        return;

    }


    /* ======================================
       UPDATE INPUT
    ====================================== */

    usernameInput.value =
        username;


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
                Fetching GitHub profile.
            </p>

        </div>

    `;


    urlStatus.textContent =
        "Loading profile...";


    try {


        /* ==================================
           FETCH PROFILE
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


        urlStatus.textContent =
            "✓ Profile loaded";


        /* ==================================
           SYNC URL
           WRITE STATE
        ================================== */

        if (updateURL) {

            const url =
                new URL(
                    window.location
                );


            url.searchParams.set(
                "user",
                username
            );


            window.history.pushState(
                {},
                "",
                url
            );


            console.log(
                "URL updated:",
                url.toString()
            );

        }

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


        urlStatus.textContent =
            "Unable to load profile.";

    }

}


/* ==========================================
   DEBOUNCED SEARCH
========================================== */

const debouncedSearch =
    debounce(
        (username) => {

            searchDeveloper(
                username,
                true
            );

        },
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
   URL STATE HYDRATION
========================================== */

function initializeFromURL() {


    /* ======================================
       READ CURRENT URL
    ====================================== */

    const params =
        new URLSearchParams(
            window.location.search
        );


    /* ======================================
       GET USER PARAMETER
    ====================================== */

    const username =
        params.get(
            "user"
        );


    /* ======================================
       RESTORE APPLICATION STATE
    ====================================== */

    if (username) {

        console.log(
            "Hydrating state from URL:",
            username
        );


        searchDeveloper(
            username,
            false
        );

    }

}


/* ==========================================
   INITIALIZE APPLICATION
========================================== */

initializeFromURL();


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
   BROWSER BACK/FORWARD SUPPORT
========================================== */

window.addEventListener(
    "popstate",
    () => {

        initializeFromURL();

    }
);


/* ==========================================
   APPLICATION START
========================================== */

console.log(
    "Day 36 - Deep Linking loaded."
);