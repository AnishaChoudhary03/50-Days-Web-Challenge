// ==========================================
// SYNEXUS CORE
// DAY 50 - UTILITIES
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


            if (attempt === retries) {

                break;

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


    throw new Error(
        lastError?.message ||
        "Network request failed."
    );

}


// ==========================================
// ESCAPE HTML
// ==========================================

export function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// ==========================================
// DELAY
// ==========================================

export function delay(milliseconds) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                milliseconds
            )
    );

}