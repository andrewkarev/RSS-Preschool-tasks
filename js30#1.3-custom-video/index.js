const progress = document.querySelector('.progress');
const volume = document.querySelector('.volume');
const speed = document.querySelector('.speed');

function trackProgress() {
  const value = this.value;
  const maxValue = this.max;
  const minValue = this.min;
  const percent = Math.round(((value - minValue) / (maxValue - minValue)) * 100)

  this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, #fff ${percent}%, #fff 100%)`
}

progress.addEventListener('input', trackProgress)
volume.addEventListener('input', trackProgress)
speed.addEventListener('input', trackProgress)