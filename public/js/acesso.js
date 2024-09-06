document.addEventListener("DOMContentLoaded", function() {
    const painelDeslizante = document.querySelector('.painelDeslizante');
    const loginLink = document.querySelector('#container-buttons-login a');
    const cadastroLink = document.querySelector('#container-buttons-cadastro a');

    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        painelDeslizante.style.transform = 'translateX(0%)';
    });

    cadastroLink.addEventListener('click', function(e) {
        e.preventDefault();
        painelDeslizante.style.transform = 'translateX(100%)';
    });
});