/* ==========================================
   UTILS.JS
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

        clearTimeout(
            timeoutId
        );


        timeoutId =
            setTimeout(
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

    if (
        !navigator.onLine
    ) {

        throw new Error(
            "No internet connection detected."
        );

    }


    for (
        let i = 0;
        i < retries;
        i++
    ) {

        try {

            const response =
                await fetch(
                    url,
                    options
                );


            if (
                response.ok
            ) {

                return response;

            }


            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }

        catch (error) {

            if (
                i === retries - 1
            ) {

                throw error;

            }


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
   AUTH HEADERS
========================================== */

export function getAuthHeaders() {

    const token =
        localStorage.getItem(
            "auth_token"
        );


    if (!token) {

        throw new Error(
            "Access Denied: No authentication token found."
        );

    }


    return {

        "Authorization":
            "Bearer " + token,

        "Content-Type":
            "application/json; charset=UTF-8"

    };

}