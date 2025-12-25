import axios from 'axios'

const api = import.meta.env.VITE_WEATHER_KEY

const getWeather = (city) => {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`)
        .then(response => response.data)
}

export default {getWeather}