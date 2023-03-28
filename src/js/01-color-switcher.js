const startEl = document.querySelector('button[data-start');
const stopEl = document.querySelector('button[data-stop');

let timer = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const changeColor = () => {
  document.body.style.backgroundColor = getRandomHexColor();
};

const changeColorInterval = () => {
  timer = setInterval(() => {
    changeColor();
  }, 1000);
};

stopEl.setAttribute('disabled', '');

startEl.addEventListener('click', () => {
  changeColorInterval();
  stopEl.removeAttribute('disabled');
  startEl.setAttribute('disabled', '');
});

stopEl.addEventListener('click', () => {
  clearInterval(timer);
  startEl.removeAttribute('disabled');
  stopEl.setAttribute('disabled', '');
});
