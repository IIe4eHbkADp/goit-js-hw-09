function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const mainBody = document.querySelector('body');
let timerId = null;

function onClickSwitcher() {
  timerId = setInterval(() => {
    mainBody.style.background = getRandomHexColor();
  }, 1000);
  btnStart.setAttribute('disabled', true);
}

btnStart.addEventListener('click', onClickSwitcher);

function onClickStop() {
  clearInterval(timerId);
  btnStart.removeAttribute('disabled', true);
}

btnStop.addEventListener('click', onClickStop);
