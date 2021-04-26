import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.hgbrasil.com/weather?key=6e3988f0&city_name='
})

export default api;