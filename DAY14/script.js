/* ==========================================
   SYNEXUS CORE
   DAY 14 JAVASCRIPT
========================================== */

/* ==========================================
   MOBILE NAVIGATION
========================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

/* Close menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


/* ==========================================
   PROJECT DATA
========================================== */

const projectsData = [

{
title:"Community Website",
description:"Official Synexus Core website developed using HTML, CSS and JavaScript.",
status:"Active"
},

{
title:"AI Study Assistant",
description:"An AI-powered platform that helps engineering students prepare for examinations.",
status:"Active"
},

{
title:"Smart Traffic Signal",
description:"Emergency vehicle traffic management system using Arduino and IoT.",
status:"Completed"
},

{
title:"Women Safety Device",
description:"Smart wearable emergency alert device for women's safety.",
status:"Completed"
},

{
title:"Hackathon Management Portal",
description:"Platform to manage hackathon registrations, announcements and leaderboards.",
status:"Active"
},

{
title:"Portfolio Builder",
description:"Website builder helping students create professional portfolios.",
status:"Completed"
}

];


/* ==========================================
   GENERATE INITIATIVE CARDS
========================================== */

const dynamicGrid = document.getElementById("dynamic-grid");

if(dynamicGrid){

projectsData.forEach(project=>{

let cardClass="";
let statusClass="";

if(project.status==="Active"){

cardClass="active";
statusClass="status-active";

}
else{

cardClass="completed";
statusClass="status-completed";

}

dynamicGrid.innerHTML += `

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


/* ==========================================
   JOIN COMMUNITY FORM VALIDATION
========================================== */

const membershipForm=document.getElementById("membershipForm");

if(membershipForm){

membershipForm.addEventListener("submit",function(e){

e.preventDefault();

const fullName=document.getElementById("fullName").value.trim();

const email=document.getElementById("email").value.trim();

const department=document.getElementById("department").value;

const year=document.getElementById("year").value;

const message=document.getElementById("message").value.trim();

document.getElementById("nameError").textContent="";
document.getElementById("emailError").textContent="";
document.getElementById("departmentError").textContent="";
document.getElementById("yearError").textContent="";
document.getElementById("messageError").textContent="";

let valid=true;

if(fullName===""){

document.getElementById("nameError").textContent="Full Name is required.";

valid=false;

}

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(email===""){

document.getElementById("emailError").textContent="Email is required.";

valid=false;

}

else if(!emailPattern.test(email)){

document.getElementById("emailError").textContent="Enter a valid email.";

valid=false;

}

if(department===""){

document.getElementById("departmentError").textContent="Select a department.";

valid=false;

}

if(year===""){

document.getElementById("yearError").textContent="Select your year.";

valid=false;

}

if(message===""){

document.getElementById("messageError").textContent="Tell us why you want to join.";

valid=false;

}

if(valid){

alert("🎉 Thank you for joining Synexus Core!");

membershipForm.reset();

}

});

}


/* ==========================================
   CONTACT FORM
========================================== */

const contactForm=document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener("submit",function(e){

e.preventDefault();

const name=document.getElementById("contactName").value.trim();

const email=document.getElementById("contactEmail").value.trim();

const subject=document.getElementById("contactSubject").value.trim();

const message=document.getElementById("contactMessage").value.trim();

if(name===""||email===""||subject===""||message===""){

alert("Please fill all fields.");

return;

}

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(email)){

alert("Please enter a valid email address.");

return;

}

alert("✅ Your message has been sent successfully!");

contactForm.reset();

});

}


/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});


/* ==========================================
   ACTIVE NAV LINK
========================================== */

const sections=document.querySelectorAll("section");
const navItems=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop-120;
const sectionHeight=section.clientHeight;

if(pageYOffset>=sectionTop){

current=section.getAttribute("id");

}

});

navItems.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#" + current){

link.classList.add("active");

}

});

});


/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log("🚀 Synexus Core Loaded Successfully");
