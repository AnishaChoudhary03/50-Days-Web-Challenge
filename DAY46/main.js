    // ==========================================
// SYNEXUS CORE - DAY 46
// CORE UI SHELL
// ==========================================


// ==========================================
// SELECT ELEMENTS
// ==========================================

const themeToggle =
    document.getElementById("theme-toggle");


// ==========================================
// THEME MANAGEMENT
// ==========================================

function setTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark-theme");

        themeToggle.textContent = "☀️";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light theme"
        );

    } else {

        document.body.classList.remove("dark-theme");

        themeToggle.textContent = "🌙";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark theme"
        );
    }
}


// ==========================================
// LOAD SAVED THEME
// ==========================================

const savedTheme =
    localStorage.getItem("synexus-theme");


// If a theme was previously saved,
// use it. Otherwise use light theme.

if (savedTheme) {

    setTheme(savedTheme);

} else {

    setTheme("light");
}


// ==========================================
// THEME TOGGLE
// ==========================================

themeToggle.addEventListener("click", () => {

    const isDark =
        document.body.classList.contains("dark-theme");

    const newTheme =
        isDark ? "light" : "dark";

    setTheme(newTheme);

    localStorage.setItem(
        "synexus-theme",
        newTheme
    );
});


// ==========================================
// NAVIGATION ACTIVE STATE
// ==========================================

const navLinks =
    document.querySelectorAll(".nav-link");


function updateActiveNavigation() {

    const currentHash =
        window.location.hash || "#/";


    navLinks.forEach(link => {

        const linkHash =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            linkHash === currentHash
        );

    });
}


// Run when page loads
updateActiveNavigation();


// Run whenever URL hash changes
window.addEventListener(
    "hashchange",
    updateActiveNavigation
);


// ==========================================
// APPLICATION START
// ==========================================

console.log(
    "Synexus Core Day 46 initialized successfully."
);