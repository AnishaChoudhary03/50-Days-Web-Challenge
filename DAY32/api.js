/* ==========================================
   API.JS

   All API communication lives here.
========================================== */


const POSTS_API =
    "https://jsonplaceholder.typicode.com/posts";


/* ==========================================
   GET
   GITHUB CONTRIBUTOR
========================================== */

export async function fetchContributor(
    username
) {

    if (!username) {
        return null;
    }


    const response =
        await fetch(
            `https://api.github.com/users/${username}`
        );


    if (response.status === 404) {

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


    if (!response.ok) {

        throw new Error(
            "Unable to fetch developer."
        );

    }


    return await response.json();

}


/* ==========================================
   POST
   CREATE INITIATIVE
========================================== */

export async function createInitiative(
    initiative
) {

    const response =
        await fetch(
            POSTS_API,
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
   PUT
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
            "This proposal was updated using the PUT method.",

        userId: 1

    };


    const response =
        await fetch(
            `${POSTS_API}/${id}`,
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
   DELETE
   DELETE INITIATIVE
========================================== */

export async function deleteInitiative(
    id
) {

    const response =
        await fetch(
            `${POSTS_API}/${id}`,
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
