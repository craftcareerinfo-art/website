// Ultra-simple, reliable JavaScript for Craft Career website
// Basic functionality only to ensure navigation works

document.addEventListener('DOMContentLoaded', function() {
    console.log('Craft Career JS loaded');
    
    // Mobile menu elements
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Mobile menu toggle
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Simple scroll function
    function scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const headerHeight = 80; // Fixed header height
            const elementPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: Math.max(0, elementPosition),
                behavior: 'smooth'
            });
            return true;
        }
        return false;
    }

    // Handle all navigation - both nav links and hero buttons
    document.addEventListener('click', function(e) {
        // Check if clicked element is a navigation link
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            const href = link.getAttribute('href');
            if (href && href.length > 1) {
                e.preventDefault();
                
                // Get target ID without the #
                const targetId = href.substring(1);
                
                // Close mobile menu if clicking nav link
                if (link.classList.contains('nav-link')) {
                    if (navMenu) navMenu.classList.remove('active');
                    if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
                }
                
                // Scroll to target
                scrollToElement(targetId);
            }
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && mobileMenuToggle) {
            const isNavClick = navMenu.contains(e.target) || mobileMenuToggle.contains(e.target);
            if (!isNavClick && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });

    // Simple header background change on scroll
    const header = document.querySelector('.header');
    if (header) {
        function updateHeader() {
            const scrolled = window.scrollY > 50;
            if (scrolled) {
                header.style.backgroundColor = 'rgba(255, 248, 220, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(26, 54, 93, 0.1)';
            } else {
                header.style.backgroundColor = 'rgba(255, 248, 220, 0.95)';
                header.style.boxShadow = 'none';
            }
        }
        
        window.addEventListener('scroll', updateHeader, { passive: true });
        updateHeader(); // Initial call
    }

    // Simple active nav highlighting
    function updateActiveNav() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav(); // Initial call

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navMenu) navMenu.classList.remove('active');
            if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        }
    });

    // Simple hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
    });

    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => item.style.transform = 'translateY(-4px)');
        item.addEventListener('mouseleave', () => item.style.transform = 'translateY(0)');
    });

    // Button click feedback
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => this.style.transform = '', 150);
        });
    });

    // Debug: Log section IDs and nav targets
    const sections = document.querySelectorAll('section[id]');
    const navTargets = document.querySelectorAll('a[href^="#"]');
    
    console.log('Available sections:');
    sections.forEach(section => console.log('- ' + section.id));
    
    console.log('Navigation targets:');
    navTargets.forEach(link => console.log('- ' + link.getAttribute('href')));
});

// Add essential styles
const styles = document.createElement('style');
styles.textContent = `
    .nav-link.active {
        color: #D4AF37 !important;
        background-color: rgba(212, 175, 55, 0.1) !important;
    }
    
    .nav-link.active::after {
        width: 80% !important;
    }
    
    html {
        scroll-behavior: smooth;
    }
    
    .service-card,
    .contact-item,
    .btn {
        transition: transform 0.3s ease;
    }
    
    .nav-menu.active {
        display: block !important;
    }
`;
document.head.appendChild(styles);