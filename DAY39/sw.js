/* ==========================================
   DAY 39
   SERVICE WORKER
========================================== */


/* ==========================================
   CACHE VERSION
========================================== */

const CACHE_NAME =
    "platform-cache-v1";


/* ==========================================
   CORE ASSETS
========================================== */

const CORE_ASSETS = [

    "./",

    "./index.html",

    "./style.css",

    "./main.js",

    "./api.js",

    "./utils.js",

    "./websocket.js"

];


/* ==========================================
   INSTALL EVENT
========================================== */

self.addEventListener(
    "install",
    event => {

        console.log(
            "Service Worker: Installing..."
        );


        event.waitUntil(

            caches.open(
                CACHE_NAME
            )
            .then(
                cache => {

                    console.log(
                        "Service Worker: Caching files..."
                    );


                    return cache.addAll(
                        CORE_ASSETS
                    );

                }
            )

        );


        /*
         * Activate the new Service Worker
         * immediately.
         */

        self.skipWaiting();

    }
);


/* ==========================================
   ACTIVATE EVENT
========================================== */

self.addEventListener(
    "activate",
    event => {

        console.log(
            "Service Worker: Activated."
        );


        event.waitUntil(

            caches.keys()
            .then(
                cacheNames => {

                    return Promise.all(

                        cacheNames.map(
                            cacheName => {

                                if (
                                    cacheName !==
                                    CACHE_NAME
                                ) {

                                    console.log(
                                        "Deleting old cache:",
                                        cacheName
                                    );


                                    return caches.delete(
                                        cacheName
                                    );

                                }

                            }
                        )

                    );

                }
            )

        );


        /*
         * Take control of pages immediately.
         */

        self.clients.claim();

    }
);


/* ==========================================
   FETCH EVENT
========================================== */

self.addEventListener(
    "fetch",
    event => {

        /*
         * Only handle normal HTTP requests.
         */

        if (
            event.request.method !==
            "GET"
        ) {

            return;

        }


        event.respondWith(

            caches.match(
                event.request
            )
            .then(
                cachedResponse => {

                    /* ==========================
                       CACHE HIT
                    ========================== */

                    if (
                        cachedResponse
                    ) {

                        console.log(
                            "Serving from cache:",
                            event.request.url
                        );


                        return cachedResponse;

                    }


                    /* ==========================
                       CACHE MISS
                    ========================== */

                    console.log(
                        "Fetching from network:",
                        event.request.url
                    );


                    return fetch(
                        event.request
                    );

                }
            )

        );

    }
);