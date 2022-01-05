const body = document.getElementById('body');
const hamburger = document.querySelector('.hamburger');
const headerNav = document.querySelector('.header-navigation');
const navMenu = document.querySelector('.navigation-list')
const line1 = document.querySelector('.line1')
const line2 = document.querySelector('.line2')
const line3 = document.querySelector('.line3')


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

function hoverButton() {
  line1.classList.toggle('active');
  line2.classList.toggle('active');
  line3.classList.toggle('active');
}

function stopHovering() {
  line1.classList.remove('active');
  line2.classList.remove('active');
  line3.classList.remove('active');
}


hamburger.addEventListener('mouseover', hoverButton);
hamburger.addEventListener('mouseout', stopHovering);
hamburger.addEventListener('click', toggleMenu);
navMenu.addEventListener("click", closeMenu);


//**********************************

const portfolioBtn = document.querySelector('.portfolio-btn');
const portfolioImages = document.querySelectorAll('.portfolio-item img');
const portfolioBtns = document.querySelector('.portfolio-buttons');
const seasons = ['winter', 'spring', 'summer', 'autumn'];



function changeImage(event) {
  if (event.target.classList.contains('portfolio-btn')) {
    let target = event.target

    if (target.dataset.season === "spring") {
      portfolioImages.forEach((img, index) => img.src = `./assets/img/spring/${index + 1}.jpg`);
    }
    if (target.dataset.season === "winter") {
      portfolioImages.forEach((img, index) => img.src = `./assets/img/winter/${index + 1}.jpg`);
    }
    if (target.dataset.season === "summer") {
      portfolioImages.forEach((img, index) => img.src = `./assets/img/summer/${index + 1}.jpg`);
    }
    if (target.dataset.season === "autumn") {
      portfolioImages.forEach((img, index) => img.src = `./assets/img/autumn/${index + 1}.jpg`);
    }
  }
}

portfolioBtns.addEventListener('click', changeImage);


function preloadImages() {
  for (let season of seasons) {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${season}/${i}.jpg`;
    }
  }
}

preloadImages();