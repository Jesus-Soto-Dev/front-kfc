(function () {
    'use strict';

    const form = document.getElementById("form-personales");
    const inputs = form.querySelectorAll("input, select");

    // --- RELLENAR DÍAS ---
    const diaSelect = document.getElementById("dia");
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        diaSelect.appendChild(option);
    }

    // --- RELLENAR AÑOS ---
    const anoSelect = document.getElementById("ano");
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < 100; i++) {
        const year = currentYear - i;
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        anoSelect.appendChild(option);
    }


    function validarInput(input) {
        input.classList.remove("is-invalid");

        const value = input.value.trim();

        // Requeridos
        if (input.hasAttribute("required") && !value) {
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
/* */