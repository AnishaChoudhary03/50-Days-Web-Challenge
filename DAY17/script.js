/* ==========================================
   SYNEXUS CORE
   DAY 17 - PART 1
   THEME TOGGLE + MOBILE MENU
========================================== */

// ==========================================
// THEME ELEMENT
// ==========================================

const themeToggle = document.getElementById("theme-toggle");

// ==========================================
// LOAD SAVED THEME
// ==========================================

const savedTheme = localStorage.getItem("synexus_theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-theme");

    themeToggle.textContent = "☀️";

}

else if (savedTheme === "light") {

    document.body.classList.remove("dark-theme");

    themeToggle.textContent = "🌙";

}

// ==========================================
// BONUS
// SYSTEM DARK MODE
// ==========================================

else {

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    if (prefersDark.matches) {

        document.body.classList.add("dark-theme");

        themeToggle.textContent = "☀️";

    }

}

// ==========================================
// THEME TOGGLE
// ==========================================

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {

        localStorage.setItem("synexus_theme", "dark");

        themeToggle.textContent = "☀️";

    }

    else {

        localStorage.setItem("synexus_theme", "light");

        themeToggle.textContent = "🌙";

    }

});

// ==========================================
// MOBILE MENU
// ==========================================

const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

// Close mobile menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});
/* ==========================================
   DYNAMIC INITIATIVES
========================================== */

// ==========================================
// PROJECT DATA
// ==========================================

const projectsData = [

    {
        title: "Community Website",
        description: "Official Synexus Core website built using HTML, CSS and JavaScript.",
        status: "Active"
    },

    {
        title: "AI Study Assistant",
        description: "An AI-powered learning platform for engineering students.",
        status: "Active"
    },

    {
        title: "Smart Traffic Signal",
        description: "IoT-based emergency vehicle traffic management system.",
        status: "Completed"
    },

    {
        title: "Food Saver App",
        description: "Reduces food wastage in PGs and hostels.",
        status: "Active"
    },

    {
        title: "Attendance Portal",
        description: "Smart digital attendance management system.",
        status: "Completed"
    },

    {
        title: "Portfolio Builder",
        description: "A portfolio website generator for students.",
        status: "Active"
    }

];

// ==========================================
// SELECT GRID
// ==========================================

const gridContainer = document.getElementById("dynamic-grid");

// ==========================================
// RENDER FUNCTION
// ==========================================

function renderProjects(dataArray) {

    gridContainer.innerHTML = "";

    if (dataArray.length === 0) {

        gridContainer.innerHTML = `

        <div class="no-results">

            <h3>No initiatives found</h3>

            <p>Try searching with another keyword.</p>

        </div>

        `;

        return;

    }

    dataArray.forEach(project => {

        const statusClass =
            project.status === "Active"
                ? "status-active"
                : "status-completed";

        const cardClass =
            project.status === "Active"
                ? "active"
                : "completed";

        gridContainer.innerHTML += `

        <div class="initiative-card ${cardClass}">

            <h3>${project.title}</h3>

            <p>${project.description}</p>

            <span class="status ${statusClass}">

                ${project.status}

            </span>

        </div>

        `;

    });

}

// ==========================================
// INITIAL LOAD
// ==========================================

renderProjects(projectsData);

// ==========================================
// SEARCH PROJECTS
// ==========================================

const searchInput =
document.getElementById("search-projects");

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const searchTerm =
        searchInput.value.toLowerCase();

        const filteredProjects =
        projectsData.filter(project => {

            return (

                project.title
                .toLowerCase()
                .includes(searchTerm)

                ||

                project.description
                .toLowerCase()
                .includes(searchTerm)

            );

        });

        renderProjects(filteredProjects);

    });

}
/* ==========================================
   MEMBERSHIP FORM
========================================== */

const membershipForm =
document.getElementById("membershipForm");

const fullName =
document.getElementById("fullName");

const email =
document.getElementById("email");

const department =
document.getElementById("department");

const year =
document.getElementById("year");

const message =
document.getElementById("message");

const draftStatus =
document.getElementById("draftStatus");

/* ==========================================
   RESTORE SAVED DRAFT
========================================== */

const savedDraft =
localStorage.getItem("synexus_form_draft");

if(savedDraft){

    const formData =
    JSON.parse(savedDraft);

    fullName.value =
    formData.name || "";

    email.value =
    formData.email || "";

    department.value =
    formData.department || "";

    year.value =
    formData.year || "";

    message.value =
    formData.message || "";

}

/* ==========================================
   AUTO SAVE
========================================== */

let saveTimer;

function saveDraft(){

    const formData={

        name:fullName.value,

        email:email.value,

        department:department.value,

        year:year.value,

        message:message.value

    };

    localStorage.setItem(

        "synexus_form_draft",

        JSON.stringify(formData)

    );

    draftStatus.classList.add("show");

    clearTimeout(saveTimer);

    saveTimer=setTimeout(()=>{

        draftStatus.classList.remove("show");

    },2000);

}

fullName.addEventListener("input",saveDraft);

email.addEventListener("input",saveDraft);

department.addEventListener("change",saveDraft);

year.addEventListener("change",saveDraft);

message.addEventListener("input",saveDraft);

/* ==========================================
   MEMBERSHIP FORM VALIDATION
========================================== */

membershipForm.addEventListener("submit",function(e){

    e.preventDefault();

    let valid=true;

    document.querySelectorAll(".error")
    .forEach(error=>{

        error.textContent="";

    });

    if(fullName.value.trim()===""){

        document.getElementById("nameError")
        .textContent="Full Name is required.";

        valid=false;

    }

    if(!email.value.includes("@")){

        document.getElementById("emailError")
        .textContent="Enter a valid email.";

        valid=false;

    }

    if(department.value===""){

        document.getElementById("departmentError")
        .textContent="Select your department.";

        valid=false;

    }

    if(year.value===""){

        document.getElementById("yearError")
        .textContent="Select your academic year.";

        valid=false;

    }

    if(message.value.trim()===""){

        alert(
        "Please tell us why you want to join Synexus Core."
        );

        valid=false;

    }

    if(valid){

        alert(
        "🎉 Membership Application Submitted Successfully!"
        );

        localStorage.removeItem(
        "synexus_form_draft"
        );

        membershipForm.reset();

        draftStatus.classList.remove("show");

    }

});
/* ==========================================
   CONTACT FORM
========================================== */

const contactForm =
document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener("submit",function(e){

e.preventDefault();

let valid=true;

/* Clear Previous Errors */

document.getElementById("contactNameError").textContent="";
document.getElementById("contactEmailError").textContent="";
document.getElementById("contactSubjectError").textContent="";
document.getElementById("contactMessageError").textContent="";

/* Get Values */

const contactName=
document.getElementById("contactName");

const contactEmail=
document.getElementById("contactEmail");

const contactSubject=
document.getElementById("contactSubject");

const contactMessage=
document.getElementById("contactMessage");

/* Name */

if(contactName.value.trim()===""){

document.getElementById("contactNameError").textContent=
"Please enter your name.";

valid=false;

}

/* Email */

if(!contactEmail.value.includes("@")){

document.getElementById("contactEmailError").textContent=
"Please enter a valid email.";

valid=false;

}

/* Subject */

if(contactSubject.value.trim()===""){

document.getElementById("contactSubjectError").textContent=
"Subject is required.";

valid=false;

}

/* Message */

if(contactMessage.value.trim()===""){

document.getElementById("contactMessageError").textContent=
"Message cannot be empty.";

valid=false;

}

/* Success */

if(valid){

alert("📩 Message Sent Successfully!");

contactForm.reset();

}

});

}

/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections=
document.querySelectorAll("section");

const navItems=
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=
section.offsetTop-120;

const sectionHeight=
section.clientHeight;

if(pageYOffset>=sectionTop){

current=section.getAttribute("id");

}

});

navItems.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=
document.querySelector(
this.getAttribute("href")
);

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

/* ==========================================
   PAGE LOAD
========================================== */

window.addEventListener("load",()=>{

console.log(
"✅ Synexus Core Website Loaded Successfully!"
);

});
