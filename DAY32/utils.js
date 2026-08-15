/* ==========================================
   UTILS.JS

   Reusable utility functions
========================================== */


/* ==========================================
   DEBOUNCE
========================================== */

export function debounce(
    callback,
    delay = 500
) {

    let timeoutId;

    return function (...args) {

        clearTimeout(timeoutId);

        timeoutId = setTimeout(
            () => {

                callback.apply(
                    this,
                    args
                );

            },
            delay
        );

    };

}
