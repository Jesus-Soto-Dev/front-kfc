(function() {
    'use strict';

    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input');

    function validarInput(input) {
        input.classList.remove('is-invalid');

        const valor = input.value.trim();

        // Requerido
        if (!valor) {
            input.classList.add('is-invalid');
            return false;
        }

        // Validación específica
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
        input.addEventListener('blur', () => {
            validarInput(input); 
        });
    });

})();
