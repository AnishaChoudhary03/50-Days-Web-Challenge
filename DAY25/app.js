/* ==========================================
   THEME TOGGLE
   GLOBAL FEATURE
========================================== */

function initThemeToggle() {

    const themeToggle =
        document.getElementById("theme-toggle");


      if (!themeToggle) {

        console.log(
            "Theme toggle not found."
        );

        return;

    }


    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-theme"
        );

        appState.darkMode = true;

        themeToggle.textContent = "☀️";

    }

    else {

        appState.darkMode = false;

        themeToggle.textContent = "🌙";

    }


    /* --------------------------------------
       Theme Toggle Click
    -------------------------------------- */

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-theme"
            );


            /* Update global state */

            appState.darkMode =
                document.body.classList.contains(
                    "dark-theme"
                );


            /* --------------------------------
               Save theme
            -------------------------------- */

            if (appState.darkMode) {

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

}


/* ==========================================
   MOBILE MENU
   GLOBAL FEATURE
========================================== */

function initMobileMenu() {

    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );

    const navLinks =
        document.querySelector(
            ".nav-links"
        );


    /* --------------------------------------
       Check elements
    -------------------------------------- */

    if (!menuToggle || !navLinks) {

        console.log(
            "Mobile menu elements not found."
        );

        return;

    }


    /* --------------------------------------
       Open / Close Mobile Menu
    -------------------------------------- */

    menuToggle.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "active"
            );

        }
    );


    /* --------------------------------------
       Close menu after navigation
    -------------------------------------- */

    navLinks.addEventListener(
        "click",
        (event) => {

            const link =
                event.target.closest(
                    ".nav-link"
                );


            if (link) {

                navLinks.classList.remove(
                    "active"
                );

            }

        }
    );

}
/* ==========================================
   DAY 24
   SPA ROUTER
========================================== */


/* ==========================================
   ROUTE VIEWS
========================================== */

const routes = {

    /* ======================================
       HOME
    ====================================== */

    "/": `

        <section class="hero">

            <div class="container hero-content">

                <h1>
                    Welcome to
                    <span>Synexus Core</span>
                </h1>

                <p>
                    A student-driven engineering
                    community focused on innovation,
                    teamwork and technology.
                </p>

                <div class="hero-buttons">

                    <a
                        href="/about"
                        class="btn primary-btn nav-link">

                        Explore More

                    </a>

                    <a
                        href="/join"
                        class="btn secondary-btn nav-link">

                        Join Community

                    </a>

                </div>

            </div>

        </section>

    `,


    /* ======================================
       ABOUT
    ====================================== */

    "/about": `

        <section class="section page-view">

            <div class="container">

                <div class="section-title">

                    <h2>
                        About Synexus Core
                    </h2>

                    <p>
                        Learn, collaborate and
                        build innovative projects.
                    </p>

                </div>


                <div class="about-grid">

                    <div class="about-card">

                        <i class="fas fa-users"></i>

                        <h3>
                            Community
                        </h3>

                        <p>
                            Connect with students
                            passionate about technology.
                        </p>

                    </div>


                    <div class="about-card">

                        <i class="fas fa-code"></i>

                        <h3>
                            Development
                        </h3>

                        <p>
                            Build practical websites,
                            applications and solutions.
                        </p>

                    </div>


                    <div class="about-card">

                        <i class="fas fa-lightbulb"></i>

                        <h3>
                            Innovation
                        </h3>

                        <p>
                            Turn creative ideas into
                            real-world projects.
                        </p>

                    </div>

                </div>

            </div>

        </section>

    `,


    /* ======================================
       INITIATIVES
    ====================================== */

    "/initiatives": `

        <section class="section page-view">

            <div class="container">

                <div class="section-title">

                    <h2>
                        Community Initiatives
                    </h2>

                    <p>
                        Explore our engineering projects.
                    </p>

                </div>


                <div class="initiatives-grid">

                    <div class="initiative-card">

                        <h3>
                            Smart Traffic Signal
                        </h3>

                        <p>
                            Emergency vehicle assistance
                            using smart traffic control.
                        </p>

                        <span class="status status-completed">
                            Completed
                        </span>

                    </div>


                    <div class="initiative-card">

                        <h3>
                            PG Food Saver
                        </h3>

                        <p>
                            A platform designed to reduce
                            food wastage.
                        </p>

                        <span class="status status-active">
                            Active
                        </span>

                    </div>


                    <div class="initiative-card">

                        <h3>
                            AI Study Assistant
                        </h3>

                        <p>
                            An AI-powered learning
                            assistant for students.
                        </p>

                        <span class="status status-active">
                            Active
                        </span>

                    </div>

                </div>

            </div>

        </section>

    `,


    /* ======================================
       TEAM
    ====================================== */

    "/team": `

        <section class="section page-view">

            <div class="container">

                <div class="section-title">

                    <h2>
                        Meet Our Team
                    </h2>

                    <p>
                        The people behind Synexus Core.
                    </p>

                </div>


                <div class="team-grid">

                    <div class="team-card">

                        <img
                            src="images/member1.jpg"
                            alt="Team Member">

                        <h3>
                            Anisha Choudhary
                        </h3>

                        <p class="role">
                            Community Lead
                        </p>

                    </div>


                    <div class="team-card">

                        <img
                            src="images/member2.jpg"
                            alt="Team Member">

                        <h3>
                            Avani Kulkarni
                        </h3>

                        <p class="role">
                            Project Coordinator
                        </p>

                    </div>


                    <div class="team-card">

                        <img
                            src="images/member3.jpg"
                            alt="Team Member">

                        <h3>
                            Mohammed Rayyan
                        </h3>

                        <p class="role">
                            Technical Lead
                        </p>

                    </div>

                </div>

            </div>

        </section>

    `,


    /* ======================================
       KANBAN
    ====================================== */

    "/kanban": `

        <section class="section page-view">

            <div class="container">

                <div class="section-title">

                    <h2>
                        Task Management Board
                    </h2>

                    <p>
                        Drag tasks between different
                        stages of completion.
                    </p>

                </div>


                <div class="kanban-board">


                    <!-- TO DO -->

                    <div class="column">

                        <h3>
                            📋 To Do
                        </h3>

                        <div
                            class="task-card"
                            draggable="true">

                            Build Homepage

                        </div>


                        <div
                            class="task-card"
                            draggable="true">

                            Complete CSS Styling

                        </div>


                        <div
                            class="task-card"
                            draggable="true">

                            Learn JavaScript

                        </div>

                    </div>


                    <!-- IN PROGRESS -->

                    <div class="column">

                        <h3>
                            🚀 In Progress
                        </h3>

                    </div>


                    <!-- DONE -->

                    <div class="column">

                        <h3>
                            ✅ Done
                        </h3>

                    </div>

                </div>

            </div>

        </section>

    `,


    /* ======================================
       CONTACT
    ====================================== */

    "/contact": `

        <section class="section page-view">

            <div class="container">

                <div class="section-title">

                    <h2>
                        Contact Us
                    </h2>

                    <p>
                        We'd love to hear from you.
                    </p>

                </div>


                <form
                    id="contactForm"
                    class="contact-form">


                    <div class="form-group">

                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            id="contactName"
                            placeholder="Enter your name">

                        <small
                            id="contactNameError"
                            class="error">
                        </small>

                    </div>


                    <div class="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            id="contactEmail"
                            placeholder="Enter your email">

                        <small
                            id="contactEmailError"
                            class="error">
                        </small>

                    </div>


                    <div class="form-group">

                        <label>
                            Message
                        </label>

                        <textarea
                            id="contactMessage"
                            rows="5"
                            placeholder="Enter your message">
                        </textarea>

                        <small
                            id="contactMessageError"
                            class="error">
                        </small>

                    </div>


                    <button
                        type="submit"
                        class="btn primary-btn">

                        Send Message

                    </button>

                </form>

            </div>

        </section>

    `,


    /* ======================================
       JOIN
    ====================================== */

    "/join": `

        <section class="section page-view">

            <div class="container">

                <div class="section-title">

                    <h2>
                        Join Synexus Core
                    </h2>

                    <p>
                        Become a part of our
                        engineering community.
                    </p>

                </div>


                <div class="join-card">

                    <form
                        id="membershipForm">


                        <div class="form-group">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                id="fullName"
                                placeholder="Enter your name">

                            <small
                                id="nameError"
                                class="error">
                            </small>

                        </div>


                        <div class="form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email">

                            <small
                                id="emailError"
                                class="error">
                            </small>

                        </div>


                        <div class="form-group">

                            <label>
                                Department
                            </label>

                            <select id="department">

                                <option value="">
                                    Select Department
                                </option>

                                <option>
                                    Computer Science
                                </option>

                                <option>
                                    Information Science
                                </option>

                                <option>
                                    Electronics
                                </option>

                                <option>
                                    Mechanical
                                </option>

                                <option>
                                    Civil
                                </option>

                            </select>

                        </div>


                        <div class="form-group">

                            <label>
                                Why do you want to join?
                            </label>

                            <textarea
                                id="joinMessage"
                                rows="5"
                                placeholder="Tell us about yourself">
                            </textarea>

                        </div>


                        <button
                            type="submit"
                            class="btn primary-btn">

                            Submit Application

                        </button>

                    </form>

                </div>

            </div>

        </section>

    `

};


/* ==========================================
   ROUTER
========================================== */

async function router() {

    const path =
        window.location.pathname;


    appState.currentRoute = path;


    /* ======================================
       FIND VIEW
    ====================================== */

    if (routes[path]) {

        appRoot.innerHTML =
            routes[path];

    }

    else {

        /* ==================================
           404 VIEW
        ================================== */

        appRoot.innerHTML = `

            <section class="section page-view">

                <div class="container">

                    <div class="section-title">

                        <h1>
                            404
                        </h1>

                        <h2>
                            Page Not Found
                        </h2>

                        <p>
                            The page you are looking
                            for does not exist.
                        </p>

                        <a
                            href="/"
                            class="btn primary-btn nav-link">

                            Back to Home

                        </a>

                    </div>

                </div>

            </section>

        `;

    }


    /* ======================================
       ROUTER HOOK
       
       Initialize only what the
       current route needs.
    ====================================== */

    initRouteFeatures(path);


    /* ======================================
       ACTIVE NAVIGATION
    ====================================== */

    updateActiveNavigation(path);


    console.log(
        "Route loaded:",
        path
    );

}
/* ==========================================
   DAY 24
   ROUTER HOOKS + NAVIGATION
========================================== */


/* ==========================================
   ROUTE FEATURE INITIALIZER
========================================== */

function initRouteFeatures(path) {

    console.log(
        "Initializing features for:",
        path
    );


    /* ======================================
       HOME
    ====================================== */

    if (path === "/") {

        initHomeFeatures();

    }


    /* ======================================
       TEAM
    ====================================== */

    if (path === "/team") {

        initTeamFeatures();

    }


    /* ======================================
       KANBAN
    ====================================== */

    if (path === "/kanban") {

        initKanbanBoard();

    }


    /* ======================================
       CONTACT
    ====================================== */

    if (path === "/contact") {

        initContactForm();

    }


    /* ======================================
       JOIN
    ====================================== */

    if (path === "/join") {

        initMembershipForm();

    }

}


/* ==========================================
   HOME FEATURES
========================================== */

function initHomeFeatures() {

    console.log(
        "Home features initialized."
    );

}


/* ==========================================
   TEAM FEATURES
========================================== */

function initTeamFeatures() {

    console.log(
        "Team features initialized."
    );

}


/* ==========================================
   KANBAN BOARD
========================================== */

function initKanbanBoard() {

    const taskCards =
        document.querySelectorAll(
            ".task-card"
        );

    const columns =
        document.querySelectorAll(
            ".column"
        );


    /* --------------------------------------
       Make sure elements exist
    -------------------------------------- */

    if (
        !taskCards.length ||
        !columns.length
    ) {

        return;

    }


    /* ======================================
       DRAG START
    ====================================== */

    taskCards.forEach(card => {

        card.addEventListener(
            "dragstart",
            () => {

                card.classList.add(
                    "is-dragging"
                );

            }
        );


        /* ==================================
           DRAG END
        ================================== */

        card.addEventListener(
            "dragend",
            () => {

                card.classList.remove(
                    "is-dragging"
                );

            }
        );

    });


    /* ======================================
       DROP ZONES
    ====================================== */

    columns.forEach(column => {

        column.addEventListener(
            "dragover",
            event => {

                /*
                   Required by HTML5
                   Drag & Drop API.
                */

                event.preventDefault();

            }
        );


        /* ==================================
           DROP
        ================================== */

        column.addEventListener(
            "drop",
            event => {

                event.preventDefault();


                const draggedCard =
                    document.querySelector(
                        ".is-dragging"
                    );


                if (!draggedCard) {

                    return;

                }


                /*
                   Move task into
                   selected column.
                */

                column.appendChild(
                    draggedCard
                );


                /*
                   Save Kanban state.
                */

                saveKanbanState();

            }
        );

    });


    /* ======================================
       LOAD SAVED KANBAN STATE
    ====================================== */

    loadKanbanState();


    console.log(
        "Kanban board initialized."
    );

}


/* ==========================================
   SAVE KANBAN STATE
========================================== */

function saveKanbanState() {

    const columns =
        document.querySelectorAll(
            ".column"
        );


    if (!columns.length) {

        return;

    }


    const boardState =
        Array.from(columns).map(
            column => {

                return {

                    title:
                        column.querySelector(
                            "h3"
                        )?.textContent.trim(),

                    tasks:
                        Array.from(
                            column.querySelectorAll(
                                ".task-card"
                            )
                        ).map(
                            task =>
                                task.textContent.trim()
                        )

                };

            }
        );


    localStorage.setItem(
        "kanbanState",
        JSON.stringify(boardState)
    );


    console.log(
        "Kanban state saved."
    );

}


/* ==========================================
   LOAD KANBAN STATE
========================================== */

function loadKanbanState() {

    const saved =
        localStorage.getItem(
            "kanbanState"
        );


    if (!saved) {

        return;

    }


    const boardState =
        JSON.parse(saved);


    const columns =
        document.querySelectorAll(
            ".column"
        );


    boardState.forEach(
        (columnData, index) => {

            const column =
                columns[index];


            if (!column) {

                return;

            }


            /*
               Remove existing task cards.
            */

            column
                .querySelectorAll(
                    ".task-card"
                )
                .forEach(
                    task =>
                        task.remove()
                );


            /*
               Recreate saved cards.
            */

            columnData.tasks.forEach(
                taskText => {

                    const card =
                        document.createElement(
                            "div"
                        );


                    card.className =
                        "task-card";


                    card.draggable = true;


                    card.textContent =
                        taskText;


                    /*
                       Attach drag events
                       to recreated cards.
                    */

                    card.addEventListener(
                        "dragstart",
                        () => {

                            card.classList.add(
                                "is-dragging"
                            );

                        }
                    );


                    card.addEventListener(
                        "dragend",
                        () => {

                            card.classList.remove(
                                "is-dragging"
                            );

                        }
                    );


                    column.appendChild(
                        card
                    );

                }
            );

        }
    );


    console.log(
        "Kanban state restored."
    );

}


/* ==========================================
   SPA LINK INTERCEPTION
========================================== */

function initNavigation() {

    document.addEventListener(
        "click",
        event => {

            const link =
                event.target.closest(
                    ".nav-link"
                );


            if (!link) {

                return;

            }


            const href =
                link.getAttribute(
                    "href"
                );


            /*
               Ignore external links.
            */

            if (
                !href ||
                href.startsWith("http") ||
                href.startsWith("#")
            ) {

                return;

            }


            /*
               Stop normal page reload.
            */

            event.preventDefault();


            /*
               Update URL.
            */

            window.history.pushState(
                {},
                "",
                href
            );


            /*
               Render new route.
            */

            router();

        }
    );


    console.log(
        "SPA navigation initialized."
    );

}


/* ==========================================
   ACTIVE NAVIGATION
========================================== */

function updateActiveNavigation(path) {

    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    links.forEach(link => {

        link.classList.remove(
            "active"
        );


        if (
            link.getAttribute("href") ===
            path
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}
/* ==========================================
   DAY 24
   LOCAL FEATURE INITIALIZERS
   FORMS + VALIDATION
========================================== */


/* ==========================================
   CONTACT FORM
========================================== */

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    /* --------------------------------------
       Form may not exist on every route
    -------------------------------------- */

    if (!form) {

        return;

    }


    const nameInput =
        document.getElementById(
            "contactName"
        );

    const emailInput =
        document.getElementById(
            "contactEmail"
        );

    const messageInput =
        document.getElementById(
            "contactMessage"
        );


    const nameError =
        document.getElementById(
            "contactNameError"
        );

    const emailError =
        document.getElementById(
            "contactEmailError"
        );

    const messageError =
        document.getElementById(
            "contactMessageError"
        );


    /* ======================================
       FORM SUBMIT
    ====================================== */

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            let isValid = true;


            /* ------------------------------
               Name validation
            ------------------------------ */

            if (
                !nameInput.value.trim()
            ) {

                nameError.textContent =
                    "Please enter your name.";

                isValid = false;

            }

            else {

                nameError.textContent = "";

            }


            /* ------------------------------
               Email validation
            ------------------------------ */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailInput.value.trim()
            ) {

                emailError.textContent =
                    "Please enter your email.";

                isValid = false;

            }

            else if (
                !emailPattern.test(
                    emailInput.value.trim()
                )
            ) {

                emailError.textContent =
                    "Please enter a valid email.";

                isValid = false;

            }

            else {

                emailError.textContent = "";

            }


            /* ------------------------------
               Message validation
            ------------------------------ */

            if (
                !messageInput.value.trim()
            ) {

                messageError.textContent =
                    "Please enter a message.";

                isValid = false;

            }

            else {

                messageError.textContent = "";

            }


            /* ==================================
               SUCCESS
            ================================== */

            if (isValid) {

                alert(
                    "Message sent successfully!"
                );


                form.reset();

            }

        }
    );


    console.log(
        "Contact form initialized."
    );

}


/* ==========================================
   MEMBERSHIP FORM
========================================== */

function initMembershipForm() {

    const form =
        document.getElementById(
            "membershipForm"
        );


    if (!form) {

        return;

    }


    const nameInput =
        document.getElementById(
            "fullName"
        );

    const emailInput =
        document.getElementById(
            "email"
        );

    const departmentInput =
        document.getElementById(
            "department"
        );

    const messageInput =
        document.getElementById(
            "joinMessage"
        );


    const nameError =
        document.getElementById(
            "nameError"
        );

    const emailError =
        document.getElementById(
            "emailError"
        );


    /* ======================================
       LOAD SAVED FORM DATA
    ====================================== */

    const savedForm =
        localStorage.getItem(
            "membershipForm"
        );


    if (savedForm) {

        try {

            const data =
                JSON.parse(savedForm);


            nameInput.value =
                data.name || "";


            emailInput.value =
                data.email || "";


            departmentInput.value =
                data.department || "";


            messageInput.value =
                data.message || "";

        }

        catch (error) {

            console.error(
                "Could not restore form data.",
                error
            );

        }

    }


    /* ======================================
       SAVE FORM DATA
    ====================================== */

    form.addEventListener(
        "input",
        () => {

            const formData = {

                name:
                    nameInput.value,

                email:
                    emailInput.value,

                department:
                    departmentInput.value,

                message:
                    messageInput.value

            };


            localStorage.setItem(
                "membershipForm",
                JSON.stringify(formData)
            );

        }
    );


    /* ======================================
       FORM SUBMISSION
    ====================================== */

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            let isValid = true;


            /* ------------------------------
               Name
            ------------------------------ */

            if (
                !nameInput.value.trim()
            ) {

                nameError.textContent =
                    "Please enter your name.";

                isValid = false;

            }

            else {

                nameError.textContent = "";

            }


            /* ------------------------------
               Email
            ------------------------------ */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailInput.value.trim()
            ) {

                emailError.textContent =
                    "Please enter your email.";

                isValid = false;

            }

            else if (
                !emailPattern.test(
                    emailInput.value.trim()
                )
            ) {

                emailError.textContent =
                    "Please enter a valid email.";

                isValid = false;

            }

            else {

                emailError.textContent = "";

            }


            /* ==================================
               SUCCESS
            ================================== */

            if (isValid) {

                alert(
                    "Application submitted successfully!"
                );


                localStorage.removeItem(
                    "membershipForm"
                );


                form.reset();

            }

        }
    );


    console.log(
        "Membership form initialized."
    );

}
/* ==========================================
   DAY 24
   LOCAL FEATURE INITIALIZERS
   FORMS + VALIDATION
========================================== */


/* ==========================================
   CONTACT FORM
========================================== */

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    /* --------------------------------------
       Form may not exist on every route
    -------------------------------------- */

    if (!form) {

        return;

    }


    const nameInput =
        document.getElementById(
            "contactName"
        );

    const emailInput =
        document.getElementById(
            "contactEmail"
        );

    const messageInput =
        document.getElementById(
            "contactMessage"
        );


    const nameError =
        document.getElementById(
            "contactNameError"
        );

    const emailError =
        document.getElementById(
            "contactEmailError"
        );

    const messageError =
        document.getElementById(
            "contactMessageError"
        );


    /* ======================================
       FORM SUBMIT
    ====================================== */

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            let isValid = true;


            /* ------------------------------
               Name validation
            ------------------------------ */

            if (
                !nameInput.value.trim()
            ) {

                nameError.textContent =
                    "Please enter your name.";

                isValid = false;

            }

            else {

                nameError.textContent = "";

            }


            /* ------------------------------
               Email validation
            ------------------------------ */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailInput.value.trim()
            ) {

                emailError.textContent =
                    "Please enter your email.";

                isValid = false;

            }

            else if (
                !emailPattern.test(
                    emailInput.value.trim()
                )
            ) {

                emailError.textContent =
                    "Please enter a valid email.";

                isValid = false;

            }

            else {

                emailError.textContent = "";

            }


            /* ------------------------------
               Message validation
            ------------------------------ */

            if (
                !messageInput.value.trim()
            ) {

                messageError.textContent =
                    "Please enter a message.";

                isValid = false;

            }

            else {

                messageError.textContent = "";

            }


            /* ==================================
               SUCCESS
            ================================== */

            if (isValid) {

                alert(
                    "Message sent successfully!"
                );


                form.reset();

            }

        }
    );


    console.log(
        "Contact form initialized."
    );

}


/* ==========================================
   MEMBERSHIP FORM
========================================== */

function initMembershipForm() {

    const form =
        document.getElementById(
            "membershipForm"
        );


    if (!form) {

        return;

    }


    const nameInput =
        document.getElementById(
            "fullName"
        );

    const emailInput =
        document.getElementById(
            "email"
        );

    const departmentInput =
        document.getElementById(
            "department"
        );

    const messageInput =
        document.getElementById(
            "joinMessage"
        );


    const nameError =
        document.getElementById(
            "nameError"
        );

    const emailError =
        document.getElementById(
            "emailError"
        );


    /* ======================================
       LOAD SAVED FORM DATA
    ====================================== */

    const savedForm =
        localStorage.getItem(
            "membershipForm"
        );


    if (savedForm) {

        try {

            const data =
                JSON.parse(savedForm);


            nameInput.value =
                data.name || "";


            emailInput.value =
                data.email || "";


            departmentInput.value =
                data.department || "";


            messageInput.value =
                data.message || "";

        }

        catch (error) {

            console.error(
                "Could not restore form data.",
                error
            );

        }

    }


    /* ======================================
       SAVE FORM DATA
    ====================================== */

    form.addEventListener(
        "input",
        () => {

            const formData = {

                name:
                    nameInput.value,

                email:
                    emailInput.value,

                department:
                    departmentInput.value,

                message:
                    messageInput.value

            };


            localStorage.setItem(
                "membershipForm",
                JSON.stringify(formData)
            );

        }
    );


    /* ======================================
       FORM SUBMISSION
    ====================================== */

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            let isValid = true;


            /* ------------------------------
               Name
            ------------------------------ */

            if (
                !nameInput.value.trim()
            ) {

                nameError.textContent =
                    "Please enter your name.";

                isValid = false;

            }

            else {

                nameError.textContent = "";

            }


            /* ------------------------------
               Email
            ------------------------------ */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailInput.value.trim()
            ) {

                emailError.textContent =
                    "Please enter your email.";

                isValid = false;

            }

            else if (
                !emailPattern.test(
                    emailInput.value.trim()
                )
            ) {

                emailError.textContent =
                    "Please enter a valid email.";

                isValid = false;

            }

            else {

                emailError.textContent = "";

            }


            /* ==================================
               SUCCESS
            ================================== */

            if (isValid) {

                alert(
                    "Application submitted successfully!"
                );


                localStorage.removeItem(
                    "membershipForm"
                );


                form.reset();

            }

        }
    );


    console.log(
        "Membership form initialized."
    );

}
