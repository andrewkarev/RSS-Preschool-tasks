const body = document.querySelector('#body');
const hamburger = document.querySelector('.hamburger');
const headerNav = document.querySelector('.header-navigation');
const navMenu = document.querySelector('.navigation-list')
const line1 = document.querySelector('.line1')
const line2 = document.querySelector('.line2')
const line3 = document.querySelector('.line3')


function toggleMenu() {
  hamburger.classList.toggle('-open');
  headerNav.classList.toggle('-open');
  body.classList.toggle("-lock");
}

function closeMenu(event) {
  if (event.target.classList.contains('nav-link')) {
    hamburger.classList.remove('-open');
    headerNav.classList.remove('-open');
    body.classList.remove("-lock");
  }
}

function hoverButton() {
  line1.classList.toggle('-active');
  line2.classList.toggle('-active');
  line3.classList.toggle('-active');
}

function stopHovering() {
  line1.classList.remove('-active');
  line2.classList.remove('-active');
  line3.classList.remove('-active');
}


hamburger.addEventListener('mouseover', hoverButton);
hamburger.addEventListener('mouseout', stopHovering);
hamburger.addEventListener('click', toggleMenu);
navMenu.addEventListener("click", closeMenu);


