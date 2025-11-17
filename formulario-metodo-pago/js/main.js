(function() {
    'use strict';
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input');
    
    function validarInput(input) {
        input.classList.remove('is-invalid');
        const valor = input.value.trim();
        
        if (!valor) {
            input.classList.add('is-invalid');
            return false;
        }
        
        if (input.type === 'tel') {
            if (!/^\d{9}$/.test(valor)) {
                input.classList.add('is-invalid');
                return false;
            }
        }
        
        if (input.type === 'email') {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
                input.classList.add('is-invalid');
                return false;
            }
        }
        
        if (input.id === 'perfil-linkedin' || input.id === 'perfil-twitter' || input.id === 'sitio-web') {
            if (!valor.startsWith('https://')) {
                input.classList.add('is-invalid');
                return false;
            }
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

const trigger = document.querySelector(".custom-select-trigger");
const optionsMenu = document.querySelector(".custom-select-options");
const hiddenInput = document.getElementById("tipo-cuenta");

trigger.addEventListener("click", () => {
  const isVisible = optionsMenu.style.display === "block";
  optionsMenu.style.display = isVisible ? "none" : "block";
});

optionsMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    trigger.textContent = e.target.textContent;
    hiddenInput.value = e.target.dataset.value;
    optionsMenu.style.display = "none";
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".custom-select-container")) {
    optionsMenu.style.display = "none";
  }
});

  const container = document.querySelector('.custom-select-container');
  const caret = container.querySelector('.bi-caret-down-fill');
  const options = container.querySelector('.custom-select-options');

  caret.addEventListener('click', () => {
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
  });

  // Cerrar si haces click fuera
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      options.style.display = 'none';
    }
  });