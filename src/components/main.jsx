import React, { Component } from 'react'
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faBlackberry } from '@fortawesome/free-brands-svg-icons'
import { faLocationArrow, faTint, faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons'

import { DELETE } from "../actions"

const Column = ({ pressure, temp, humidity, time, wind, weather }) =>
  <div className="column d-flex flex-column align-items-center text-center px-1 py-1">
    <div >
      {time}
    </div>
    <div>
      <img src={`http://openweathermap.org/img/wn/${weather}@2x.png`} alt="Weather icon" />
    </div>
    <div className="temp">
      {temp}°
    </div>
    <div>
      {pressure}<br /><span className="unit">mm</span>
    </div>
    <div>
      {wind}<br /><span className="unit">m/s</span>
    </div>
    <div>
      {humidity}<br /><span className="unit">%</span>
    </div>
  </div>
const CurrentWeather = ({ weather, temp, pressure, wind, humidity, sunrise, sunset }) =>
  <div className="current-weather d-flex flex-column align-items-center my-4">
    <div className="text-center">
      {(new Date()).toLocaleString("en-GB", { month: "long", weekday: 'long', day: "numeric" })}
    </div>
    <div className="d-flex justify-content-around align-items-center">
      <div>
        <img src={`http://openweathermap.org/img/wn/${weather}@2x.png`} />
      </div>
      <div className="temp mx-3">
        {temp}°
      </div>
      <div className="d-flex">
        <div className="d-flex flex-column pr-2">
          <div>
            <FontAwesomeIcon className="pressure" icon={faTint} />
        </div>
          <div>
            <FontAwesomeIcon className="wind" icon={faLocationArrow} />
        </div>
          <div>
            <FontAwesomeIcon className="humidity" icon={faBlackberry} />
        </div>
        </div>
        <div className="d-flex flex-column">
          <div>
             {pressure} mm
        </div>
          <div>
             {wind} m/s
        </div>
          <div>
             {humidity} %
        </div>
        </div>
      </div>
    </div>
    <div className="d-flex w-100 justify-content-around">
      <div><FontAwesomeIcon className="sun-icon" icon={faArrowAltCircleUp} /> {sunrise}</div>
      <div>{sunset} <FontAwesomeIcon className="sun-icon" icon={faArrowAltCircleDown} /></div>
    </div>
  </div>
const Card = ({ city, country, details, removeItem, current }) =>
  <div className="bg-dark text-white card-container d-flex flex-column p-4 my-4">
    <div className="d-flex  justify-content-between px-4">
      <div>
        Weather in {city},{country}
      </div>
      <div className=" text-danger">
        <FontAwesomeIcon icon={faTimesCircle} onClick={() => removeItem()} />
      </div>
    </div>
    <CurrentWeather {...current} />
    <div className="d-flex justify-content-center flex-wrap">
      {details.map((day, index) => <Column key={index} {...day} />)}
    </div>
  </div>

class Main extends Component {
  render() {
    let { locations, removeItem } = this.props
    return (
      <div className="d-flex flex-column align-items-center">
        {
          locations &&
          locations.map(
            (location, index) =>
              <Card
                key={index}
                {...location}
                removeItem={() => removeItem(index)}
              />
          )
        }
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
const mapDispatchToProps = dispatch => {
  return {
    removeItem: (index) => dispatch(DELETE(index))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Main);