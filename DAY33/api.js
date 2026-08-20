/* ==========================================
   API.JS
   DAY 33
   CLIENT-SIDE CACHING
========================================== */


/* ==========================================
   USER CACHE
========================================== */

const userCache = new Map();


/* ==========================================
   CACHE TTL
   5 MINUTES
========================================== */

const CACHE_TTL = 5 * 60 * 1000;


/* ==========================================
   FETCH USER DATA
========================================== */

export async function fetchUserData(
    username
) {


    /* ======================================
       EMPTY USERNAME
    ====================================== */

    if (!username) {

        return null;

    }


    /* ======================================
       CHECK CACHE
    ====================================== */

    if (userCache.has(username)) {

        const cached =
            userCache.get(username);


        /* ==============================
           CHECK CACHE AGE
        ============================== */

        const cacheAge =
            Date.now() -
            cached.timestamp;


        /* ==============================
           CACHE STILL VALID
        ============================== */

        if (cacheAge < CACHE_TTL) {

            console.log(
                "Serving from cache!"
            );


            return cached.data;

        }


        /* ==============================
           CACHE EXPIRED
        ============================== */

        console.log(
            "Cache expired. Fetching fresh data..."
        );


        userCache.delete(username);

    }


    /* ======================================
       FETCH FROM GITHUB
    ====================================== */

    console.log(
        "Fetching from GitHub..."
    );


    const response =
        await fetch(
            `https://api.github.com/users/${username}`
        );


    /* ======================================
       USER NOT FOUND
    ====================================== */

    if (response.status === 404) {

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
       OTHER ERRORS
    ====================================== */

    if (!response.ok) {

        throw new Error(
            "Unable to fetch GitHub profile."
        );

    }


    /* ======================================
       PARSE RESPONSE
    ====================================== */

    const responseData =
        await response.json();


    /* ======================================
       SAVE TO CACHE
    ====================================== */

    userCache.set(
        username,
        {

            data: responseData,

            timestamp: Date.now()

        }
    );


    console.log(
        "Saved new data to cache."
    );


    /* ======================================
       RETURN DATA
    ====================================== */

    return responseData;

}


/* ==========================================
   CREATE INITIATIVE
========================================== */

export async function createInitiative(
    initiative
) {

    const response =
        await fetch(
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

            }
        );


    if (!response.ok) {

        throw new Error(
            "Unable to create initiative."
        );

    }


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
        await fetch(
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

            }
        );


    if (!response.ok) {

        throw new Error(
            "Unable to update initiative."
        );

    }


    return await response.json();

}


/* ==========================================
   DELETE INITIATIVE
========================================== */

export async function deleteInitiative(
    id
) {

    const response =
        await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}`,
            {

                method: "DELETE"

            }
        );


    if (!response.ok) {

        throw new Error(
            "Unable to delete initiative."
        );

    }


    return await response.json();

}