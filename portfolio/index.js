// SELF-EVALUATION
import selfEvaluation from './selfeval.js';
// INTERNATIONALIZATION ('i18n')
import i18Obj from './translate.js';
const langSwitcher = document.querySelector('.header-language-switch');
// SCROLL TO TOP BUTTON
const scrollToTopButton = document.querySelector('.btn-to-top');
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
const lightThemeSingleElement = [body, headerContainer, headerLogo, heroSection, themeSwitcher, themeSwitcherButton, contactsSection, footerContainer, navigationList, scrollToTopButton];
const lightThemeGroupsOfElements = [sectionTitleContainer, navigationItem, radioButton, buttonTypeOne, buttonTypeTwo, sectionTitle, priceItemCost, priceButton, formItem, formControlWrapper, footerIcon, burgerMenuLine];
// VIDEO PLAYER
const player = document.querySelector('.video-player');
const video = player.querySelector('.viewer');
const previewBtn = player.querySelector('.video-player-preview-btn');
const play = player.querySelector('.play-icon');
const sliders = player.querySelectorAll('.player-slider');
const speedRate = player.querySelector('.speed-rate');
const speedIcon = player.querySelector('.speed-icon');
const speed = player.querySelector('.speed');
const volumeIcon = player.querySelector('.volume-icon');
const volume = player.querySelector('.volume');
const progress = player.querySelector('.video-player-progress');
const progressBar = player.querySelector('.progress-filled');
const currentTimeCode = player.querySelector('.time-code-current');
const durationTimeCode = player.querySelector('.time-code-duration');
const fullscreen = player.querySelector('.fullscreen-icon');

let isMuted = false;
let previousVolumeValue;

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

// SCROLL TO TOP BUTTON
function handleScroll() {
  if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

window.addEventListener('scroll', handleScroll);
scrollToTopButton.addEventListener('click', scrollToTop);

// LOG THE SELF-EVALUATION
console.log(selfEvaluation);


// VIDEO PLAYER
function handleSlidersProgress() {
  const value = this.value;
  const maxValue = this.max;
  const minValue = this.min;
  const percent = Math.round(((value - minValue) / (maxValue - minValue)) * 100);

  this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, #fff ${percent}%, #fff 100%)`;
}

function togglePlay() {
  if (video.paused) {
    previewBtn.style.display = 'none';
    video.play();
  } else {
    previewBtn.style.display = 'block';
    video.pause();
  }
}

function updatePlayButton() {
  if (this.paused) {
    play.classList.remove('pause');
  } else {
    play.classList.add('pause');
  }
}

function handleRangeUpdate() {
  video[this.name] = this.value;

  if (this.name === 'playbackRate') {
    speedRate.textContent = `x${this.value}`;
  }

  if (this.name === 'volume') {
    if (this.value >= 0.5) {
      volumeIcon.style.backgroundImage = 'url("./assets/svg/volume.svg")';
      video.muted = false;
    }
    if (this.value <= 0.49) {
      volumeIcon.style.backgroundImage = 'url("./assets/svg/volume-half.svg")';
      video.muted = false;
    }
    if (this.value === '0') {
      volumeIcon.style.backgroundImage = 'url("./assets/svg/mute.svg")';
      video.muted = true;
    }
  }
}

function speedNormalizer() {
  video.playbackRate = 1;
  speedRate.textContent = `x1`;
  speed.value = 1;
  speed.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 44%, #fff 44%, #fff 100%)`;
}

function mute() {
  if (video.muted && isMuted === false) {
    video.muted = true;
    isMuted = false;
  } else if (!video.muted) {
    previousVolumeValue = volume.value;
    video.muted = true;
    isMuted = true;
    volume.value = 0;
    volumeIcon.style.backgroundImage = 'url("./assets/svg/mute.svg")';
    volume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 0%, #fff 0%, #fff 100%)`;
  } else {
    isMuted = false;
    video.muted = false;
    volume.value = previousVolumeValue;
    const maxValue = volume.max;
    const minValue = volume.min;
    const percent = Math.round(((previousVolumeValue - minValue) / (maxValue - minValue)) * 100);

    if (volume.value >= 0.5) {
      volumeIcon.style.backgroundImage = 'url("./assets/svg/volume.svg")';
      volume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, #fff ${percent}%, #fff 100%)`;
    } else if (volume.value <= 0.49) {
      volumeIcon.style.backgroundImage = 'url("./assets/svg/volume-half.svg")';
      volume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, #fff ${percent}%, #fff 100%)`;
    }
  }
}

function handleVideoProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

function setVideoTime(e) {
  const videoCurrentTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = videoCurrentTime;
}

function videoTimeCodeUpdate() {
  let currentSeconds = Math.floor(video.currentTime);
  let durationSeconds = Math.floor(video.duration);

  currentTimeCode.textContent = `0:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
  durationTimeCode.textContent = `0:${durationSeconds}`;
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    fullscreen.style.backgroundImage = 'url("./assets/svg/fullscreen.svg")';
  } else {
    player.requestFullscreen();
    fullscreen.style.backgroundImage = 'url("./assets/svg/exit-fullscreen.svg")';
  }
}

function onKeyDown(e) {
  e.preventDefault();

  if (e.code === 'Space' || e.code === 'KeyK') {
    togglePlay();
  }

  if (e.code === 'KeyM') {
    mute();
  }

  if (e.code === 'KeyR') {
    speedNormalizer();
  }

  if (e.code === 'KeyF') {
    toggleFullscreen();
  }

  if (e.code === 'ArrowLeft') {
    video.currentTime -= 5;
  }

  if (e.code === 'ArrowRight') {
    video.currentTime += 5;
  }

  if (e.code === 'Digit0' || e.code === 'Numpad0') {
    video.currentTime = 0;
  }

  if (e.code === 'Digit1' || e.code === 'Numpad1') {
    video.currentTime = video.duration * 0.1;
  }

  if (e.code === 'Digit2' || e.code === 'Numpad2') {
    video.currentTime = video.duration * 0.2;
  }

  if (e.code === 'Digit3' || e.code === 'Numpad3') {
    video.currentTime = video.duration * 0.3;
  }

  if (e.code === 'Digit4' || e.code === 'Numpad4') {
    video.currentTime = video.duration * 0.4;
  }

  if (e.code === 'Digit5' || e.code === 'Numpad5') {
    video.currentTime = video.duration * 0.5;
  }

  if (e.code === 'Digit6' || e.code === 'Numpad6') {
    video.currentTime = video.duration * 0.6;
  }

  if (e.code === 'Digit7' || e.code === 'Numpad7') {
    video.currentTime = video.duration * 0.7;
  }

  if (e.code === 'Digit8' || e.code === 'Numpad8') {
    video.currentTime = video.duration * 0.8;
  }

  if (e.code === 'Digit9' || e.code === 'Numpad9') {
    video.currentTime = video.duration * 0.9;
  }
}

document.addEventListener('keydown', onKeyDown);

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', videoTimeCodeUpdate);
video.addEventListener('timeupdate', handleVideoProgress);

previewBtn.addEventListener('click', togglePlay);

play.addEventListener('click', togglePlay);

sliders.forEach(element => element.addEventListener('input', handleSlidersProgress));
sliders.forEach(element => element.addEventListener('change', handleRangeUpdate));
sliders.forEach(element => element.addEventListener('mousemove', handleRangeUpdate));

speedIcon.addEventListener('click', speedNormalizer);

volumeIcon.addEventListener('click', mute);

progress.addEventListener('click', setVideoTime);

fullscreen.addEventListener('click', toggleFullscreen);