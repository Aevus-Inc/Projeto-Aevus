let btnMenu = document.getElementById('btn-menu');
let btnFechar = document.getElementById('btn-fechar');
let menu = document.getElementById('menu-mobile');
let overlay = document.getElementById('overlay-menu');

btnMenu.addEventListener('click', abrirMenu);
btnFechar.addEventListener('click', fecharMenu);
overlay.addEventListener('click', fecharMenu);

function abrirMenu() {
    menu.classList.add('abrir-menu');
    overlay.classList.add('abrir-menu');
}

function fecharMenu() {
    menu.classList.remove('abrir-menu');
    overlay.classList.remove('abrir-menu');
}