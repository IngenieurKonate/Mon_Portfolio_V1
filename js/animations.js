// Animation des particules
function createParticles() {
    const particles = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particles.appendChild(particle);
    }
}

// Animation de l'indicateur de scroll
function updateScrollIndicator() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('scrollIndicator').style.width = scrollPercent + '%';
}

// Animation des éléments au scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .project-card, .skill-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Animation du formulaire de contact
function initContactForm() {
    const form = document.getElementById('contactForm');
    const animation = document.getElementById('contactAnimation');
    
    // Animation de l'icône de contact
    setInterval(() => {
        animation.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
            animation.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    }, 3000);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Animation de soumission
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.style.background = 'linear-gradient(45deg, #ffaa00, #ff6600)';
        
        setTimeout(() => {
            submitBtn.textContent = 'Message envoyé ! ✓';
            submitBtn.style.background = 'linear-gradient(45deg, #00ff00, #008800)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(45deg, #00ff00, #008800)';
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Smooth scroll pour la navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation des compétences au hover
function initSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1.3) rotate(360deg)';
            icon.style.transition = 'transform 0.5s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Animation d'apparition progressive des éléments
function initElementsAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                } else if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animation = 'slideInLeft 0.6s ease forwards';
                } else if (entry.target.classList.contains('skill-item')) {
                    entry.target.style.animation = 'bounceIn 0.4s ease forwards';
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .project-card, .skill-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Effet de typing pour le titre principal
function initTypingEffect() {
    const title = document.querySelector('.hero-content h1');
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
            // Ajouter un curseur clignotant
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.style.animation = 'blink 1s infinite';
            title.appendChild(cursor);
        }
    }, 100);
}

// Animation des services cards
function initServicesAnimation() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
    });
} 