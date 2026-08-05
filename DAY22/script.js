/* ==========================================
   SYNEXUS CORE
   DAY 22
========================================== */

/* ==========================================
   THEME TOGGLE
========================================== */

const themeToggle =
document.getElementById("theme-toggle");

const savedTheme =
localStorage.getItem("synexus_theme");

if(savedTheme==="dark"){

    document.body.classList.add("dark-theme");

    themeToggle.textContent="☀️";

}

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

/* ==========================================
   MOBILE MENU
========================================== */

const menuToggle =
document.querySelector(".menu-toggle");

const navLinks =
document.querySelector(".nav-links");

menuToggle.addEventListener("click",()=>{

    navLinks.classList.toggle("active");

});

/* Close menu after clicking a link */

document.querySelectorAll(".nav-links a")
.forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.classList.remove("active");

    });

});

/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections =
document.querySelectorAll("section");

const navItems =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop =
        section.offsetTop-120;

        if(pageYOffset>=sectionTop){

            current=
            section.getAttribute("id");

        }

    });

    navItems.forEach(item=>{

        item.classList.remove("active");

        if(item.getAttribute("href")==="#" + current){

            item.classList.add("active");

        }

    });

});

/* ==========================================
   SMOOTH SCROLL
========================================== */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(
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
   DAY 22
   DEBOUNCE FUNCTION
========================================== */

function debounce(func, delay){

    let timeout;

    return function(...args){

        clearTimeout(timeout);

        timeout = setTimeout(()=>{

            func.apply(this,args);

        },delay);

    };

}

/* ==========================================
   PROJECT DATA
========================================== */

const projectsData=[

{

title:"Community Website",

description:"Official Synexus Core website developed using HTML, CSS and JavaScript.",

status:"Active"

},

{

title:"AI Study Assistant",

description:"AI-powered learning platform for engineering students.",

status:"Active"

},

{

title:"Smart Traffic Signal",

description:"Emergency vehicle traffic management system using IoT.",

status:"Completed"

},

{

title:"Food Saver App",

description:"Application to reduce food wastage in hostels and PGs.",

status:"Active"

},

{

title:"Attendance Portal",

description:"Digital attendance management system.",

status:"Completed"

},

{

title:"Portfolio Builder",

description:"Website builder helping students create modern portfolios.",

status:"Active"

}

];

/* ==========================================
   DYNAMIC GRID
========================================== */

const dynamicGrid=

document.getElementById(

"dynamic-grid"

);

/* ==========================================
   RENDER PROJECTS
========================================== */

function renderProjects(projects){

dynamicGrid.innerHTML="";

if(projects.length===0){

dynamicGrid.innerHTML=`

<div class="no-results">

<h3>No Projects Found</h3>

<p>Try another keyword.</p>

</div>

`;

return;

}

projects.forEach(project=>{

const statusClass=

project.status==="Active"

?

"status-active"

:

"status-completed";

dynamicGrid.innerHTML+=`

<div class="initiative-card hidden">

<h3>${project.title}</h3>

<p>${project.description}</p>

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

initializeObserver();

}

/* ==========================================
   INITIAL PROJECTS
========================================== */

renderProjects(projectsData);
/* ==========================================
   SEARCH
========================================== */

const searchInput=

document.getElementById(

"search-projects"

);

function searchProjects(){

const keyword=

searchInput.value

.toLowerCase();

const filteredProjects=

projectsData.filter(project=>{

return(

project.title

.toLowerCase()

.includes(keyword)

||

project.description

.toLowerCase()

.includes(keyword)

);

});

renderProjects(

filteredProjects

);

}

/* ==========================================
   DAY 22
   DEBOUNCED SEARCH
========================================== */

const optimizedSearch=

debounce(

searchProjects,

300

);

searchInput.addEventListener(

"input",

optimizedSearch

);
/* ==========================================
   DAY 22
   TASK TRACKER
========================================== */

let taskState =

JSON.parse(

localStorage.getItem("taskState")

) || [];

/* ==========================================
   ELEMENTS
========================================== */

const taskInput =

document.getElementById("task-input");

const addTaskBtn =

document.getElementById("add-task-btn");

const taskList =

document.getElementById("task-list");

/* ==========================================
   SAVE TASKS
========================================== */

function saveTasks(){

localStorage.setItem(

"taskState",

JSON.stringify(taskState)

);

}

/* ==========================================
   RENDER TASKS
========================================== */

function renderTasks(){

taskList.innerHTML="";

taskState.forEach(task=>{

taskList.innerHTML+=`

<li class="${task.completed ? "completed" : ""}">

<div class="task-content">

<input

type="checkbox"

class="task-check"

data-id="${task.id}"

${task.completed ? "checked" : ""}>

<span class="task-text">

${task.text}

</span>

</div>

<button

class="delete-btn"

data-id="${task.id}">

&times;

</button>

</li>

`;

});

}

/* ==========================================
   ADD TASK
========================================== */

addTaskBtn.addEventListener(

"click",

()=>{

const text=

taskInput.value.trim();

if(text===""){

alert(

"Please enter a task."

);

return;

}

const newTask={

id:Date.now(),

text:text,

completed:false

};

taskState.push(

newTask

);

saveTasks();

renderTasks();

taskInput.value="";

taskInput.focus();

});
/* ==========================================
   DELETE TASK
========================================== */

taskList.addEventListener(

"click",

function(e){

if(

e.target.classList.contains(

"delete-btn"

)

){

const targetId=

Number(

e.target.dataset.id

);

taskState=

taskState.filter(task=>{

return task.id!==targetId;

});

saveTasks();

renderTasks();

}

});

/* ==========================================
   COMPLETE TASK
========================================== */

taskList.addEventListener(

"change",

function(e){

if(

e.target.classList.contains(

"task-check"

)

){

const id=

Number(

e.target.dataset.id

);

const task=

taskState.find(task=>{

return task.id===id;

});

if(task){

task.completed=

!task.completed;

}

saveTasks();

renderTasks();

}

});

/* ==========================================
   ENTER KEY
========================================== */

taskInput.addEventListener(

"keypress",

function(e){

if(e.key==="Enter"){

addTaskBtn.click();

}

});

/* ==========================================
   INITIAL LOAD
========================================== */

renderTasks();
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
   RESTORE DRAFT
========================================== */

const savedDraft =
localStorage.getItem("synexus_form_draft");

if(savedDraft){

const draft =
JSON.parse(savedDraft);

fullName.value =
draft.name || "";

email.value =
draft.email || "";

department.value =
draft.department || "";

year.value =
draft.year || "";

message.value =
draft.message || "";

}

/* ==========================================
   AUTO SAVE
========================================== */

let draftTimer;

function saveDraft(){

const draft = {

name:fullName.value,

email:email.value,

department:department.value,

year:year.value,

message:message.value

};

localStorage.setItem(

"synexus_form_draft",

JSON.stringify(draft)

);

draftStatus.classList.add("show");

clearTimeout(draftTimer);

draftTimer = setTimeout(()=>{

draftStatus.classList.remove("show");

},2000);

}

fullName.addEventListener("input",saveDraft);

email.addEventListener("input",saveDraft);

department.addEventListener("change",saveDraft);

year.addEventListener("change",saveDraft);

message.addEventListener("input",saveDraft);

/* ==========================================
   MEMBERSHIP VALIDATION
========================================== */

membershipForm.addEventListener("submit",(e)=>{

e.preventDefault();

document.querySelectorAll(".error").forEach(error=>{

error.textContent="";

});

let valid = true;

const emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(fullName.value.trim()===""){

document.getElementById("nameError").textContent =
"Full Name is required.";

valid = false;

}

if(!emailPattern.test(email.value.trim())){

document.getElementById("emailError").textContent =
"Enter a valid email.";

valid = false;

}

if(department.value===""){

document.getElementById("departmentError").textContent =
"Select your department.";

valid = false;

}

if(year.value===""){

document.getElementById("yearError").textContent =
"Select your academic year.";

valid = false;

}

if(message.value.trim()===""){

alert("Please tell us why you want to join.");

valid = false;

}

if(valid){

alert("🎉 Membership Application Submitted!");

localStorage.removeItem("synexus_form_draft");

membershipForm.reset();

draftStatus.classList.remove("show");

}

});
/* ==========================================
   CONTACT FORM
========================================== */

const contactForm =
document.getElementById("contactForm");

contactForm.addEventListener("submit",(e)=>{

e.preventDefault();

const contactName =
document.getElementById("contactName");

const contactEmail =
document.getElementById("contactEmail");

const contactSubject =
document.getElementById("contactSubject");

const contactMessage =
document.getElementById("contactMessage");

document.getElementById("contactNameError").textContent="";
document.getElementById("contactEmailError").textContent="";
document.getElementById("contactSubjectError").textContent="";
document.getElementById("contactMessageError").textContent="";

let valid = true;

const emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(contactName.value.trim()===""){

document.getElementById("contactNameError").textContent =
"Enter your name.";

valid = false;

}

if(!emailPattern.test(contactEmail.value.trim())){

document.getElementById("contactEmailError").textContent =
"Enter a valid email.";

valid = false;

}

if(contactSubject.value.trim()===""){

document.getElementById("contactSubjectError").textContent =
"Enter a subject.";

valid = false;

}

if(contactMessage.value.trim()===""){

document.getElementById("contactMessageError").textContent =
"Enter your message.";

valid = false;

}

if(valid){

alert("📩 Message Sent Successfully!");

contactForm.reset();

}

});
/* ==========================================
   TESTIMONIALS
========================================== */

const testimonials = [

{

name:"Anisha Choudhary",

quote:"Synexus Core helped me improve my frontend development skills through real-world projects."

},

{

name:"Avani Kulkarni",

quote:"The workshops and hackathons gave me confidence to build complete web applications."

},

{

name:"Mohammed Rayyan",

quote:"A great engineering community where learning becomes practical and enjoyable."

},

{

name:"Levi Godson",

quote:"Working with Synexus Core enhanced my teamwork and problem-solving abilities."

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

let testimonialIndex = 0;

/* ==========================================
   UPDATE TESTIMONIAL
========================================== */

function updateTestimonial(){

testimonialName.textContent =
testimonials[testimonialIndex].name;

testimonialQuote.textContent =
testimonials[testimonialIndex].quote;

}

/* ==========================================
   NEXT
========================================== */

function nextTestimonial(){

testimonialIndex++;

if(testimonialIndex>=testimonials.length){

testimonialIndex=0;

}

updateTestimonial();

}

/* ==========================================
   PREVIOUS
========================================== */

function previousTestimonial(){

testimonialIndex--;

if(testimonialIndex<0){

testimonialIndex=
testimonials.length-1;

}

updateTestimonial();

}

/* ==========================================
   BUTTON EVENTS
========================================== */

nextButton.addEventListener(

"click",

nextTestimonial

);

prevButton.addEventListener(

"click",

previousTestimonial

);

/* ==========================================
   AUTO SLIDER
========================================== */

let testimonialTimer =

setInterval(

nextTestimonial,

4000

);

updateTestimonial();
/* ==========================================
   PROJECT DETAILS MODAL
========================================== */

const modalOverlay =
document.getElementById("modal-overlay");

const modalTitle =
document.getElementById("modal-title");

const modalDescription =
document.getElementById("modal-description");

const modalStatus =
document.getElementById("modal-status");

const closeModal =
document.getElementById("close-modal");

/* ==========================================
   OPEN MODAL
========================================== */

dynamicGrid.addEventListener("click",(e)=>{

if(e.target.classList.contains("view-btn")){

modalTitle.textContent =
e.target.dataset.title;

modalDescription.textContent =
e.target.dataset.description;

modalStatus.textContent =
e.target.dataset.status;

if(e.target.dataset.status==="Active"){

modalStatus.className =
"status status-active";

}

else{

modalStatus.className =
"status status-completed";

}

modalOverlay.style.display="flex";

}

});

/* ==========================================
   CLOSE MODAL
========================================== */

function hideModal(){

modalOverlay.style.display="none";

}

closeModal.addEventListener(

"click",

hideModal

);

modalOverlay.addEventListener(

"click",

(e)=>{

if(e.target===modalOverlay){

hideModal();

}

}

);

/* ==========================================
   ESC KEY
========================================== */

document.addEventListener(

"keydown",

(e)=>{

if(e.key==="Escape"){

hideModal();

}

}

);
/* ==========================================
   DAY 22
   INTERSECTION OBSERVER
========================================== */

function initializeObserver(){

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

/* Animate only once */

observer.unobserve(entry.target);

}

});

},

{

threshold:0.2

}

);

/* Observe all hidden elements */

document.querySelectorAll(".hidden").forEach(element=>{

observer.observe(element);

});

}

/* ==========================================
   INITIALIZE OBSERVER
========================================== */

window.addEventListener("load",()=>{

initializeObserver();

});

/* ==========================================
   RESTART TESTIMONIAL TIMER
========================================== */

function restartTestimonials(){

clearInterval(testimonialTimer);

testimonialTimer = setInterval(

nextTestimonial,

4000

);

}

prevButton.addEventListener(

"click",

restartTestimonials

);

nextButton.addEventListener(

"click",

restartTestimonials

);

/* ==========================================
   SEARCH SHORTCUT
========================================== */

searchInput.addEventListener(

"keydown",

(e)=>{

if(e.key==="Escape"){

searchInput.value="";

renderProjects(projectsData);

}

});

/* ==========================================
   WINDOW RESIZE LOGGER
========================================== */

function throttle(func,delay){

let waiting=false;

return function(...args){

if(!waiting){

func.apply(this,args);

waiting=true;

setTimeout(()=>{

waiting=false;

},delay);

}

};

}

const resizeHandler = throttle(()=>{

console.log(

"Window Size:",

window.innerWidth,

"x",

window.innerHeight

);

},500);

window.addEventListener(

"resize",

resizeHandler

);

/* ==========================================
   PAGE LOAD
========================================== */

window.addEventListener("load",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

/* ==========================================
   DAY 22 READY
========================================== */

console.log("===================================");

console.log(" Synexus Core - Day 22 Loaded ");

console.log(" Scroll Reveal Enabled");

console.log(" Intersection Observer Active");

console.log(" Dynamic Projects Ready");

console.log(" Debounced Search Ready");

console.log(" Task Tracker Ready");

console.log(" Membership Form Ready");

console.log(" Contact Form Ready");

console.log(" Testimonials Ready");

console.log(" Theme Toggle Ready");

console.log("===================================");
