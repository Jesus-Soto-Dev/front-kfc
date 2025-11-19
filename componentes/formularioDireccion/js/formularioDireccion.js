(function () {
    'use strict';

    const form = document.getElementById("form-direccion");
    const inputs = form.querySelectorAll("input, select");

    function validar(input) {
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
        input.addEventListener("blur", () => validar(input));
    });
})();