(function () {
    'use strict';

    const form = document.getElementById("form-pago");
    const inputs = form.querySelectorAll("input, select");

    function validar(input) {
        input.classList.remove("is-invalid");
        const value = input.value.trim();

        if (input.hasAttribute("required") && !value) {
            input.classList.add("is-invalid");
            return false;
        }

        if (input.id === "tarjeta" && !/^\d{16}$/.test(value)) {
            input.classList.add("is-invalid");
            return false;
        }

        if (input.id === "cvv" && !/^\d{3}$/.test(value)) {
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