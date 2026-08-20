/* ==========================================
   API.JS
   DAY 34
========================================== */


/* ==========================================
   IMPORT RETRY UTILITY
========================================== */

import {
    fetchWithRetry
} from "./utils.js";


/* ==========================================
   CACHE
========================================== */

const userCache = new Map();


/* ==========================================
   CACHE TTL
========================================== */

const CACHE_TTL =
    5 * 60 * 1000;


/* ==========================================
   GITHUB USER DATA
========================================== */

export async function fetchUserData(
    username
) {


    if (!username) {

        return null;

    }


    /* ======================================
       CHECK CACHE
    ====================================== */

    if (
        userCache.has(username)
    ) {

        const cached =
            userCache.get(username);


        const cacheAge =
            Date.now() -
            cached.timestamp;


        if (
            cacheAge < CACHE_TTL
        ) {

            console.log(
                "Serving from cache!"
            );


            return cached.data;

        }


        console.log(
            "Cache expired."
        );


        userCache.delete(
            username
        );

    }


    /* ======================================
       FETCH WITH RETRY
    ====================================== */

    console.log(
        "Fetching from GitHub with retry support..."
    );


    const response =
        await fetchWithRetry(

            `https://api.github.com/users/${username}`,

            {},

            3,

            500

        );


    /* ======================================
       404
    ====================================== */

    if (
        response.status === 404
    ) {

        throw new Error(
            "GitHub user not found."
        );

    }


    /* ======================================
       RATE LIMIT
    ====================================== */

    if (
        response.status === 403 ||
        response.status === 429
    ) {

        throw new Error(
            "API rate limit exceeded. Please wait a moment."
        );

    }


    /* ======================================
       PARSE RESPONSE
    ====================================== */

    const data =
        await response.json();


    /* ======================================
       SAVE TO CACHE
    ====================================== */

    userCache.set(

        username,

        {

            data: data,

            timestamp: Date.now()

        }

    );


    console.log(
        "New profile saved to cache."
    );


    return data;

}


/* ==========================================
   CREATE INITIATIVE
========================================== */

export async function createInitiative(
    initiative
) {


    const response =
        await fetchWithRetry(

            "https://jsonplaceholder.typicode.com/posts",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json; charset=UTF-8"

                },

                body:
                    JSON.stringify(
                        initiative
                    )

            },

            3,

            500

        );


    return await response.json();

}


/* ==========================================
   UPDATE INITIATIVE
========================================== */

export async function updateInitiative(
    id
) {


    const updatedData = {

        id: id,

        title:
            "Technical Initiative [UPDATED]",

        body:
            "This proposal was updated successfully.",

        userId: 1

    };


    const response =
        await fetchWithRetry(

            `https://jsonplaceholder.typicode.com/posts/${id}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type":
                        "application/json; charset=UTF-8"

                },

                body:
                    JSON.stringify(
                        updatedData
                    )

            },

            3,

            500

        );


    return await response.json();

}


/* ==========================================
   DELETE INITIATIVE
========================================== */

export async function deleteInitiative(
    id
) {


    const response =
        await fetchWithRetry(

            `https://jsonplaceholder.typicode.com/posts/${id}`,

            {

                method: "DELETE"

            },

            3,

            500

        );


    return await response.json();

}