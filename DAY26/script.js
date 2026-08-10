/* ==========================================
   SYNEXUS CORE
   DAY 24 - GITHUB API
========================================== */


/* ==========================================
   SELECT ELEMENTS
========================================== */

const usernameInput =
    document.getElementById("github-username");

const searchButton =
    document.getElementById("search-dev-btn");

const profileCard =
    document.getElementById("dev-profile-card");

const searchStatus =
    document.getElementById("search-status");

const themeToggle =
    document.getElementById("theme-toggle");


/* ==========================================
   GITHUB API FUNCTION
========================================== */

async function getDeveloperProfile(username) {

    try {

        /* ==================================
           LOADING STATE
        ================================== */

        profileCard.innerHTML = `

            <div class="loading">

                <div class="loader"></div>

                <h3>
                    Fetching data...
                </h3>

                <p>
                    Please wait while we contact
                    the GitHub API.
                </p>

            </div>

        `;

        searchStatus.textContent =
            "Fetching GitHub profile...";


        /* ==================================
           FETCH DATA
        ================================== */

        const response = await fetch(
            `https://api.github.com/users/${username}`
        );


        /* ==================================
           ERROR GATEKEEPING
        ================================== */

        if (!response.ok) {

            throw new Error(
                `GitHub user "${username}" was not found.`
            );

        }


        /* ==================================
           PARSE JSON
        ================================== */

        const data =
            await response.json();


        /* ==================================
           RENDER PROFILE
        ================================== */

        profileCard.innerHTML = `

            <div class="developer-card">

                <img
                    src="${data.avatar_url}"
                    alt="GitHub avatar of ${
                        data.name || data.login
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


                    <p class="github-username">

                        @${data.login}

                    </p>


                    <p class="developer-bio">

                        ${
                            data.bio ||
                            "This developer has not added a bio yet."
                        }

                    </p>


                    <div class="developer-stats">

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

                        <i class="fab fa-github"></i>

                        View GitHub Profile

                    </a>

                </div>

            </div>

        `;


        searchStatus.textContent =
            "Developer profile loaded successfully.";

    }


    /* ======================================
       ERROR HANDLING
    ====================================== */

    catch (error) {

        profileCard.innerHTML = `

            <div class="api-error">

                <h3>
                    ⚠️ Unable to fetch profile
                </h3>

                <p>

                    ${error.message}

                </p>

                <p>

                    Please check the username
                    and try again.

                </p>

            </div>

        `;

        searchStatus.textContent =
            "Something went wrong.";

        console.error(
            "GitHub API Error:",
            error
        );

    }

}


/* ==========================================
   SEARCH BUTTON
========================================== */

searchButton.addEventListener(
    "click",
    () => {

        const username =
            usernameInput.value.trim();


        /* ==================================
           EMPTY INPUT
        ================================== */

        if (username === "") {

            profileCard.innerHTML = `

                <div class="api-error">

                    <h3>
                        ⚠️ Username Required
                    </h3>

                    <p>

                        Please enter a GitHub
                        username.

                    </p>

                </div>

            `;

            searchStatus.textContent = "";

            usernameInput.focus();

            return;

        }


        /* ==================================
           CALL ASYNC FUNCTION
        ================================== */

        getDeveloperProfile(username);

    }
);


/* ==========================================
   ENTER KEY SEARCH
========================================== */

usernameInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            searchButton.click();

        }

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

    themeToggle.textContent = "☀️";

}


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-theme"
        );


        const darkMode =
            document.body.classList.contains(
                "dark-theme"
            );


        if (darkMode) {

            localStorage.setItem(
                "theme",
                "dark"
            );

            themeToggle.textContent = "☀️";

        }

        else {

            localStorage.setItem(
                "theme",
                "light"
            );

            themeToggle.textContent = "🌙";

        }

    }
);


/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log(
    "Day 24 - GitHub API Project Loaded"
);

console.log(
    "Using async / await + fetch()"
);
