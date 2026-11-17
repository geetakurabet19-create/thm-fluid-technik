/**
 * THM Fluid Technik Pvt. Ltd.
 * Main Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Navbar Effect ---
    const navbarWrapper = document.querySelector('.navbar-wrapper');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbarWrapper.classList.add('scrolled');
        } else {
            navbarWrapper.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // --- 3. Search Bar Overlay Toggle ---
    const searchToggle = document.getElementById('searchToggle');
    const searchClose = document.getElementById('searchClose');
    const searchOverlay = document.getElementById('searchOverlay');

    if (searchToggle && searchOverlay && searchClose) {
        searchToggle.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            const input = searchOverlay.querySelector('input');
            if (input) setTimeout(() => input.focus(), 100);
        });

        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });

        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
            }
        });
    }

    // --- 4. Video Modal ---
    const watchVideoBtn = document.getElementById('watchVideoBtn');
    const videoModal = document.getElementById('videoModal');
    const videoModalClose = document.getElementById('videoModalClose');
    const videoIframe = document.getElementById('videoIframe');
    const defaultVideoSrc = videoIframe ? videoIframe.src : '';

    if (watchVideoBtn && videoModal && videoModalClose) {
        watchVideoBtn.addEventListener('click', () => {
            videoModal.classList.add('active');
            if (videoIframe) videoIframe.src = defaultVideoSrc;
        });

        const closeVideo = () => {
            videoModal.classList.remove('active');
            if (videoIframe) videoIframe.src = ''; // Stop video on close
        };

        videoModalClose.addEventListener('click', closeVideo);
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeVideo();
        });
    }

    // --- 5. Quote / Contact Modal ---
    const quoteModal = document.getElementById('quoteModal');
    const quoteModalClose = document.getElementById('quoteModalClose');
    const openQuoteBtn = document.getElementById('openQuoteBtn');
    const openContactBtn = document.getElementById('openContactBtn');

    const openModal = () => {
        if (quoteModal) quoteModal.classList.add('active');
    };

    const closeModal = () => {
        if (quoteModal) quoteModal.classList.remove('active');
    };

    if (openQuoteBtn) openQuoteBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (openContactBtn) openContactBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (quoteModalClose) quoteModalClose.addEventListener('click', closeModal);

    if (quoteModal) {
        quoteModal.addEventListener('click', (e) => {
            if (e.target === quoteModal) closeModal();
        });
    }

    // --- 6. Number Counter Animation for Stats ---
    const counters = document.querySelectorAll('.counter');
    let countersStarted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const step = Math.max(1, Math.floor(target / 60));
            const interval = setInterval(() => {
                count += step;
                if (count >= target) {
                    counter.innerText = target;
                    clearInterval(interval);
                } else {
                    counter.innerText = count;
                }
            }, 25);
        });
    };

    // Trigger counters when hero stats are in view
    const statsRow = document.querySelector('.hero-stats-row');
    if (statsRow) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersStarted) {
                countersStarted = true;
                startCounters();
            }
        }, { threshold: 0.3 });
        observer.observe(statsRow);
    }

    // --- 7. Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.includes('Modal')) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('THM Fluid Technik Website initialized successfully.');
});
