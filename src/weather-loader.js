const WeatherLoader = (() => {
  let key = "d244c1a420bbb9c01c0c9d14d0126fe0"
  let baseUrl = "http://api.openweathermap.org/data/2.5"

  let loadCurrentWeather = ({city,countryCode = null,units = null}) => {
    return loadWeather({city,countryCode,units,path:"weather"})
  }
  let load5DaysWeather = ({city,countryCode = null,units = null }) => {
    return loadWeather({city,countryCode,units,path:"forecast"})
  }

  let loadWeather = ({city,countryCode = null, units = null,path}) => {
    let url;
    let tempsUnits= (units=="F")?"imperial":"metric";
    if (countryCode !== null) {
      url = `${baseUrl}/${path}?q=${city},${countryCode}&units=${tempsUnits}&APPID=${key}`
    } else {
      url = `${baseUrl}/${path}?q=${city}&units=${tempsUnits}&APPID=${key}`
    }
    return (
      fetch(url).then(
        response =>
        response.json()
      )
    )

  };
  return {
    loadCurrentWeather,
    load5DaysWeather
  }
})()

export default WeatherLoader;

