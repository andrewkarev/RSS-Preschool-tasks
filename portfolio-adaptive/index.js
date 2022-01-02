const body = document.getElementById('body');
const hamburger = document.querySelector('.hamburger');
const headerNav = document.querySelector('.header-navigation');

function toggleMenu() {
  hamburger.classList.toggle('open');
  headerNav.classList.toggle('open');
  body.classList.toggle("lock");
}

hamburger.addEventListener('click', toggleMenu);

