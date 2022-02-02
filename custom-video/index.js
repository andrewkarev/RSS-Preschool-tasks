const player = document.querySelector('.video-player');
const video = player.querySelector('.viewer');
const previewBtn = player.querySelector('.video-player-preview-btn');
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

let isMuted = false;
let previousVolumeValue;

function handleSlidersProgress() {
  const value = this.value;
  const maxValue = this.max;
  const minValue = this.min;
  const percent = Math.round(((value - minValue) / (maxValue - minValue)) * 100);

  this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, #fff ${percent}%, #fff 100%)`;
}

function togglePlay() {
  if (video.paused) {
    previewBtn.style.display = 'none';
    video.play();
  } else {
    previewBtn.style.display = 'block';
    video.pause();
  }
}

function updatePlayButton() {
  if (this.paused) {
    play.classList.remove('pause');
  } else {
    play.classList.add('pause');
  }
}

function handleRangeUpdate() {
  video[this.name] = this.value;

  if (this.name === 'playbackRate') {
    speedRate.textContent = `x${this.value}`;
  }

  if (this.name === 'volume') {
    if (this.value >= 0.5) {
      volumeIcon.style.backgroundImage = 'url("./assets/svg/volume.svg")';
      video.muted = false;
    }
    if (this.value <= 0.49) {
      volumeIcon.style.backgroundImage = 'url("./assets/svg/volume-half.svg")';
      video.muted = false;
    }
    if (this.value === '0') {
      volumeIcon.style.backgroundImage = 'url("./assets/svg/mute.svg")';
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
    previousVolumeValue = volume.value;
    video.muted = true;
    isMuted = true;
    volume.value = 0;
    volumeIcon.style.backgroundImage = 'url("./assets/svg/mute.svg")';
    volume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 0%, #fff 0%, #fff 100%)`;
  } else {
    isMuted = false;
    video.muted = false;
    volume.value = previousVolumeValue;
    const maxValue = volume.max;
    const minValue = volume.min;
    const percent = Math.round(((previousVolumeValue - minValue) / (maxValue - minValue)) * 100);

    if (volume.value >= 0.5) {
      volumeIcon.style.backgroundImage = 'url("./assets/svg/volume.svg")';
      volume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, #fff ${percent}%, #fff 100%)`;
    } else if (volume.value <= 0.49) {
      volumeIcon.style.backgroundImage = 'url("./assets/svg/volume-half.svg")';
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
    document.exitFullscreen();
    fullscreen.style.backgroundImage = 'url("./assets/svg/fullscreen.svg")';
  } else {
    player.requestFullscreen();
    fullscreen.style.backgroundImage = 'url("./assets/svg/exit-fullscreen.svg")';
  }
}

function onKeyDown(e) {
  e.preventDefault();

  if (e.code === 'Space' || e.code === 'KeyK') {
    togglePlay();
  }

  if (e.code === 'KeyM') {
    mute();
  }

  if (e.code === 'KeyR') {
    speedNormalizer();
  }

  if (e.code === 'KeyF') {
    toggleFullscreen();
  }

  if (e.code === 'ArrowLeft') {
    video.currentTime -= 5;
  }

  if (e.code === 'ArrowRight') {
    video.currentTime += 5;
  }

  if (e.code === 'Digit0' || e.code === 'Numpad0') {
    video.currentTime = 0;
  }

  if (e.code === 'Digit1' || e.code === 'Numpad1') {
    video.currentTime = video.duration * 0.1;
  }

  if (e.code === 'Digit2' || e.code === 'Numpad2') {
    video.currentTime = video.duration * 0.2;
  }

  if (e.code === 'Digit3' || e.code === 'Numpad3') {
    video.currentTime = video.duration * 0.3;
  }

  if (e.code === 'Digit4' || e.code === 'Numpad4') {
    video.currentTime = video.duration * 0.4;
  }

  if (e.code === 'Digit5' || e.code === 'Numpad5') {
    video.currentTime = video.duration * 0.5;
  }

  if (e.code === 'Digit6' || e.code === 'Numpad6') {
    video.currentTime = video.duration * 0.6;
  }

  if (e.code === 'Digit7' || e.code === 'Numpad7') {
    video.currentTime = video.duration * 0.7;
  }

  if (e.code === 'Digit8' || e.code === 'Numpad8') {
    video.currentTime = video.duration * 0.8;
  }

  if (e.code === 'Digit9' || e.code === 'Numpad9') {
    video.currentTime = video.duration * 0.9;
  }
}


document.addEventListener('keydown', onKeyDown);

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', videoTimeCodeUpdate);
video.addEventListener('timeupdate', handleVideoProgress);

previewBtn.addEventListener('click', togglePlay);

play.addEventListener('click', togglePlay);

sliders.forEach(element => element.addEventListener('input', handleSlidersProgress));
sliders.forEach(element => element.addEventListener('change', handleRangeUpdate));
sliders.forEach(element => element.addEventListener('mousemove', handleRangeUpdate));

speedIcon.addEventListener('click', speedNormalizer);

volumeIcon.addEventListener('click', mute);

progress.addEventListener('click', setVideoTime);

fullscreen.addEventListener('click', toggleFullscreen);