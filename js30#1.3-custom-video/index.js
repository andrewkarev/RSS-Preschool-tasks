const player = document.querySelector('.video-player')
const video = player.querySelector('.viewer')
const previewBtn = player.querySelector('.video-player-preview-btn')
// const progressDiv = player.querySelector('.video-player-progress')
const play = player.querySelector('.play-icon');

const progress = player.querySelector('.progress');
const volume = player.querySelector('.volume');
const speed = player.querySelector('.speed');

function trackProgress() {
  const value = this.value;
  const maxValue = this.max;
  const minValue = this.min;
  const percent = Math.round(((value - minValue) / (maxValue - minValue)) * 100);

  this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, #fff ${percent}%, #fff 100%)`;
}

progress.addEventListener('input', trackProgress);
volume.addEventListener('input', trackProgress);
speed.addEventListener('input', trackProgress);


function togglePlay() {
  if (video.paused) {
    previewBtn.style.display = 'none'
    video.play()
  } else {
    previewBtn.style.display = 'block'
    video.pause()
  }
}

function updatePlayButton() {
  console.log(this)
  if (this.paused) {
    play.classList.add('pause')
  } else {
    play.classList.remove('pause')
  }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
previewBtn.addEventListener('click', togglePlay);
play.addEventListener('click', togglePlay);