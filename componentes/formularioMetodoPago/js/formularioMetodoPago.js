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
        input.addEventListener("blur", () => validar(input));
    });
})();