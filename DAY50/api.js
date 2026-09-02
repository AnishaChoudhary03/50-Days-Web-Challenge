// ==========================================
// SYNEXUS CORE
// DAY 50 - API
// ==========================================


import {
    fetchWithRetry
} from "./utils.js";


// ==========================================
// API BASE
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
// USER
// ==========================================

export async function fetchUser(
    username = "github"
) {

    return fetchJSON(
        `${API_BASE}/users/${username}`
    );

}


// ==========================================
// REPOSITORIES
// ==========================================

export async function fetchRepositories(
    username = "github"
) {

    return fetchJSON(
        `${API_BASE}/users/${username}/repos?sort=updated&per_page=6`
    );

}


// ==========================================
// FOLLOWERS
// ==========================================

export async function fetchFollowers(
    username = "github"
) {

    return fetchJSON(
        `${API_BASE}/users/${username}/followers?per_page=5`
    );

}


// ==========================================
// DASHBOARD DATA
// ==========================================

export async function fetchDashboardData(
    username = "github"
) {

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