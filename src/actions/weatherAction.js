import axios from 'axios';

const baseUrl = "http://api.openweathermap.org/data/2.5";
const appId   = "appid=16306ca76c4af3dd905386e107bd0690";

export function getWeather(city){

    return axios.get(baseUrl+"/weather?q="+city+"&"+appId);
}

