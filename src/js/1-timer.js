import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let selectedDate;
document.querySelector('[data-start]').disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
//   clickOpens: true,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future!',
        position: 'topRight',
      });
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#datetime-picker');

  flatpickr(input, options);
});

const startBtn = document.querySelector('[data-start]');
startBtn.addEventListener('click', () => {
  console.log('Start timer');
  const timerHandler = setInterval(() => {
    const currentDate = new Date();
    const deltaTime = selectedDate - currentDate;
    if (deltaTime <= 0) {
      clearInterval(timerHandler);
      document.querySelector('[data-start]').disabled = false;
      document.querySelector('#datetime-picker').disabled = false;
      iziToast.info({
        title: 'Time is up!',
        message: 'Countdown is finished.',
        position: 'topRight',
      });
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);

    document.querySelector('[data-start]').disabled = true;
    document.querySelector('#datetime-picker').disabled = true;
  })
});



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
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


