// ==========================================
// SYNEXUS CORE
// DAY 50 - FINAL CAPSTONE
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
// APP ROOT
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
                    🎉 50 DAYS COMPLETED
                </span>

                <h2>
                    Welcome to
                    <span>Synexus Core.</span>
                </h2>

                <p>

                    A complete Vanilla JavaScript
                    capstone combining responsive UI,
                    Web Components, state management,
                    IndexedDB, SPA routing, API streams
                    and offline support.

                </p>


                <div class="hero-actions">

                    <a
                        href="#/data"
                        class="primary-button"
                    >
                        Explore Live Data
                    </a>

                    <a
                        href="#/about"
                        class="secondary-button"
                    >
                        View Capstone
                    </a>

                </div>

            </div>


            <div class="hero-status">

                <div class="status-circle">
                    ✓
                </div>

                <strong>
                    CAPSTONE
                </strong>

                <span>
                    Complete
                </span>

            </div>

        </section>


        <section class="dashboard-section">

            <div class="section-heading">

                <span class="section-label">
                    FINAL ARCHITECTURE
                </span>

                <h2>
                    Everything Connected
                </h2>

            </div>


            <div class="feature-grid">

                <article class="feature-card">

                    <div class="feature-icon">
                        🧩
                    </div>

                    <h3>
                        Components
                    </h3>

                    <p>
                        Reusable Web Components with
                        encapsulated functionality.
                    </p>

                    <span class="feature-day">
                        Days 42–47
                    </span>

                </article>


                <article class="feature-card">

                    <div class="feature-icon">
                        🧠
                    </div>

                    <h3>
                        State & Memory
                    </h3>

                    <p>
                        Pub/Sub state management and
                        persistent browser storage.
                    </p>

                    <span class="feature-day">
                        Day 48
                    </span>

                </article>


                <article class="feature-card">

                    <div class="feature-icon">
                        🧭
                    </div>

                    <h3>
                        SPA Routing
                    </h3>

                    <p>
                        Navigate between views without
                        reloading the webpage.
                    </p>

                    <span class="feature-day">
                        Day 49
                    </span>

                </article>


                <article class="feature-card">

                    <div class="feature-icon">
                        📡
                    </div>

                    <h3>
                        Data Streams
                    </h3>

                    <p>
                        Resilient API requests using
                        retry logic and Promise.all().
                    </p>

                    <span class="feature-day">
                        Days 49–50
                    </span>

                </article>


                <article class="feature-card">

                    <div class="feature-icon">
                        📴
                    </div>

                    <h3>
                        Offline Support
                    </h3>

                    <p>
                        Service Worker caching keeps
                        core application files available.
                    </p>

                    <span class="feature-day">
                        Day 50
                    </span>

                </article>


                <article class="feature-card">

                    <div class="feature-icon">
                        📱
                    </div>

                    <h3>
                        Responsive UI
                    </h3>

                    <p>
                        The interface adapts to desktop,
                        tablet and mobile screens.
                    </p>

                    <span class="feature-day">
                        Final Polish
                    </span>

                </article>

            </div>

        </section>

    `;

}


// ==========================================
// USERS VIEW
// ==========================================

async function usersView() {

    const user =
        await fetchUser(
            "github"
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

                    <p class="username">
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

                    <article
                        class="repository-card"
                    >

                        <div class="repo-header">

                            <span class="repo-icon">
                                📁
                            </span>

                            <span class="repo-language">
                                ${escapeHTML(
                                    repo.language ||
                                    "Unknown"
                                )}
                            </span>

                        </div>


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

                Multiple API requests are processed
                concurrently using Promise.all().

            </p>


            <h3 class="sub-heading">
                Repositories
            </h3>

            <div class="repository-grid">

                ${repositoriesHTML}

            </div>


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
                FINAL CAPSTONE
            </span>

            <h2>
                50 Days. One Application.
            </h2>

            <p class="page-description">

                Synexus Core represents the final
                integration of the concepts developed
                throughout the 50-Day Web Challenge.

            </p>


            <div class="timeline">

                <div class="timeline-item">

                    <strong>
                        Days 1–25
                    </strong>

                    <span>
                        HTML, CSS & JavaScript Foundations
                    </span>

                </div>


                <div class="timeline-item">

                    <strong>
                        Days 26–41
                    </strong>

                    <span>
                        APIs, Async JavaScript, Storage
                        & Web Platform APIs
                    </span>

                </div>


                <div class="timeline-item">

                    <strong>
                        Days 42–45
                    </strong>

                    <span>
                        Web Components, State &
                        Component Composition
                    </span>

                </div>


                <div class="timeline-item">

                    <strong>
                        Days 46–50
                    </strong>

                    <span>
                        Full Capstone Integration
                    </span>

                </div>

            </div>


            <div class="technology-list">

                <span>HTML5</span>

                <span>CSS3</span>

                <span>JavaScript</span>

                <span>ES Modules</span>

                <span>Web Components</span>

                <span>IndexedDB</span>

                <span>SPA Router</span>

                <span>REST API</span>

                <span>Promise.all()</span>

                <span>Service Worker</span>

                <span>Responsive Design</span>

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
// DARK MODE
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


const savedTheme =
    localStorage.getItem(
        "synexus-theme"
    );


applyTheme(
    savedTheme || "light"
);


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
// ONLINE / OFFLINE STATUS
// ==========================================

const connectionStatus =
    document.getElementById(
        "connection-status"
    );


function updateConnectionStatus() {

    if (navigator.onLine) {

        connectionStatus.textContent =
            "🟢 Online";

        connectionStatus.classList.remove(
            "offline"
        );

    } else {

        connectionStatus.textContent =
            "🔴 Offline";

        connectionStatus.classList.add(
            "offline"
        );

    }

}


window.addEventListener(
    "online",
    updateConnectionStatus
);


window.addEventListener(
    "offline",
    updateConnectionStatus
);


updateConnectionStatus();


// ==========================================
// SERVICE WORKER
// ==========================================

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        async () => {

            try {

                const registration =
                    await navigator.serviceWorker
                        .register("./sw.js");


                console.log(
                    "Service Worker registered:",
                    registration.scope
                );

            } catch (error) {

                console.error(
                    "Service Worker registration failed:",
                    error
                );

            }

        }
    );

}


// ==========================================
// FINAL MESSAGE
// ==========================================

console.log(
    "🎉 Synexus Core - 50-Day Challenge Complete!"
);