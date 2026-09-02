// ==========================================
// SYNEXUS CORE
// DAY 49 - DATA STREAMS & ROUTING
// ==========================================


// ==========================================
// IMPORTS
// ==========================================

import {
    Router
} from "./router.js";

import {
    fetchUser,
    fetchDashboardData
} from "./api.js";

import {
    escapeHTML
} from "./utils.js";


// ==========================================
// SELECT APP ROOT
// ==========================================

const appRoot =
    document.getElementById(
        "app-root"
    );


// ==========================================
// DASHBOARD VIEW
// ==========================================

function dashboardView() {

    return `

        <section class="hero">

            <div class="hero-content">

                <span class="hero-badge">
                    DAY 49 • DATA STREAMS
                </span>

                <h2>
                    Data Streams.
                    <span>Connected.</span>
                </h2>

                <p>
                    A Vanilla JavaScript single-page
                    application using client-side routing,
                    resilient API requests and parallel
                    data fetching.
                </p>

                <div class="hero-actions">

                    <a
                        href="#/users"
                        class="primary-button"
                    >
                        Explore Users
                    </a>

                    <a
                        href="#/data"
                        class="secondary-button"
                    >
                        View Live Data
                    </a>

                </div>

            </div>

        </section>


        <section class="dashboard-section">

            <div class="section-heading">

                <span class="section-label">
                    ARCHITECTURE
                </span>

                <h2>
                    Day 49 Technologies
                </h2>

            </div>


            <div class="architecture-grid">

                <article class="info-card">

                    <div class="info-icon">
                        🧭
                    </div>

                    <h3>
                        SPA Router
                    </h3>

                    <p>
                        Navigate between views without
                        reloading the entire webpage.
                    </p>

                </article>


                <article class="info-card">

                    <div class="info-icon">
                        🔄
                    </div>

                    <h3>
                        Fetch Retry
                    </h3>

                    <p>
                        Network requests automatically
                        retry when they fail.
                    </p>

                </article>


                <article class="info-card">

                    <div class="info-icon">
                        ⚡
                    </div>

                    <h3>
                        Promise.all
                    </h3>

                    <p>
                        Multiple API requests execute
                        concurrently.
                    </p>

                </article>

            </div>

        </section>

    `;

}


// ==========================================
// USERS VIEW
// ==========================================

async function usersView() {

    const username =
        "github";


    const user =
        await fetchUser(
            username
        );


    return `

        <section class="page-section">

            <span class="section-label">
                LIVE API
            </span>

            <h2>
                GitHub User
            </h2>


            <div class="user-profile">

                <img
                    src="${escapeHTML(
                        user.avatar_url
                    )}"
                    alt="${escapeHTML(
                        user.login
                    )}"
                >


                <div>

                    <h3>
                        ${escapeHTML(
                            user.name ||
                            user.login
                        )}
                    </h3>

                    <p>
                        @${escapeHTML(
                            user.login
                        )}
                    </p>

                    <p>
                        ${escapeHTML(
                            user.bio ||
                            "No bio available."
                        )}
                    </p>

                </div>

            </div>


            <div class="stats-grid">

                <div class="stat-card">

                    <strong>
                        ${user.public_repos}
                    </strong>

                    <span>
                        Repositories
                    </span>

                </div>


                <div class="stat-card">

                    <strong>
                        ${user.followers}
                    </strong>

                    <span>
                        Followers
                    </span>

                </div>


                <div class="stat-card">

                    <strong>
                        ${user.following}
                    </strong>

                    <span>
                        Following
                    </span>

                </div>

            </div>

        </section>

    `;

}


// ==========================================
// DATA VIEW
// ==========================================

async function dataView() {

    const data =
        await fetchDashboardData(
            "github"
        );


    const repositoriesHTML =
        data.repositories
            .map(repo => {

                return `

                    <article class="repository-card">

                        <h3>
                            ${escapeHTML(
                                repo.name
                            )}
                        </h3>

                        <p>
                            ${escapeHTML(
                                repo.description ||
                                "No description available."
                            )}
                        </p>

                        <div class="repo-meta">

                            <span>
                                ⭐
                                ${repo.stargazers_count}
                            </span>

                            <span>
                                🍴
                                ${repo.forks_count}
                            </span>

                            <span>
                                ${escapeHTML(
                                    repo.language ||
                                    "Unknown"
                                )}
                            </span>

                        </div>

                    </article>

                `;

            })
            .join("");


    const followersHTML =
        data.followers
            .map(follower => {

                return `

                    <div class="follower-card">

                        <img
                            src="${escapeHTML(
                                follower.avatar_url
                            )}"
                            alt="${escapeHTML(
                                follower.login
                            )}"
                        >

                        <span>
                            @${escapeHTML(
                                follower.login
                            )}
                        </span>

                    </div>

                `;

            })
            .join("");


    return `

        <section class="page-section">

            <span class="section-label">
                LIVE DATA STREAM
            </span>

            <h2>
                GitHub Data
            </h2>

            <p class="page-description">

                User, repository and follower
                information was requested
                concurrently using Promise.all().

            </p>


            <!-- REPOSITORIES -->

            <h3 class="sub-heading">
                Repositories
            </h3>

            <div class="repository-grid">

                ${repositoriesHTML}

            </div>


            <!-- FOLLOWERS -->

            <h3 class="sub-heading">
                Followers
            </h3>

            <div class="followers-grid">

                ${followersHTML}

            </div>

        </section>

    `;

}


// ==========================================
// ABOUT VIEW
// ==========================================

function aboutView() {

    return `

        <section class="page-section">

            <span class="section-label">
                SYNEXUS CORE
            </span>

            <h2>
                About This Capstone
            </h2>

            <p class="page-description">

                Day 49 combines several modern
                JavaScript concepts into a single
                application architecture.

            </p>


            <div class="technology-list">

                <span>
                    HTML
                </span>

                <span>
                    CSS
                </span>

                <span>
                    JavaScript
                </span>

                <span>
                    ES Modules
                </span>

                <span>
                    SPA Router
                </span>

                <span>
                    REST API
                </span>

                <span>
                    Fetch Retry
                </span>

                <span>
                    Promise.all
                </span>

            </div>

        </section>

    `;

}


// ==========================================
// ROUTES
// ==========================================

const routes = {

    "/": dashboardView,

    "/users": usersView,

    "/data": dataView,

    "/about": aboutView

};


// ==========================================
// CREATE ROUTER
// ==========================================

const router =
    new Router(
        appRoot,
        routes
    );


// ==========================================
// START ROUTER
// ==========================================

router.start();


// ==========================================
// THEME
// ==========================================

const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add(
            "dark-theme"
        );

        themeToggle.textContent =
            "☀️";

    } else {

        document.body.classList.remove(
            "dark-theme"
        );

        themeToggle.textContent =
            "🌙";

    }

}


// Load saved theme

const savedTheme =
    localStorage.getItem(
        "synexus-theme"
    );


applyTheme(
    savedTheme || "light"
);


// Toggle theme

themeToggle.addEventListener(
    "click",
    () => {

        const isDark =
            document.body.classList.contains(
                "dark-theme"
            );


        const newTheme =
            isDark
                ? "light"
                : "dark";


        applyTheme(
            newTheme
        );


        localStorage.setItem(
            "synexus-theme",
            newTheme
        );

    }
);


// ==========================================
// APPLICATION START
// ==========================================

console.log(
    "Synexus Core - Day 49 initialized successfully."
);