import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const datePicerEl = document.getElementById('datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate <= selectedDates[0]) {
      startBtn.removeAttribute('disabled');
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.setAttribute('disabled', '');
    }
  },
};

flatpickr(datePicerEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  if (value.toString().length === 1) {
    return value.toString().padStart(2, '0');
  }
  return value;
};

datePicerEl.addEventListener('input', e => {
  const pickedDate = new Date(e.currentTarget.value).getTime();

  startBtn.addEventListener('click', () => {
    const countdown = setInterval(() => {
      const currentDate = new Date().getTime();
      let timeLeft = pickedDate - currentDate;

      secondsEl.innerHTML = addLeadingZero(convertMs(timeLeft).seconds);
      minutesEl.innerHTML = addLeadingZero(convertMs(timeLeft).minutes);
      hoursEl.innerHTML = addLeadingZero(convertMs(timeLeft).hours);
      daysEl.innerHTML = addLeadingZero(convertMs(timeLeft).days);

      if (timeLeft < 0) {
        clearInterval(countdown);
        secondsEl.innerHTML = addLeadingZero(0);
        minutesEl.innerHTML = addLeadingZero(0);
        hoursEl.innerHTML = addLeadingZero(0);
        daysEl.innerHTML = addLeadingZero(0);
      }
    }, 1000);
  });
});
