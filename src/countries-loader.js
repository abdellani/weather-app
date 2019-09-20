const CountriesLoader = (() => {
  const url = 'https://restcountries.eu/rest/v2/all';
  const loadCountries = () => fetch(url).then(
    response => response.json(),
  ).then(
    (response) => {
      const res = [];
      response.forEach(
        (country) => {
          res.push({ name: country.name, code: country.alpha2Code });
        },
      );
      return res;
    },
  );
  return {
    loadCountries,
  };
})();

export default CountriesLoader;
