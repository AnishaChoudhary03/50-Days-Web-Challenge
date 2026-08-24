/* ==========================================
   DAY 39
   MAIN.JS
========================================== */


/* ==========================================
   DOM ELEMENTS
========================================== */

const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


const networkStatus =
    document.getElementById(
        "network-status"
    );


const networkMessage =
    document.getElementById(
        "network-message"
    );


const networkIcon =
    document.getElementById(
        "network-icon"
    );


/* ==========================================
   SERVICE WORKER REGISTRATION
========================================== */

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register("./sw.js")

                .then(
                    registration => {

                        console.log(
                            "Service Worker registered successfully."
                        );


                        console.log(
                            "Scope:",
                            registration.scope
                        );

                    }
                )

                .catch(
                    error => {

                        console.error(
                            "Service Worker registration failed:",
                            error
                        );

                    }
                );

        }
    );

}


/* ==========================================
   NETWORK STATUS
========================================== */

function updateNetworkStatus() {

    if (
        navigator.onLine
    ) {

        networkStatus.textContent =
            "You are Online";


        networkMessage.textContent =
            "The application can communicate with the network.";


        networkIcon.classList.remove(
            "offline"
        );


        networkIcon.innerHTML =
            '<i class="fas fa-wifi"></i>';

    }

    else {

        networkStatus.textContent =
            "You are Offline";


        networkMessage.textContent =
            "The application is using cached resources.";


        networkIcon.classList.add(
            "offline"
        );


        networkIcon.innerHTML =
            '<i class="fas fa-wifi-slash"></i>';

    }

}


/* ==========================================
   INITIAL NETWORK CHECK
========================================== */

updateNetworkStatus();


/* ==========================================
   ONLINE EVENT
========================================== */

window.addEventListener(
    "online",
    () => {

        updateNetworkStatus();

        console.log(
            "Internet connection restored."
        );

    }
);


/* ==========================================
   OFFLINE EVENT
========================================== */

window.addEventListener(
    "offline",
    () => {

        updateNetworkStatus();

        console.log(
            "Internet connection lost."
        );

    }
);


/* ==========================================
   DARK MODE
========================================== */

const savedTheme =
    localStorage.getItem(
        "theme"
    );


if (
    savedTheme === "dark"
) {

    document.body.classList.add(
        "dark-theme"
    );

    themeToggle.textContent =
        "☀️";

}


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-theme"
        );


        const isDark =
            document.body.classList.contains(
                "dark-theme"
            );


        localStorage.setItem(
            "theme",
            isDark
                ? "dark"
                : "light"
        );


        themeToggle.textContent =
            isDark
                ? "☀️"
                : "🌙";

    }
);


/* ==========================================
   APPLICATION START
========================================== */

console.log(
    "Day 39 - Offline Architecture loaded."
);