/* ==========================================
   DAY 16 - LOCAL STORAGE
   PART 1
========================================== */

// ==========================================
// SELECT FORM ELEMENTS
// ==========================================

const membershipForm = document.getElementById("membershipForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const department = document.getElementById("department");
const year = document.getElementById("year");
const message = document.getElementById("message");

const draftStatus = document.getElementById("draftStatus");

// ==========================================
// RESTORE SAVED DRAFT
// ==========================================

const savedDraft = localStorage.getItem("synexus_form_draft");

if (savedDraft) {

    const formData = JSON.parse(savedDraft);

    fullName.value = formData.name || "";
    email.value = formData.email || "";
    department.value = formData.department || "";
    year.value = formData.year || "";
    message.value = formData.message || "";

}

// ==========================================
// AUTO SAVE FUNCTION
// ==========================================

let saveTimer;

function saveDraft() {

    const formData = {

        name: fullName.value,
        email: email.value,
        department: department.value,
        year: year.value,
        message: message.value

    };

    localStorage.setItem(

        "synexus_form_draft",

        JSON.stringify(formData)

    );

    draftStatus.classList.add("show");

    clearTimeout(saveTimer);

    saveTimer = setTimeout(() => {

        draftStatus.classList.remove("show");

    }, 2000);

}

// ==========================================
// SAVE WHILE USER TYPES
// ==========================================

fullName.addEventListener("input", saveDraft);

email.addEventListener("input", saveDraft);

department.addEventListener("change", saveDraft);

year.addEventListener("change", saveDraft);

message.addEventListener("input", saveDraft);
/* ==========================================
   DAY 16 - LOCAL STORAGE
   PART 2
========================================== */

// ==========================================
// FORM SUBMIT
// ==========================================

membershipForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let valid = true;

    // Clear previous error messages
    document.querySelectorAll(".error").forEach(error => {
        error.textContent = "";
    });

    // Name Validation
    if (fullName.value.trim() === "") {

        document.getElementById("nameError").textContent =
            "Please enter your full name.";

        valid = false;

    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {

        document.getElementById("emailError").textContent =
            "Please enter a valid email address.";

        valid = false;

    }

    // Department Validation
    if (department.value === "") {

        document.getElementById("departmentError").textContent =
            "Please select your department.";

        valid = false;

    }

    // Year Validation
    if (year.value === "") {

        document.getElementById("yearError").textContent =
            "Please select your year.";

        valid = false;

    }

    // Message Validation
    if (message.value.trim() === "") {

        alert("Please tell us why you want to join Synexus Core.");

        valid = false;

    }

    // ======================================
    // SUCCESS
    // ======================================

    if (valid) {

        alert("🎉 Membership Application Submitted Successfully!");

        // Remove saved draft
        localStorage.removeItem("synexus_form_draft");

        // Reset form
        membershipForm.reset();

        // Hide draft indicator
        draftStatus.classList.remove("show");

        console.log("Membership form submitted successfully.");

    }

});

// ==========================================
// PAGE LOAD MESSAGE
// ==========================================

window.addEventListener("load", () => {

    console.log("✅ Synexus Core Day 16 Loaded Successfully!");

});
