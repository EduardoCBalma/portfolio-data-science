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
    projectCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transition = 'opacity 0.5s ease-in-out';
        setTimeout(() => {
            card.style.opacity = 1;
        }, 100);
    });
});

// Mostrar u ocultar sección de contacto
const contactSection = document.querySelector('#contact');
const contactButton = document.createElement('button');
contactButton.textContent = "Mostrar/Ocultar Contacto";
document.querySelector('main').prepend(contactButton);

contactButton.addEventListener('click', () => {
    if (contactSection.style.display === "none") {
        contactSection.style.display = "block";
    } else {
        contactSection.style.display = "none";
    }
});

// Mostrar un mensaje de bienvenida (opcional)
window.onload = function () {
    alert("¡Bienvenido a mi portafolio!");
}
