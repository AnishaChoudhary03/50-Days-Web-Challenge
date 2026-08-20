/* ==========================================
   UTILS.JS
   DAY 34
========================================== */


/* ==========================================
   DEBOUNCE
========================================== */

export function debounce(
    callback,
    delay = 500
) {

    let timeoutId;


    return function (...args) {

        clearTimeout(timeoutId);


        timeoutId = setTimeout(
            () => {

                callback.apply(
                    this,
                    args
                );

            },
            delay
        );

    };

}


/* ==========================================
   FETCH WITH RETRY
========================================== */

export async function fetchWithRetry(
    url,
    options = {},
    retries = 3,
    backoff = 500
) {


    /* ======================================
       OFFLINE CHECK
       BONUS
    ====================================== */

    if (!navigator.onLine) {

        throw new Error(
            "No internet connection detected."
        );

    }


    /* ======================================
       RETRY LOOP
    ====================================== */

    for (
        let i = 0;
        i < retries;
        i++
    ) {

        try {


            console.log(
                `Network attempt ${i + 1} of ${retries}`
            );


            /* ==============================
               FETCH REQUEST
            ============================== */

            const response =
                await fetch(
                    url,
                    options
                );


            /* ==============================
               SUCCESS
            ============================== */

            if (response.ok) {

                console.log(
                    "Request successful!"
                );


                return response;

            }


            /*
               Convert HTTP failure into
               an error so retry logic runs.
            */

            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }


        catch (error) {


            console.error(
                `Attempt ${i + 1} failed:`,
                error.message
            );


            /* ==============================
               LAST RETRY
            ============================== */

            if (
                i === retries - 1
            ) {

                throw error;

            }


            /* ==============================
               WAIT
            ============================== */

            console.log(
                `Retrying in ${backoff}ms...`
            );


            await new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        backoff
                    )
            );


            /* ==============================
               EXPONENTIAL BACKOFF
            ============================== */

            backoff *= 2;

        }

    }

}