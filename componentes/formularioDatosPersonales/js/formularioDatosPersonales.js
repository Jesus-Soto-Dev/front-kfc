(function () {
    'use strict';

    const form = document.getElementById("form-personales");
    const inputs = form.querySelectorAll("input, select");

    // Función de validación
    function validarInput(input) {
        const value = input.value.trim();
        let isValid = true;

        // Resetear estado
        input.classList.remove("is-invalid");

        // Validar campos requeridos
        if (input.hasAttribute("required") && !value) {
            input.classList.add("is-invalid");
            isValid = false;
        }

        return isValid;
    }

    // Event listeners para inputs normales
    inputs.forEach(input => {
        if (input.type === 'hidden') return; // Los hidden se manejan en los dropdowns

        input.addEventListener('input', () => {
            input.classList.remove('is-invalid');
        });

        input.addEventListener('focus', () => {
            input.classList.remove('is-invalid');
        });

        input.addEventListener('blur', () => {
            validarInput(input);
        });
    });

    // Lógica para Dropdowns Personalizados
    const selectContainers = document.querySelectorAll('.custom-select-container');

    selectContainers.forEach(container => {
        const trigger = container.querySelector('.custom-select-trigger');
        const optionsMenu = container.querySelector('.custom-select-options');
        const hiddenInput = container.querySelector('input[type="hidden"]');
        const icon = container.querySelector('.label-with-icon i');

        // Toggle del menú
        const toggleMenu = (e) => {
            e.stopPropagation();
            // Cerrar otros menús abiertos
            document.querySelectorAll('.custom-select-options').forEach(menu => {
                if (menu !== optionsMenu) menu.style.display = 'none';
            });

            optionsMenu.style.display = optionsMenu.style.display === 'block' ? 'none' : 'block';
        };

        trigger.addEventListener('click', toggleMenu);
        if (icon) icon.addEventListener('click', toggleMenu);

        // Selección de opción
        optionsMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                const value = e.target.dataset.value;
                const text = e.target.textContent;

                trigger.textContent = text;
                hiddenInput.value = value;

                // Ocultar menú y validar
                optionsMenu.style.display = 'none';
                hiddenInput.classList.remove('is-invalid');

                // Disparar evento change manualmente si es necesario
                const event = new Event('change', { bubbles: true });
                hiddenInput.dispatchEvent(event);
            }
        });
    });

    // Cerrar dropdowns al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-select-container')) {
            document.querySelectorAll('.custom-select-options').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });

    // Validación al enviar el formulario
    form.addEventListener('submit', (e) => {
        let isFormValid = true;

        // Validar inputs normales
        inputs.forEach(input => {
            if (input.type !== 'hidden') {
                if (!validarInput(input)) {
                    isFormValid = false;
                }
            }
        });

        // Validar Dropdowns Personalizados
        selectContainers.forEach(container => {
            const hiddenInput = container.querySelector('input[type="hidden"]');

            // Si el input hidden está vacío (y asumimos que es requerido por contexto del form)
            // En este caso, como todos tienen asterisco en el HTML, asumimos requeridos.
            if (!hiddenInput.value) {
                hiddenInput.classList.add('is-invalid');
                isFormValid = false;
            } else {
                hiddenInput.classList.remove('is-invalid');
            }
        });

        if (!isFormValid) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

})();