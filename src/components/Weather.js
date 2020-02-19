import React, {useState, useEffect} from 'react'
import {getWeather} from '../actions/weatherAction.js'

function Weather() {
    const [weather, setWeather] = useState(null);

    function kelvinToCelsius(tempKelvin){
        return Math.round(tempKelvin - 273.15);
    }

    async function loadWeather(){
        const weatherAjax = await getWeather({});
        setWeather(weatherAjax.data);
    }

    useEffect(()=>{
        loadWeather();
    }, [])

    function loadIconWeather(idIcon){
        return "http://openweathermap.org/img/wn/"+idIcon+"@2x.png";
    }

    return (
        <div>

            {
                weather ? 
                <div>
                    <h1>Météo : {weather.name}</h1>
                    <img src={loadIconWeather(weather.weather[0].icon)} alt="Not Found"/>
                    <p>{weather.weather[0].description}</p>
                    <p>{kelvinToCelsius(weather.main.temp)} °C</p>
                </div>

                :<h1>Météo en attente de chargement</h1>
                }
        </div>

    )
}

export default Weather
