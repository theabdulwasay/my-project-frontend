// main.js - Client Side Interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Entrance animations (hero/banner only — do not animate place cards; breaks grid visibility)
    const skeletonGrid = document.getElementById('placesSkeletonGrid');
    const realGrid = document.getElementById('placesRealGrid');

    function revealPlaceGrid() {
        if (skeletonGrid) {
            skeletonGrid.style.display = 'none';
            skeletonGrid.setAttribute('aria-hidden', 'true');
        }
        if (realGrid) {
            realGrid.style.display = 'grid';
            realGrid.style.opacity = '1';
            realGrid.removeAttribute('aria-hidden');
            realGrid.querySelectorAll('.place-card').forEach(function(card) {
                card.style.opacity = '';
                card.style.transform = '';
                card.style.visibility = '';
            });
        }
    }

    if (realGrid) {
        revealPlaceGrid();
    }

    if (typeof gsap !== 'undefined') {
        if (document.querySelector('.home-simple-hero-inner')) {
            gsap.from('.home-simple-hero-inner > *', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
                delay: 0.2
            });
        } else if (document.querySelector('.hero-content')) {
            gsap.from('.hero-content > *', {
                y: 45,
                opacity: 0,
                duration: 1,
                stagger: 0.25,
                ease: 'power3.out',
                delay: 0.4
            });
        }

        if (document.querySelector('.places-page-hero, .page-banner-content')) {
            gsap.from('.places-page-hero .page-banner-content > *, .page-banner-content > *', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.2
            });
        }
    }

    // 2. Header Scroll Effect
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    if (header) {
        function updateHeaderScroll() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        window.addEventListener('scroll', updateHeaderScroll);
        updateHeaderScroll();
    }

    if (navToggle && header) {
        navToggle.addEventListener('click', function() {
            header.classList.toggle('nav-open');
        });
    }

    // 3. Beautiful Places — category filter + search
    const filterTabs = document.querySelectorAll('.places-section .filter-tab[data-filter]');
    const placeCards = document.querySelectorAll('#placesRealGrid .place-card');
    const placesSearchInput = document.getElementById('placesSearchInput');
    const placesResultsCount = document.getElementById('placesResultsCount');
    const placesEmptyFilter = document.getElementById('placesEmptyFilter');
    const clearPlacesFilter = document.getElementById('clearPlacesFilter');
    let activeCategoryFilter = 'all';

    function applyPlacesFilters() {
        const query = (placesSearchInput?.value || '').trim().toLowerCase();
        let visible = 0;

        placeCards.forEach(card => {
            const category = (card.getAttribute('data-category') || '').trim();
            const searchText = (card.getAttribute('data-search') || '').trim().toLowerCase();
            const titleText = (card.querySelector('.place-title')?.textContent || '').trim().toLowerCase();
            const locationText = (card.querySelector('.place-location')?.textContent || '').trim().toLowerCase();
            const haystack = searchText || (titleText + ' ' + locationText);
            const matchesCategory = activeCategoryFilter === 'all' || category === activeCategoryFilter.trim();
            const matchesSearch = !query || haystack.includes(query);
            const show = matchesCategory && matchesSearch;
            card.classList.toggle('place-hidden', !show);
            card.style.opacity = '';
            card.style.transform = '';
            if (show) visible += 1;
        });

        if (placesResultsCount) {
            placesResultsCount.innerHTML = `Showing <strong>${visible}</strong> place${visible === 1 ? '' : 's'}`;
        }
        if (placesEmptyFilter) {
            placesEmptyFilter.classList.toggle('visible', visible === 0 && placeCards.length > 0);
        }
    }

    if (filterTabs.length > 0 && placeCards.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                filterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                activeCategoryFilter = this.getAttribute('data-filter') || 'all';
                applyPlacesFilters();
            });
        });
    }

    if (placesSearchInput && placeCards.length > 0) {
        placesSearchInput.addEventListener('input', applyPlacesFilters);
    }

    if (clearPlacesFilter) {
        clearPlacesFilter.addEventListener('click', function() {
            if (placesSearchInput) placesSearchInput.value = '';
            activeCategoryFilter = 'all';
            filterTabs.forEach(t => t.classList.remove('active'));
            const allTab = document.querySelector('.filter-tab[data-filter="all"]');
            if (allTab) allTab.classList.add('active');
            applyPlacesFilters();
        });
    }

    if (placeCards.length > 0) {
        applyPlacesFilters();
    }

    // 3. Booking Form Dynamic Price Summary
    const tourSelect = document.getElementById('id_tour'); // matches default Django form field name
    const seatsInput = document.getElementById('id_seats'); // matches default Django form field name
    
    const summaryTourName = document.getElementById('summary-tour-name');
    const summaryTourPrice = document.getElementById('summary-tour-price');
    const summarySeatsCount = document.getElementById('summary-seats-count');
    const summaryTotalPrice = document.getElementById('summary-total-price');
    const summaryTourImg = document.getElementById('summary-tour-img');
    const summaryTourDuration = document.getElementById('summary-tour-duration');

    if (tourSelect && seatsInput) {
        function updateSummary() {
            const selectedOption = tourSelect.options[tourSelect.selectedIndex];
            if (selectedOption && selectedOption.value) {
                const tourName = selectedOption.text;
                const price = parseFloat(selectedOption.getAttribute('data-price') || 0);
                const image = selectedOption.getAttribute('data-image') || '/static/images/default.png';
                const duration = selectedOption.getAttribute('data-duration') || '1 Day';
                const seats = parseInt(seatsInput.value || 1);
                
                const total = price * seats;

                if (summaryTourName) summaryTourName.innerText = tourName;
                if (summaryTourPrice) summaryTourPrice.innerText = `PKR ${price.toLocaleString()}`;
                if (summarySeatsCount) summarySeatsCount.innerText = seats;
                if (summaryTotalPrice) summaryTotalPrice.innerText = `PKR ${total.toLocaleString()}`;
                if (summaryTourImg) summaryTourImg.src = image;
                if (summaryTourDuration) summaryTourDuration.innerText = duration;
            }
        }

        tourSelect.addEventListener('change', updateSummary);
        seatsInput.addEventListener('input', updateSummary);
        
        // Initial run
        updateSummary();
    }
    
    // 4. Modal Toggles (e.g. for adding place/tour in Admin Panel)
    const openModalBtns = document.querySelectorAll('.btn-open-modal');
    const closeModalBtns = document.querySelectorAll('.btn-close-modal');
    const modals = document.querySelectorAll('.modal');
    
    if (openModalBtns.length > 0) {
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetModalId = this.getAttribute('data-target');
                const targetModal = document.getElementById(targetModalId);
                if (targetModal) {
                    targetModal.style.display = 'flex';
                }
            });
        });
    }
    
    if (closeModalBtns.length > 0) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                this.closest('.modal').style.display = 'none';
            });
        });
    }
    
    // Close modal if clicked outside content
    window.addEventListener('click', function(e) {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Load dynamic data for homepage sections
    const blogTarget = document.getElementById('blogCards');
    const reviewTarget = document.getElementById('reviewCards');
    const weatherTemp = document.getElementById('weatherTemp');
    const weatherDesc = document.getElementById('weatherDescription');
    const weatherHumidity = document.getElementById('weatherHumidity');
    const weatherWind = document.getElementById('weatherWind');
    const weatherIcon = document.querySelector('.weather-icon');

    async function fetchJson(endpoint) {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.warn('Fetch error:', error);
            return null;
        }
    }

    async function hydrateDynamicSections() {
        if (blogTarget) {
            const data = await fetchJson('/api/blogs/');
            if (data && data.blogs && data.blogs.length) {
                blogTarget.innerHTML = data.blogs.slice(0, 3).map(blog => `
                    <article class="blog-card glass-card">
                        <img src="${blog.image}" alt="${blog.title}" class="blog-thumb">
                        <div class="blog-card-body">
                            <span class="blog-category">${blog.category}</span>
                            <h3>${blog.title}</h3>
                            <p>${blog.excerpt}</p>
                            <div class="blog-meta">
                                <span>Published ${new Date(blog.published_at).toLocaleDateString()}</span>
                                <a href="#" class="blog-link">Read More</a>
                            </div>
                        </div>
                    </article>
                `).join('');
            } else {
                blogTarget.innerHTML = '<p class="text-center text-slate">No blog stories available yet. Check back later.</p>';
            }
        }

        if (reviewTarget) {
            const data = await fetchJson('/api/reviews/');
            const isSimpleHome = reviewTarget.classList.contains('home-reviews-row');
            if (data && data.reviews && data.reviews.length) {
                reviewTarget.innerHTML = data.reviews.slice(0, 3).map(review => {
                    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
                    if (isSimpleHome) {
                        return `
                            <div class="home-review-card">
                                <div class="home-review-stars">${stars}</div>
                                <p>${review.comment}</p>
                                <span>${review.user} · ${review.tour}</span>
                            </div>
                        `;
                    }
                    return `
                        <div class="review-card glass-card">
                            <div class="review-head">
                                <div>
                                    <h4>${review.tour}</h4>
                                    <div class="review-stars">${stars}</div>
                                </div>
                                <span class="review-author">${review.user}</span>
                            </div>
                            <p>${review.comment}</p>
                            <div class="review-date">${new Date(review.created_at).toLocaleDateString()}</div>
                        </div>
                    `;
                }).join('');
            } else if (isSimpleHome) {
                /* keep default placeholder card */
            } else {
                reviewTarget.innerHTML = '<p class="text-center text-slate">No recent reviews found.</p>';
            }
        }

        if (weatherTemp && weatherDesc && weatherHumidity && weatherWind) {
            const city = encodeURIComponent('Wah Cantt');
            const data = await fetchJson(`/api/weather/?city=${city}`);
            if (data && data.weather) {
                weatherTemp.textContent = Math.round(data.weather.temperature);
                weatherDesc.textContent = data.weather.description;
                weatherHumidity.textContent = `${data.weather.humidity}%`;
                weatherWind.textContent = `${data.weather.wind_speed} km/h`;
                if (weatherIcon) weatherIcon.textContent = '☀️';
            }
        }
    }

    hydrateDynamicSections();

    const reviewForm = document.getElementById('reviewForm');
    const reviewFeedback = document.getElementById('reviewFeedback');

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    const csrfToken = getCookie('csrftoken');

    async function refreshReviews() {
        if (typeof hydrateDynamicSections === 'function') {
            await hydrateDynamicSections();
        }
    }

    if (reviewForm) {
        reviewForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const tourId = document.getElementById('reviewTour')?.value;
            const rating = document.getElementById('reviewRating')?.value;
            const comment = document.getElementById('reviewComment')?.value.trim();

            if (!tourId || !rating || !comment) {
                if (reviewFeedback) {
                    reviewFeedback.style.display = 'block';
                    reviewFeedback.textContent = 'Please select a tour, rating and write your review.';
                    reviewFeedback.style.color = '#b91c1c';
                }
                return;
            }

            const body = new URLSearchParams({
                tour_id: tourId,
                rating: rating,
                comment: comment,
            });

            const response = await fetch('/api/reviews/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': csrfToken || '',
                },
                body: body.toString(),
            });

            const result = await response.json().catch(() => null);
            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = '/login/?next=' + encodeURIComponent(window.location.pathname);
                    return;
                }
                if (reviewFeedback) {
                    reviewFeedback.style.display = 'block';
                    reviewFeedback.textContent = result?.error || 'Unable to submit review. Please try again.';
                    reviewFeedback.style.color = '#b91c1c';
                }
                return;
            }

            if (reviewFeedback) {
                reviewFeedback.style.display = 'block';
                reviewFeedback.textContent = 'Thank you! Your review has been submitted.';
                reviewFeedback.style.color = '#065f46';
            }

            document.getElementById('reviewComment').value = '';
            document.getElementById('reviewRating').value = '5';
            document.getElementById('reviewTour').value = '';
            await refreshReviews();
        });
    }

    // 5. Load coaster availability and populate badges
    async function hydrateCoasters() {
        const data = await fetchJson('/api/coasters/');
        const count = data && data.coasters ? data.coasters.length : 0;
        const elems = document.querySelectorAll('.coaster-availability');
        elems.forEach(el => {
            const span = el.querySelector('.coaster-count');
            if (span) span.textContent = count;
            // add simple visual cue
            if (count > 0) el.classList.add('available'); else el.classList.remove('available');
        });
    }

    hydrateCoasters();

    function mountHeroMotion() {
        const heroRoot = document.getElementById('heroMotionRoot');
        const MotionLib = window.motion || window.framerMotion || window['framerMotion'];
        const React = window.React;
        const ReactDOM = window.ReactDOM;

        if (!heroRoot || !MotionLib || !React || !ReactDOM) {
            return;
        }

        const motion = MotionLib.motion || MotionLib;
        const heroProps = {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 1.1, ease: 'easeOut' }
        };

        const HeroMotion = () => React.createElement(
            motion.div,
            { className: 'hero-motion-cards', initial: heroProps.initial, animate: heroProps.animate, transition: heroProps.transition },
            React.createElement('div', { className: 'motion-card' },
                React.createElement('p', null, 'Best rated destination'),
                React.createElement('h4', null, 'Wah Gardens'),
                React.createElement('span', null, 'From PKR 1,499')
            ),
            React.createElement('div', { className: 'motion-card' },
                React.createElement('p', null, 'Adventure package'),
                React.createElement('h4', null, 'Khanpur Dam'),
                React.createElement('span', null, 'From PKR 2,199')
            )
        );

        ReactDOM.createRoot(heroRoot).render(React.createElement(HeroMotion));
    }

    mountHeroMotion();
});
