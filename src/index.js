import WeatherLoader from "./weather-loader";
WeatherLoader.loadCurrentWeather({city:"london"}).then(
  (response)=>{
    console.log(response)
  }
);
//console.log()