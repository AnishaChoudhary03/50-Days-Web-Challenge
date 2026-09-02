
// ==========================================
// SYNEXUS CORE
// DAY 49 - UTILITY FUNCTIONS
// ==========================================


// ==========================================
// FETCH WITH RETRY
// ==========================================

export async function fetchWithRetry(
    url,
    options = {},
    retries = 3,
    backoff = 500
) {

    let lastError;


    for (
        let attempt = 0;
        attempt <= retries;
        attempt++
    ) {

        try {

            const response =
                await fetch(
                    url,
                    options
                );


            // Check HTTP response

            if (!response.ok) {

                throw new Error(
                    `HTTP Error: ${response.status}`
                );

            }


            return response;

        } catch (error) {

            lastError = error;


            console.warn(
                `Attempt ${attempt + 1} failed:`,
                error.message
            );


            // Stop if no retries remain

            if (attempt === retries) {

                break;

            }


            // Wait before trying again

            await new Promise(
                resolve => {

                    setTimeout(
                        resolve,
                        backoff
                    );

                }
            );


            // Exponential backoff

            backoff *= 2;

        }

    }


    throw new Error(
        `Request failed after ${
            retries + 1
        } attempts. ${
            lastError.message
        }`
    );

}


// ==========================================
// HTML ESCAPE
// ==========================================

export function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}