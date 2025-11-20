(function () {
    'use strict';

    const form = document.getElementById("form-direccion");
    const inputs = form.querySelectorAll("input, select");

    function validarInput(input) {
        input.classList.remove("is-invalid");
        const value = input.value.trim();

        // Requeridos
        if (input.hasAttribute("required") && !value) {
            input.classList.add("is-invalid");
            return false;
        }

        // Código postal
        if (input.id === "cp" && !/^\d{5}$/.test(value)) {
            input.classList.add("is-invalid");
            return false;
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

