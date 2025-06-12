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

// Gestion du formulaire de contact
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Récupération des données du formulaire
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Envoi des données à Formspree
    fetch('https://formspree.io/f/meokgkde', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            // Succès
            alert('Message envoyé avec succès !');
            document.getElementById('contactForm').reset();
        } else {
            // Erreur
            throw new Error('Erreur lors de l\'envoi du message');
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
    });
});

// Fonction de copie de l'email
document.getElementById('copy-button').addEventListener('click', function() {
    const emailText = document.getElementById('email-text').textContent;
    const button = this;
    const tooltip = button.querySelector('.tooltip');
    const originalTooltipText = tooltip.textContent;

    // Copier le texte
    navigator.clipboard.writeText(emailText).then(() => {
        // Changer l'apparence du bouton
        button.classList.add('copied');
        tooltip.textContent = 'Copié !';

        // Réinitialiser après 2 secondes
        setTimeout(() => {
            button.classList.remove('copied');
            tooltip.textContent = originalTooltipText;
        }, 2000);
    }).catch(err => {
        console.error('Erreur lors de la copie :', err);
        tooltip.textContent = 'Erreur !';
        setTimeout(() => {
            tooltip.textContent = originalTooltipText;
        }, 2000);
    });
}); 