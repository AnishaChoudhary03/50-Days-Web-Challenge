// ==========================================
// SYNEXUS CORE
// DAY 50 - SPA ROUTER
// ==========================================


export class Router {

    constructor(
        rootElement,
        routes
    ) {

        this.root =
            rootElement;

        this.routes =
            routes;


        window.addEventListener(
            "hashchange",
            () => this.handleRoute()
        );

    }


    // ==========================================
    // START
    // ==========================================

    start() {

        this.handleRoute();

    }


    // ==========================================
    // CURRENT PATH
    // ==========================================

    getCurrentPath() {

        const hash =
            window.location.hash;


        if (
            !hash ||
            hash === "#"
        ) {

            return "/";

        }


        return hash
            .replace(/^#/, "")
            .split("?")[0];

    }


    // ==========================================
    // HANDLE ROUTE
    // ==========================================

    async handleRoute() {

        const path =
            this.getCurrentPath();


        const route =
            this.routes[path];


        this.updateNavigation(path);


        if (!route) {

            this.renderNotFound();

            return;

        }


        try {

            this.showLoading();


            const content =
                await route();


            this.root.innerHTML =
                content;


        } catch (error) {

            console.error(
                "Route error:",
                error
            );


            this.renderError(
                error.message
            );

        }

    }


    // ==========================================
    // LOADING
    // ==========================================

    showLoading() {

        this.root.innerHTML = `

            <section class="loading-screen">

                <div class="spinner"></div>

                <h2>
                    Loading...
                </h2>

                <p>
                    Fetching the latest information.
                </p>

            </section>

        `;

    }


    // ==========================================
    // ERROR
    // ==========================================

    renderError(message) {

        this.root.innerHTML = `

            <section class="error-page">

                <div class="error-icon">
                    ⚠️
                </div>

                <h2>
                    Unable to load this page
                </h2>

                <p>
                    ${message}
                </p>

                <div class="error-actions">

                    <button
                        class="primary-button"
                        id="retry-button"
                    >
                        Try Again
                    </button>

                    <a
                        href="#/"
                        class="secondary-button"
                    >
                        Home
                    </a>

                </div>

            </section>

        `;


        const retryButton =
            document.getElementById(
                "retry-button"
            );


        if (retryButton) {

            retryButton.addEventListener(
                "click",
                () => {

                    this.handleRoute();

                }
            );

        }

    }


    // ==========================================
    // 404
    // ==========================================

    renderNotFound() {

        this.root.innerHTML = `

            <section class="error-page">

                <div class="error-icon">
                    🔍
                </div>

                <h2>
                    404
                </h2>

                <p>
                    The page you are looking for
                    does not exist.
                </p>

                <a
                    href="#/"
                    class="primary-button"
                >
                    Back Home
                </a>

            </section>

        `;

    }


    // ==========================================
    // NAVIGATION
    // ==========================================

    updateNavigation(path) {

        const links =
            document.querySelectorAll(
                ".nav-link"
            );


        links.forEach(link => {

            const href =
                link.getAttribute(
                    "href"
                );


            const linkPath =
                href.replace(
                    "#",
                    ""
                );


            link.classList.toggle(
                "active",
                linkPath === path
            );

        });

    }

}