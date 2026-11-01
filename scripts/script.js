// =====================================================
// Portfolio JavaScript
// =====================================================

const PROJECTS = {
    LaraTicket: {
        title: 'Event Ticketing Platform',
        description: 'Full-stack event ticketing with Filament admin dashboard, DTOs, policies & gates, Pest unit/feature testing, multi-channel notifications, Scramble API documentation, and Stripe Checkout Sessions. Deployed on AWS with Redis caching.',
        demo: 'https://youtu.be/_3LmZhpbWjg',
        code: 'https://github.com/AliHRadwan/LaraTicket',
        tech: ['Laravel', 'Vue.js', 'MySQL', 'Redis', 'Stripe'],
        images: ['01.jpg', '02.png', '03.png', '04.png', '05.png'],
        features: [
            'Filament admin dashboard with DTOs and status enums',
            'Policies, gates, and Pest unit/feature testing',
            'Multi-channel notifications system',
            'Scramble Swagger API documentation',
            'Stripe Checkout Sessions integration',
            'AWS deployment (EC2, S3) with Redis caching'
        ]
    },
    SwiftHost: {
        title: 'AI Concierge System',
        description: 'A multilingual agentic AI concierge for automated guest support and service management. Features automated ticketing, RAG-based chatbot, Telegram integration, and admin dashboard.',
        demo: 'https://youtu.be/Ion_4RaKAfs',
        code: 'https://github.com/AliHRadwan/ITI-Graduation-Project',
        tech: ['Laravel', 'React', 'FastAPI', 'AWS', 'n8n'],
        images: ['01.jpg', '02.png', '03.png', '04.png', '05.png'],
        features: [
            'Automated ticketing system (n8n workflows)',
            'AI integration with RAG system and chatbot',
            'Telegram chatbot integration',
            'Admin dashboard and multilingual support',
            'CI/CD pipeline with GitHub Actions',
            'Nginx reverse proxy on AWS (EC2, S3)'
        ]
    },
    Bookly: {
        title: 'Bookstore E-Commerce',
        description: 'Full-stack bookstore with email verification, JWT authentication, Redis caching, WebSocket notifications, AI chatbot, and Stripe payment integration.',
        demo: 'https://youtu.be/yNnAecYfBzo',
        code: 'https://github.com/AliHRadwan/Node-Project',
        tech: ['Node.js', 'Express', 'Angular', 'MongoDB', 'Redis'],
        images: ['01.png', '02.png', '03.png', '04.png', '05.png'],
        features: [
            'Email verification and notification flows',
            'JWT-based authentication',
            'Redis caching and cron jobs',
            'WebSocket real-time notifications',
            'AI chatbot integration',
            'Stripe payment integration on AWS'
        ]
    },
    MAYA: {
        title: 'Fashion E-Commerce',
        description: 'Serverless fashion store with admin dashboard, user profile management, stock management, cart/orders system, Cloudinary image uploads, and Stripe payments.',
        demo: 'https://youtu.be/ltAtjIxwwT0',
        code: 'https://github.com/AliHRadwan/JS-Project',
        tech: ['Firebase', 'Firestore', 'JavaScript', 'Cloudinary', 'Stripe'],
        images: ['01.png', '02.png', '03.png', '04.png', '05.png'],
        features: [
            'Admin dashboard with full CRUD operations',
            'User profile and stock management',
            'Cart and orders management',
            'Cloudinary image uploads',
            'Stripe payment integration',
            'Firebase serverless backend and hosting'
        ]
    }
};

const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
    enhanceSkillCards();
    initNavigation();
    initScrollUI();
    initScrollEffects();
    initSkillAnimations();
    initBackToTop();
    initTypingEffect();
    initCopyrightYear();
    initTheme();
    initProjectCarousels();
    initProjectModals();
});

// =====================================================
// Unified scroll handling (navbar, back-to-top, scroll-spy)
// =====================================================
let scrollTicking = false;
let lastActiveSectionId = null;

function setActiveNavSection(sectionId) {
    if (!sectionId || sectionId === lastActiveSectionId) return;
    lastActiveSectionId = sectionId;
    const menu = document.getElementById('nav-menu');
    if (!menu) return;
    menu.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${sectionId}`);
    });
}

function initNavScrollSpy() {
    const menu = document.getElementById('nav-menu');
    if (!menu) return;

    const links = [...menu.querySelectorAll('.nav-link')];
    const sections = links
        .map(link => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return null;
            const id = href.slice(1);
            return document.getElementById(id);
        })
        .filter(Boolean);

    if (!sections.length) return;

    const sectionRatios = new Map();
    sections.forEach(section => sectionRatios.set(section.id, 0));

    const pickActive = () => {
        let bestId = null;
        let bestRatio = 0;
        sectionRatios.forEach((ratio, id) => {
            if (ratio > bestRatio) {
                bestRatio = ratio;
                bestId = id;
            }
        });

        if (bestRatio === 0) {
            if (window.scrollY < 80) {
                setActiveNavSection('home');
            }
            return;
        }

        setActiveNavSection(bestId);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            sectionRatios.set(
                entry.target.id,
                entry.isIntersecting ? entry.intersectionRatio : 0
            );
        });
        pickActive();
    }, {
        root: null,
        rootMargin: '-72px 0px -55% 0px',
        threshold: [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1]
    });

    sections.forEach(section => observer.observe(section));

    if (window.scrollY < 80) {
        setActiveNavSection('home');
    } else {
        pickActive();
    }
}

function handleScrollFrame() {
    scrollTicking = false;
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');
    const scrollY = window.pageYOffset;

    if (navbar) {
        navbar.classList.toggle('scrolled', scrollY > 50);
    }

    if (backToTopBtn) {
        backToTopBtn.classList.toggle('visible', scrollY > 500);
    }
}

function initScrollUI() {
    initNavScrollSpy();

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(handleScrollFrame);
        }
    }, { passive: true });

    handleScrollFrame();

    window.addEventListener('load', () => handleScrollFrame());

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleScrollFrame, 150);
    });
}

function initCopyrightYear() {
    const yearEl = document.getElementById('copyright-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// =====================================================
// Theme
// =====================================================
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        }
    };

    let stored = null;
    try {
        stored = localStorage.getItem('theme');
    } catch (e) {
        stored = null;
    }

    if (!stored) {
        stored = 'light';
    }

    applyTheme(stored === 'light' ? 'light' : 'dark');

    toggle.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const next = isLight ? 'dark' : 'light';
        if (next === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        try {
            localStorage.setItem('theme', next);
        } catch (e) {
            /* ignore */
        }
        applyTheme(next);
    });
}

// =====================================================
// Navigation
// =====================================================
const NAV_DRAWER_MAX_WIDTH = 880;

function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const themeToggle = document.getElementById('theme-toggle');
    if (!navToggle || !navMenu) return;

    const isInsideNavChrome = (target) => {
        if (!(target instanceof Node)) return false;
        if (navMenu.contains(target) || navToggle.contains(target)) return true;
        if (themeToggle && themeToggle.contains(target)) return true;
        const navbar = document.getElementById('navbar');
        if (navbar && navbar.contains(target)) return true;
        return false;
    };

    const setNavOpen = (open) => {
        navToggle.classList.toggle('active', open);
        navMenu.classList.toggle('active', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    const closeNav = () => setNavOpen(false);

    navToggle.addEventListener('click', () => {
        setNavOpen(!navMenu.classList.contains('active'));
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    document.addEventListener('click', (event) => {
        if (!navMenu.classList.contains('active')) return;
        if (isInsideNavChrome(event.target)) return;
        closeNav();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeNav();
        }
    });

    let resizeNavTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeNavTimer);
        resizeNavTimer = setTimeout(() => {
            if (window.innerWidth > NAV_DRAWER_MAX_WIDTH) {
                closeNav();
            }
        }, 150);
    });
}

// =====================================================
// Scroll Effects
// =====================================================
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(
        '.skill-card, .project-card, .contact-card, .stat, .timeline-item'
    );
    animateElements.forEach(el => observer.observe(el));
}

// =====================================================
// Skill meters & bar animations
// =====================================================
function enhanceSkillCards() {
    document.querySelectorAll('.skill-card').forEach(card => {
        if (card.dataset.enhanced === 'true') return;

        const progressEl = card.querySelector('.skill-progress');
        const levelEl = card.querySelector('.skill-level');
        if (!progressEl) return;

        const raw = progressEl.style.getPropertyValue('--progress') || '0%';
        const match = raw.match(/(\d+)/);
        const value = match ? parseInt(match[1], 10) : 0;
        const levelText = levelEl?.textContent.trim() || card.dataset.level || 'intermediate';
        const levelKey = card.dataset.level || levelText.toLowerCase();
        const name = card.querySelector('h3')?.textContent || 'Skill';

        if (!card.dataset.level) {
            card.dataset.level = levelKey;
        }

        const badge = document.createElement('span');
        badge.className = 'skill-badge';
        badge.textContent = levelText;
        badge.setAttribute('aria-label', `${name}: ${levelText} level`);

        const descEl = card.querySelector('.skill-desc');
        const tagsWrap = document.createElement('div');
        tagsWrap.className = 'skill-tags';
        if (descEl) {
            const parts = descEl.textContent.split(',').map(s => s.trim()).filter(Boolean);
            parts.forEach(part => {
                const tag = document.createElement('span');
                tag.className = 'skill-tag';
                tag.textContent = part;
                tagsWrap.appendChild(tag);
            });
            descEl.remove();
        }

        const icon = card.querySelector('.skill-icon');
        const title = card.querySelector('h3');
        const body = document.createElement('div');
        body.className = 'skill-card-body';
        if (icon) body.appendChild(icon);
        if (title) body.appendChild(title);
        body.appendChild(tagsWrap);

        const meter = document.createElement('div');
        meter.className = 'skill-meter';
        meter.dataset.progress = String(value);
        meter.innerHTML = `
            <div class="skill-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="${name} proficiency">
                <div class="skill-progress" style="--progress: ${value}%"></div>
            </div>
        `;

        const oldBar = progressEl.closest('.skill-bar');
        if (oldBar) oldBar.remove();
        levelEl?.remove();

        card.textContent = '';
        card.appendChild(badge);
        card.appendChild(body);
        card.appendChild(meter);
        card.dataset.enhanced = 'true';
    });

    requestAnimationFrame(() => handleScrollFrame());
}

function initSkillAnimations() {
    const skillCards = document.querySelectorAll('.skill-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('animate');
            const bar = entry.target.querySelector('[role="progressbar"]');
            const meter = entry.target.querySelector('.skill-meter');
            if (bar && meter) {
                const value = parseInt(meter.dataset.progress, 10) || 0;
                bar.setAttribute('aria-valuenow', String(value));
            }
        });
    }, { threshold: 0.5 });

    skillCards.forEach(card => observer.observe(card));
}

// =====================================================
// Back to Top
// =====================================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        });
    });
}

// =====================================================
// Typing Effect
// =====================================================
function initTypingEffect() {
    const roles = [
        'Software Engineer',
        'Backend Developer',
        'PHP & Laravel Developer',
        'Full Stack Developer',
        'DevOps Enthusiast'
    ];

    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    if (prefersReducedMotion()) {
        typingElement.textContent = roles[0];
        const cursor = document.querySelector('.hero-subtitle .cursor');
        if (cursor) cursor.style.display = 'none';
        return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

// =====================================================
// Project carousels (cards)
// =====================================================
function initProjectCarousels() {
    document.querySelectorAll('.project-carousel[data-project]').forEach(container => {
        const key = container.dataset.project;
        const project = PROJECTS[key];
        if (!project) return;

        const base = `./assets/images/projects/${key}/`;
        let index = 0;

        project.images.forEach((file, i) => {
            const img = document.createElement('img');
            img.src = `${base}${file}`;
            img.alt = `${project.title} screenshot ${i + 1}`;
            img.loading = i === 0 ? 'eager' : 'lazy';
            img.className = 'project-carousel-slide';
            if (i === 0) img.classList.add('active');
            container.appendChild(img);
        });

        const slides = () => container.querySelectorAll('.project-carousel-slide');

        function goTo(i) {
            index = i;
            slides().forEach((s, si) => s.classList.toggle('active', si === i));
        }

        let intervalId = null;
        const card = container.closest('.project-card');

        function startAuto() {
            if (prefersReducedMotion() || intervalId) return;
            intervalId = setInterval(() => {
                goTo((index + 1) % project.images.length);
            }, 5000);
        }

        function stopAuto() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }

        if (card) {
            card.addEventListener('mouseenter', startAuto);
            card.addEventListener('mouseleave', stopAuto);
            card.addEventListener('focusin', startAuto);
            card.addEventListener('focusout', stopAuto);
        }
    });
}

// =====================================================
// Project modals
// =====================================================
function initProjectModals() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    const titleEl = modal.querySelector('.project-modal-title');
    const descEl = modal.querySelector('.project-modal-desc');
    const featuresEl = modal.querySelector('.project-modal-features');
    const techEl = modal.querySelector('.project-modal-tech');
    const carouselEl = modal.querySelector('.project-modal-carousel');
    const demoLink = modal.querySelector('.project-modal-demo');
    const codeLink = modal.querySelector('.project-modal-code');
    const closeBtn = modal.querySelector('.project-modal-close');
    const modalBody = modal.querySelector('.project-modal-body');

    let lastFocus = null;
    let modalIndex = 0;
    let modalSlides = [];
    let modalAutoInterval = null;
    let modalGoToFn = null;
    let manualGoToFn = null;

    function stopModalAuto() {
        if (modalAutoInterval) {
            clearInterval(modalAutoInterval);
            modalAutoInterval = null;
        }
    }

    function startModalAuto() {
        stopModalAuto();
        if (prefersReducedMotion() || modalSlides.length <= 1 || !modal.open) return;
        modalAutoInterval = setInterval(() => {
            const next = (modalIndex + 1) % modalSlides.length;
            if (modalGoToFn) modalGoToFn(next);
        }, 4000);
    }

    function manualGoTo(i) {
        stopModalAuto();
        if (modalGoToFn) modalGoToFn(i);
        startModalAuto();
    }

    manualGoToFn = manualGoTo;

    function closeModal() {
        stopModalAuto();
        modal.close();
        document.body.classList.remove('modal-open');
        if (lastFocus) lastFocus.focus();
    }

    function openModal(key) {
        const project = PROJECTS[key];
        if (!project) return;

        stopModalAuto();
        lastFocus = document.activeElement;
        titleEl.textContent = project.title;
        descEl.textContent = project.description;
        demoLink.href = project.demo;
        codeLink.href = project.code;

        featuresEl.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');
        techEl.innerHTML = project.tech.map(t => `<span>${t}</span>`).join('');

        carouselEl.innerHTML = '';
        modalIndex = 0;
        modalSlides = [];
        const base = `./assets/images/projects/${key}/`;

        project.images.forEach((file, i) => {
            const img = document.createElement('img');
            img.src = `${base}${file}`;
            img.alt = `${project.title} screenshot ${i + 1}`;
            img.className = 'project-modal-slide' + (i === 0 ? ' active' : '');
            carouselEl.appendChild(img);
            modalSlides.push(img);
        });

        const hasMultipleImages = project.images.length > 1;

        if (hasMultipleImages) {
            const dots = document.createElement('div');
            dots.className = 'project-modal-dots';
            project.images.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'project-modal-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Show image ${i + 1}`);
                dot.addEventListener('click', (event) => {
                    event.stopPropagation();
                    manualGoToFn(i);
                });
                dots.appendChild(dot);
            });
            carouselEl.appendChild(dots);

            const nav = document.createElement('div');
            nav.className = 'project-modal-carousel-nav';
            nav.innerHTML = `
                <button type="button" class="project-modal-prev" aria-label="Previous image"><i class="fas fa-chevron-left"></i></button>
                <button type="button" class="project-modal-next" aria-label="Next image"><i class="fas fa-chevron-right"></i></button>
            `;
            carouselEl.appendChild(nav);

            nav.querySelector('.project-modal-prev').addEventListener('click', (event) => {
                event.stopPropagation();
                manualGoToFn((modalIndex - 1 + modalSlides.length) % modalSlides.length);
            });
            nav.querySelector('.project-modal-next').addEventListener('click', (event) => {
                event.stopPropagation();
                manualGoToFn((modalIndex + 1) % modalSlides.length);
            });
        }

        const dotBtns = () => carouselEl.querySelectorAll('.project-modal-dot');

        function modalGoTo(i) {
            if (i === modalIndex) return;

            const total = modalSlides.length;
            const prev = modalIndex;
            const delta = (i - prev + total) % total;
            const forward = delta > 0 && delta <= total / 2;

            modalSlides.forEach((slide, si) => {
                slide.classList.remove('active', 'from-next', 'from-prev');
                if (si !== i) return;
                slide.classList.add(forward ? 'from-next' : 'from-prev');
            });

            modalIndex = i;
            const incoming = modalSlides[i];
            void incoming.offsetWidth;
            incoming.classList.add('active');

            modalSlides.forEach((slide, si) => {
                if (si !== i) slide.classList.remove('from-next', 'from-prev');
            });

            dotBtns().forEach((d, di) => d.classList.toggle('active', di === i));
        }

        modalGoToFn = modalGoTo;

        modal.showModal();
        document.body.classList.add('modal-open');
        if (modalBody) modalBody.scrollTop = 0;
        closeBtn.focus({ preventScroll: true });

        Promise.all(
            modalSlides.map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve()))
        ).then(() => {
            if (modal.open) startModalAuto();
        });
    }

    document.querySelectorAll('.project-details-btn').forEach(btn => {
        btn.addEventListener('click', () => openModal(btn.dataset.project));
    });

    closeBtn.addEventListener('click', closeModal);
    document.addEventListener('visibilitychange', () => {
        if (!modal.open) return;
        if (document.hidden) {
            stopModalAuto();
        } else {
            startModalAuto();
        }
    });
    modal.addEventListener('cancel', (e) => {
        e.preventDefault();
        closeModal();
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    modal.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const focusable = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const list = Array.from(focusable).filter(el => !el.disabled);
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });
}

// =====================================================
// Smooth Scroll
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (anchor.closest('.project-modal')) return;
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({
            behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        });
    });
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
