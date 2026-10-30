const openButton = document.querySelector('#openButton');
const envelopeWrap = document.querySelector('.envelope-wrap');
const surprise = document.querySelector('#surprise');
const musicButton = document.querySelector('#musicButton');
const musicStatus = document.querySelector('#musicStatus');
const playIcon = document.querySelector('.play-icon');
const song = document.querySelector('#song');

openButton.addEventListener('click', async () => {
  envelopeWrap.classList.add('opening');
  openButton.disabled = true;
  openButton.firstChild.textContent = 'Opening... ';

  try {
    await song.play();
  } catch (error) {
    musicStatus.textContent = 'Press to play';
  }

  window.setTimeout(() => {
    surprise.classList.add('visible');
    surprise.setAttribute('aria-hidden', 'false');
    surprise.scrollIntoView({ behavior: 'smooth' });
  }, 1800);
});

musicButton.addEventListener('click', async () => {
  if (!song.paused) {
    song.pause();
    return;
  }

  try {
    await song.play();
  } catch (error) {
    musicStatus.textContent = 'Could not play this song';
    musicButton.setAttribute('aria-label', 'Could not play song');
  }
});

song.addEventListener('play', () => {
  musicButton.classList.add('playing');
  playIcon.textContent = 'Ⅱ';
  musicStatus.textContent = 'Playing now';
});

song.addEventListener('pause', () => {
  musicButton.classList.remove('playing');
  playIcon.textContent = '▶';
  musicStatus.textContent = 'Press to play';
});
