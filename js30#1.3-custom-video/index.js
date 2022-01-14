const player = document.querySelector('.video-player')
const video = player.querySelector('.viewer')
const previewBtn = player.querySelector('.video-player-preview-btn')
// const progressDiv = player.querySelector('.video-player-progress')
const play = player.querySelector('.play-icon');
const sliders = player.querySelectorAll('.player-slider');
const speedRate = player.querySelector('.speed-rate');
const speedIcon = player.querySelector('.speed-icon');
const speed = player.querySelector('.speed');
const volumeIcon = player.querySelector('.volume-icon');


const progress = player.querySelector('.progress');
// const volume = player.querySelector('.volume');

function trackProgress() {
  const value = this.value;
  const maxValue = this.max;
  const minValue = this.min;
  const percent = Math.round(((value - minValue) / (maxValue - minValue)) * 100);

  this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, #fff ${percent}%, #fff 100%)`;
}


progress.addEventListener('input', trackProgress);

sliders.forEach(element => element.addEventListener('input', trackProgress))
// volume.addEventListener('input', trackProgress);
// speed.addEventListener('input', trackProgress);


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
  if (this.paused) {
    play.classList.remove('pause')
  } else {
    play.classList.add('pause')
  }
}

function handleRangeUpdate() {
  video[this.name] = this.value;

  if (this.name === 'playbackRate') {
    speedRate.textContent = `x${this.value}`
  }

  if (this.name === 'volume') {
    if (this.value >= 0.5) {
      volumeIcon.style.backgroundImage = 'url("./assets/svg/volume.svg")'
    }
    if (this.value <= 0.49) {
      volumeIcon.style.backgroundImage = 'url("./assets/svg/volume-half.svg")'
    }
    if (this.value === '0') {
      volumeIcon.style.backgroundImage = 'url("./assets/svg/mute.svg")'
    }
  }
}

function speedNormalizer() {
  video.playbackRate = 1;
  speedRate.textContent = `x1`;
  speed.value = 1;
  speed.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 44%, #fff 44%, #fff 100%)`;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
previewBtn.addEventListener('click', togglePlay);
play.addEventListener('click', togglePlay);

sliders.forEach(element => element.addEventListener('change', handleRangeUpdate))
sliders.forEach(element => element.addEventListener('mousemove', handleRangeUpdate))
speedIcon.addEventListener('click', speedNormalizer);