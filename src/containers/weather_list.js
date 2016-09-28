import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {

  renderWeather(cityData) {
    const temps = _.map(cityData.list.map(weather => weather.main.temp),(temp) => temp - 273.15);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={cityData.city.id}>
        <td>{cityData.city.name}</td>
        <td><Chart data={temps} color="red" units="ºc"/></td>
        <td><Chart data={pressures} color="green" units="hPA"/></td>
        <td><Chart data={humidities} color="orange" units="%"/></td>
      </tr>
    );
  }


  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>Pressure (hPA)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({weather}) { // const weather = state.weather
  return {weather}; // { weather } === { weather: weather} ES6
}

export default connect(mapStateToProps)(WeatherList);
