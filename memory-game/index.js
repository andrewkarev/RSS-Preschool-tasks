// Scrypt file
const cards = document.querySelectorAll('.game__card');

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

    checkCardsMatch()
  }

}

function checkCardsMatch() {
  firstCard.dataset.character === secondCard.dataset.character ? disableCards() : spinCardsBack();
}

function disableCards() {
  cardIsSpinned = false;

  setTimeout(() => {
    let firstCardCover = firstCard.querySelector('.game__card-cover');
    let secondCardCover = secondCard.querySelector('.game__card-cover');
    firstCardCover.classList.add('disable');
    secondCardCover.classList.add('disable');
    firstCard.classList.add('disable');
    secondCard.classList.add('disable');
  }, 800);

  firstCard.removeEventListener('click', spinCard);
  secondCard.removeEventListener('click', spinCard);
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

mixCards()
cards.forEach(card => card.addEventListener('click', spinCard));

// Подобрать шрифт
// Оформление хэдера game
// Счет на табличке или фон прозрачный?
// Блок стартового меню
// Оформление секций с правилами игры и лидербордом
// Оформление кнопки start
// Переключение между меню и игровым полем. Сброс настроек до дефолтных при переходе в меню
// Логика. Подсчет очков
// Логика. Отображение ркзультата в лидерборде
// Сохранение последних результатов в local storage