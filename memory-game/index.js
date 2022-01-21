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

    if (firstCard.dataset.character === secondCard.dataset.character) {
      cardIsSpinned = false;
      firstCard.removeEventListener('click', spinCard);
      secondCard.removeEventListener('click', spinCard);
    } else {
      isLoced = true;
      setTimeout(() => {
        firstCard.classList.remove('spin');
        secondCard.classList.remove('spin');

        cardIsSpinned = false;
        isLoced = false;
      }, 1500);
    }
  }

}

cards.forEach(card => card.addEventListener('click', spinCard));