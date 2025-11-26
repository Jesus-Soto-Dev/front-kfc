// solución-final-funcional.js
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    console.log('🔧 SOLUCIÓN DEFINITIVA');

    // 1. ELIMINAR LOS TRIGGERS PROBLEMÁTICOS
    function eliminarTriggersConflictivos() {
        const triggers = document.querySelectorAll('.custom-select-trigger');
        console.log(`🗑️ Eliminando ${triggers.length} triggers conflictivos`);
        triggers.forEach(trigger => trigger.remove());
    }

    // 2. CONFIGURAR DROPDOWNS SOLO CON ICONOS
    function configurarDropdownsSimples() {
        const iconos = document.querySelectorAll('.label-with-icon i.bi-caret-down-fill');
        console.log(`🎯 Configurando ${iconos.length} dropdowns por iconos`);

        iconos.forEach((icono, index) => {
            const container = icono.closest('.custom-select-container') || 
                             icono.closest('.col.d-flex.flex-column') || 
                             icono.closest('.col-12') || 
                             icono.closest('.col');
            
            const menu = container?.querySelector('.custom-select-options');
            const hiddenInput = container?.querySelector('input[type="hidden"]');

            if (!menu) {
                console.log(`❌ Dropdown ${index + 1} sin menú`);
                return;
            }

            // Ocultar menú inicialmente
            menu.style.display = 'none';

            // Función para abrir/cerrar
            const toggleMenu = (e) => {
                e.stopPropagation();
                e.preventDefault();
                
                // Cerrar otros menús
                document.querySelectorAll('.custom-select-options').forEach(m => {
                    if (m !== menu) m.style.display = 'none';
                });

                // Toggle este menú
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
            };

            // Configurar icono
            icono.style.cursor = 'pointer';
            icono.addEventListener('click', toggleMenu);

            // Configurar selección
            menu.addEventListener('click', (e) => {
                if (e.target.tagName === 'LI') {
                    const value = e.target.getAttribute('data-value');
                    const texto = e.target.textContent;
                    
                    if (hiddenInput) {
                        hiddenInput.value = value;
                        // Marcar como válido
                        container.classList.remove('is-invalid');
                        container.classList.add('is-valid');
                    }
                    
                    menu.style.display = 'none';
                    console.log(`✅ Seleccionado: ${texto} (${value})`);
                }
            });

            console.log(`✓ Dropdown ${index + 1} configurado`);
        });

        // Cerrar menús al hacer click fuera
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.custom-select-options') && 
                !e.target.classList.contains('bi-caret-down-fill')) {
                document.querySelectorAll('.custom-select-options').forEach(menu => {
                    menu.style.display = 'none';
                });
            }
        });
    }

    // 3. CONFIGURAR VALIDACIÓN DE INPUTS
    function configurarValidacionInputs() {
        const inputs = document.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"]');
        
        inputs.forEach(input => {
            // Validar al salir del campo
            input.addEventListener('blur', function() {
                const valor = this.value.trim();
                this.classList.remove('is-invalid', 'is-valid');
                
                if (this.hasAttribute('required') && !valor) {
                    this.classList.add('is-invalid');
                } else if (this.hasAttribute('required') && valor) {
                    this.classList.add('is-valid');
                }
            });

            // Quitar error al escribir
            input.addEventListener('input', function() {
                this.classList.remove('is-invalid');
            });
        });
    }

    // 4. CONFIGURAR ENVÍO DE FORMULARIOS
    function configurarValidacionFormularios() {
        document.querySelectorAll('form').forEach((form, index) => {
            form.addEventListener('submit', function(e) {
                let esValido = true;
                console.log(`📝 Validando formulario ${index + 1}`);

                // Validar inputs
                const inputs = this.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"]');
                inputs.forEach(input => {
                    if (input.hasAttribute('required') && !input.value.trim()) {
                        input.classList.add('is-invalid');
                        esValido = false;
                        console.log(`❌ Input vacío: ${input.name || input.id}`);
                    }
                });

                // Validar dropdowns
                const dropdowns = this.querySelectorAll('.custom-select-options');
                dropdowns.forEach(menu => {
                    const container = menu.parentElement;
                    const hiddenInput = container.querySelector('input[type="hidden"]');
                    if (hiddenInput && !hiddenInput.value) {
                        container.classList.add('is-invalid');
                        esValido = false;
                        console.log(`❌ Dropdown sin selección: ${hiddenInput.name || hiddenInput.id}`);
                    }
                });

                if (!esValido) {
                    e.preventDefault();
                    console.log(`🚫 Formulario ${index + 1} bloqueado por errores`);
                } else {
                    console.log(`✅ Formulario ${index + 1} válido`);
                }
            });
        });
    }

    // EJECUTAR TODO EN ORDEN
    eliminarTriggersConflictivos();
    configurarDropdownsSimples(); 
    configurarValidacionInputs();
    configurarValidacionFormularios();

    console.log('🎉 SISTEMA CONFIGURADO - TODOS LOS DROPDOWNS DEBERÍAN FUNCIONAR');
});