/* ==========================================
   SYNEXUS CORE
   DAY 19
   PART 1
========================================== */

/* ==========================================
   THEME TOGGLE
========================================== */

const themeToggle =
document.getElementById("theme-toggle");

/* ==========================================
   LOAD SAVED THEME
========================================== */

const savedTheme =
localStorage.getItem("synexus_theme");

if(savedTheme==="dark"){

    document.body.classList.add("dark-theme");

    themeToggle.textContent="☀️";

}

else if(savedTheme==="light"){

    document.body.classList.remove("dark-theme");

    themeToggle.textContent="🌙";

}

/* ==========================================
   SYSTEM DARK MODE
========================================== */

else{

    const prefersDark=

    window.matchMedia(

        "(prefers-color-scheme: dark)"

    );

    if(prefersDark.matches){

        document.body.classList.add(

            "dark-theme"

        );

        themeToggle.textContent="☀️";

    }

}

/* ==========================================
   TOGGLE THEME
========================================== */

themeToggle.addEventListener(

"click",

()=>{

document.body.classList.toggle(

"dark-theme"

);

if(

document.body.classList.contains(

"dark-theme"

)

){

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

}

);

/* ==========================================
   MOBILE MENU
========================================== */

const menuToggle=

document.querySelector(

".menu-toggle"

);

const navLinks=

document.querySelector(

".nav-links"

);

menuToggle.addEventListener(

"click",

()=>{

navLinks.classList.toggle(

"active"

);

}

);

/* ==========================================
   CLOSE MOBILE MENU
========================================== */

document

.querySelectorAll(

".nav-links a"

)

.forEach(

link=>{

link.addEventListener(

"click",

()=>{

navLinks.classList.remove(

"active"

);

}

);

}

);

/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections=

document.querySelectorAll(

"section"

);

const navItems=

document.querySelectorAll(

".nav-links a"

);

window.addEventListener(

"scroll",

()=>{

let current="";

sections.forEach(

section=>{

const sectionTop=

section.offsetTop-120;

if(

pageYOffset>=sectionTop

){

current=

section.getAttribute(

"id"

);

}

}

);

navItems.forEach(

item=>{

item.classList.remove(

"active"

);

if(

item.getAttribute(

"href"

)==="#"+current

){

item.classList.add(

"active"

);

}

}

);

}

);

/* ==========================================
   SMOOTH SCROLL
========================================== */

document

.querySelectorAll(

'a[href^="#"]'

)

.forEach(

anchor=>{

anchor.addEventListener(

"click",

function(e){

e.preventDefault();

const target=

document.querySelector(

this.getAttribute(

"href"

)

);

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

}

);

}

);

/* ==========================================
   PAGE LOADED
========================================== */

window.addEventListener(

"load",

()=>{

console.log(

"Synexus Core Loaded Successfully"

);

}

);
/* ==========================================
   INITIATIVES DATA
========================================== */

const projectsData = [

    {

        title: "Community Website",

        description:
        "Official Synexus Core website built using HTML, CSS and JavaScript.",

        status: "Active"

    },

    {

        title: "AI Study Assistant",

        description:
        "AI-powered learning platform for engineering students.",

        status: "Active"

    },

    {

        title: "Smart Traffic Signal",

        description:
        "IoT-based emergency vehicle traffic management system.",

        status: "Completed"

    },

    {

        title: "Food Saver App",

        description:
        "Application that helps reduce food wastage in PGs and hostels.",

        status: "Active"

    },

    {

        title: "Attendance Portal",

        description:
        "Digital attendance management system for educational institutions.",

        status: "Completed"

    },

    {

        title: "Portfolio Builder",

        description:
        "Portfolio website generator for students and developers.",

        status: "Active"

    }

];

/* ==========================================
   GRID CONTAINER
========================================== */

const gridContainer =

document.getElementById(

"dynamic-grid"

);

/* ==========================================
   RENDER PROJECTS
========================================== */

function renderProjects(dataArray){

gridContainer.innerHTML="";

if(dataArray.length===0){

gridContainer.innerHTML=`

<div class="no-results">

<h3>

No Initiatives Found

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

?

"status-active"

:

"status-completed";

const cardClass=

project.status==="Active"

?

"active"

:

"completed";

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

<button

class="view-btn"

data-title="${project.title}"

data-description="${project.description}"

data-status="${project.status}">

View Details

</button>

</div>

`;

});

}

/* ==========================================
   INITIAL LOAD
========================================== */

renderProjects(

projectsData

);

/* ==========================================
   SEARCH
========================================== */

const searchInput=

document.getElementById(

"search-projects"

);

searchInput.addEventListener(

"input",

()=>{

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

renderProjects(

filteredProjects

);

}

);

/* ==========================================
   DAY 19
   EVENT DELEGATION
========================================== */

const modalOverlay =

document.getElementById(

"modal-overlay"

);

const modalTitle =

document.getElementById(

"modal-title"

);

const modalDescription =

document.getElementById(

"modal-description"

);

const modalStatus =

document.getElementById(

"modal-status"

);

/* ==========================================
   SINGLE EVENT LISTENER
========================================== */

gridContainer.addEventListener(

"click",

function(e){

if(

e.target.classList.contains(

"view-btn"

)

){

const title=

e.target.getAttribute(

"data-title"

);

const description=

e.target.getAttribute(

"data-description"

);

const status=

e.target.getAttribute(

"data-status"

);

modalTitle.textContent=

title;

modalDescription.textContent=

description;

modalStatus.textContent=

status;

if(status==="Active"){

modalStatus.className=

"status status-active";

}

else{

modalStatus.className=

"status status-completed";

}

modalOverlay.style.display=

"flex";

}

}

);
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
   SAVE WHILE TYPING
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

    const emailPattern=

    /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

    if(!emailPattern.test(email.value.trim())){

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

        draftStatus.classList.remove(

        "show"

        );

    }

});

/* ==========================================
   CONTACT FORM
========================================== */

const contactForm=

document.getElementById("contactForm");

contactForm.addEventListener("submit",function(e){

e.preventDefault();

let valid=true;

document.getElementById("contactNameError").textContent="";

document.getElementById("contactEmailError").textContent="";

document.getElementById("contactSubjectError").textContent="";

document.getElementById("contactMessageError").textContent="";

const contactName=

document.getElementById("contactName");

const contactEmail=

document.getElementById("contactEmail");

const contactSubject=

document.getElementById("contactSubject");

const contactMessage=

document.getElementById("contactMessage");

if(contactName.value.trim()===""){

document.getElementById("contactNameError")

.textContent="Enter your name.";

valid=false;

}

if(!emailPattern.test(contactEmail.value.trim())){

document.getElementById("contactEmailError")

.textContent="Enter a valid email.";

valid=false;

}

if(contactSubject.value.trim()===""){

document.getElementById("contactSubjectError")

.textContent="Enter subject.";

valid=false;

}

if(contactMessage.value.trim()===""){

document.getElementById("contactMessageError")

.textContent="Enter message.";

valid=false;

}

if(valid){

alert(

"📩 Message Sent Successfully!"

);

contactForm.reset();

}

});
/* ==========================================
   COMMUNITY TESTIMONIALS
========================================== */

const testimonialsData = [

    {

        name: "Anisha Choudhary",

        quote: "Synexus Core helped me improve my web development skills through real-world projects."

    },

    {

        name: "Avani Kulkarni",

        quote: "The workshops and hackathons boosted my confidence and practical knowledge."

    },

    {

        name: "Mohammed Rayyan",

        quote: "Working with Synexus Core improved my teamwork and leadership abilities."

    },

    {

        name: "Levi Godson",

        quote: "Every project challenged me to think creatively and solve real-world problems."

    },

    {

        name: "Liki N",

        quote: "Synexus Core is a wonderful place to learn modern technologies and meet passionate students."

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
   NEXT
========================================== */

function nextTestimonial(){

    currentIndex++;

    if(currentIndex >= testimonialsData.length){

        currentIndex = 0;

    }

    updateTestimonial();

}

/* ==========================================
   PREVIOUS
========================================== */

function previousTestimonial(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex =
        testimonialsData.length - 1;

    }

    updateTestimonial();

}

/* ==========================================
   START AUTO ROTATION
========================================== */

updateTestimonial();

testimonialTimer =
setInterval(nextTestimonial,3000);

/* ==========================================
   MANUAL BUTTONS
========================================== */

prevButton.addEventListener("click",()=>{

    clearInterval(testimonialTimer);

    previousTestimonial();

});

nextButton.addEventListener("click",()=>{

    clearInterval(testimonialTimer);

    nextTestimonial();

});

/* ==========================================
   MODAL ELEMENTS
========================================== */

const closeModal =
document.getElementById("close-modal");

/* ==========================================
   CLOSE MODAL FUNCTION
========================================== */

function closeProjectModal(){

    modalOverlay.style.display = "none";

}

/* ==========================================
   CLOSE BUTTON
========================================== */

closeModal.addEventListener("click",()=>{

    closeProjectModal();

});

/* ==========================================
   OVERLAY CLICK
========================================== */

modalOverlay.addEventListener("click",(e)=>{

    if(e.target === modalOverlay){

        closeProjectModal();

    }

});

/* ==========================================
   ESCAPE KEY
========================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key === "Escape"){

        closeProjectModal();

    }

});

/* ==========================================
   PAGE READY
========================================== */

window.addEventListener("load",()=>{

    console.log("✅ Synexus Core Day 19 Loaded Successfully!");

});
