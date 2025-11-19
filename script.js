// ================================
// THEME TOGGLE
// ================================

function toggleTheme() {
    const body = document.body;
    const button = document.querySelector(".theme-toggle");
    body.classList.toggle("dark-mode");
    
    if (body.classList.contains("dark-mode")) {
        button.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        button.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
}

// Load saved theme on page load
window.addEventListener('load', function () {
    const savedTheme = localStorage.getItem("theme");
    const button = document.querySelector(".theme-toggle");
    
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        button.textContent = "☀️";
    } else {
        button.textContent = "🌙";
    }
});

// ================================
// MOBILE MENU TOGGLE
// ================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ================================
// SMOOTH SCROLLING
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// ACTIVE NAV LINK ON SCROLL
// ================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ================================
// SCROLL ANIMATIONS
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all elements with data-animate attribute
document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// ================================
// NAVBAR SCROLL EFFECT
// ================================

const navbar = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.padding = '12px 60px';
    } else {
        navbar.style.padding = '20px 60px';
    }
    
    lastScroll = currentScroll;
});

// ================================
// IMAGE MODAL (Click to view full image)
// ================================

const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("fullImg");
const closeBtn = document.querySelector(".close");

if (modal && modalImg && closeBtn) {
    // Open modal when clicking project images
    document.querySelectorAll(".project-img").forEach(img => {
        img.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImg.src = img.src;
            modalImg.alt = img.alt;
        });
    });

    // Close modal when clicking X
    closeBtn.onclick = () => {
        modal.style.display = "none";
    };

    // Close modal when clicking outside image
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
}

// ================================
// FORM SUBMISSION
// ================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Create success notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(74, 168, 255, 0.95);
            backdrop-filter: blur(20px);
            color: white;
            padding: 30px 50px;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            z-index: 10000;
            text-align: center;
            animation: fadeInUp 0.5s ease;
            border: 1px solid rgba(255, 255, 255, 0.3);
        `;
        
        notification.innerHTML = `
            <h3 style="margin-bottom: 10px; font-size: 1.5rem;">Message Sent! ✓</h3>
            <p style="opacity: 0.9;">Thank you for reaching out. I'll get back to you soon.</p>
        `;
        
        document.body.appendChild(notification);
        
        // Reset form
        contactForm.reset();
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOutDown 0.5s ease';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    });
}

// ================================
// PARALLAX EFFECT FOR HERO
// ================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < hero.offsetHeight) {
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ================================
// ADD ANIMATIONS KEYFRAMES
// ================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOutDown {
        from {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -40%);
        }
    }
`;
document.head.appendChild(style);

// ================================
// INITIALIZE ON PAGE LOAD
// ================================

window.addEventListener('load', () => {
    // Trigger initial active link update
    updateActiveLink();
    
    // Add entrance animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease';
            heroContent.style.opacity = '1';
        }, 100);
    }
});

// ================================
// SMOOTH PROJECT CARD HOVER
// ================================

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});
