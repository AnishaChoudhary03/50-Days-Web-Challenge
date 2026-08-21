/* ==========================================
   MAIN.JS
   DAY 38
========================================== */


/* ==========================================
   IMPORT WEBSOCKET FUNCTIONS
========================================== */

import {
    sendLiveMessage,
    onLiveMessage,
    onConnectionStatus
} from "./websocket.js";


/* ==========================================
   DOM ELEMENTS
========================================== */

const liveFeed =
    document.getElementById(
        "live-feed"
    );


const wsInput =
    document.getElementById(
        "ws-input"
    );


const wsSend =
    document.getElementById(
        "ws-send"
    );


const connectionStatus =
    document.getElementById(
        "connection-status"
    );


const connectionDot =
    document.getElementById(
        "connection-dot"
    );


const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


/* ==========================================
   ADD MESSAGE TO FEED
========================================== */

function addMessage(
    text,
    type
) {

    const message =
        document.createElement(
            "div"
        );


    message.className =
        `message ${type}`;


    message.textContent =
        text;


    liveFeed.appendChild(
        message
    );


    /* ======================================
       AUTO SCROLL
    ====================================== */

    liveFeed.scrollTop =
        liveFeed.scrollHeight;

}


/* ==========================================
   SEND MESSAGE
========================================== */

function sendMessage() {

    const text =
        wsInput.value.trim();


    if (!text) {

        return;

    }


    const sent =
        sendLiveMessage(
            text
        );


    if (!sent) {

        addMessage(
            "Message could not be sent. WebSocket is not connected.",
            "system-message"
        );

        return;

    }


    /* ======================================
       DISPLAY SENT MESSAGE
    ====================================== */

    addMessage(
        `You: ${text}`,
        "sent"
    );


    /* ======================================
       CLEAR INPUT
    ====================================== */

    wsInput.value = "";


    wsInput.focus();

}


/* ==========================================
   SEND BUTTON
========================================== */

wsSend.addEventListener(
    "click",
    sendMessage
);


/* ==========================================
   ENTER KEY
========================================== */

wsInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            sendMessage();

        }

    }
);


/* ==========================================
   RECEIVE MESSAGE
========================================== */

onLiveMessage(
    message => {

        addMessage(
            `Server: ${message}`,
            "received"
        );

    }
);


/* ==========================================
   CONNECTION STATUS
========================================== */

onConnectionStatus(
    status => {


        if (
            status === "connected"
        ) {

            connectionStatus.textContent =
                "Connected";


            connectionDot.className =
                "status-dot connected";


            addMessage(
                "✓ WebSocket connection established.",
                "system-message"
            );

        }


        else if (
            status === "disconnected"
        ) {

            connectionStatus.textContent =
                "Disconnected — reconnecting...";


            connectionDot.className =
                "status-dot disconnected";


            addMessage(
                "⚠ Connection closed. Reconnecting in 3 seconds...",
                "system-message"
            );

        }


        else if (
            status === "error"
        ) {

            connectionStatus.textContent =
                "Connection error";


            connectionDot.className =
                "status-dot disconnected";

        }

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
    "Day 38 - WebSocket architecture loaded."
);