const WeatherLoader = (() => {
  const key = 'd244c1a420bbb9c01c0c9d14d0126fe0';
  const baseUrl = 'http://api.openweathermap.org/data/2.5';

  const loadCurrentWeather = ({
    city,
    country = null,
    units = null,
  }) => loadWeather({
    city,
    country,
    units,
    path: 'weather',
  });
  const load5DaysWeather = ({
    city,
    country = null,
    units = null,
  }) => loadWeather({
    city,
    country,
    units,
    path: 'forecast',
  });

  let loadWeather = ({
    city,
    country = null,
    units = null,
    path,
  }) => {
    let url;
    const tempsUnits = (units === 'F') ? 'imperial' : 'metric';
    if (country !== null) {
      url = `${baseUrl}/${path}?q=${city},${country}&units=${tempsUnits}&APPID=${key}`;
    } else {
      url = `${baseUrl}/${path}?q=${city}&units=${tempsUnits}&APPID=${key}`;
    }
    return (
      fetch(url).then(
        response => response.json(),
      )
    ).then(
      (response) => {
        if (Number(response.cod) !== 200) {
          throw Error(response.message);
        }
        return response;
      },
    );
  };
  return {
    loadCurrentWeather,
    load5DaysWeather,
  };
})();

export default WeatherLoader;
