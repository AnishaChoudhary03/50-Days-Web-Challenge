/* ==========================================
   UTILS.JS
   DAY 35
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


            const response =
                await fetch(
                    url,
                    options
                );


            if (response.ok) {

                console.log(
                    "Request successful!"
                );


                return response;

            }


            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }


        catch (error) {

            console.error(
                `Attempt ${i + 1} failed:`,
                error.message
            );


            if (
                i === retries - 1
            ) {

                throw error;

            }


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


            backoff *= 2;

        }

    }

}


/* ==========================================
   GET AUTH HEADERS
   DAY 35 BONUS
========================================== */

export function getAuthHeaders() {

    const token =
        localStorage.getItem(
            "auth_token"
        );


    /* ======================================
       TOKEN CHECK
    ====================================== */

    if (!token) {

        throw new Error(
            "Access Denied: No authentication token found."
        );

    }


    /* ======================================
       RETURN AUTH HEADERS
    ====================================== */

    return {

        "Authorization":
            "Bearer " + token,

        "Content-Type":
            "application/json; charset=UTF-8"

    };

}