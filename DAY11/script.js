/* ==========================================
   DAY 11 - JAVASCRIPT BASICS
========================================== */

// Select the Hero Heading
const heroTitle = document.querySelector(".hero-title");

// Select the Explore Button
const heroButton = document.querySelector(".hero-btn");

// Change the heading text when the page loads
heroTitle.textContent = "Welcome to Synexus Core 🚀";

// Add a click event to the Explore button
heroButton.addEventListener("click", function () {

    // Toggle a CSS class
    heroButton.classList.toggle("active-state");

    // Change button text
    if (heroButton.classList.contains("active-state")) {
        heroButton.textContent = "Thanks for Exploring! 🎉";
    } else {
        heroButton.textContent = "Explore";
    }

});

// Contact Form
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Get input values
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;

    // Simple validation
    if (name === "" || email === "") {

        alert("Please fill in all required fields.");

        return;
    }

    // Success message
    alert("Thank you, " + name + "! Your message has been sent successfully.");

    // Reset the form
    contactForm.reset();

});
