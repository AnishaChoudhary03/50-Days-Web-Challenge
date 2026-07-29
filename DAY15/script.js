/* ==========================================
   SYNEXUS CORE - DAY 15
   script.js
========================================== */

// ==========================================
// MOBILE MENU
// ==========================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close menu when clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// ==========================================
// INITIATIVES DATA
// ==========================================

const projectsData = [

    {
        title: "Synexus Community Website",
        description: "Official website for the Synexus Core engineering community.",
        status: "Active"
    },

    {
        title: "AI Study Assistant",
        description: "An AI-powered platform that helps students prepare for exams.",
        status: "Active"
    },

    {
        title: "Smart Traffic Signal",
        description: "IoT-based emergency vehicle traffic management system.",
        status: "Completed"
    },

    {
        title: "Food Saver App",
        description: "Reduces food wastage in hostels and PG accommodations.",
        status: "Active"
    },

    {
        title: "Attendance Portal",
        description: "Digital attendance management system for students.",
        status: "Completed"
    }

];

// ==========================================
// RENDER PROJECTS
// ==========================================

const initiativesGrid = document.getElementById("dynamic-grid");

function renderProjects(projects) {

    initiativesGrid.innerHTML = "";

    if (projects.length === 0) {

        initiativesGrid.innerHTML = `
            <div class="no-results">
                <h3>No Projects Found</h3>
                <p>Try searching with another keyword.</p>
            </div>
        `;

        return;
    }

    projects.forEach(project => {

        const card = `
            <div class="initiative-card ${project.status.toLowerCase()}">

                <h3>${project.title}</h3>

                <p>${project.description}</p>

                <span class="status status-${project.status.toLowerCase()}">
                    ${project.status}
                </span>

            </div>
        `;

        initiativesGrid.innerHTML += card;

    });

}

renderProjects(projectsData);

// ==========================================
// LIVE SEARCH
// ==========================================

const searchInput = document.getElementById("search-projects");

searchInput.addEventListener("keyup", () => {

    const keyword = searchInput.value.toLowerCase();

    const filteredProjects = projectsData.filter(project => {

        return (

            project.title.toLowerCase().includes(keyword) ||

            project.description.toLowerCase().includes(keyword)

        );

    });

    renderProjects(filteredProjects);

});

// ==========================================
// JOIN COMMUNITY FORM
// ==========================================

const membershipForm = document.getElementById("membershipForm");

if (membershipForm) {

    membershipForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let valid = true;

        document.querySelectorAll(".error").forEach(error => {
            error.textContent = "";
        });

        const fullName = document.getElementById("fullName");
        const email = document.getElementById("email");
        const department = document.getElementById("department");
        const year = document.getElementById("year");

        if (fullName.value.trim() === "") {
            document.getElementById("nameError").textContent = "Name is required.";
            valid = false;
        }

        if (!email.value.includes("@")) {
            document.getElementById("emailError").textContent = "Enter a valid email.";
            valid = false;
        }

        if (department.value === "") {
            document.getElementById("departmentError").textContent = "Select a department.";
            valid = false;
        }

        if (year.value === "") {
            document.getElementById("yearError").textContent = "Select a year.";
            valid = false;
        }

        if (valid) {

            alert("🎉 Thank you for joining Synexus Core!");

            membershipForm.reset();

        }

    });

}

// ==========================================
// CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let valid = true;

        document.querySelectorAll(".contact-error").forEach(error => {
            error.textContent = "";
        });

        const contactName = document.getElementById("contactName");
        const contactEmail = document.getElementById("contactEmail");
        const contactSubject = document.getElementById("contactSubject");
        const contactMessage = document.getElementById("contactMessage");

        if (contactName.value.trim() === "") {
            document.getElementById("contactNameError").textContent = "Name is required.";
            valid = false;
        }

        if (!contactEmail.value.includes("@")) {
            document.getElementById("contactEmailError").textContent = "Enter a valid email.";
            valid = false;
        }

        if (contactSubject.value.trim() === "") {
            document.getElementById("contactSubjectError").textContent = "Subject is required.";
            valid = false;
        }

        if (contactMessage.value.trim() === "") {
            document.getElementById("contactMessageError").textContent = "Message is required.";
            valid = false;
        }

        if (valid) {

            alert("📩 Your message has been sent successfully!");

            contactForm.reset();

        }

    });

}

// ==========================================
// ACTIVE NAVIGATION
// ==========================================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

// ==========================================
// PAGE LOADED
// ==========================================

window.addEventListener("load", () => {
    console.log("✅ Synexus Core Website Loaded Successfully!");
});
