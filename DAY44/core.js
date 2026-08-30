/* ==========================================
   DAY 44
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


        // Return unsubscribe function
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

        this.state = {

            ...this.state,

            ...newState

        };


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
   GLOBAL STORE
========================================== */

export const globalStore =
    new StateStore({

        cartCount: 0,

        userTheme: "light"

    });