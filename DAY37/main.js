/* ==========================================
   MAIN.JS
   DAY 37
========================================== */

import {
    debounce
} from "./utils.js";


import {
    fetchDashboardData
} from "./api.js";


/* ==========================================
   DOM ELEMENTS
========================================== */

const usernameInput =
    document.getElementById(
        "github-username"
    );


const dashboardContent =
    document.getElementById(
        "dashboard-content"
    );


const dashboardStatus =
    document.getElementById(
        "dashboard-status"
    );


const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


/* ==========================================
   RENDER DASHBOARD
========================================== */

function renderDashboard(
    dashboard
) {

    const {
        profile,
        repos,
        followers
    } = dashboard;


    /* ======================================
       REPOSITORIES
    ====================================== */

    const repositoryHTML =
        repos.length > 0

            ? repos.map(
                repo => `

                    <li>

                        <a
                            href="${repo.html_url}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="repo-link">

                            ${repo.name}

                        </a>

                    </li>

                `
            ).join("")

            : `

                <li>
                    No public repositories found.
                </li>

            `;


    /* ======================================
       FOLLOWERS
    ====================================== */

    const followerHTML =
        followers.length > 0

            ? followers.map(
                follower => `

                    <li>

                        <strong>
                            ${follower.login}
                        </strong>

                    </li>

                `
            ).join("")

            : `

                <li>
                    No followers found.
                </li>

            `;


    /* ======================================
       DASHBOARD HTML
    ====================================== */

    dashboardContent.innerHTML = `

        <div class="dashboard">


            <!-- PROFILE -->

            <div class="profile-card">


                <img
                    src="${profile.avatar_url}"
                    alt="${profile.login}"
                    class="avatar"
                >


                <div class="profile-info">


                    <h3>

                        ${
                            profile.name ||
                            profile.login
                        }

                    </h3>


                    <p class="username">

                        @${profile.login}

                    </p>


                    <p class="bio">

                        ${
                            profile.bio ||
                            "No bio available."
                        }

                    </p>


                    <div class="stats">


                        <span>

                            Repositories:
                            ${profile.public_repos}

                        </span>


                        <span>

                            Followers:
                            ${profile.followers}

                        </span>


                        <span>

                            Following:
                            ${profile.following}

                        </span>


                    </div>


                    <a
                        href="${profile.html_url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn primary-btn">

                        <i class="fab fa-github"></i>

                        View GitHub

                    </a>

                </div>

            </div>


            <!-- REPOSITORIES -->

            <div class="data-card">

                <h3>

                    <i class="fas fa-code"></i>

                    Recent Repositories

                </h3>


                <ul class="data-list">

                    ${repositoryHTML}

                </ul>

            </div>


            <!-- FOLLOWERS -->

            <div class="data-card">

                <h3>

                    <i class="fas fa-users"></i>

                    Followers

                </h3>


                <ul class="data-list">

                    ${followerHTML}

                </ul>

            </div>


        </div>

    `;

}


/* ==========================================
   FETCH DASHBOARD
========================================== */

async function loadDashboard(
    username
) {

    username =
        username.trim();


    /* ======================================
       EMPTY
    ====================================== */

    if (!username) {

        dashboardContent.innerHTML = `

            <div class="empty-state">

                <i class="fas fa-search"></i>

                <h3>
                    Dashboard Ready
                </h3>

                <p>
                    Search for a GitHub developer.
                </p>

            </div>

        `;


        dashboardStatus.textContent = "";

        return;

    }


    /* ======================================
       LOADING
    ====================================== */

    dashboardContent.innerHTML = `

        <div class="loading">

            <div class="loader"></div>

            <h3>
                Loading Dashboard...
            </h3>

            <p>
                Fetching profile, repositories
                and followers in parallel.
            </p>

        </div>

    `;


    dashboardStatus.textContent =
        "Starting parallel requests...";


    try {


        /* ==================================
           PARALLEL API
        ================================== */

        const dashboard =
            await fetchDashboardData(
                username
            );


        /* ==================================
           RENDER
        ================================== */

        renderDashboard(
            dashboard
        );


        dashboardStatus.textContent =
            "✓ Dashboard loaded successfully.";

    }


    catch (error) {

        console.error(
            error
        );


        dashboardContent.innerHTML = `

            <div class="error-state">

                <h3>
                    ⚠️ Unable to Load Dashboard
                </h3>

                <p>
                    ${error.message}
                </p>

            </div>

        `;


        dashboardStatus.textContent =
            "Request failed.";

    }

}


/* ==========================================
   DEBOUNCED SEARCH
========================================== */

const debouncedSearch =
    debounce(
        loadDashboard,
        500
    );


/* ==========================================
   INPUT
========================================== */

usernameInput.addEventListener(
    "input",
    event => {

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
   START
========================================== */

console.log(
    "Day 37 - Parallel Network Architecture loaded."
);