// script.js

document.addEventListener('DOMContentLoaded', () => {
    // ===========================
    // Particules d'arrière-plan
    // ===========================
    const canvas = document.querySelector('.particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function createParticles() {
            particles = [];
            const particleCount = Math.floor(window.innerWidth / 20);
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1,
                    color: document.body.classList.contains('dark-mode') 
                              ? 'rgba(255, 255, 255, 0.3)' 
                              : 'rgba(0, 0, 0, 0.2)',
                    velocity: {
                        x: (Math.random() - 0.5) * 0.5,
                        y: (Math.random() - 0.5) * 0.5
                    }
                });
            }
        }
        
        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
                
                // Mise à jour de la position
                particle.x += particle.velocity.x;
                particle.y += particle.velocity.y;
                
                // Rebond sur les bords
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.velocity.x *= -1;
                }
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.velocity.y *= -1;
                }
            });
            requestAnimationFrame(drawParticles);
        }
        
        resizeCanvas();
        createParticles();
        drawParticles();
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
    }
    
    // ===========================
    // Thème (Light/Dark) Toggle
    // ===========================
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        themeToggle.addEventListener('click', () => {
            if (document.body.classList.contains('light-mode')) {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
            if (typeof createParticles === 'function') {
                createParticles(); // Recréer les particules avec la nouvelle couleur
            }
        });
    }
    
    // ===========================
    // Menu mobile
    // ===========================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
    
    // ===========================
    // Formulaire de contact
    // ===========================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Merci, votre message a été envoyé !');
            contactForm.reset();
        });
    }
    
    // ===========================
    // Animation au défilement
    // ===========================
    const fadeElements = document.querySelectorAll('.contact-info, .contact-form, .map-container');
    function fadeInOnScroll() {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
                element.classList.add('fade-in');
            }
        });
    }
    window.addEventListener('scroll', fadeInOnScroll);
    window.addEventListener('load', fadeInOnScroll);
    
    // Optionnel : Appliquer fade-in à toutes les sections dès le chargement
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // ===========================
    // Lier le Frontend au Backend
    // ===========================
    // Définir l'URL de base de ton API
    // Pour tester en local, garde l'URL ci-dessous.
    // En production, remplace-la par l'URL de ton backend (ex: 'https://ton-backend.infinityfreeapp.com/api/')
    const apiBaseUrl = 'http://localhost/ThomasLemarchand/api/';
    
    // Fonction pour récupérer les projets depuis le backend
    function fetchProjects() {
        fetch(apiBaseUrl + 'get_projects.php')
            .then(response => response.json())
            .then(data => {
                console.log('Projets reçus:', data);
                displayProjects(data);
            })
            .catch(error => console.error('Erreur lors de la récupération des projets:', error));
    }
    
    // Fonction pour afficher les projets dans la galerie de la page Vidéo
    function displayProjects(projects) {
        const gallery = document.getElementById('videoGallery');
        if (!gallery) return;
        gallery.innerHTML = '';
        projects.forEach(project => {
            const item = document.createElement('div');
            item.classList.add('video-item');
            item.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <span>${project.category}</span>
            `;
            gallery.appendChild(item);
        });
    }
    
    // Appeler la fonction pour récupérer et afficher les projets
    fetchProjects();
});
