const time = document.querySelector('.time');
const day = document.querySelector('.date');
const greeting = document.querySelector('.greeting');

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}

function showDate() {
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};
  const currentDate = date.toLocaleDateString('ru-Ru', options);
  day.textContent = currentDate;
}

showTime();

function showGreeting() {
  const date = new Date();
  const hours = date.getHours();
  greeting.textContent = `Good ${getTimeOfDay(hours)} `;
}

function getTimeOfDay(h) {
  if (h >= 0 && h < 6) {
    return 'night'
  } else if (h >= 6 && h < 12) {
    return 'morning'
  } else if (h >= 12 && h < 18) {
    return 'afternoon'
  } else if (h >= 18 && h < 24) {
    return 'evening'
  } 
};

const name = document.querySelector('.name');

function setLocalStorage() {
  localStorage.setItem('name', name.value);
};
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
};
window.addEventListener('load', getLocalStorage);
