/* ==========================================
   DAY 41
   MAIN.JS
========================================== */


/* ==========================================
   DOM ELEMENTS
========================================== */

const processButton =
    document.getElementById(
        "process-btn"
    );


const cancelButton =
    document.getElementById(
        "cancel-btn"
    );


const status =
    document.getElementById(
        "status"
    );


const result =
    document.getElementById(
        "result"
    );


/* ==========================================
   CREATE WEB WORKER
========================================== */

let myWorker =
    new Worker(
        "./worker.js"
    );


/* ==========================================
   RUN PROCESS
========================================== */

processButton.addEventListener(
    "click",
    () => {

        status.textContent =
            "Processing in background...";


        result.textContent = "";


        processButton.disabled =
            true;


        cancelButton.disabled =
            false;


        /*
         * Send START command
         * to the worker.
         */

        myWorker.postMessage(
            "START"
        );

    }
);


/* ==========================================
   RECEIVE WORKER RESULT
========================================== */

myWorker.onmessage = function (
    event
) {

    console.log(
        "Result:",
        event.data
    );


    result.textContent =
        `Process completed! Result: ${event.data}`;


    status.textContent =
        "Heavy process completed successfully.";


    processButton.disabled =
        false;


    cancelButton.disabled =
        true;

};


/* ==========================================
   WORKER ERROR
========================================== */

myWorker.onerror = function (
    error
) {

    console.error(
        "Worker error:",
        error
    );


    status.textContent =
        "An error occurred in the worker.";


    result.textContent = "";


    processButton.disabled =
        false;


    cancelButton.disabled =
        true;

};


/* ==========================================
   CANCEL WORKER
========================================== */

cancelButton.addEventListener(
    "click",
    () => {

        /*
         * Terminate the current worker.
         */

        myWorker.terminate();


        status.textContent =
            "Process cancelled.";


        result.textContent = "";


        processButton.disabled =
            false;


        cancelButton.disabled =
            true;


        /*
         * Create a new worker so
         * the process can be started again.
         */

        myWorker =
            new Worker(
                "./worker.js"
            );


        /*
         * Reattach message listener
         */

        myWorker.onmessage =
            function (event) {

                result.textContent =
                    `Process completed! Result: ${event.data}`;


                status.textContent =
                    "Heavy process completed successfully.";


                processButton.disabled =
                    false;


                cancelButton.disabled =
                    true;

            };


        /*
         * Reattach error listener
         */

        myWorker.onerror =
            function (error) {

                console.error(
                    "Worker error:",
                    error
                );


                status.textContent =
                    "Worker error occurred.";


                processButton.disabled =
                    false;


                cancelButton.disabled =
                    true;

            };

    }
);


/* ==========================================
   INITIAL STATE
========================================== */

cancelButton.disabled =
    true;


console.log(
    "Day 41 - Web Worker ready."
);