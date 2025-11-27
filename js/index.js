document.addEventListener("DOMContentLoaded", function () {
    "use strict";

// 1. CONFIGURAR DROPDOWNS COMPACTOS ()
function configurarDropdowns() {
    const iconos = document.querySelectorAll(".dropdown-icon");

    iconos.forEach((icono) => {
        const container = icono.closest(".custom-select-container");
        const menu = container?.querySelector(".custom-select-options");
        const hiddenInput = container?.querySelector('input[type="hidden"]');

        if (!menu) return;

        // Ocultar menú inicialmente
        menu.style.display = "none";

        // Usar el selected-text existente o crear uno
        let textoElement = container.querySelector(".selected-text");
        if (!textoElement) {
            textoElement = document.createElement("div");
            textoElement.className = "selected-text";
            textoElement.style.color = "#6c757d";
            textoElement.style.fontWeight = "400";
            // Insertar antes del icono en los contenedores inline
            if (container.classList.contains("inline")) {
                container.insertBefore(textoElement, icono);
            } else {
                container.appendChild(textoElement);
            }
        }

        // Función para abrir/cerrar menú
        const toggleMenu = (e) => {
            e.stopPropagation();
            e.preventDefault();

            // Cerrar otros menús
            document.querySelectorAll(".custom-select-options").forEach((m) => {
                if (m !== menu) m.style.display = "none";
            });

            // Toggle este menú
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        };

        // Configurar icono
        icono.style.cursor = "pointer";
        icono.addEventListener("click", toggleMenu);

        // También permitir click en el texto para abrir
        textoElement.style.cursor = "pointer";
        textoElement.addEventListener("click", toggleMenu);

        // Configurar selección de opciones
        menu.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
                const value = e.target.getAttribute("data-value");
                const texto = e.target.textContent;

                // Actualizar texto seleccionado
                textoElement.textContent = texto;
                textoElement.style.color = "#333";
                textoElement.style.fontWeight = "700";

                // Actualizar hidden input
                if (hiddenInput) {
                    hiddenInput.value = value;
                    // Marcar como válido
                    container.classList.remove("is-invalid");
                    container.classList.add("is-valid");
                }

                // Cerrar menú
                menu.style.display = "none";
            }
        });

        // Mostrar valor actual si existe
        if (hiddenInput && hiddenInput.value) {
            const opcionSeleccionada = menu.querySelector(`li[data-value="${hiddenInput.value}"]`);
            if (opcionSeleccionada) {
                textoElement.textContent = opcionSeleccionada.textContent;
                textoElement.style.color = "#333";
                textoElement.style.fontWeight = "700";
            }
        }
    });

    // Cerrar menús al hacer click fuera
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".custom-select-options") && 
            !e.target.classList.contains("dropdown-icon") &&
            !e.target.classList.contains("selected-text")) {
            document.querySelectorAll(".custom-select-options").forEach((menu) => {
                menu.style.display = "none";
            });
        }
    });
}
    // 2. CONFIGURAR VALIDACIÓN DE INPUTS
    function configurarValidacionInputs() {
        const inputs = document.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"]');

        inputs.forEach((input) => {
            // Validar al salir del campo
            input.addEventListener("blur", function () {
                validarInput(this);
            });

            // Quitar error al escribir
            input.addEventListener("input", function () {
                this.classList.remove("is-invalid");
                if (this.value.trim()) {
                    this.classList.add("is-valid");
                }
            });
        });
    }

    function validarInput(input) {
        const valor = input.value.trim();
        input.classList.remove("is-invalid", "is-valid");

        if (input.hasAttribute("required") && !valor) {
            input.classList.add("is-invalid");
        } else if (input.hasAttribute("required") && valor) {
            input.classList.add("is-valid");
        }
    }

    // 3. CONFIGURAR PRODUCTOS SEPARADOS
    function configurarProductos() {
        // Productos principales
        const cardsPrincipal = document.querySelectorAll('.producto-card-separado[data-plan]');
        const hiddenPrincipal = document.getElementById('plan-seleccionado');
        const errorPrincipal = document.getElementById('plan-error');

        cardsPrincipal.forEach(card => {
            card.addEventListener('click', function() {
                // Remover selección anterior
                cardsPrincipal.forEach(c => c.classList.remove('selected'));
                
                // Seleccionar actual
                this.classList.add('selected');
                
                // Guardar valor
                const plan = this.getAttribute('data-plan');
                hiddenPrincipal.value = plan;
                
                // Ocultar error
                errorPrincipal.style.display = 'none';
                
                //console.log('Plan seleccionado:', plan);
            });
        });

        // Productos secundarios (selección múltiple)
        const cardsSecundario = document.querySelectorAll('.producto-card-separado[data-producto]');
        const hiddenSecundario = document.getElementById('producto-seleccionado');
        const errorSecundario = document.getElementById('producto-error');

        cardsSecundario.forEach(card => {
            card.addEventListener('click', function() {
                // Toggle selección (pueden ser múltiples)
                this.classList.toggle('selected');
                
                // Actualizar valores seleccionados
                const seleccionados = Array.from(cardsSecundario)
                    .filter(c => c.classList.contains('selected'))
                    .map(c => c.getAttribute('data-producto'));
                
                hiddenSecundario.value = seleccionados.join(',');
                
                // Ocultar error si hay selección
                if (seleccionados.length > 0) {
                    errorSecundario.style.display = 'none';
                }
                
                //console.log('Productos secundarios seleccionados:', seleccionados);
            });
        });
    }

    // 4. VALIDACIÓN COMPLETA AL ENVIAR
    function configurarEnvio() {
        const btnEnviar = document.getElementById('btn-enviar');
        
        btnEnviar.addEventListener('click', function() {
            let esValido = true;

            // Validar inputs requeridos
            const inputsRequeridos = document.querySelectorAll('input[required]');
            inputsRequeridos.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('is-invalid');
                    esValido = false;
                }
            });

            // Validar dropdowns requeridos
            const dropdowns = document.querySelectorAll('.custom-select-container');
            dropdowns.forEach(dropdown => {
                const hiddenInput = dropdown.querySelector('input[type="hidden"]');
                const textoElement = dropdown.querySelector('.selected-text');
                
                // Verificar si tiene texto seleccionado
                if (hiddenInput && !hiddenInput.value && (!textoElement || !textoElement.textContent.trim())) {
                    dropdown.classList.add('is-invalid');
                    esValido = false;
                } else if (hiddenInput && hiddenInput.value) {
                    dropdown.classList.remove('is-invalid');
                    dropdown.classList.add('is-valid');
                }
            });

            // Validar producto principal
            const planSeleccionado = document.getElementById('plan-seleccionado').value;
            const errorPlan = document.getElementById('plan-error');
            if (!planSeleccionado) {
                errorPlan.style.display = 'block';
                esValido = false;
            } else {
                errorPlan.style.display = 'none';
            }

            // Validar producto secundario
            const productoSecundario = document.getElementById('producto-seleccionado').value;
            const errorSecundario = document.getElementById('producto-error');
            if (!productoSecundario) {
                errorSecundario.style.display = 'block';
                esValido = false;
            } else {
                errorSecundario.style.display = 'none';
            }

            // Mostrar resultado
            if (esValido) {
                alert('¡Formulario enviado correctamente!');
                //console.log('Formulario válido, enviando datos...');
            } else {
                alert('Por favor completa todos los campos requeridos.');
                // Scroll al primer error
                const primerError = document.querySelector('.is-invalid');
                if (primerError) {
                    primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

        configurarDropdowns();
        configurarValidacionInputs();
        configurarProductos();
        configurarEnvio();
        
});