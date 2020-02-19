import axios from 'axios';

const baseUrl = "http://api.openweathermap.org/data/2.5";
const appId   = "appid=16306ca76c4af3dd905386e107bd0690";

export function getWeather(){
    return axios.get(baseUrl+"/weather?q=sidney&"+appId);
}

