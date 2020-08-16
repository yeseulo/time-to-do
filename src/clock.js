const clock = document.getElementById('js-clock');

function fitFormat(number) {
  return number < 10 ? `0${number}` : number;
}

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  clock.innerText = `${fitFormat(hours)}:${fitFormat(minutes)}:${fitFormat(
    seconds
  )}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();