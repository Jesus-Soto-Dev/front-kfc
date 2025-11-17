(function() {
    'use strict';
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input');
    
    function validarInput(input) {
        input.classList.remove('is-invalid');
        const valor = input.value.trim();
        
        if (!valor) {
            input.classList.add('is-invalid');
            return false;
        }
        
        if (input.type === 'tel') {
            if (!/^\d{9}$/.test(valor)) {
                input.classList.add('is-invalid');
                return false;
            }
        }
        
        if (input.type === 'email') {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
                input.classList.add('is-invalid');
                return false;
            }
        }
        
        if (input.id === 'perfil-linkedin' || input.id === 'perfil-twitter' || input.id === 'sitio-web') {
            if (!valor.startsWith('https://')) {
                input.classList.add('is-invalid');
                return false;
            }
        }
        
        return true;
    }
    
    inputs.forEach(input => {
        // Quitar el borde rojo cuando empieza a escribir
        input.addEventListener('input', () => {
            input.classList.remove('is-invalid');
        });
        
        // O cuando hace foco en el campo
        input.addEventListener('focus', () => {
            input.classList.remove('is-invalid');
        });
        
        input.addEventListener('blur', () => {
            validarInput(input); 
        });
    });
})();