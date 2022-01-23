const body = document.querySelector('body');
const header = document.querySelector('header');
const gameBoard = document.querySelector('.game');
const startMenu = document.querySelector('.main-menu');
const appearanceElements = [body, header, gameBoard, startMenu];

const cards = document.querySelectorAll('.game__card');
const currentScore = document.querySelector('.header__score');
const leaderboardBtn = document.querySelector('.game-btn--leaderboard');
const startBtn = document.querySelector('.game-btn--start');
const refreshBtn = document.querySelector('.game-btn--refresh');
const leaderboard = document.querySelector('.main-menu__items');

let scoreCounter = 0;
let cardsMatchCounter = 6;
let cardIsSpinned = false;
let isLoced = false;
let firstCard, secondCard;

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
    scoreCounter++;

    scoreChanging();
    checkCardsMatch();
  }
}

function scoreChanging() {
  setTimeout(() => {
    currentScore.textContent = scoreCounter;
  }, 500);
}

function checkCardsMatch() {
  firstCard.dataset.character === secondCard.dataset.character ? disableCards() : spinCardsBack();
}

function disableCards() {
  isLoced = true;
  cardIsSpinned = false;
  cardsMatchCounter -= 1;

  firstCard.removeEventListener('click', spinCard);
  secondCard.removeEventListener('click', spinCard);
  // Testing local storage function
  if (cardsMatchCounter === 0) {
    saveHighScore()
  }

  removeCards();
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

  mixCards();
}

function refreshGame() {
  appearanceElements.forEach(element => element.classList.add('visually-hidden'));
  resetGameSettings();
}

function resetGameSettings() {
  const cardsCover = document.querySelectorAll('.game__card-cover');
  cardsCover.forEach(cover => cover.classList.remove('disable'));

  cards.forEach(card => {
    card.classList.remove('spin');
    card.classList.remove('disable');

    card.addEventListener('click', spinCard);
  });

  scoreCounter = 0;
  cardIsSpinned = false;
  isLoced = false;
  firstCard = null;
  secondCard = null;

  scoreChanging();
}

cards.forEach(card => card.addEventListener('click', spinCard));

leaderboardBtn.addEventListener('click', () => leaderboard.classList.toggle('rotate'));

startBtn.addEventListener('click', startGame);

refreshBtn.addEventListener('click', refreshGame);


// Оформление секций с правилами игры и лидербордом
// Добавить автоматическое увеличение очков на +1 каждые n-секунд?
// Логика. Отображение ркзультата в лидерборде
// Сохранение последних результатов в local storage

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

function saveHighScore() {

  highScores.push(Number(currentScore.textContent) + 1);
  highScores.sort((a, b) => a - b);
  highScores.splice(10);

  localStorage.setItem('highScores', JSON.stringify(highScores));
}