import { saveOfflineData } from "./db.js";


export async function createInitiative(payload) {

    /* CHECK INTERNET CONNECTION */

    if (!navigator.onLine) {

        await saveOfflineData(payload);

        alert(
            "You are offline. Your proposal was saved locally!"
        );

        return {
            offline: true
        };

    }


    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json; charset=UTF-8"
                },

                body: JSON.stringify(payload)
            }
        );


        if (!response.ok) {

            throw new Error(
                "Failed to submit proposal"
            );

        }


        const data = await response.json();


        return data;


    }

    catch (error) {

        console.error(error);

        /*
        If the network fails while submitting,
        save the proposal locally.
        */

        await saveOfflineData(payload);

        alert(
            "Network error! Your proposal was saved offline."
        );


        return {
            offline: true
        };

    }

}