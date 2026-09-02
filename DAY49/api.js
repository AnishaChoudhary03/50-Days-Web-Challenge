// ==========================================
// SYNEXUS CORE
// DAY 49 - API DATA STREAM
// ==========================================


import {
    fetchWithRetry
} from "./utils.js";


// ==========================================
// API BASE URL
// ==========================================

const API_BASE =
    "https://api.github.com";


// ==========================================
// FETCH JSON
// ==========================================

async function fetchJSON(url) {

    const response =
        await fetchWithRetry(
            url
        );


    return response.json();

}


// ==========================================
// FETCH USER
// ==========================================

export async function fetchUser(
    username = "github"
) {

    return fetchJSON(
        `${API_BASE}/users/${username}`
    );

}


// ==========================================
// FETCH REPOSITORIES
// ==========================================

export async function fetchRepositories(
    username = "github"
) {

    return fetchJSON(
        `${API_BASE}/users/${username}/repos?sort=updated&per_page=6`
    );

}


// ==========================================
// FETCH FOLLOWERS
// ==========================================

export async function fetchFollowers(
    username = "github"
) {

    return fetchJSON(
        `${API_BASE}/users/${username}/followers?per_page=5`
    );

}


// ==========================================
// FETCH DASHBOARD DATA
// ==========================================

export async function fetchDashboardData(
    username = "github"
) {

    /*
        All three requests start together.

        User
        Repositories
        Followers

        Promise.all waits for all of them.
    */

    const [
        user,
        repositories,
        followers
    ] = await Promise.all([

        fetchUser(username),

        fetchRepositories(username),

        fetchFollowers(username)

    ]);


    return {

        user,

        repositories,

        followers

    };

}