/* ==========================================
   DAY 41
   WEB WORKER
========================================== */


/*
 * Listen for messages from main.js
 */

self.onmessage = function (event) {

    console.log(
        "Worker received:",
        event.data
    );


    /*
     * Start the heavy process
     */

    if (event.data === "START") {

        let result = 0;


        /*
         * Heavy CPU-intensive loop
         */

        for (
            let i = 0;
            i < 100000000;
            i++
        ) {

            result += Math.sqrt(i);

        }


        /*
         * Send result back
         * to the main thread
         */

        self.postMessage(result);

    }

};