// Selección de las cards
const cards = document.querySelectorAll('.Producto-principal .card');
const planInput = document.getElementById('plan-seleccionado');
const planError = document.getElementById('plan-error');

// Agregar evento click a cada card
cards.forEach(card => {
    card.addEventListener('click', function() {
        // Remover clase 'selected' de todas las cards
        cards.forEach(c => c.classList.remove('selected'));
        
        // Agregar clase 'selected' a la card clickeada
        this.classList.add('selected');
        
        // Guardar el valor en el input hidden
        planInput.value = this.getAttribute('data-plan');
        
        // Ocultar mensaje de error si existe
        planError.style.display = 'none';
    });
});

// Validación al enviar el formulario
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    // Verificar si se seleccionó un plan
    if (!planInput.value) {
        e.preventDefault(); // Prevenir el envío del formulario
        planError.style.display = 'block';
        
        // Scroll hacia el error
        document.querySelector('.Producto-principal').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
});