/* ==========================================
   SYNEXUS CORE
   DAY 25
   GITHUB REPOSITORY API
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

const reposGrid =
    document.getElementById("repos-grid");

const searchStatus =
    document.getElementById("search-status");

const themeToggle =
    document.getElementById("theme-toggle");


/* ==========================================
   GET DEVELOPER PROFILE
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
                    Fetching developer...
                </h3>

                <p>
                    Please wait.
                </p>

            </div>

        `;


        reposGrid.innerHTML = "";


        searchStatus.textContent =
            "Fetching GitHub profile...";


        /* ==================================
           FETCH PROFILE
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


                    <p class="github-username">

                        @${data.login}

                    </p>


                    <p class="developer-bio">

                        ${
                            data.bio ||
                            "No bio available."
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
            "Profile loaded. Fetching repositories...";


        /* ==================================
           CHAIN REPOSITORY REQUEST
        ================================== */

        await fetchRepositories(username);

    }

    catch (error) {

        profileCard.innerHTML = `

            <div class="api-error">

                <h3>
                    ⚠️ Unable to fetch profile
                </h3>

                <p>
                    ${error.message}
                </p>

            </div>

        `;


        reposGrid.innerHTML = "";


        searchStatus.textContent =
            "Request failed.";


        console.error(
            "Profile API Error:",
            error
        );

    }

}


/* ==========================================
   FETCH REPOSITORIES
========================================== */

async function fetchRepositories(username) {

    try {

        /* ==================================
           CLEAR OLD RESULTS
        ================================== */

        reposGrid.innerHTML = "";


        /* ==================================
           LOADING STATE
        ================================== */

        reposGrid.innerHTML = `

            <div class="loading repo-empty">

                <div class="loader"></div>

                <p>
                    Fetching repositories...
                </p>

            </div>

        `;


        /* ==================================
           FETCH REPOSITORIES
        ================================== */

        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
        );


        /* ==================================
           ERROR CHECK
        ================================== */

        if (!response.ok) {

            throw new Error(
                "Unable to fetch repositories."
            );

        }


        /* ==================================
           PARSE JSON ARRAY
        ================================== */

        const data =
            await response.json();


        /* ==================================
           CLEAR LOADING STATE
        ================================== */

        reposGrid.innerHTML = "";


        /* ==================================
           EMPTY STATE
        ================================== */

        if (data.length === 0) {

            reposGrid.innerHTML = `

                <div class="repo-empty">

                    <i
                        class="fab fa-github"
                        style="font-size: 40px;">
                    </i>

                    <h3>

                        No public repositories found.

                    </h3>

                </div>

            `;

            return;

        }


        /* ==================================
           LOOP THROUGH REPOSITORIES
        ================================== */

        data.forEach(repo => {

            reposGrid.innerHTML += `

                <div class="repo-card">

                    <h3>

                        ${repo.name}

                    </h3>


                    <p>

                        ${
                            repo.description ||
                            "No description provided."
                        }

                    </p>


                    <a
                        href="${repo.html_url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="repo-link">

                        <i class="fab fa-github"></i>

                        View Repository

                    </a>

                </div>

            `;

        });


        searchStatus.textContent =
            "Profile and repositories loaded successfully.";

    }

    catch (error) {

        reposGrid.innerHTML = `

            <div class="repo-error">

                <h3>
                    ⚠️ Repository Error
                </h3>

                <p>
                    ${error.message}
                </p>

            </div>

        `;

        console.error(
            "Repository API Error:",
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


        if (username === "") {

            profileCard.innerHTML = `

                <div class="api-error">

                    <h3>
                        ⚠️ Username Required
                    </h3>

                    <p>
                        Please enter a GitHub username.
                    </p>

                </div>

            `;


            reposGrid.innerHTML = "";

            searchStatus.textContent = "";

            usernameInput.focus();

            return;

        }


        getDeveloperProfile(username);

    }
);


/* ==========================================
   ENTER KEY
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


        const isDark =
            document.body.classList.contains(
                "dark-theme"
            );


        if (isDark) {

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
   CONSOLE
========================================== */

console.log(
    "Day 25 - GitHub Repository API Loaded"
);

console.log(
    "Fetching latest 6 repositories..."
);
