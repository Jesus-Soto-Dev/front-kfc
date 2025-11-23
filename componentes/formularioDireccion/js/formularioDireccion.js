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

    
    // Dropdown personalizado
    const trigger = document.querySelector(".custom-select-trigger");
    const optionsMenu = document.querySelector(".custom-select-options");
    const hiddenInput = document.getElementById("tipo-cuenta");
    const customSelectContainer = document.querySelector('.custom-select-container');

    // Abrir/ocultar al hacer clic en el trigger
    trigger.addEventListener("click", () => {
        optionsMenu.style.display = optionsMenu.style.display === "block" ? "none" : "block";
    });

    // Abrir al hacer clic en el <i>
    const icon = document.querySelector(".label-with-icon i");
    icon.addEventListener("click", () => {
        trigger.click();
    });

    // Seleccionar opción
    optionsMenu.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
            trigger.textContent = e.target.textContent;
            hiddenInput.value = e.target.dataset.value;
            optionsMenu.style.display = "none";
            hiddenInput.classList.remove('is-invalid');
        }
    });

})();

