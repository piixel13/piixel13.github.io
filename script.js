document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const sectionTitle = document.querySelectorAll('.section-title');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillItems = document.querySelectorAll('.skill-item');
    const skillCategories = document.querySelectorAll('.skill-category');
    const languageItems = document.querySelectorAll('.language-item');
    const trainingRows = document.querySelectorAll('.training-row');
    const aboutContent = document.querySelector('.about-content');
    const educationContent = document.querySelector('.education-content');
    const contactCards = document.querySelectorAll('.contact-card');
    const themeToggle = document.getElementById('theme-toggle');

    let lastScroll = 0;

    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    function handleNavbarScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }

    function handleActiveNavLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        if (window.scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('a[href="#hero"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    function setupSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                    }
                }
            });
        });
    }

    function setupMobileMenu() {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    function observeElements() {
        sectionTitle.forEach(title => observer.observe(title));
        
        if (aboutContent) observer.observe(aboutContent);
        if (educationContent) observer.observe(educationContent);
        
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                observer.observe(item);
            }, index * 100);
        });

        skillCategories.forEach((category, index) => {
            setTimeout(() => {
                observer.observe(category);
            }, index * 150);
        });

        trainingRows.forEach((row, index) => {
            setTimeout(() => {
                observer.observe(row);
            }, index * 100);
        });

        languageItems.forEach((item, index) => {
            setTimeout(() => {
                observer.observe(item);
            }, index * 150);
        });

        contactCards.forEach((card, index) => {
            setTimeout(() => {
                observer.observe(card);
            }, index * 150);
        });
    }

    function animateSkillBars() {
        const skillProgressBars = document.querySelectorAll('.skill-progress');
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.width = progress + '%';
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });

        skillProgressBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    function animateLanguageBars() {
        const languageProgressBars = document.querySelectorAll('.language-progress');
        const languageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.width = progress + '%';
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });

        languageProgressBars.forEach(bar => {
            languageObserver.observe(bar);
        });
    }

    function animateSkillItems() {
        const skillItemObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });

        skillItems.forEach((item, index) => {
            setTimeout(() => {
                skillItemObserver.observe(item);
            }, index * 50);
        });
    }

    function handleScrollAnimations() {
        window.addEventListener('scroll', function() {
            handleNavbarScroll();
            handleActiveNavLink();
        }, { passive: true });
    }

    function init() {
        initTheme();
        setupSmoothScroll();
        setupMobileMenu();
        observeElements();
        animateSkillBars();
        animateLanguageBars();
        animateSkillItems();
        handleScrollAnimations();
        handleNavbarScroll();
        handleActiveNavLink();
    }

    init();

    window.addEventListener('resize', function() {
        if (window.innerWidth > 1100 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    const heroSection = document.getElementById('hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        }, { passive: true });
    }
});
