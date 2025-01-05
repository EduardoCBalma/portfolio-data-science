// Resaltar el enlace activo en la barra de navegación
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
    });
});

// Desplazamiento suave (Smooth Scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Validación de formulario (contacto)
const form = document.querySelector('form');
form.addEventListener('submit', function (e) {
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;
    
    if (!name || !email || !message) {
        e.preventDefault();
        alert('Por favor, completa todos los campos.');
    }
});

// Efecto de aparición de las tarjetas de proyectos
window.addEventListener('load', function () {
    const projectCards = document.querySelectorAll('#projects div > div');
    
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('show');  // Agrega la clase 'show' después de un retraso
        }, index * 300); // Un pequeño retraso para que las tarjetas aparezcan una por una
    });
});