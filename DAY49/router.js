// ==========================================
// SYNEXUS CORE
// DAY 49 - SPA ROUTER
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


        // Listen for URL changes

        window.addEventListener(
            "hashchange",
            () => {

                this.handleRoute();

            }
        );

    }


    // ==========================================
    // START ROUTER
    // ==========================================

    start() {

        this.handleRoute();

    }


    // ==========================================
    // GET CURRENT PATH
    // ==========================================

    getCurrentPath() {

        const hash =
            window.location.hash;


        // No hash means home

        if (
            !hash ||
            hash === "#"
        ) {

            return "/";

        }


        return hash
            .replace("#", "")
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


        // Update active navigation

        this.updateNavigation(path);


        // Route doesn't exist

        if (!route) {

            this.renderNotFound();

            return;

        }


        try {

            // Show loading

            this.showLoading();


            // Execute route

            const content =
                await route();


            // Insert view

            this.root.innerHTML =
                content;

        } catch (error) {

            console.error(
                "Router error:",
                error
            );


            this.renderError(
                error.message
            );

        }

    }


    // ==========================================
    // LOADING VIEW
    // ==========================================

    showLoading() {

        this.root.innerHTML = `

            <section class="loading-screen">

                <div class="spinner"></div>

                <h2>
                    Loading...
                </h2>

                <p>
                    Fetching data.
                </p>

            </section>

        `;

    }


    // ==========================================
    // ERROR VIEW
    // ==========================================

    renderError(message) {

        this.root.innerHTML = `

            <section class="error-page">

                <div class="error-icon">
                    ⚠️
                </div>

                <h2>
                    Something went wrong
                </h2>

                <p>
                    ${message}
                </p>

                <a
                    href="#/"
                    class="primary-button"
                >
                    Return to Dashboard
                </a>

            </section>

        `;

    }


    // ==========================================
    // 404 VIEW
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
                    Page not found.
                </p>

                <a
                    href="#/"
                    class="primary-button"
                >
                    Back to Dashboard
                </a>

            </section>

        `;

    }


    // ==========================================
    // ACTIVE NAVIGATION
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
                href.replace("#", "");


            link.classList.toggle(
                "active",
                linkPath === path
            );

        });

    }

}