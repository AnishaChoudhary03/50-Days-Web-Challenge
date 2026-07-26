/* ==========================================
   SYNEXUS CORE - SCRIPT.JS
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================
       MOBILE MENU
    ========================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("nav-active");
            menuToggle.classList.toggle("active");

        });

        // Close menu when a navigation link is clicked
        const links = document.querySelectorAll(".nav-links a");

        links.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("nav-active");
                menuToggle.classList.remove("active");

            });

        });

    }

    /* ==========================
       HERO BUTTON
    ========================== */

    const heroButton = document.querySelector(".hero-btn");

    if (heroButton) {

        heroButton.addEventListener("click", function () {

            heroButton.classList.toggle("active-state");

        });

    }

    /* ==========================
       CONTACT FORM
    ========================== */

    const contactForm = document.querySelector("#contact form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (e) {

            e.preventDefault();

            alert("✅ Thank you! Your message has been sent successfully.");

            contactForm.reset();

        });

    }

    /* ==========================
       JOIN COMMUNITY FORM
    ========================== */

    const joinForm = document.querySelector("#join form");

    if (joinForm) {

        joinForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const name = document.querySelector("#name").value.trim();
            const college = document.querySelector("#college").value.trim();
            const email = document.querySelector("#email").value.trim();

            if (name === "" || college === "" || email === "") {

                alert("⚠ Please fill in all required fields.");
                return;

            }

            alert("🎉 Thank you, " + name + "! Your application has been submitted successfully.");

            joinForm.reset();

        });

    }

});
