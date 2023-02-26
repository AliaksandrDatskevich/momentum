const state = {
  language: 'en',
}

function setLanguage() {
  if (state.language === 'en') {
    console.log(`if en`)
    state.language = 'ru'
  } else if (state.language === 'ru') {
    console.log(`if ru`)
    state.language = 'en'
  }
};

console.log(state.language);
setLanguage();
console.log(state.language);
setLanguage();
console.log(state.language);