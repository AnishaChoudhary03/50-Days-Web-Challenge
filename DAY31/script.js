/* ==========================================
   SYNEXUS CORE
   DAY 31
   INFINITE SCROLL
========================================== */


/* ==========================================
   SELECT ELEMENTS
========================================== */

const dataFeed =
    document.getElementById(
        "data-feed"
    );

const scrollSentinel =
    document.getElementById(
        "scroll-sentinel"
    );

const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


/* ==========================================
   PAGINATION STATE
========================================== */

let currentPage = 1;

const limit = 10;

let isLoading = false;


/* ==========================================
   END OF DATA STATE
========================================== */

let hasMoreData = true;


/* ==========================================
   FETCH NEXT PAGE
========================================== */

async function fetchNextPage() {


    /* ======================================
       STATE LOCK
    ====================================== */

    if (isLoading || !hasMoreData) {

        return;

    }


    isLoading = true;


    /* ======================================
       SHOW LOADING
    ====================================== */

    scrollSentinel.innerHTML = `

        <div class="spinner"></div>

        <span>
            Loading more...
        </span>

    `;


    try {


        /* ==================================
           PAGINATED API REQUEST
        ================================== */

        const response =
            await fetch(
                `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${limit}`
            );


        /* ==================================
           CHECK RESPONSE
        ================================== */

        if (!response.ok) {

            throw new Error(
                "Failed to fetch posts."
            );

        }


        /* ==================================
           PARSE JSON
        ================================== */

        const data =
            await response.json();


        /* ==================================
           CHECK FOR END OF DATA
        ================================== */

        if (data.length === 0) {

            hasMoreData = false;


            scrollSentinel.innerHTML = `

                <span>
                    You've reached the end! 🎉
                </span>

            `;


            /* ==================================
               DISCONNECT OBSERVER
            ================================== */

            observer.disconnect();


            return;

        }


        /* ==================================
           RENDER POSTS
        ================================== */

        data.forEach(
            (post) => {

                dataFeed.innerHTML += `

                    <article
                        class="post-card">

                        <span
                            class="post-number">

                            Post #${post.id}

                        </span>


                        <h3>

                            ${post.title}

                        </h3>


                        <p>

                            ${post.body}

                        </p>

                    </article>

                `;

            }
        );


        console.log(
            `Page ${currentPage} loaded.`
        );


    }


    catch (error) {

        console.error(
            "Pagination Error:",
            error
        );


        scrollSentinel.innerHTML = `

            <span>
                ⚠️ Unable to load more posts.
                Please try again.
            </span>

        `;

    }


    finally {

        /* ==================================
           UNLOCK
        ================================== */

        isLoading = false;

    }

}


/* ==========================================
   INTERSECTION OBSERVER
========================================== */

const observer =
    new IntersectionObserver(
        (entries) => {

            const entry =
                entries[0];


            if (
                entry.isIntersecting &&
                !isLoading &&
                hasMoreData
            ) {

                currentPage++;

                fetchNextPage();

            }

        },
        {

            /*
               Start loading slightly before
               the user reaches the bottom.
            */

            rootMargin:
                "200px"

        }
    );


/* ==========================================
   WATCH SENTINEL
========================================== */

observer.observe(
    scrollSentinel
);


/* ==========================================
   INITIAL FETCH
========================================== */

fetchNextPage();


/* ==========================================
   DARK MODE
========================================== */

const savedTheme =
    localStorage.getItem(
        "theme"
    );


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-theme"
    );

    themeToggle.textContent =
        "☀️";

}


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-theme"
        );


        const isDark =
            document.body.classList.contains(
                "dark-theme"
            );


        if (isDark) {

            localStorage.setItem(
                "theme",
                "dark"
            );

            themeToggle.textContent =
                "☀️";

        }

        else {

            localStorage.setItem(
                "theme",
                "light"
            );

            themeToggle.textContent =
                "🌙";

        }

    }
);


/* ==========================================
   CONSOLE
========================================== */

console.log(
    "Day 31 - Infinite Scroll Loaded"
);

console.log(
    "Page size:",
    limit
);
