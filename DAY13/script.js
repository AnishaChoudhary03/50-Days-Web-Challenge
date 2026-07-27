/* ==========================================
   SYNEXUS CORE - SCRIPT.JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       MOBILE MENU
    ========================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("nav-active");
            menuToggle.classList.toggle("active");

        });

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("nav-active");
                menuToggle.classList.remove("active");

            });

        });

    }

    /* ==========================
       CONTACT FORM
    ========================== */

    const contactForm = document.querySelector(".contact-form");

    if (contactForm && contactForm.id !== "membershipForm") {

        contactForm.addEventListener("submit", function (e) {

            e.preventDefault();

            alert("✅ Thank you! Your message has been sent.");

            contactForm.reset();

        });

    }

    /* ==========================
       MEMBERSHIP FORM VALIDATION
    ========================== */

    const membershipForm = document.getElementById("membershipForm");

    if (membershipForm) {

        membershipForm.addEventListener("submit", function (e) {

            /* Stop page reload */
            e.preventDefault();

            /* Get Input Elements */
            const fullName = document.getElementById("fullName");
            const email = document.getElementById("email");

            /* Get Error Elements */
            const nameError = document.getElementById("nameError");
            const emailError = document.getElementById("emailError");

            /* Get Values */
            const nameValue = fullName.value.trim();
            const emailValue = email.value.trim();

            /* Reset Previous Errors */

            nameError.textContent = "";
            emailError.textContent = "";

            fullName.classList.remove("error", "success");
            email.classList.remove("error", "success");

            /* ==========================
               VALIDATE NAME
            ========================== */

            if (nameValue === "") {

                fullName.classList.add("error");

                nameError.textContent =
                    "Full Name cannot be empty.";

                fullName.focus();

                return;

            }

            /* ==========================
               VALIDATE EMAIL
            ========================== */

            if (!emailValue.includes("@")) {

                email.classList.add("error");

                emailError.textContent =
                    "Please enter a valid email address.";

                email.focus();

                return;

            }

            /* ==========================
               SUCCESS
            ========================== */

            fullName.classList.add("success");
            email.classList.add("success");

            console.log("Application Ready for Server");
                        // Success message
            alert("🎉 Membership Application Submitted Successfully!");

            // Clear all form fields
            membershipForm.reset();

            // Remove success border after reset
            fullName.classList.remove("success");
            email.classList.remove("success");

        });

        /* ==========================
           REAL-TIME NAME VALIDATION
        ========================== */

        const fullName = document.getElementById("fullName");
        const email = document.getElementById("email");

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");

        if (fullName) {

            fullName.addEventListener("input", function () {

                if (this.value.trim() !== "") {

                    this.classList.remove("error");
                    this.classList.add("success");

                    nameError.textContent = "";

                } else {

                    this.classList.remove("success");

                }

            });

        }

        /* ==========================
           REAL-TIME EMAIL VALIDATION
        ========================== */

        if (email) {

            email.addEventListener("input", function () {

                if (this.value.includes("@")) {

                    this.classList.remove("error");
                    this.classList.add("success");

                    emailError.textContent = "";

                } else {

                    this.classList.remove("success");

                }

            });

        }

    }

});
