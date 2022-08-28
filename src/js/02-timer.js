import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const hoursKeeper = document.querySelector('[data-hours]');
const minKeeper = document.querySelector('[data-minutes]');
const secondKeeper = document.querySelector('[data-seconds]');
const daysKeeper = document.querySelector('[data-days]');
const timer = document.querySelector('.timer');
const fields = document.querySelectorAll('.field');
let timerId = null;
let selectedDay = null;

btnStart.style.cssText =
  'cursor: pointer; background-color: blue; color: white; border: none; padding: 10px 30px; border-radius: 15px; margin-left: 15px';

timer.style.cssText = 'display: flex;';

for (const field of fields) {
  field.style.cssText = 'margin-right: 10px';
}

btnStart.setAttribute('disabled', true);

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

const addLeadingZero = value => String(value).padStart(2, 0);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDay = selectedDates[0].getTime();
    if (selectedDay < new Date()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    btnStart.removeAttribute('disabled');
  },
};
flatpickr(dateTimePicker, options);

let newObject = {};

function showTimer() {
  timerId = setInterval(() => {
    const difference = selectedDay - new Date().getTime();
    if (difference <= 0) {
      clearTimeout(timerId);
      return;
    }
    newObject = convertMs(difference);
    addContent(newObject);
  }, 1000);
}

function addContent({ days, hours, minutes, seconds }) {
  daysKeeper.textContent = days;
  hoursKeeper.textContent = addLeadingZero(hours);
  minKeeper.textContent = addLeadingZero(minutes);
  secondKeeper.textContent = addLeadingZero(seconds);
}

btnStart.addEventListener('click', showTimer);
