/* ==========================================
   SYNEXUS CORE
   DAY 18
   PART 1
   THEME TOGGLE + MOBILE MENU
========================================== */

// ==========================================
// THEME TOGGLE
// ==========================================

const themeToggle = document.getElementById("theme-toggle");

// Load saved theme

const savedTheme = localStorage.getItem("synexus_theme");

if(savedTheme==="dark"){

    document.body.classList.add("dark-theme");

    themeToggle.textContent="☀️";

}

else if(savedTheme==="light"){

    document.body.classList.remove("dark-theme");

    themeToggle.textContent="🌙";

}

// ==========================================
// BONUS
// SYSTEM DARK MODE
// ==========================================

else{

    const prefersDark=
    window.matchMedia("(prefers-color-scheme: dark)");

    if(prefersDark.matches){

        document.body.classList.add("dark-theme");

        themeToggle.textContent="☀️";

    }

}

// ==========================================
// TOGGLE THEME
// ==========================================

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("dark-theme");

    if(document.body.classList.contains("dark-theme")){

        localStorage.setItem(
            "synexus_theme",
            "dark"
        );

        themeToggle.textContent="☀️";

    }

    else{

        localStorage.setItem(
            "synexus_theme",
            "light"
        );

        themeToggle.textContent="🌙";

    }

});

// ==========================================
// MOBILE MENU
// ==========================================

const menuToggle=
document.querySelector(".menu-toggle");

const navLinks=
document.querySelector(".nav-links");

menuToggle.addEventListener("click",()=>{

    navLinks.classList.toggle("active");

});

// ==========================================
// CLOSE MOBILE MENU
// ==========================================

document.querySelectorAll(".nav-links a")
.forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.classList.remove("active");

    });

});

// ==========================================
// ACTIVE NAVIGATION
// ==========================================

const sections=
document.querySelectorAll("section");

const navItems=
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=
        section.offsetTop-120;

        if(pageYOffset>=sectionTop){

            current=
            section.getAttribute("id");

        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});

// ==========================================
// SMOOTH SCROLL
// ==========================================

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
   DYNAMIC INITIATIVES
========================================== */

// ==========================================
// PROJECTS DATA
// ==========================================

const projectsData = [

    {

        title:"Community Website",

        description:"Official Synexus Core website built using HTML, CSS and JavaScript.",

        status:"Active"

    },

    {

        title:"AI Study Assistant",

        description:"An AI-powered learning platform for engineering students.",

        status:"Active"

    },

    {

        title:"Smart Traffic Signal",

        description:"IoT-based emergency vehicle traffic management system.",

        status:"Completed"

    },

    {

        title:"Food Saver App",

        description:"A smart platform to reduce food wastage in PGs and hostels.",

        status:"Active"

    },

    {

        title:"Attendance Portal",

        description:"Digital attendance management for colleges and communities.",

        status:"Completed"

    },

    {

        title:"Portfolio Builder",

        description:"A portfolio website generator for students and developers.",

        status:"Active"

    }

];

// ==========================================
// GRID CONTAINER
// ==========================================

const gridContainer =
document.getElementById("dynamic-grid");

// ==========================================
// RENDER PROJECTS
// ==========================================

function renderProjects(dataArray){

    gridContainer.innerHTML="";

    if(dataArray.length===0){

        gridContainer.innerHTML=`

        <div class="no-results">

            <h3>

                No initiatives found

            </h3>

            <p>

                Try another search keyword.

            </p>

        </div>

        `;

        return;

    }

    dataArray.forEach(project=>{

        const statusClass=

        project.status==="Active"

        ? "status-active"

        : "status-completed";

        const cardClass=

        project.status==="Active"

        ? "active"

        : "completed";

        gridContainer.innerHTML+=`

        <div class="initiative-card ${cardClass}">

            <h3>

                ${project.title}

            </h3>

            <p>

                ${project.description}

            </p>

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
// LIVE SEARCH
// ==========================================

const searchInput=
document.getElementById("search-projects");

if(searchInput){

searchInput.addEventListener("input",()=>{

const searchTerm=

searchInput.value.toLowerCase();

const filteredProjects=

projectsData.filter(project=>{

return(

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

/* ==========================================
   SAVE ON INPUT
========================================== */

fullName.addEventListener("input",saveDraft);

email.addEventListener("input",saveDraft);

department.addEventListener("change",saveDraft);

year.addEventListener("change",saveDraft);

message.addEventListener("input",saveDraft);

/* ==========================================
   MEMBERSHIP VALIDATION
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
        .textContent="Full name is required.";

        valid=false;

    }

    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email.value.trim())){

        document.getElementById("emailError")
        .textContent="Enter a valid email address.";

        valid=false;

    }

    if(department.value===""){

        document.getElementById("departmentError")
        .textContent="Please select your department.";

        valid=false;

    }

    if(year.value===""){

        document.getElementById("yearError")
        .textContent="Please select your academic year.";

        valid=false;

    }

    if(message.value.trim()===""){

        alert("Please tell us why you want to join Synexus Core.");

        valid=false;

    }

    if(valid){

        alert("🎉 Membership Application Submitted Successfully!");

        localStorage.removeItem("synexus_form_draft");

        membershipForm.reset();

        draftStatus.classList.remove("show");

    }

});
/* ==========================================
   COMMUNITY TESTIMONIALS
========================================== */

const testimonialsData = [

    {
        name: "Anisha Choudhary",
        quote: "Synexus Core helped me improve my web development skills through real-world projects and teamwork."
    },

    {
        name: "Avani Kulkarni",
        quote: "The workshops and hackathons boosted my confidence and gave me practical engineering experience."
    },

    {
        name: "Mohammed Rayyan",
        quote: "Working with Synexus Core taught me collaboration, leadership, and problem-solving skills."
    },

    {
        name: "Levi Godson",
        quote: "Every initiative challenged me to think creatively and build innovative technical solutions."
    },

    {
        name: "Liki N",
        quote: "Synexus Core is the perfect place to learn modern technologies while making great friends."
    }

];

/* ==========================================
   TESTIMONIAL ELEMENTS
========================================== */

const testimonialName =
document.getElementById("testimonial-name");

const testimonialQuote =
document.getElementById("testimonial-quote");

const prevButton =
document.getElementById("prev-testimonial");

const nextButton =
document.getElementById("next-testimonial");

let currentIndex = 0;

let testimonialTimer;

/* ==========================================
   UPDATE TESTIMONIAL
========================================== */

function updateTestimonial(){

    const currentData =
    testimonialsData[currentIndex];

    testimonialName.textContent =
    currentData.name;

    testimonialQuote.textContent =
    currentData.quote;

}

/* ==========================================
   NEXT TESTIMONIAL
========================================== */

function nextTestimonial(){

    currentIndex++;

    if(currentIndex >= testimonialsData.length){

        currentIndex = 0;

    }

    updateTestimonial();

}

/* ==========================================
   PREVIOUS TESTIMONIAL
========================================== */

function previousTestimonial(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = testimonialsData.length - 1;

    }

    updateTestimonial();

}

/* ==========================================
   INITIAL LOAD
========================================== */

if(testimonialName && testimonialQuote){

    updateTestimonial();

    testimonialTimer =
    setInterval(nextTestimonial,3000);

}

/* ==========================================
   MANUAL BUTTONS
========================================== */

if(prevButton){

    prevButton.addEventListener("click",()=>{

        clearInterval(testimonialTimer);

        previousTestimonial();

    });

}

if(nextButton){

    nextButton.addEventListener("click",()=>{

        clearInterval(testimonialTimer);

        nextTestimonial();

    });

}

/* ==========================================
   CONTACT FORM
========================================== */

const contactForm =
document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener("submit",function(e){

e.preventDefault();

let valid = true;

document.getElementById("contactNameError").textContent="";
document.getElementById("contactEmailError").textContent="";
document.getElementById("contactSubjectError").textContent="";
document.getElementById("contactMessageError").textContent="";

const contactName =
document.getElementById("contactName");

const contactEmail =
document.getElementById("contactEmail");

const contactSubject =
document.getElementById("contactSubject");

const contactMessage =
document.getElementById("contactMessage");

if(contactName.value.trim()===""){

document.getElementById("contactNameError").textContent="Enter your name.";

valid=false;

}

const emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(contactEmail.value.trim())){

document.getElementById("contactEmailError").textContent="Enter a valid email.";

valid=false;

}

if(contactSubject.value.trim()===""){

document.getElementById("contactSubjectError").textContent="Subject is required.";

valid=false;

}

if(contactMessage.value.trim()===""){

document.getElementById("contactMessageError").textContent="Message cannot be empty.";

valid=false;

}

if(valid){

alert("📩 Message Sent Successfully!");

contactForm.reset();

}

});

}

/* ==========================================
   PAGE LOADED
========================================== */

window.addEventListener("load",()=>{

console.log("✅ Synexus Core Day 18 Loaded Successfully!");

});
