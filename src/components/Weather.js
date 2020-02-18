import React, {useState} from 'react'
import {mockWeather} from '../mocks/mockWeather.js'


function Weather() {
    const [weather, setWeather] = useState(mockWeather);
    function kelvinToCelsius(tempKelvin){
        return Math.round(tempKelvin - 273.15);
    }
    function loadIconWeather(idIcon){
        return "http://openweathermap.org/img/wn/"+idIcon+"@2x.png";
    }
    return (
        <div>
            <h1>Météo : {weather.name}</h1>
            <img src={loadIconWeather(weather.weather[0].icon)} alt="Not Found"/>
            <p>{weather.weather[0].description}</p>
            <p>{kelvinToCelsius(weather.main.temp)} °C</p>
        </div>
    )
}

export default Weather
