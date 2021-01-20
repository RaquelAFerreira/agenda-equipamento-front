import axios from 'axios';

const api = axios.create({
    baseURL: 'https://agenda-equipamento.herokuapp.com'
});

export default api;