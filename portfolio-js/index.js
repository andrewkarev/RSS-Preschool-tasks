import i18Obj from './translate.js';
const body = document.querySelector('#body');
const hamburger = document.querySelector('.hamburger');
const headerNav = document.querySelector('.header-navigation');
const navMenu = document.querySelector('.navigation-list')
const line1 = document.querySelector('.line1')
const line2 = document.querySelector('.line2')
const line3 = document.querySelector('.line3')
const langSwitcher = document.querySelector('.header-language-switch')



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


//Shifting photos in portfolio section

const portfolioBtn = document.querySelectorAll('.portfolio-btn');
const portfolioImages = document.querySelectorAll('.portfolio-item img');
const portfolioBtns = document.querySelector('.portfolio-buttons');
const seasons = ['winter', 'spring', 'summer', 'autumn'];


function changeImage(event) {
  if (event.target.classList.contains('portfolio-btn')) {
    let target = event.target
    portfolioImages.forEach((img, index) => img.src = `./assets/img/${target.dataset.season}/${index + 1}.jpg`);
  }
}

function preloadImages() {
  for (let season of seasons) {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${season}/${i}.jpg`;
    }
  }
}

function changeClassActive(event) {
  if (event.target.classList.contains('portfolio-btn')) {
    portfolioBtn.forEach(btn => btn.classList.remove('-active'));

    let target = event.target
    target.classList.add('-active');
  }
}


portfolioBtns.addEventListener('click', changeImage);
portfolioBtns.addEventListener('click', changeClassActive);
preloadImages();


// internationalization ('i18n')

function getTranslate(event) {
  if (event.target.classList.contains('radio-btn')) {
    const textParam = document.querySelectorAll('[data-i18]')
    let lang = event.target.dataset.language
    textParam.forEach(elem => elem.textContent = i18Obj[lang][elem.dataset.i18])
  }
}

langSwitcher.addEventListener('click', getTranslate);


// Changing theme mode
const headerContainer = document.querySelector('.header-container');
const headerLogo = document.querySelector('.header-logo');
const heroSection = document.querySelector('.hero');
const themeSwitcher = document.querySelector('.theme-switcher');
const contactsSection = document.querySelector('.contacts');
const instagramIcon = document.querySelector('.instagram');
const facebookIcon = document.querySelector('.facebook');
const twitterIcon = document.querySelector('.twitter');
const pinterestIcon = document.querySelector('.pinterest');
const footerContainer = document.querySelector('.footer-container');

const sectionTitleContainer = document.querySelectorAll('.section-title-container');
const navigationItem = document.querySelectorAll('.navigation-item');
const radioButton = document.querySelectorAll('.radio-btn');
const buttonTypeOne = document.querySelectorAll('.btn-type-one');
const buttonTypeTwo = document.querySelectorAll('.btn-type-two');
const sectionTitle = document.querySelectorAll('.section-title');
const priceItemCost = document.querySelectorAll('.price-item-cost');
const formItem = document.querySelectorAll('.form-item');
const formControlWrapper = document.querySelectorAll('.form-control-wrapper');

const lightThemeSingleElement = [body, headerContainer, headerLogo, heroSection, themeSwitcher, contactsSection, instagramIcon, facebookIcon, twitterIcon, pinterestIcon, footerContainer];
const lightThemeGroupsOfElements = [sectionTitleContainer, navigationItem, radioButton, buttonTypeOne, buttonTypeTwo, sectionTitle, priceItemCost, formItem, formControlWrapper]



function changeTheme(event) {
  if (event.target.classList.contains('theme-switcher')) {
    lightThemeSingleElement.forEach(elem => elem.classList.toggle('light-theme'));
    lightThemeGroupsOfElements.forEach(elem => elem.forEach(e => e.classList.toggle('light-theme')))
  }
}


themeSwitcher.addEventListener('click', changeTheme)


// TODO
// Изменить hover эффекты svg изображений

