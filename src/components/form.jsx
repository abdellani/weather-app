import React, { Component } from "react"
import { ADD } from "../actions"
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: "stockholm"
    }
  }
  handleChange(e) {
    this.setState({
      location: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    this.sendQueries().
      then(responses => this.checkResponse(responses)).
      then(data => data && this.updateStore(data))

  }

  sendQueries() {
    let { location } = this.state
    const baseUrl = 'https://api.openweathermap.org/data/2.5';
    const key = process.env.REACT_APP_API_KEY;
    const path = 'forecast';
    const tempsUnits = 'metric'; //(units === 'F') ? 'imperial' : 'metric';
    const url = `${baseUrl}/weather?q=${location}&units=${tempsUnits}&APPID=${key}`;
    const url1 = `${baseUrl}/${path}?q=${location}&units=${tempsUnits}&APPID=${key}`;
    return Promise.all([this.sendQuery(url), this.sendQuery(url1)])
  }
  sendQuery(url) {
    return fetch(url)
      .then(response => response.json())
  }
  checkCurrentWeather(data) {
    let { main, wind, weather, sys } = data
    let { sunrise, sunset } = sys
    sunrise = new Date(sunrise * 1000).toLocaleTimeString('en-GB').slice(0, 5);
    sunset = new Date(sunset * 1000).toLocaleTimeString('en-GB').slice(0, 5);

    wind = wind["speed"]
    weather = weather[0]["icon"]
    let { pressure, humidity, temp } = main
    temp = temp.toFixed(0)
    pressure = (pressure / 1000).toFixed(2)

    return {
      weather, temp, pressure, wind, humidity, sunrise, sunset
    }
  }
  checkResponse(responses) {
    let currentWeather = responses[0]
    let { cod } = currentWeather
    if (cod !== 200) {
      return
    }
    let current = this.checkCurrentWeather(currentWeather)

    let forecastData = responses[1];

    ({ cod } = forecastData)

    if (cod !== "200") {
      return
    }
    let { list } = forecastData
    let { name, country } = forecastData["city"]
    let city = name
    let details = []
    list.slice(0, 9).forEach(
      (item) => {
        let { main, dt_txt, wind, weather } = item
        weather = weather[0]["icon"]
        wind = wind["speed"]
        let time = dt_txt.split(" ")[1].slice(0, -3)
        let { pressure, temp, humidity } = main
        pressure = (pressure / 1000).toFixed(2)
        temp = temp.toFixed(0)
        details.push({
          pressure, temp, humidity, time, wind, weather
        })
      }
    )
    return { city, country, details, current }
  }

  updateStore(structuredData) {
    this.props.add(structuredData)
    this.setState({
      location: ""
    })
  }

  render() {
    let { location } = this.state
    return (
      <div className="form d-flex justify-content-center align-items-center m-4 p-4">
        <form className="d-flex justify-content-center align-items-center">
          <input type="text" className="form-control" value={location} onChange={(e) => this.handleChange(e)} />
          <FontAwesomeIcon className="button text-success mx-4" icon={faPlusCircle} onClick={(e) => this.handleSubmit(e)} />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return (
    {
      add: (location) => { dispatch(ADD(location)) }
    })
}

export default connect(null, mapDispatchToProps)(Form);