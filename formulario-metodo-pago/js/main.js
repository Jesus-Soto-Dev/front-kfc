(function() {
    'use strict';
    const forms = document.querySelectorAll('form');
    const inputs = form.querySelectorAll('input');

    function validarInput(input) {
        input.classList.remove('is-invalid');
        const valor = input.value.trim();

        if (!valor) {
            input.classList.add('is-invalid');
            return false;
        }

        // IBAN España
        if (input.id === 'numero-iban') {
            if (!/^ES\d{22}$/.test(valor)) {
                input.classList.add('is-invalid');
                return false;
            }
        }

        // SWIFT/BIC
        if (input.id === 'swift-bic') {
            if (!/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(valor)) {
                input.classList.add('is-invalid');
                return false;
            }
        }

        // Teléfono
        if (input.type === 'tel') {
            if (!/^\d{9}$/.test(valor)) {
                input.classList.add('is-invalid');
                return false;
            }
        }

        // Email
        if (input.type === 'email') {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
                input.classList.add('is-invalid');
                return false;
            }
        }

        // URLs profesionales
        if (['perfil-linkedin','perfil-twitter','sitio-web'].includes(input.id)) {
            if (!valor.startsWith('https://')) {
                input.classList.add('is-invalid');
                return false;
            }
        }

        return true;
    }

    // Validación en tiempo real
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => input.classList.remove('is-invalid'));
            input.addEventListener('focus', () => input.classList.remove('is-invalid'));
            input.addEventListener('blur', () => validarInput(input)); 
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

    // Cerrar dropdown si se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!customSelectContainer.contains(e.target)) {
            optionsMenu.style.display = "none";
        }
    });

    // Validación al enviar formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let todoValido = true;

        inputs.forEach(input => {
            if (!validarInput(input)) {
                todoValido = false;
            }
        });

        // Validar dropdown
        if (!hiddenInput.value) {
            hiddenInput.classList.add('is-invalid');
            todoValido = false;
        } else {
            hiddenInput.classList.remove('is-invalid');
        }

        if (todoValido) {
            alert('Formulario válido. Se puede enviar!');
            form.submit(); 
        } else {
            alert('Por favor completa todos los campos correctamente.');
        }
    });

})();
