/* ==========================================
   WEBSOCKET.JS
========================================== */

const WS_URL =
    "wss://ws.postman-echo.com/raw";


let socket;


function connect() {

    socket =
        new WebSocket(
            WS_URL
        );


    socket.onopen = () => {

        console.log(
            "WebSocket connected."
        );

    };


    socket.onmessage = event => {

        console.log(
            "WebSocket message:",
            event.data
        );

    };


    socket.onerror = error => {

        console.error(
            "WebSocket error:",
            error
        );

    };


    socket.onclose = () => {

        console.log(
            "WebSocket disconnected."
        );

    };

}


connect();


export function sendLiveMessage(
    text
) {

    if (
        socket &&
        socket.readyState ===
        WebSocket.OPEN
    ) {

        socket.send(
            text
        );

        return true;

    }


    return false;

}