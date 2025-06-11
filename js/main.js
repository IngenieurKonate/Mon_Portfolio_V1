// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Création des particules
    createParticles();
    
    // Initialisation du robot 3D
    initRobot();
    
    // Initialisation du formulaire de contact
    initContactForm();
    
    // Initialisation du smooth scroll
    initSmoothScroll();
    
    // Initialisation des animations des compétences
    initSkillsAnimation();
    
    // Initialisation des animations des éléments
    initElementsAnimation();
    
    // Initialisation des animations des services
    initServicesAnimation();
    
    // Délai pour l'effet de typing
    setTimeout(initTypingEffect, 500);
    
    // Event listeners pour le scroll
    window.addEventListener('scroll', () => {
        updateScrollIndicator();
        animateOnScroll();
    });
    
    // Animation de chargement de la page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
}); 