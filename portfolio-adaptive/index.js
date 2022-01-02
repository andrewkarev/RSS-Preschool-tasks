const body = document.getElementById('body');
const hamburger = document.querySelector('.hamburger');
const headerNav = document.querySelector('.header-navigation');
const navMenu = document.querySelector('.navigation-list')


function toggleMenu() {
  hamburger.classList.toggle('open');
  headerNav.classList.toggle('open');
  body.classList.toggle("lock");
}

function closeMenu(event) {
  if (event.target.classList.contains('nav-link')) {
    hamburger.classList.remove('open');
    headerNav.classList.remove('open');
    body.classList.remove("lock");
  }
}

hamburger.addEventListener('click', toggleMenu);
navMenu.addEventListener("click", closeMenu);