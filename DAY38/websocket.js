/* ==========================================
   WEBSOCKET.JS
   DAY 38
========================================== */


/* ==========================================
   WEBSOCKET URL
========================================== */

const WS_URL =
    "wss://ws.postman-echo.com/raw";


/* ==========================================
   SOCKET
========================================== */

let socket = null;


/* ==========================================
   RECONNECT TIMER
========================================== */

let reconnectTimer = null;


/* ==========================================
   CONNECTION CALLBACKS
========================================== */

let onMessageCallback = null;

let onStatusCallback = null;


/* ==========================================
   CONNECT
========================================== */

function connect() {

    console.log(
        "Connecting to WebSocket server..."
    );


    socket =
        new WebSocket(
            WS_URL
        );


    /* ======================================
       CONNECTION OPEN
    ====================================== */

    socket.onopen = () => {

        console.log(
            "WebSocket connection established."
        );


        if (onStatusCallback) {

            onStatusCallback(
                "connected"
            );

        }

    };


    /* ======================================
       MESSAGE RECEIVED
    ====================================== */

    socket.onmessage = (
        event
    ) => {

        console.log(
            "Message received:",
            event.data
        );


        if (onMessageCallback) {

            onMessageCallback(
                event.data
            );

        }

    };


    /* ======================================
       ERROR
    ====================================== */

    socket.onerror = (
        error
    ) => {

        console.error(
            "WebSocket error:",
            error
        );


        if (onStatusCallback) {

            onStatusCallback(
                "error"
            );

        }

    };


    /* ======================================
       CONNECTION CLOSED
    ====================================== */

    socket.onclose = () => {

        console.log(
            "WebSocket connection closed."
        );


        if (onStatusCallback) {

            onStatusCallback(
                "disconnected"
            );

        }


        /* ==================================
           AUTO RECONNECT
           BONUS
        ================================== */

        reconnectTimer =
            setTimeout(
                () => {

                    console.log(
                        "Attempting to reconnect..."
                    );


                    connect();

                },
                3000
            );

    };

}


/* ==========================================
   START CONNECTION
========================================== */

connect();


/* ==========================================
   SEND MESSAGE
========================================== */

export function sendLiveMessage(
    text
) {

    if (!socket) {

        console.error(
            "WebSocket is not initialized."
        );

        return false;

    }


    if (
        socket.readyState !==
        WebSocket.OPEN
    ) {

        console.warn(
            "WebSocket is not connected."
        );

        return false;

    }


    socket.send(
        text
    );


    return true;

}


/* ==========================================
   MESSAGE LISTENER
========================================== */

export function onLiveMessage(
    callback
) {

    onMessageCallback =
        callback;

}


/* ==========================================
   STATUS LISTENER
========================================== */

export function onConnectionStatus(
    callback
) {

    onStatusCallback =
        callback;

}