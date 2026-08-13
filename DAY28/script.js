

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


/* =========================================
   DEBOUNCE FUNCTION
========================================== */

/*
   Debounce waits until the user stops
   typing before executing the function.
*/

function debounce(func, delay) {

    let timeout;

    return function (...args) {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            func.apply(this, args);

        }, delay);

    };

}


/* ==========================================
   ABORT CONTROLLER
========================================== */

/*
   Stores the current API request.

   If a new search starts while an old
   request is still running, the old
   request will be cancelled.
*/

let controller = null;


/* ==========================================
   FETCH CONTRIBUTOR
========================================== */

async function fetchContributor(username) {


    /* ======================================
       EMPTY INPUT
    ====================================== */

    if (username === "") {

        profileCard.innerHTML = "";

        searchStatus.textContent = "";

        return;

    }


    /* ======================================
       CANCEL PREVIOUS REQUEST
    ====================================== */

    if (controller) {

        controller.abort();

    }


    controller =
        new AbortController();


    try {


        /* ==================================
           LOADING STATE
        ================================== */

        profileCard.innerHTML = `

            <div class="loading">

                <div class="loader"></div>

                <h3>
                    Fetching developer...
                </h3>

                <p>
                    Please wait while we
                    contact GitHub.
                </p>

            </div>

        `;


        searchStatus.textContent =
            "Searching GitHub...";


        /* ==================================
           FETCH API
        ================================== */

        const response = await fetch(

            `https://api.github.com/users/${username}`,

            {
                signal:
                    controller.signal
            }

        );


        /* ==================================
           404 ERROR
        ================================== */

        if (response.status === 404) {

            throw new Error(
                "GitHub user not found."
            );

        }


        /* ==================================
           RATE LIMIT ERROR
        ================================== */

        else if (
            response.status === 403 ||
            response.status === 429
        ) {

            throw new Error(
                "API Rate Limit exceeded. Please wait a moment."
            );

        }


        /* ==================================
           OTHER HTTP ERRORS
        ================================== */

        else if (!response.ok) {

            throw new Error(
                "Unable to fetch GitHub profile."
            );

        }


        /* ==================================
           PARSE JSON
        ================================== */

        const data =
            await response.json();


        /* ==================================
           RENDER DATA
        ================================== */

        profileCard.innerHTML = `

            <div class="developer-card">


                <img
                    src="${data.avatar_url}"
                    alt="${
                        data.name ||
                        data.login
                    }"
                    class="developer-avatar"
                >


                <div class="developer-info">


                    <h3>

                        ${
                            data.name ||
                            data.login
                        }

                    </h3>


                    <p
                        class="github-username">

                        @${data.login}

                    </p>


                    <p
                        class="developer-bio">

                        ${
                            data.bio ||
                            "No bio available."
                        }

                    </p>


                    <div
                        class="developer-stats">


                        <span>

                            <strong>
                                ${data.public_repos}
                            </strong>

                            Repositories

                        </span>


                        <span>

                            <strong>
                                ${data.followers}
                            </strong>

                            Followers

                        </span>


                        <span>

                            <strong>
                                ${data.following}
                            </strong>

                            Following

                        </span>


                    </div>


                    <a
                        href="${data.html_url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn primary-btn">

                        <i
                            class="fab fa-github">
                        </i>

                        View GitHub Profile

                    </a>


                </div>

            </div>

        `;


        searchStatus.textContent =
            "Profile loaded successfully.";

    }


    /* ======================================
       ERROR HANDLING
    ====================================== */

    catch (error) {


        /* ==============================
           IGNORE ABORTED REQUESTS
        ============================== */

        if (
            error.name ===
            "AbortError"
        ) {

            return;

        }


        /* ==============================
           SHOW ERROR
        ============================== */

        profileCard.innerHTML = `

            <div class="api-error">

                <h3>
                    ⚠️ Search Error
                </h3>

                <p>
                    ${error.message}
                </p>

            </div>

        `;


        searchStatus.textContent =
            "Unable to complete the search.";


        console.error(
            "GitHub API Error:",
            error
        );

    }

}


/* ==========================================
   CREATE DEBOUNCED FUNCTION
========================================== */

const debouncedSearch =
    debounce(
        fetchContributor,
        500
    );


/* ==========================================
   REAL-TIME INPUT EVENT
========================================== */

usernameInput.addEventListener(
    "input",
    (event) => {

        const username =
            event.target.value.trim();

        debouncedSearch(username);

    }
);


/* ==========================================
   THEME TOGGLE
========================================== */

const savedTheme =
    localStorage.getItem("theme");


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
    "Day 25: Real-Time GitHub Search"
);

console.log(
    "Debounce: 500ms"
);

console.log(
    "AbortController: Enabled"
);
