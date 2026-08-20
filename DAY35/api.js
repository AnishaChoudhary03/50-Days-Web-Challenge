/* ==========================================
   API.JS
   DAY 35
========================================== */


/* ==========================================
   IMPORT UTILITIES
========================================== */

import {
    fetchWithRetry,
    getAuthHeaders
} from "./utils.js";


/* ==========================================
   SECURE DELETE
========================================== */

export async function secureDeleteResource(
    targetId
) {


    /* ======================================
       GET AUTH HEADERS
       
       This automatically checks
       LocalStorage for auth_token.
    ====================================== */

    const authHeaders =
        getAuthHeaders();


    console.log(
        "Authentication token found."
    );


    /* ======================================
       SECURE DELETE REQUEST
    ====================================== */

    const response =
        await fetchWithRetry(

            `https://jsonplaceholder.typicode.com/posts/${targetId}`,

            {

                method: "DELETE",

                headers: authHeaders

            },

            3,

            500

        );


    /* ======================================
       HANDLE 401
    ====================================== */

    if (
        response.status === 401
    ) {

        throw new Error(
            "Unauthorized: Session expired"
        );

    }


    /* ======================================
       HANDLE OTHER ERRORS
    ====================================== */

    if (!response.ok) {

        throw new Error(
            "Unable to delete resource."
        );

    }


    /* ======================================
       RETURN SERVER RESPONSE
    ====================================== */

    return await response.json();

}


/* ==========================================
   SECURE POST
   OPTIONAL EXTENSION
========================================== */

export async function secureCreateResource(
    resource
) {


    const authHeaders =
        getAuthHeaders();


    const response =
        await fetchWithRetry(

            "https://jsonplaceholder.typicode.com/posts",

            {

                method: "POST",

                headers: authHeaders,

                body:
                    JSON.stringify(
                        resource
                    )

            },

            3,

            500

        );


    if (
        response.status === 401
    ) {

        throw new Error(
            "Unauthorized: Session expired"
        );

    }


    if (!response.ok) {

        throw new Error(
            "Unable to create resource."
        );

    }


    return await response.json();

}


/* ==========================================
   SECURE PUT
   OPTIONAL EXTENSION
========================================== */

export async function secureUpdateResource(
    id,
    resource
) {


    const authHeaders =
        getAuthHeaders();


    const response =
        await fetchWithRetry(

            `https://jsonplaceholder.typicode.com/posts/${id}`,

            {

                method: "PUT",

                headers: authHeaders,

                body:
                    JSON.stringify(
                        resource
                    )

            },

            3,

            500

        );


    if (
        response.status === 401
    ) {

        throw new Error(
            "Unauthorized: Session expired"
        );

    }


    if (!response.ok) {

        throw new Error(
            "Unable to update resource."
        );

    }


    return await response.json();

}