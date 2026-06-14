
// =============================================
// VIP PORTFOLIO — RUMMAN SHAHZAD
// Premium JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // === LOADER ===
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);

    // === CUSTOM CURSOR ===
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    // Smooth outline follow
    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.12;
        outlineY += (mouseY - outlineY) * 0.12;
        outline.style.left = outlineX + 'px';
        outline.style.top = outlineY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // === PARTICLE CANVAS ===
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const PARTICLE_COUNT = 55;

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.8 + 0.4;
            this.speedX = (Math.random() - 0.5) * 0.35;
            this.speedY = (Math.random() - 0.5) * 0.35;
            this.opacity = Math.random() * 0.5 + 0.15;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width ||
                this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(96, 165, 250, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });

        // Connect nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.6;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // === NAVBAR SCROLL ===
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // === ACTIVE NAV LINK ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));

    // === REVEAL ON SCROLL ===
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(el => revealObserver.observe(el));

    // === TYPED TEXT ===
    const typedEl = document.querySelector('.typed-text');
    const phrases = ['Web Developer', 'UI/UX Designer', 'WordPress Expert', 'Freelancer'];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
        const current = phrases[phraseIndex];
        if (isDeleting) {
            typedEl.textContent = current.slice(0, --charIndex);
        } else {
            typedEl.textContent = current.slice(0, ++charIndex);
        }

        let delay = isDeleting ? 60 : 110;
        if (!isDeleting && charIndex === current.length) {
            delay = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 400;
        }
        setTimeout(typeEffect, delay);
    }
    typeEffect();

    // === COUNT UP ANIMATION ===
    const counters = document.querySelectorAll('.count');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.done) {
                entry.target.dataset.done = true;
                const target = +entry.target.dataset.target;
                let count = 0;
                const step = target / 60;
                const update = () => {
                    count += step;
                    if (count < target) {
                        entry.target.textContent = Math.ceil(count);
                        requestAnimationFrame(update);
                    } else {
                        entry.target.textContent = target;
                    }
                };
                update();
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));

    // === SKILL BARS ANIMATION ===
    const barFills = document.querySelectorAll('.bar-fill');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = true;
                const w = entry.target.dataset.width;
                setTimeout(() => {
                    entry.target.style.width = w + '%';
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    barFills.forEach(b => barObserver.observe(b));

    // === THEME TOGGLE ===
    const themeBtn = document.getElementById('theme-toggle');
    const icon = themeBtn.querySelector('i');
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.body.classList.add('light-mode');
        icon.className = 'fa-solid fa-sun';
    }
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // === MOBILE MENU ===
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('open');
    });
    document.querySelectorAll('.mob-link').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('open');
        });
    });

    // === BACK TO TOP ===
    const backBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backBtn.classList.toggle('visible', window.scrollY > 400);
    });
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // === TILT EFFECT ===
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
            card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // === CONTACT FORM ===
    // const form = document.getElementById('contact-form');
    // if (form) {
    //     form.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         const btn = form.querySelector('button[type="submit"]');
    //         btn.innerHTML = '<i class="fa-solid fa-check"></i><span>Message Sent!</span>';
    //         btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    //         setTimeout(() => {
    //             btn.innerHTML = '<span>Send Message</span><i class="fa-solid fa-paper-plane"></i>';
    //             btn.style.background = '';
    //             form.reset();
    //         }, 3000);
    //     });
    // }

    form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const subject = form.querySelectorAll('input[type="text"]')[1].value;
    const message = form.querySelector('textarea').value;

    const body =
`Name: ${name}

Email: ${email}

Message:
${message}`;

    const gmailUrl =
`https://mail.google.com/mail/?view=cm&fs=1&to=rummanshahzad012@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, '_blank');
});

    // === SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = header.offsetHeight + 20;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });

});
