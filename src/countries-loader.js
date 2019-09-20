let CountriesLoader=(()=>{
  let url="https://restcountries.eu/rest/v2/all";
  let loadCountries=()=>{
    return fetch(url).then(
      response=> response.json()
    ).then(
      response =>{
        let res=[]
        response.forEach(
          (country)=>{
            res.push({name:country.name,code:country.alpha2Code})
          }
        )
        return res;
      }
    )
  }
  return{
    loadCountries
  }
})();

export default CountriesLoader;