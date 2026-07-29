/* ==========================================================
   Modern Civil Construction
   script.js
========================================================== */

// ==========================
// Wait until page is loaded
// ==========================

document.addEventListener("DOMContentLoaded", function () {

    initNavbar();
    initSmoothScroll();
    initCounter();
    initBackToTop();
    initRevealAnimation();
    initActiveMenu();
    initMobileMenu();
    initParallax();

});


// ==========================================================
// Sticky Navbar
// ==========================================================

function initNavbar() {

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });

}


// ==========================================================
// Smooth Scroll
// ==========================================================

function initSmoothScroll() {

    const offset = 80;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));
            if (!target) return;
            
            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                offset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });


        });

    });

}


// ==========================================================
// Animated Counter
// ==========================================================

function initCounter() {

    const counters = document.querySelectorAll(".counter");

    let started = false;

    window.addEventListener("scroll", () => {

        const stats = document.querySelector(".stats");

        if (!stats) return;

        const trigger = stats.offsetTop - window.innerHeight + 100;

        if (!started && window.scrollY >= trigger) {

            counters.forEach(counter => {

                animateCounter(counter);

            });

            started = true;

        }

    });

}

function animateCounter(counter) {

    const target = Number(counter.dataset.target);

    let value = 0;

    const speed = target / 100;

    const update = () => {

        value += speed;

        if (value < target) {

            counter.innerText = Math.ceil(value);

            requestAnimationFrame(update);

        } else {

            counter.innerText = target + "+";

        }

    };

    update();

}


// ==========================================================
// Back To Top
// ==========================================================

function initBackToTop() {

    const btn = document.querySelector(".back-to-top");

    if (!btn) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            btn.classList.add("active");

        } else {

            btn.classList.remove("active");

        }

    });

    btn.addEventListener("click", function (e) {

        e.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


// ==========================================================
// Reveal Animation
// ==========================================================

function initRevealAnimation() {

    const elements = document.querySelectorAll(

        ".service-card, .project-card, #about img, #about .col-lg-6"

    );

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    elements.forEach(el => {

        el.classList.add("hidden");

        observer.observe(el);

    });

}


// ==========================================================
// Active Navigation
// ==========================================================

function initActiveMenu() {

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    function updateActiveMenu() {

        let current = "";

        sections.forEach(section => {

            const rect = section.getBoundingClientRect();

            // Section currently visible in viewport
            if (rect.top <= 150 && rect.bottom >= 150) {
                current = section.id;
            }

        });

        // If we're at the very bottom, force Contact active
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5) {
            current = "contact";
        }

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveMenu);

    updateActiveMenu(); // Set active link on page load
}


// ==========================================================
// Close Mobile Menu
// ==========================================================

function initMobileMenu() {

    const navLinks = document.querySelectorAll(".nav-link");

    const menu = document.querySelector(".navbar-collapse");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (menu.classList.contains("show")) {

                bootstrap.Collapse.getInstance(menu).hide();

            }

        });

    });

}


// ==========================================================
// Hero Parallax
// ==========================================================

function initParallax() {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    window.addEventListener("scroll", () => {

        const offset = window.pageYOffset;

        hero.style.backgroundPositionY = offset * 0.4 + "px";

    });

}


// ==========================================================
// Loading Effect
// ==========================================================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});