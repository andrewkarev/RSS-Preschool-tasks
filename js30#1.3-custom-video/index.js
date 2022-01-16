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
const volume = player.querySelector('.volume');
const progress = player.querySelector('.video-player-progress');
const progressBar = player.querySelector('.progress-filled');
const currentTimeCode = player.querySelector('.time-code-current');
const durationTimeCode = player.querySelector('.time-code-duration');
const fullscreen = player.querySelector('.fullscreen-icon');

let previousVolumeValue
let isMuted = false

function handleSlidersProgress() {
  const value = this.value;
  const maxValue = this.max;
  const minValue = this.min;
  const percent = Math.round(((value - minValue) / (maxValue - minValue)) * 100);

  this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, #fff ${percent}%, #fff 100%)`;
}


sliders.forEach(element => element.addEventListener('input', handleSlidersProgress))

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
      video.muted = false;
    }
    if (this.value <= 0.49) {
      volumeIcon.style.backgroundImage = 'url("./assets/svg/volume-half.svg")'
      video.muted = false;
    }
    if (this.value === '0') {
      volumeIcon.style.backgroundImage = 'url("./assets/svg/mute.svg")'
      video.muted = true;
    }
  }
}

function speedNormalizer() {
  video.playbackRate = 1;
  speedRate.textContent = `x1`;
  speed.value = 1;
  speed.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 44%, #fff 44%, #fff 100%)`;
}

function mute() {
  if (video.muted && isMuted === false) {
    video.muted = true;
    isMuted = false;
  } else if (!video.muted) {
    previousVolumeValue = volume.value
    video.muted = true;
    isMuted = true;
    volume.value = 0;
    volumeIcon.style.backgroundImage = 'url("./assets/svg/mute.svg")';
    volume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 0%, #fff 0%, #fff 100%)`;
  } else {
    isMuted = false
    video.muted = false
    volume.value = previousVolumeValue
    const maxValue = volume.max;
    const minValue = volume.min;
    const percent = Math.round(((previousVolumeValue - minValue) / (maxValue - minValue)) * 100);

    if (volume.value >= 0.5) {
      volumeIcon.style.backgroundImage = 'url("./assets/svg/volume.svg")'
      volume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, #fff ${percent}%, #fff 100%)`;
    } else if (volume.value <= 0.49) {
      volumeIcon.style.backgroundImage = 'url("./assets/svg/volume-half.svg")'
      volume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, #fff ${percent}%, #fff 100%)`;
    }
  }
}

function handleVideoProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

function setVideoTime(e) {
  const videoCurrentTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = videoCurrentTime;
}

function videoTimeCodeUpdate() {
  let currentSeconds = Math.floor(video.currentTime);
  let durationSeconds = Math.floor(video.duration);

  currentTimeCode.textContent = `0:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
  durationTimeCode.textContent = `0:${durationSeconds}`;
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    console.log(document.fullscreenElement)
    document.exitFullscreen();
    fullscreen.style.backgroundImage = 'url("./assets/svg/fullscreen.svg")'
  } else {
    player.requestFullscreen();
    fullscreen.style.backgroundImage = 'url("./assets/svg/exit-fullscreen.svg")'
  }
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
previewBtn.addEventListener('click', togglePlay);
play.addEventListener('click', togglePlay);
sliders.forEach(element => element.addEventListener('change', handleRangeUpdate));
sliders.forEach(element => element.addEventListener('mousemove', handleRangeUpdate));
speedIcon.addEventListener('click', speedNormalizer);
volumeIcon.addEventListener('click', mute);
video.addEventListener('timeupdate', handleVideoProgress);
progress.addEventListener('click', setVideoTime);
video.addEventListener('timeupdate', videoTimeCodeUpdate);
fullscreen.addEventListener('click', toggleFullscreen)


// TODO
// Добавить логику для fullscreen
// Добавить функции клавишам
// Добавить poster
// Добавить Медиазапрос для hover button
// refactor code