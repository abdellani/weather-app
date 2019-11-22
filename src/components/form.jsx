import React, { Component } from "react"
import { ADD } from "../actions"
import { connect } from "react-redux"
class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: ""
    }
  }
  handleChange(e) {
    this.setState({
      location: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    this.sendQuery().
    then(response => this.checkResponse(response)).
    then(data => data && this.updateStore(data))

  }

  async sendQuery() {
    // const city = "Algiers";
    // const country = "Algeria";
    // const url = `${baseUrl}/${path}?q=${city},${country}&units=${tempsUnits}&APPID=${key}`;
    let { location } = this.state
    const baseUrl = 'http://api.openweathermap.org/data/2.5';
    const key =process.env.REACT_APP_API_KEY ;
    const path = 'forecast';
    const tempsUnits = 'metric'; //(units === 'F') ? 'imperial' : 'metric';
    const url = `${baseUrl}/${path}?q=${location}&units=${tempsUnits}&APPID=${key}`;
    const response = await fetch(url);
    return await response.json();
  }

  checkResponse(response) {
    let { cod } = response
    if (cod !== "200") {
      return
    }
    let { list } = response
    let { name, country } = response["city"]
    let city=name
    let details = []
    list.forEach(
      (item) => {
        let { main, dt_txt, wind,weather } = item
        weather=weather[0]["icon"]
        wind=wind["speed"]
        let time=dt_txt.split(" ")[1].slice(0,-3)
        let { pressure, temp, humidity } = main
        details.push({
          pressure, temp, humidity, time, wind,weather
        })
      }
    )
    return { city, country, details }
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
      <div>
        <form>
          <input type="text" value={location} onChange={(e) => this.handleChange(e)} />
          <input type="submit" onClick={(e) => this.handleSubmit(e)} />
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