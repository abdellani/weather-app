import React, { Component } from 'react'
import { connect } from "react-redux"

const Card = ({ city, country, details }) =>
  <div className="bg-primary">
    {city}
    {country}
    <div>
      {details.map(day => <Column {...day} />)}
    </div>
  </div>
const Column = ({ pressure, temp, humidity, time, wind, weather }) =>
  <div className="d-flex flex-column">
    <div>
      {pressure / 1000}
    </div>
    <div>
      {temp}
    </div>
    <div>
      {humidity}
    </div>
    <div>
      {time}
    </div>
    <div>
      {wind}
    </div>
    <div>
      <img src={`http://openweathermap.org/img/wn/${weather}@2x.png`}/>
    </div>
  </div>

class Main extends Component {
  render() {
    let { locations } = this.props
    return (
      <div>
        {locations && locations.map((location, index) => <Card {...location} />)}
      </div>
    );
  }
}
const mapStateToProps = state => {
  let { locations } = state
  return {
    locations
  }
}



export default connect(mapStateToProps, null)(Main);