// ─── CURSOR ───────────────────────────────────────
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

// ─── SCROLL PROGRESS ──────────────────────────────
const scrollBar = document.querySelector('.scroll-bar');

window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    scrollBar.style.width = pct + '%';
});

// ─── NAV SCROLL EFFECT ────────────────────────────
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── HERO TEXT ANIMATION ──────────────────────────
const heroTitle = document.querySelector('.hero-title');

// Wrap each line in .word > span
if (heroTitle) {
    const lines = heroTitle.querySelectorAll('span');
    lines.forEach(line => {
        const text = line.textContent;
        const word = document.createElement('span');
        word.className = 'word';
        const inner = document.createElement('span');
        inner.textContent = text;
        word.appendChild(inner);
        line.replaceWith(word);
    });

    setTimeout(() => heroTitle.classList.add('animated'), 200);
}

// ─── SCROLL REVEAL ────────────────────────────────
const reveals = document.querySelectorAll(
    '.section-header, .filter-tabs, .work-item, .about-bio, .about-skills, .contact-lead, .contact-links, .detail-row, .skills-group'
);

reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, 60);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// Stagger work items
document.querySelectorAll('.work-item').forEach((item, i) => {
    item.style.transitionDelay = (i % 3) * 0.08 + 's';
});

// ─── FILTER ───────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const workItems  = document.querySelectorAll('.work-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        workItems.forEach(item => {
            const show = filter === 'all' || item.dataset.category === filter;
            item.classList.toggle('hidden', !show);
        });
    });
});

// ─── MOBILE NAV ───────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
});
