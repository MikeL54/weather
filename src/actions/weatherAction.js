import axios from 'axios';

export function getWeather(){
    return axios.get("https://api.openweathermap.org/data/2.5/weather?q=sidney&appid=16306ca76c4af3dd905386e107bd0690")
}

