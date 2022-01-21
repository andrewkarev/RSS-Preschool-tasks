// Scrypt file
const cards = document.querySelectorAll('.game__card');

function spinCard() {
  this.classList.add('spin');

  setTimeout(() => this.classList.remove('spin'), 1500)
}

cards.forEach(card => card.addEventListener('click', spinCard));