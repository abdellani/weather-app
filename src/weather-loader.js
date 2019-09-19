const WeatherLoader = (() => {
  let key = "d244c1a420bbb9c01c0c9d14d0126fe0"
  let baseUrl = "http://api.openweathermap.org/data/2.5"

  let loadCurrentWeather = ({
    city,
    country = null,
    units = null
  }) => {
    return loadWeather({
      city,
      country,
      units,
      path: "weather"
    })
  }
  let load5DaysWeather = ({
    city,
    country = null,
    units = null
  }) => {
    return loadWeather({
      city,
      country,
      units,
      path: "forecast"
    })
  }

  let loadWeather = ({
    city,
    country = null,
    units = null,
    path
  }) => {
    let url;
    let tempsUnits = (units == "F") ? "imperial" : "metric";
    if (country !== null) {
      url = `${baseUrl}/${path}?q=${city},${country}&units=${tempsUnits}&APPID=${key}`
    } else {
      url = `${baseUrl}/${path}?q=${city}&units=${tempsUnits}&APPID=${key}`
    }
    return (
      fetch(url).then(
        response =>
        response.json()
      )
    ).then(
      response => {
        console.log(response)
        if (response.cod != 200) {
          throw Error(response.message)
        }
        return response;
      }
    )

  };
  return {
    loadCurrentWeather,
    load5DaysWeather
  }
})()

export default WeatherLoader;