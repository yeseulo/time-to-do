const wrap = document.querySelector('.wrap');

const TOTAL_IMAGES = 5;

function paintBackground(number) {
  wrap.classList.add(`bg${number+1}`);
}

function getRandom() {
  return Math.floor(Math.random() * TOTAL_IMAGES);
}

function init() {
  const randomNumber = getRandom();
  paintBackground(randomNumber);
}

init();
