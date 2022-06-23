import axios from "axios";

axios.defaults.baseURL = window.location.origin

axios.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers.token = localStorage.getItem('token');
    return config;
});

export default axios;