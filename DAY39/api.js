/* ==========================================
   API.JS
========================================== */

import {
    fetchWithRetry
} from "./utils.js";


const userCache =
    new Map();


const CACHE_TTL =
    5 * 60 * 1000;


/* ==========================================
   DASHBOARD DATA
========================================== */

export async function fetchDashboardData(
    username
) {

    if (!username) {

        throw new Error(
            "Username is required."
        );

    }


    /* CACHE */

    if (
        userCache.has(username)
    ) {

        const cached =
            userCache.get(
                username
            );


        const age =
            Date.now() -
            cached.timestamp;


        if (
            age < CACHE_TTL
        ) {

            console.log(
                "Serving dashboard from cache!"
            );


            return cached.data;

        }


        userCache.delete(
            username
        );

    }


    /* PROFILE */

    const profilePromise =
        fetchWithRetry(

            `https://api.github.com/users/${username}`

        );


    /* REPOSITORIES */

    const reposPromise =
        fetchWithRetry(

            `https://api.github.com/users/${username}/repos?per_page=5`

        );


    /* FOLLOWERS */

    const followersPromise =
        fetchWithRetry(

            `https://api.github.com/users/${username}/followers?per_page=5`

        );


    /* PARALLEL REQUESTS */

    const responses =
        await Promise.all([

            profilePromise,

            reposPromise,

            followersPromise

        ]);


    /* PARALLEL JSON */

    const data =
        await Promise.all(

            responses.map(
                response =>
                    response.json()
            )

        );


    const [
        profile,
        repos,
        followers
    ] = data;


    const dashboardData = {

        profile,

        repos,

        followers

    };


    userCache.set(

        username,

        {

            data:
                dashboardData,

            timestamp:
                Date.now()

        }

    );


    return dashboardData;

}