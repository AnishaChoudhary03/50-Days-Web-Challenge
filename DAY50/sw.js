// ==========================================
// SYNEXUS CORE
// DAY 50 - SERVICE WORKER
// ==========================================


// ==========================================
// CACHE NAME
// ==========================================

const CACHE_NAME =
    "synexus-core-day50-v1";


// ==========================================
// CORE FILES
// ==========================================

const CORE_FILES = [

    "./",

    "./index.html",

    "./style.css",

    "./main.js",

    "./router.js",

    "./api.js",

    "./utils.js"

];


// ==========================================
// INSTALL
// ==========================================

self.addEventListener(
    "install",
    event => {

        console.log(
            "Service Worker installing..."
        );


        event.waitUntil(

            caches
                .open(CACHE_NAME)
                .then(cache => {

                    return cache.addAll(
                        CORE_FILES
                    );

                })

        );


        self.skipWaiting();

    }
);


// ==========================================
// ACTIVATE
// ==========================================

self.addEventListener(
    "activate",
    event => {

        console.log(
            "Service Worker activated."
        );


        event.waitUntil(

            caches
                .keys()
                .then(cacheNames => {

                    return Promise.all(

                        cacheNames
                            .filter(
                                name =>
                                    name !==
                                    CACHE_NAME
                            )
                            .map(
                                name =>
                                    caches.delete(
                                        name
                                    )
                            )

                    );

                })

        );


        self.clients.claim();

    }
);


// ==========================================
// FETCH
// ==========================================

self.addEventListener(
    "fetch",
    event => {

        const request =
            event.request;


        // Only handle GET requests

        if (
            request.method !==
            "GET"
        ) {

            return;

        }


        event.respondWith(

            fetch(request)

                .then(response => {

                    // Save successful response

                    const responseClone =
                        response.clone();


                    caches.open(
                        CACHE_NAME
                    )
                    .then(cache => {

                        cache.put(
                            request,
                            responseClone
                        );

                    });


                    return response;

                })


                .catch(() => {

                    // Network failed.
                    // Try cache.

                    return caches.match(
                        request
                    );

                })

        );

    }
);