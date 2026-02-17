// Mobile menu toggle
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Sticky nav — show logo + CTA on scroll
const navSticky = document.querySelector('.nav-sticky');
const navLogo = document.querySelector('.nav-logo');
const navCta = document.querySelector('.nav-cta');

if (navSticky) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 200;
        navSticky.classList.toggle('scrolled', scrolled);
        if (navLogo) {
            navLogo.classList.toggle('opacity-0', !scrolled);
            navLogo.classList.toggle('-translate-x-4', !scrolled);
            navLogo.classList.toggle('pointer-events-none', !scrolled);
            navLogo.classList.toggle('opacity-100', scrolled);
            navLogo.classList.toggle('translate-x-0', scrolled);
        }
        if (navCta) {
            navCta.classList.toggle('opacity-0', !scrolled);
            navCta.classList.toggle('translate-x-4', !scrolled);
            navCta.classList.toggle('pointer-events-none', !scrolled);
            navCta.classList.toggle('opacity-100', scrolled);
            navCta.classList.toggle('translate-x-0', scrolled);
        }
    });
}

// Hero slideshow
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
        heroSlides[currentSlide].style.opacity = '0';
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].style.opacity = '1';
    }, 5000);
}

// Counter animation
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
}

// Intersection Observer for animations + counters
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('section').forEach(section => observer.observe(section));
