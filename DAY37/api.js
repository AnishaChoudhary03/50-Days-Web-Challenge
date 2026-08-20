/* ==========================================
   API.JS
   DAY 37
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
   FETCH DASHBOARD DATA
   PARALLEL REQUESTS
========================================== */

export async function fetchDashboardData(
    username
) {

    if (!username) {

        throw new Error(
            "Username is required."
        );

    }


    /* ======================================
       CACHE CHECK
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
                "Dashboard served from cache!"
            );


            return cached.data;

        }


        userCache.delete(
            username
        );

    }


    console.log(
        "Starting parallel API requests..."
    );


    /* ======================================
       REQUEST 1
       PROFILE
       
       NO AWAIT HERE
    ====================================== */

    const profilePromise =
        fetchWithRetry(

            `https://api.github.com/users/${username}`,

            {},

            3,

            500

        );


    /* ======================================
       REQUEST 2
       REPOSITORIES
       
       NO AWAIT HERE
    ====================================== */

    const reposPromise =
        fetchWithRetry(

            `https://api.github.com/users/${username}/repos?per_page=5`,

            {},

            3,

            500

        );


    /* ======================================
       REQUEST 3
       FOLLOWERS
       
       NO AWAIT HERE
    ====================================== */

    const followersPromise =
        fetchWithRetry(

            `https://api.github.com/users/${username}/followers?per_page=5`,

            {},

            3,

            500

        );


    console.log(
        "All three requests dispatched!"
    );


    /* ======================================
       WAIT FOR ALL REQUESTS
    ====================================== */

    const responses =
        await Promise.all(

            [

                profilePromise,

                reposPromise,

                followersPromise

            ]

        );


    console.log(
        "All API requests completed!"
    );


    /* ======================================
       PARSE ALL JSON IN PARALLEL
    ====================================== */

    const parsedData =
        await Promise.all(

            responses.map(
                response =>
                    response.json()
            )

        );


    /* ======================================
       ARRAY DESTRUCTURING
    ====================================== */

    const [
        profile,
        repos,
        followers
    ] = parsedData;


    /* ======================================
       CREATE UNIFIED PAYLOAD
    ====================================== */

    const dashboardData = {

        profile,

        repos,

        followers

    };


    /* ======================================
       CACHE RESULT
    ====================================== */

    userCache.set(

        username,

        {

            data: dashboardData,

            timestamp: Date.now()

        }

    );


    /* ======================================
       RETURN
    ====================================== */

    return dashboardData;

}


/* ==========================================
   SINGLE USER DATA
   BACKWARD COMPATIBILITY
========================================== */

export async function fetchUserData(
    username
) {

    const dashboard =
        await fetchDashboardData(
            username
        );


    return dashboard.profile;

}