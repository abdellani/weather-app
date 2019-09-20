import createElement from './helpers';
import CountriesLoader from './countries-loader';

const DomManger = (WeatherLoader) => {
  const currentWeatherIcon = document.getElementById('currentWeatherIcon');
  const currentWeatherDiv = document.getElementById('currentWeatherDiv');
  const weatherForecastDiv = document.getElementById('weatherForecastDiv');
  const submitFormButton = document.getElementById('submitFormButton');
  const unitSelector = document.getElementById('unitSelector');

  const cityName = document.getElementById('cityName');
  const countriesSelector = document.getElementById('countriesSelector');

  const initiate = () => {
    CountriesLoader.loadCountries().then(
      (countries) => {
        countries.forEach(
          country => countriesSelector.appendChild(createElement({
            type: 'option',
            text: `${country.name} (${country.code})`,
            value: country.code,
          })),
        );
      },
    );

    submitFormButton.addEventListener('click', (event) => {
      event.preventDefault();
      const city = cityName.value;
      let country = countriesSelector.options[countriesSelector.selectedIndex].value;
      const units = unitSelector.options[unitSelector.selectedIndex].value;

      if (!(/([^\s])/.test(city))) {
        alert("City name can't empty!");
        return;
      }
      if (country === 'None') {
        country = null;
      }
      loadWeather({
        city,
        country,
        units,
      });
    });
  };

  let loadWeather = ({
    city,
    country,
    units,
  }) => {
    WeatherLoader.loadCurrentWeather({
      city,
      country,
      units,
    }).then(
      (response) => {
        currentWeatherDiv.innerHTML = '';
        currentWeatherIcon.classList.remove('d-none');
        currentWeatherIcon.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
        currentWeatherDiv.appendChild(currentWeatherIcon);
        renderResultsInsideCards({
          div: currentWeatherDiv,
          results: response,
          location: true,
        });
      },
    ).catch(
      (error) => {
        currentWeatherDiv.innerHTML = `
        <div class="bg-danger p-5 text-center">
          The following error occured :<br/>  
          ${error}
        </div>
        `;
      },
    );
    WeatherLoader.load5DaysWeather({
      city,
      country,
      units,
    }).then(
      (response) => {
        weatherForecastDiv.innerHTML = '';
        response.list.forEach(
          (element) => {
            const cardBody = createElement({
              type: 'div',
            });
            renderResultsInsideCards({
              div: cardBody,
              results: element,
              date: true,
              icon: true,
            });
            const card = createCard(cardBody.innerHTML);
            weatherForecastDiv.appendChild(card);
          },
        );
      },
    ).catch(
      (error) => {
        weatherForecastDiv.innerHTML = `
        <div class="bg-danger w-100 mt-3 p-5 text-center">
          The following error occured :<br/>  
          ${error}
        </div>
        `;
      },
    );
  };

  let createCard = (content) => {
    const card = createElement({
      type: 'div',
    });
    card.classList.add('col-md-4');
    card.classList.add('p-1');
    card.innerHTML = `
    <div class="card">
        <div class="card-body p-1">
        ${content}
        </div>
    </div>
    `;
    return card;
  };
  let renderResultsInsideCards = ({
    div,
    results,
    date = false,
    location = false,
    icon = false,
  }) => {
    if (icon) {
      const img = createElement({
        type: 'img',
      });
      img.src = `http://openweathermap.org/img/wn/${results.weather[0].icon}@2x.png`;
      img.classList.add('m-auto');
      img.classList.add('d-block');
      div.appendChild(img);
    }
    if (location) {
      div.appendChild(createElement({
        type: 'p',
        text: `Location : ${results.name} (${results.sys.country})`,
        _class: 'card-text',
      }));
    }
    const description = createElement({
      type: 'div',
    });
    description.innerHTML = `
    
    <p class="card-text mb-2"> 
      ${results.weather[0].main}
      <small>(${results.weather[0].description})</small>
    </p>
    `;
    div.appendChild(description);

    const temp = createElement({
      type: 'div',
    });
    temp.classList.add('d-flex', 'flex-wrap');
    temp.innerHTML = `
    <div class="d-flex flex-nowrap">
      <i class="fas fa-temperature-low"></i>${results.main.temp}°
    </div>
    <div class="d-flex flex-nowrap">
      <i class="fas fa-arrow-circle-up"></i>${results.main.temp_min}°
    </div>
    <div class="d-flex flex-nowrap">
      <i class="fas fa-arrow-circle-down"></i>${results.main.temp_max}°
    </div>
    `;
    div.appendChild(temp);
    const wind = createElement({
      type: 'div',
    });
    wind.classList.add('d-flex', 'flex-wrap');
    wind.innerHTML = `
    <div class="d-flex flex-nowrap">
    <i class="fas fa-wind"></i> 
    ${results.wind.speed} Km/h
    </div>
    <div class="d-flex flex-nowrap">
    <i class="far fa-compass"></i> 
    ${results.wind.deg} °
    </div>
    `;
    div.appendChild(wind);

    const humidityAndPressure = createElement({
      type: 'div',
    });
    humidityAndPressure.classList.add('d-flex', 'flex-wrap');
    humidityAndPressure.innerHTML = `
    <div class="d-flex flex-nowrap">
    <i class="fas fa-tachometer-alt"></i>
    ${results.main.pressure}
    </div>
    <div class="d-flex flex-nowrap">
    <i class="fas fa-tint"></i>
    ${results.main.humidity}
    </div>
    `;
    div.appendChild(humidityAndPressure);

    if (date) {
      const dateDiv = createElement({
        type: 'div',
      });
      dateDiv.innerHTML = `
      <i class="far fa-clock"></i>
      ${results.dt_txt}
      `;
      div.appendChild(dateDiv);
    }
  };
  return {
    initiate,
  };
};

export default DomManger;
