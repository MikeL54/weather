import React, {useState, useEffect} from 'react'
import {getWeather} from '../actions/weatherAction.js'

function Weather() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("London");

    

    function kelvinToCelsius(tempKelvin){
        return Math.round(tempKelvin - 273.15);
    }

    async function loadWeather(){
        const weatherAjax = await getWeather(city);
        setWeather(weatherAjax.data);
    }

    useEffect(()=>{
        loadWeather();
    }, [city])

    function handleChangeCity(city){
        setCity(city);
    }

    function loadIconWeather(idIcon){
        return "http://openweathermap.org/img/wn/"+idIcon+"@2x.png";
    }

    return (
        <div>

            {
                weather ? 
                <div>
                    <h1>Météo : {weather.name}</h1>
                    <input type="text" placeholder="Enter a city" onChange = {(event) => {handleChangeCity(event.target.value)}}/>
                    <img src={loadIconWeather(weather.weather[0].icon)} alt="Not Found"/>
                    <p>{weather.weather[0].description}</p>
                    <p>{kelvinToCelsius(weather.main.temp)} °C</p>
                    <p>Precipitation :  {weather.main.humidity}%</p>
                    <p>Wind speed : {weather.wind.speed}mph</p>
                    <p>{kelvinToCelsius(weather.main.feels_like)} °C</p>
                </div>

                :
                <div>
                    <h1>Météo en attente de chargement</h1>
                </div>

            }
        </div>

    )
}

export default Weather
