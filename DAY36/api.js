/* ==========================================
   API.JS
========================================== */

import {
    fetchWithRetry
} from "./utils.js";


/* ==========================================
   CACHE
========================================== */

const userCache = new Map();


const CACHE_TTL =
    5 * 60 * 1000;


/* ==========================================
   FETCH USER DATA
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


        userCache.delete(
            username
        );

    }


    /* ======================================
       FETCH API
    ====================================== */

    const response =
        await fetchWithRetry(

            `https://api.github.com/users/${username}`,

            {},

            3,

            500

        );


    /* ======================================
       ERROR HANDLING
    ====================================== */

    if (
        response.status === 404
    ) {

        throw new Error(
            "GitHub user not found."
        );

    }


    if (
        response.status === 403 ||
        response.status === 429
    ) {

        throw new Error(
            "API rate limit exceeded. Please wait a moment."
        );

    }


    /* ======================================
       PARSE DATA
    ====================================== */

    const data =
        await response.json();


    /* ======================================
       SAVE CACHE
    ====================================== */

    userCache.set(

        username,

        {

            data: data,

            timestamp: Date.now()

        }

    );


    return data;

}