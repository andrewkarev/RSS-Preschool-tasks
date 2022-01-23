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

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const highScoreList = document.querySelector('.main-menu__position-list');

const endMenu = document.querySelector('.end-menu');
const endMenupoints = document.querySelector('.end-menu__points');

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

  if (cardsMatchCounter === 0) {
    // Connect to save function
    // saveHighScore();

    setTimeout(showEndMenu, 1500);
  }
  // Connect to save function
  // updateLeaderboard();

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

  if (endMenu.classList.contains('visually-hidden')) {
    resetGameSettings()
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

  scoreChanging();
}

// function saveHighScore() {
//   highScores.push(Number(currentScore.textContent) + 1);
//   highScores.sort((a, b) => a - b);
//   highScores.splice(10);

//   localStorage.setItem('highScores', JSON.stringify(highScores));
// }

// function updateLeaderboard() {
//   highScoreList.innerHTML = highScores.map(score => `<li class='main-menu__list-item'>${score}</li>`).join('');
// }

function showEndMenu() {
  endMenu.classList.add('visually-hidden');
  header.classList.add('visually-hidden');
  gameBoard.classList.add('visually-hidden');
  endMenupoints.textContent = scoreCounter;
}

cards.forEach(card => card.addEventListener('click', spinCard));

leaderboardBtn.addEventListener('click', () => leaderboard.classList.toggle('rotate'));

startBtn.forEach(btn => btn.addEventListener('click', startGame));

refreshBtn.forEach(btn => btn.addEventListener('click', refreshGame));

window.addEventListener('load', updateLeaderboard);

// Оформление секций с правилами игры и лидербордом
// Добавить автоматическое увеличение очков на +1 каждые n-секунд?
// Логика. Получать имя игрока и отображать его в лидерборде вместе с очками


const saveBtn = document.querySelector('.game-btn--save');
const userName = document.querySelector('.end-menu__input')

function saveScore(e) {
  e.preventDefault();

  const result = {
    playerScore: currentScore.textContent,
    name: userName.value,
  };

  highScores.push(result);
  highScores.sort((a, b) => a.playerScore - b.playerScore);
  highScores.splice(10);

  localStorage.setItem('highScores', JSON.stringify(highScores));

  console.log(highScores)
}

saveBtn.addEventListener('click', saveScore);
userName.addEventListener('keyup', () => saveBtn.disabled = !userName.value);


// updateLeaderboard();


function updateLeaderboard() {
  highScoreList.innerHTML = highScores.map(score => `<li class='main-menu__list-item'>${score}</li>`).join('');
}