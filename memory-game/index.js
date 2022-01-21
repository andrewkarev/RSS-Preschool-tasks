// Scrypt file
const cards = document.querySelectorAll('.game__card');

function invertCard() {
  this.classList.toggle('invert');
  console.log(this)
}

cards.forEach(card => card.addEventListener('click', invertCard));