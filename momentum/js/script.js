const time = document.querySelector('.time');
const day = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
};

function showDate() {
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};
  const currentDate = date.toLocaleDateString('ru-Ru', options);
  day.textContent = currentDate;
};

showTime();

function showGreeting() {
  greeting.textContent = `Good ${getTimeOfDay()}, `;
};

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 0 && hours < 6) {
    return 'night'
  } else if (hours >= 6 && hours < 12) {
    return 'morning'
  } else if (hours >= 12 && hours < 18) {
    return 'afternoon'
  } else if (hours >= 18 && hours < 24) {
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

let randomNum;

function getRandomNumToString() {
  let n = String(randomNum);
  if (n.length < 2) {
    n = '0' + n
  };
  return n
};

const body = document.querySelector('.body');
body.style.backgroundImage = setBg();

function getRandomNum() {
  min = Math.ceil(1);
  max = Math.floor(20);
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
};

function getImage() {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/AliaksandrDatskevich/stage1-tasks/assets/images/${getTimeOfDay()}/${getRandomNumToString()}.jpg`; 
  img.onload = () => {      
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/AliaksandrDatskevich/stage1-tasks/assets/images/${getTimeOfDay()}/${getRandomNumToString()}.jpg')`
  }; 
}

function setBg() {
  getRandomNum();
  return getImage()
};

function getSlideNext() {
  randomNum = randomNum + 1;
  if (randomNum > 20) {
    randomNum = 1;
  };
  getImage();
};

slideNext.addEventListener('click', getSlideNext);

function getSlidePrev() {
  randomNum = randomNum - 1;
  if (randomNum < 1) {
    randomNum = 20;
  };
getImage();
};

slidePrev.addEventListener('click', getSlidePrev)

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=cf963835798b2915db0fca16fe1c700c&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  if (data.cod === 200) {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed()} °C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${data.wind.speed.toFixed()} m/c`;
    humidity.textContent = `${data.main.humidity} %`;
    weatherError.textContent = ``;
  } else {
    weatherError.textContent = `${data.message}`;
    temperature.textContent = ``;
    weatherDescription.textContent = ``;
    wind.textContent = ``;
    humidity.textContent = ``;
  }
}
getWeather();

city.addEventListener('change', getWeather)

function setLocalStorageCity() {
  localStorage.setItem('city', city.value);
};
window.addEventListener('beforeunload', setLocalStorageCity);

function getLocalStorageCity() {
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else city.value = 'Minsk';
  getWeather()
};
window.addEventListener('load', getLocalStorageCity);
