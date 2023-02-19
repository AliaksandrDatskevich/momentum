async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=en&appid=cf963835798b2915db0fca16fe1c700c&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  console.log(data.main.temp);
  console.log(data.weather[0].id);
  console.log(data.weather[0].description);
}
getWeather()