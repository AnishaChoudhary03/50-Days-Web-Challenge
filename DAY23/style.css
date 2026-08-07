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
localStorage.getItem("theme");

if(savedTheme==="dark"){

document.body.classList.add("dark-theme");

themeToggle.textContent="☀️";

}

themeToggle.addEventListener("click",()=>{

document.body.classList.toggle("dark-theme");

if(document.body.classList.contains("dark-theme")){

localStorage.setItem("theme","dark");

themeToggle.textContent="☀️";

}

else{

localStorage.setItem("theme","light");

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

document.querySelectorAll(".nav-links a")

.forEach(link=>{

link.addEventListener("click",()=>{

navLinks.classList.remove("active");

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

document

.querySelector(

this.getAttribute("href")

)

.scrollIntoView({

behavior:"smooth"

});

});

});

/* ==========================================
   DEBOUNCE
========================================== */

function debounce(func,delay){

let timeout;

return function(...args){

clearTimeout(timeout);

timeout=setTimeout(()=>{

func.apply(this,args);

},delay);

};

}

/* ==========================================
   THROTTLE
========================================== */

function throttle(func,delay){

let last=0;

return function(...args){

const now=Date.now();

if(now-last>=delay){

last=now;

func.apply(this,args);

}

};

}

/* ==========================================
   PROJECT DATA
========================================== */

const projectsData=[

{

title:"Community Website",

description:"Official Synexus Core website.",

status:"Active"

},

{

title:"AI Study Assistant",

description:"Learning platform using AI.",

status:"Active"

},

{

title:"Smart Traffic Signal",

description:"IoT emergency signal project.",

status:"Completed"

},

{

title:"Food Saver",

description:"Reduce hostel food wastage.",

status:"Active"

}

];

/* ==========================================
   RENDER PROJECTS
========================================== */

const dynamicGrid=

document.getElementById("dynamic-grid");

function renderProjects(projects){

dynamicGrid.innerHTML="";

projects.forEach(project=>{

const statusClass=

project.status==="Active"

?

"status-active"

:

"status-completed";

dynamicGrid.innerHTML+=`

<div class="initiative-card">

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

}

renderProjects(projectsData);
/* ==========================================
   DAY 22
   KANBAN BOARD
========================================== */

const taskCards = document.querySelectorAll(".task-card");
const columns = document.querySelectorAll(".column");

/* ==========================================
   DRAG START
========================================== */

taskCards.forEach(card => {

    card.addEventListener("dragstart", () => {

        card.classList.add("is-dragging");

    });

});

/* ==========================================
   DRAG END
========================================== */

taskCards.forEach(card => {

    card.addEventListener("dragend", () => {

        card.classList.remove("is-dragging");

    });

});

/* ==========================================
   DROP ZONES
========================================== */

columns.forEach(column => {

    column.addEventListener("dragover", (e) => {

        e.preventDefault();

        const dragging = document.querySelector(".is-dragging");

        column.appendChild(dragging);

    });

});
