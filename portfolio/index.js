// SELF-EVALUATION
import selfEvaluation from './selfeval.js';
// INTERNATIONALIZATION ('i18n')
import i18Obj from './translate.js';
const langSwitcher = document.querySelector('.header-language-switch');
// BURGER MENU
const body = document.querySelector('#body');
const hamburger = document.querySelector('.hamburger');
const headerNav = document.querySelector('.header-navigation');
const navMenu = document.querySelector('.navigation-list');
const line1 = document.querySelector('.line1');
const line2 = document.querySelector('.line2');
const line3 = document.querySelector('.line3');
// SHIFTING PHOTOS IN PORTFOLIO SECTION
const portfolioBtn = document.querySelectorAll('.portfolio-btn');
const portfolioImages = document.querySelectorAll('.portfolio-item img');
const portfolioBtns = document.querySelector('.portfolio-buttons');
const seasons = ['winter', 'spring', 'summer', 'autumn'];
// CHANGINH THEME
const headerContainer = document.querySelector('.header-container');
const headerLogo = document.querySelector('.icon');
const heroSection = document.querySelector('.hero');
const themeSwitcher = document.querySelector('.theme-switcher');
const themeSwitcherButton = document.querySelector('.theme-switcher-btn');
const contactsSection = document.querySelector('.contacts');
const footerContainer = document.querySelector('.footer-container');
const navigationList = document.querySelector('.navigation-list');
const sectionTitleContainer = document.querySelectorAll('.section-title-container');
const navigationItem = document.querySelectorAll('.navigation-item');
const radioButton = document.querySelectorAll('.radio-btn');
const buttonTypeOne = document.querySelectorAll('.btn-type-one');
const buttonTypeTwo = document.querySelectorAll('.btn-type-two');
const sectionTitle = document.querySelectorAll('.section-title');
const priceItemCost = document.querySelectorAll('.price-item-cost');
const priceButton = document.querySelectorAll('.price-btn');
const formItem = document.querySelectorAll('.form-item');
const formControlWrapper = document.querySelectorAll('.form-control-wrapper');
const footerIcon = document.querySelectorAll('.footer-icon');
const burgerMenuLine = document.querySelectorAll('.line');
const lightThemeSingleElement = [body, headerContainer, headerLogo, heroSection, themeSwitcher, themeSwitcherButton, contactsSection, footerContainer, navigationList];
const lightThemeGroupsOfElements = [sectionTitleContainer, navigationItem, radioButton, buttonTypeOne, buttonTypeTwo, sectionTitle, priceItemCost, priceButton, formItem, formControlWrapper, footerIcon, burgerMenuLine];

// BURGER MENU
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

//SHIFTING PHOTOS IN PORTFOLIO SECTION
function changeImage(event) {
  if (event.target.classList.contains('portfolio-btn')) {
    let target = event.target;
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

    let target = event.target;
    target.classList.add('-active');
  }
}

portfolioBtns.addEventListener('click', changeImage);
portfolioBtns.addEventListener('click', changeClassActive);
preloadImages();

// INTERNATIONALIZATION ('i18n')
function getTranslate(currLang) {
  const textParam = document.querySelectorAll('[data-i18]');
  textParam.forEach(elem => elem.textContent = i18Obj[currLang][elem.dataset.i18]);
}

function setLocalStorageLang(event) {
  if (event.target.classList.contains('radio-btn')) {
    let toLang = event.target.dataset.language;

    if (event.target.classList.contains('radio-btn-2')) {
      if (localStorage.getItem('lang') !== 'ru') {
        localStorage.setItem('lang', 'ru');
      }
    } else {
      localStorage.removeItem('lang');
    }
    getTranslate(toLang);
  }
}

langSwitcher.addEventListener('click', setLocalStorageLang);

// CHANGINH THEME
function changeTheme() {
  lightThemeSingleElement.forEach(elem => elem.classList.toggle('light-theme'));
  lightThemeGroupsOfElements.forEach(elem => elem.forEach(e => e.classList.toggle('light-theme')));

  if (themeSwitcherButton.classList.contains('light-theme')) {
    themeSwitcherButton.innerHTML = '<use href="./assets/svg/sprite.svg#theme-switcher-light"></use>';
  } else {
    themeSwitcherButton.innerHTML = '<use href="./assets/svg/sprite.svg#theme-switcher"></use>';
  }
}

function setLocalStorageTheme() {
  if (localStorage.getItem('theme') === 'light') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'light');
  }
  changeTheme();
}

themeSwitcher.addEventListener('click', setLocalStorageTheme);

// SAVING USERS SETTINGS IN LOCAL STORAGE
function getLocalStorage() {
  if (localStorage.getItem('theme') === 'light') {
    changeTheme();
  }
  if (localStorage.getItem('lang') === 'ru') {
    const rafioBtn1 = document.querySelector('#radio1');
    const rafioBtn2 = document.querySelector('#radio2');

    rafioBtn1.removeAttribute('checked');
    rafioBtn2.setAttribute('checked', 'checked');
    getTranslate(localStorage.getItem('lang'));
  }
}

window.addEventListener('load', getLocalStorage);

// RTPPLE EFFECT FOR ACTIVE BUTTONS
buttonTypeOne.forEach(elem => elem.addEventListener('click', addElement));
priceButton.forEach(elem => elem.addEventListener('click', addElement));

function addElement(event) {
  const newElem = document.createElement('div');
  const position = this.getBoundingClientRect();

  newElem.style.left = event.clientX - position.left + 'px';
  newElem.style.top = event.clientY - position.top + 'px';

  newElem.classList.add('circle');
  this.appendChild(newElem);

  setTimeout(() => newElem.remove(), 500);
}

// LOG THE SELF-EVALUATION
console.log(selfEvaluation);