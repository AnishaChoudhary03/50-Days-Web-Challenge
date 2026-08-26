/* ==========================================
   DAY 43
   GLOBAL STATE STORE
========================================== */


class StateStore {

    constructor(initialState) {

        this.state = initialState;

        this.listeners = [];

    }


    /* ======================================
       SUBSCRIBE
    ====================================== */

    subscribe(listenerFunction) {

        this.listeners.push(
            listenerFunction
        );


        /*
         * BONUS:
         * Return unsubscribe function.
         */

        return () => {

            this.listeners =
                this.listeners.filter(
                    listener =>
                        listener !==
                        listenerFunction
                );

        };

    }


    /* ======================================
       SET STATE
    ====================================== */

    setState(newState) {

        /*
         * Merge old state
         * with new state.
         */

        this.state = {

            ...this.state,

            ...newState

        };


        /*
         * Notify every subscriber.
         */

        this.listeners.forEach(
            listener => {

                listener(
                    this.state
                );

            }
        );

    }


    /* ======================================
       GET STATE
    ====================================== */

    getState() {

        return this.state;

    }

}


/* ==========================================
   SINGLETON GLOBAL STORE
========================================== */

export const globalStore =
    new StateStore({

        cartCount: 0,

        userTheme: "light"

    });