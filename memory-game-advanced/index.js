const body = document.querySelector('body');
const header = document.querySelector('header');
const gameBoard = document.querySelector('.game');
const startMenu = document.querySelector('.main-menu');
const appearanceElements = [body, header, gameBoard, startMenu];

const cards = document.querySelectorAll('.game__card');
const currentScore = document.querySelector('.header__score');
const leaderboardBtn = document.querySelector('.game-btn--leaderboard');
const startBtn = document.querySelectorAll('.game-btn--start');
const refreshBtn = document.querySelectorAll('.game-btn--refresh');
const leaderboard = document.querySelector('.main-menu__items');

const highScoresAdvanced = JSON.parse(localStorage.getItem('highScores-advanced')) || [];
const highScoreList = document.querySelector('.main-menu__position-list');

const endMenu = document.querySelector('.end-menu');
const endMenupoints = document.querySelector('.end-menu__points');

const saveBtn = document.querySelector('.game-btn--save');
const userName = document.querySelector('.end-menu__input');

const backgroundImages = ['url("./assets/img/bg1.jpg")', 'url("./assets/img/bg2.webp")', 'url("./assets/img/bg3.jpg")'];

const backgroundMusic = document.querySelector('.background-music');
const soundBtn = document.querySelector('.sound__sound-btn');

const winStreakText = document.querySelector('.header__win-streak');

let scoreCounter = 0;
let cardsMatchCounter = 6;
let cardIsSpinned = false;
let isLoced = false;
let firstCard, secondCard;
let timer;
let winStreak = false;
let winStreakMultiplier = 1;


function spinCard() {
  if (isLoced) {
    return;
  }

  if (!cardIsSpinned) {
    this.classList.add('spin');
    firstCard = this;
    cardIsSpinned = true;
  } else if (this !== firstCard) {
    this.classList.add('spin');
    secondCard = this;

    checkCardsMatch();
  }
}

function checkCardsMatch() {
  firstCard.dataset.character === secondCard.dataset.character ? disableCards() : spinCardsBack();
}

function disableCards() {
  isLoced = true;
  cardIsSpinned = false;
  cardsMatchCounter -= 1;

  if (winStreak) {
    winStreakMultiplier += 1;
    scoreCounter -= winStreakMultiplier;
  } else {
    winStreak = true;
    winStreakMultiplier = 1;
    scoreCounter -= winStreakMultiplier;
  }

  showWinStreak();

  firstCard.removeEventListener('click', spinCard);
  secondCard.removeEventListener('click', spinCard);

  if (cardsMatchCounter === 0) {
    stopInterval();
    setTimeout(showEndMenu, 1500);
  }

  scoreChanging();
  removeCards();
}

function scoreChanging() {
  setTimeout(() => {
    currentScore.textContent = scoreCounter;
  }, 100);
}

function removeCards() {
  setTimeout(() => {
    let firstCardCover = firstCard.querySelector('.game__card-cover');
    let secondCardCover = secondCard.querySelector('.game__card-cover');
    firstCardCover.classList.add('disable');
    secondCardCover.classList.add('disable');
    firstCard.classList.add('disable');
    secondCard.classList.add('disable');

    isLoced = false;
  }, 800);
}

function spinCardsBack() {
  isLoced = true;
  winStreak = false;
  winStreakMultiplier = 1;

  setTimeout(() => {
    firstCard.classList.remove('spin');
    secondCard.classList.remove('spin');

    cardIsSpinned = false;
    isLoced = false;
  }, 1500);
}

function mixCards() {
  cards.forEach(card => {
    let randomNumber = Math.floor(Math.random() * 12);
    card.style.order = randomNumber;
  })
}

function startGame() {
  appearanceElements.forEach((element) => element.classList.remove('visually-hidden'));

  if (leaderboard.classList.contains('rotate')) {
    leaderboard.classList.remove('rotate');
  }

  if (endMenu.classList.contains('visually-hidden')) {
    resetGameSettings();
  }

  mixCards();
  startInterval();
}

function refreshGame() {
  appearanceElements.forEach(element => element.classList.add('visually-hidden'));
  resetGameSettings();
  stopInterval();
}

function resetGameSettings() {
  const cardsCover = document.querySelectorAll('.game__card-cover');
  cardsCover.forEach(cover => cover.classList.remove('disable'));

  if (endMenu.classList.contains('visually-hidden')) {
    endMenu.classList.remove('visually-hidden');
  }

  cards.forEach(card => {
    card.classList.remove('spin');
    card.classList.remove('disable');

    card.addEventListener('click', spinCard);
  });

  scoreCounter = 0;
  cardsMatchCounter = 6;
  cardIsSpinned = false;
  isLoced = false;
  firstCard = null;
  secondCard = null;
  winStreak = false;
  winStreakMultiplier = 1;

  scoreChanging();
}

function showEndMenu() {
  endMenu.classList.add('visually-hidden');
  header.classList.add('visually-hidden');
  gameBoard.classList.add('visually-hidden');
  endMenupoints.textContent = scoreCounter;
}

function updateLeaderboard() {
  highScoreList.innerHTML = highScoresAdvanced.map(item => `<li class="main-menu__list-item"><p class="main-menu__score"><span>${item.name}</span><span>${item.playerScore}</span></p></li>`).join('');
};

function saveScore(e) {
  e.preventDefault();

  const result = {
    playerScore: currentScore.textContent,
    name: userName.value,
  };

  highScoresAdvanced.push(result);
  highScoresAdvanced.sort((a, b) => a.playerScore - b.playerScore);
  highScoresAdvanced.splice(10);

  localStorage.setItem('highScores-advanced', JSON.stringify(highScoresAdvanced));

  leaderboard.classList.add('rotate');

  updateLeaderboard();
  refreshGame();
}

function setBackground() {
  const background = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

  if (localStorage.getItem('background') === background) {
    setBackground();
  } else {
    body.style.setProperty('--bg', background);
    localStorage.setItem('background', background);
  }
}

function playMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    soundBtn.textContent = 'off';
  } else {
    backgroundMusic.pause();
    soundBtn.textContent = 'on';
  }
}

function startInterval() {
  timer = setInterval(increaseScore, 1500);
}

function increaseScore() {
  scoreCounter++;
  scoreChanging();
}

function stopInterval() {
  clearInterval(timer);
}

function showWinStreak() {
  winStreakText.textContent = `x${winStreakMultiplier}`;

  winStreakText.classList.add('pulse');
  setTimeout(() => winStreakText.classList.remove('pulse'), 1500);
}

cards.forEach(card => card.addEventListener('click', spinCard));
cards.forEach(card => card.addEventListener('touchstart', spinCard));

leaderboardBtn.addEventListener('click', () => leaderboard.classList.toggle('rotate'));

startBtn.forEach(btn => btn.addEventListener('click', startGame));

refreshBtn.forEach(btn => btn.addEventListener('click', refreshGame));

window.addEventListener('load', updateLeaderboard);
window.addEventListener('load', setBackground);

saveBtn.addEventListener('click', saveScore);
userName.addEventListener('keyup', () => saveBtn.disabled = !userName.value);

soundBtn.addEventListener('click', playMusic);