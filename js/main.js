// ── Mobile menu ──
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

// ── Sticky nav — show logo + CTA on scroll ──
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

// ── Hero slideshow ──
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
        heroSlides[currentSlide].style.opacity = '0';
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].style.opacity = '1';
    }, 6000);
}

// ── Hero parallax ──
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
            heroSection.style.setProperty('--parallax', y * 0.3 + 'px');
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${y * 0.15}px)`;
                heroContent.style.opacity = Math.max(0, 1 - y / 600);
            }
        }
    });
}

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Trigger counters if present
            entry.target.querySelectorAll('[data-count]').forEach(animateCounter);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .line-grow').forEach(el => {
    revealObserver.observe(el);
});

// ── Stagger children ──
document.querySelectorAll('.stagger').forEach(container => {
    Array.from(container.children).forEach((child, i) => {
        child.style.setProperty('--i', i);
    });
});

// ── Counter animation ──
function animateCounter(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    const target = parseInt(el.getAttribute('data-count'));
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

// ── Logo marquee clone ──
document.querySelectorAll('.logo-marquee').forEach(track => {
    const items = track.innerHTML;
    track.innerHTML = items + items;
});
