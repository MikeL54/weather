import React, { useState, useEffect } from "react";
import {
  getWeather,
  getWeatherByCity,
  getWeatherByCoords,
  getForecastWeather
} from "../actions/weatherAction";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

// import { mockWeather } from '../mocks/mockWeather';

function Weather() {
  // const [weather, setWeather] = useState(mockWeather);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [lang, setLang] = useState("en");
  const [coord, setCoord] = useState(null);
  const [isCoord, setIsCoord] = useState(true);
  
  const classes = useStyles();

  //Use Effect => Le composant est chargé
  // => Le state est modifié (géré par [])
  useEffect(() => {
    //Récupérer les cordonnées
    navigator.geolocation.getCurrentPosition(
      loadWeatherData,
      errorLoadWeatherData
    );
  }, []);

  function kelvinToCelsius(tempKelvin) {
    return Math.round(tempKelvin - 273.15);
  }

  // Weather par city avec la barre de recherche
  async function searchWeatherByCity() {
    setIsCoord(false);
    const weatherAjaxByCity = await getWeatherByCity(city, lang);
    setWeather(weatherAjaxByCity.data);
  }

  function handleChange(event) {
    setCity(event.target.value);
  }

  function handleChangeLang(value) {
    setLang(value);
    //Si le mec a pas fait de recherches
    if (!setIsCoord) loadWeatherData(coord);
  }

  //Weather par défaut
  async function loadWeatherData(pos) {
    const weatherAjaxByCoords = await getWeatherByCoords(pos.coords, lang);
    setWeather(weatherAjaxByCoords.data);
    setCoord(pos);
  }

  async function errorLoadWeatherData(error) {
    const weatherAjax = await getWeather();
    setWeather(weatherAjax.data);
  }

  function loadIconWeather(idIcon) {
    return "http://openweathermap.org/img/wn/" + idIcon + "@2x.png";
  }

  return (
    <div>
      {weather ? (
        <div>
          <input type="text" onChange={handleChange} />
          <input
            type="button"
            onClick={searchWeatherByCity}
            value="Rechercher"
          />
          <h1>Météo : {weather.name}</h1>
          <div className={classes.root}>
            <ButtonGroup
              color="secondary"
              aria-label="outlined secondary button group"
            >
              <Button
                onClick={() => {
                  handleChangeLang("en");
                }}
              >
                Anglais
              </Button>
              <Button
                onClick={() => {
                  handleChangeLang("fr");
                }}
              >
                Français
              </Button>
              <Button
                onClick={() => {
                  handleChangeLang("ja");
                }}
              >
                Japonais
              </Button>
            </ButtonGroup>
          </div>

          <img alt="" src={loadIconWeather(weather.weather[0].icon)}></img>
          <p>{weather.weather[0].description}</p>
          <p>{kelvinToCelsius(weather.main.temp)} C°</p>
          <p>{weather.main.humidity} %</p>
          <p>{weather.wind.speed} m/s</p>
          <p>{kelvinToCelsius(weather.main.feels_like)} C°</p>
        </div>
      ) : (
        <div>
          <h1>Météo en attente de chargement</h1>
        </div>
      )}
    </div>
  );
}

export default Weather;
