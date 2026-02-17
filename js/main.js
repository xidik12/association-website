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
        if (window.scrollY > 200) {
            navSticky.classList.add('scrolled');
            if (navLogo) {
                navLogo.classList.remove('opacity-0', '-translate-x-4', 'pointer-events-none');
                navLogo.classList.add('opacity-100', 'translate-x-0');
            }
            if (navCta) {
                navCta.classList.remove('opacity-0', 'translate-x-4', 'pointer-events-none');
                navCta.classList.add('opacity-100', 'translate-x-0');
            }
        } else {
            navSticky.classList.remove('scrolled');
            if (navLogo) {
                navLogo.classList.add('opacity-0', '-translate-x-4', 'pointer-events-none');
                navLogo.classList.remove('opacity-100', 'translate-x-0');
            }
            if (navCta) {
                navCta.classList.add('opacity-0', 'translate-x-4', 'pointer-events-none');
                navCta.classList.remove('opacity-100', 'translate-x-0');
            }
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
    }, 4000);
}

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('section').forEach(section => observer.observe(section));
