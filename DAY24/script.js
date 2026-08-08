/* ==========================================
   SYNEXUS CORE
   DAY 23 - VANILLA JS SPA ROUTER
========================================== */


/* ==========================================
   SELECT APP ROOT
========================================== */

const appRoot = document.getElementById("app-root");


/* ==========================================
   VIEW DEFINITIONS
========================================== */

const views = {

    "/": `

        <section class="hero">

            <div class="container">

                <h1>
                    Welcome to
                    <span>Synexus Core</span>
                </h1>

                <p>
                    A student-driven engineering
                    community focused on innovation,
                    teamwork and technology.
                </p>

                <a
                    href="/about"
                    class="btn nav-link">

                    Explore About Us

                </a>

            </div>

        </section>

    `,


    "/about": `

        <section class="section">

            <div class="container">

                <h2>
                    About Synexus Core
                </h2>

                <p>

                    Synexus Core is an engineering
                    community where students collaborate,
                    learn new technologies and develop
                    practical projects.

                </p>

                <div class="cards">

                    <div class="card">

                        <h3>
                            Innovation
                        </h3>

                        <p>
                            Turning creative ideas into
                            practical engineering solutions.
                        </p>

                    </div>

                    <div class="card">

                        <h3>
                            Teamwork
                        </h3>

                        <p>
                            Collaborating with students
                            to solve real-world problems.
                        </p>

                    </div>

                    <div class="card">

                        <h3>
                            Learning
                        </h3>

                        <p>
                            Building technical skills through
                            projects and hands-on experience.
                        </p>

                    </div>

                </div>

            </div>

        </section>

    `,


    "/initiatives": `

        <section class="section">

            <div class="container">

                <h2>
                    Our Initiatives
                </h2>

                <div class="cards">

                    <div class="card">

                        <h3>
                            Smart Traffic Signal
                        </h3>

                        <p>
                            An emergency vehicle assistance
                            system using smart traffic control.
                        </p>

                    </div>

                    <div class="card">

                        <h3>
                            PG Food Saver
                        </h3>

                        <p>
                            A platform designed to reduce
                            food wastage in PG environments.
                        </p>

                    </div>

                    <div class="card">

                        <h3>
                            AI Study Assistant
                        </h3>

                        <p>
                            An AI-based learning assistant
                            for students.
                        </p>

                    </div>

                </div>

            </div>

        </section>

    `,


    "/team": `

        <section class="section">

            <div class="container">

                <h2>
                    Our Team
                </h2>

                <div class="cards">

                    <div class="card">

                        <h3>
                            Anisha Choudhary
                        </h3>

                        <p>
                            Community Lead
                        </p>

                    </div>

                    <div class="card">

                        <h3>
                            Avani Kulkarni
                        </h3>

                        <p>
                            Project Coordinator
                        </p>

                    </div>

                    <div class="card">

                        <h3>
                            Mohammed Rayyan
                        </h3>

                        <p>
                            Technical Lead
                        </p>

                    </div>

                </div>

            </div>

        </section>

    `,


    "/contact": `

        <section class="section">

            <div class="container">

                <h2>
                    Contact Us
                </h2>

                <p>
                    Email:
                    synexuscore@gmail.com
                </p>

                <p>
                    Bengaluru, Karnataka
                </p>

            </div>

        </section>

    `

};


/* ==========================================
   ROUTER FUNCTION
========================================== */

async function router() {

    /*
       Get the current URL path.
    */

    const path = window.location.pathname;


    /*
       Find the matching view.
    */

    const view = views[path];


    /*
       Inject the view into app-root.
    */

    if (view) {

        appRoot.innerHTML = view;

    }

    else {

        /*
           404 BONUS ROUTE
        */

        appRoot.innerHTML = `

            <section class="section not-found">

                <div class="container">

                    <h1>
                        404
                    </h1>

                    <h2>
                        Page Not Found
                    </h2>

                    <p>
                        The page you are looking for
                        does not exist.
                    </p>

                    <a
                        href="/"
                        class="btn nav-link">

                        Back to Home

                    </a>

                </div>

            </section>

        `;

    }

}


/* ==========================================
   EVENT DELEGATION
========================================== */

document.addEventListener(
    "click",
    function (event) {

        /*
           Find the clicked .nav-link.
        */

        const link =
            event.target.closest(".nav-link");


        /*
           If the clicked element isn't
           a navigation link, stop here.
        */

        if (!link) {

            return;

        }


        /*
           Get the href.
        */

        const href =
            link.getAttribute("href");


        /*
           Make sure it is an internal route.
        */

        if (
            !href ||
            href.startsWith("http") ||
            href.startsWith("#")
        ) {

            return;

        }


        /*
           STOP NORMAL BROWSER NAVIGATION.

           This prevents the entire HTML page
           from being downloaded again.
        */

        event.preventDefault();


        /*
           CHANGE THE URL WITHOUT RELOADING.

           This is the History API.
        */

        window.history.pushState(
            {},
            "",
            href
        );


        /*
           Render the new view.
        */

        router();

    }
);


/* ==========================================
   BACK / FORWARD BUTTON
========================================== */

window.addEventListener(
    "popstate",
    router
);


/* ==========================================
   INITIAL ROUTE
========================================== */

router();
