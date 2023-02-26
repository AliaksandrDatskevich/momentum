const state = {
  language: 'en',
}
const translation = {
  en: {
    night: 'Good night',
    morning: 'Good morning',
    afternoon: 'Good afternoon',
    evening: 'Good evening',
    windSpeed: 'Wind speed',
    metersPerSecond: 'm/c',
    humidity: 'Humidity',
  },
  ru: {
    night: 'Доброй ночи',
    morning: 'Доброе утро',
    afternoon: 'Добрый день',
    evening: 'Добрый вечер',
    windSpeed: 'Скорость ветра',
    metersPerSecond: 'м/с',
    humidity: 'Влажность',
  },
}

const time = document.querySelector('.time');
const day = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');


// >>> TIME & DATE <<< \\

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  showGreeting(state.language);
  setTimeout(showTime, 1000);
};

function showDate() {
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};
  const currentDate = date.toLocaleDateString(state.language, options);
  day.textContent = currentDate;
};

showTime();

// >>> GREETING <<< \\

function showGreeting(lang) {
  greeting.textContent = `${translation[lang][getTimeOfDay()]}, `;
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

// >>> BACKGROUND IMAGE <<< \\

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
  randomNum = getRandomIntInclusive(1, 20);
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

// >>> WEATHER <<< \\

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${state.language}&appid=cf963835798b2915db0fca16fe1c700c&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  if (data.cod === 200) {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed()} °C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${translation[state.language].windSpeed}: ${data.wind.speed.toFixed()} ${translation[state.language].metersPerSecond}`;
    humidity.textContent = `${translation[state.language].humidity}: ${data.main.humidity} %`;
    weatherError.textContent = ``;
  } else {
    weatherError.textContent = `${data.message}`;
    temperature.textContent = ``;
    weatherDescription.textContent = ``;
    wind.textContent = ``;
    humidity.textContent = ``;
  }
}

city.addEventListener('change', getWeather);
setInterval(getWeather, 300000);

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

// >>> QUOTE <<< \\

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
let quotesData = [];
let quotesObj = {};

async function getQuotes() {
  const quotes = 'https://type.fit/api/quotes';
  const res = await fetch(quotes);
  quotesData = await res.json();
  quote.textContent = `"${quotesData[getRandomIntInclusive(0, quotesData.length)].text}"`;
  author.textContent = quotesData[getRandomIntInclusive(0, quotesData.length)].author;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getQuotes();

const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', getQuotes);

// >>> AUDIO <<< \\

const play = document.querySelector('.play');
const playNext = document.querySelector('.play-next');
const playPrev = document.querySelector('.play-prev');

let isPlay = false;

const audio = new Audio();
let playNum = 0;
audio.addEventListener('ended', (event) => {
  getNextTrack();
});

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  if (!isPlay) {
    audio.play();
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
  };
  play.classList.toggle('pause');
  setStyleActiveLi();
};

import playList from './playList.js';

play.addEventListener('click', playAudio);

function playAudioForNextPrev() {
  audio.src = playList[playNum].src;
  if (isPlay) {
    audio.currentTime = 0;
    audio.play();
  }
};

function getNextTrack() {
  if (isPlay) {
    setStyleActiveLi();
  };
  playNum = playNum + 1;
  if (playNum > playList.length - 1) {
    playNum = 0;
  };
  if (isPlay) {
    setStyleActiveLi();
  };
  playAudioForNextPrev();
};

playNext.addEventListener('click', getNextTrack);

function getPrevTrack() {
  if (isPlay) {
    setStyleActiveLi();
  };
  playNum = playNum - 1;
  if (playNum < 0) {
    playNum = playList.length - 1;
  };
  if (isPlay) {
    setStyleActiveLi();
  };
  playAudioForNextPrev();
};

playPrev.addEventListener('click', getPrevTrack);

const playListContainer = document.querySelector('.play-list');

for (let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
  li.classList.add(`play-item`);
  li.classList.add(`play-item${i}`);
  playListContainer.append(li);
  let currentLi = document.querySelector(`.play-item${i}`);
  currentLi.textContent = playList[i].title;
};

function setStyleActiveLi() {
  let itemActive = document.querySelector(`.play-item${playNum}`);
  itemActive.classList.toggle(`item-active`);
};

// >>> TRANSLATION <<< \\

const language = document.querySelector('.language');

function setLanguage() {
  if (state.language === 'en') {
    state.language = 'ru';
    name.placeholder = "[Введите имя]";
    if(!localStorage.getItem('city')) {
      city.value = 'Минск';
    }
  } else if (state.language === 'ru') {
    state.language = 'en';
    name.placeholder = "[Enter name]";
    if(!localStorage.getItem('city')) {
      city.value = 'Minsk'
    }
  };
  setLocalStorageSettings();
  getWeather();
};

function setLocalStorageSettings() {
  localStorage.setItem('language', state.language);
};

function getLocalStorageSettings() {
  if(localStorage.getItem('language')) {
    state.language = localStorage.getItem('language');
  }
};
window.addEventListener('beforeunload', setLocalStorageSettings);
window.addEventListener('load', getLocalStorageSettings);
language.addEventListener('click', setLanguage);
