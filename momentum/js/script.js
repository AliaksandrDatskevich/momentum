const time = document.querySelector('.time');
const day = document.querySelector('.date');

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  setTimeout(showTime, 1000);
}

function showDate() {
  const date = new Date();
  const options = {month: 'long', day: 'numeric', timeZone: 'UTC'};
  const currentDate = date.toLocaleDateString('ru-RU', options);
  day.textContent = currentDate;
}

showTime();
