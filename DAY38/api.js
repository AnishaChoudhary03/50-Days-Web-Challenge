import {
    fetchWithRetry
} from "./utils.js";


const userCache = new Map();

const CACHE_TTL =
    5 * 60 * 1000;


export async function fetchDashboardData(
    username
) {

    if (!username) {

        throw new Error(
            "Username is required."
        );

    }


    if (
        userCache.has(username)
    ) {

        const cached =
            userCache.get(username);


        if (
            Date.now() -
            cached.timestamp <
            CACHE_TTL
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


    /* ======================================
       PARALLEL REQUESTS
    ====================================== */

    const profilePromise =
        fetchWithRetry(
            `https://api.github.com/users/${username}`
        );


    const reposPromise =
        fetchWithRetry(
            `https://api.github.com/users/${username}/repos?per_page=5`
        );


    const followersPromise =
        fetchWithRetry(
            `https://api.github.com/users/${username}/followers?per_page=5`
        );


    /* ======================================
       PROMISE.ALL
    ====================================== */

    const responses =
        await Promise.all([
            profilePromise,
            reposPromise,
            followersPromise
        ]);


    /* ======================================
       PARSE IN PARALLEL
    ====================================== */

    const parsedData =
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
    ] = parsedData;


    const dashboardData = {

        profile,

        repos,

        followers

    };


    userCache.set(
        username,
        {
            data: dashboardData,
            timestamp: Date.now()
        }
    );


    return dashboardData;

}