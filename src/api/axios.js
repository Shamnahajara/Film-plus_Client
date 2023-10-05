import axios from  'axios'
import {Store} from '../store/store'

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'https://api.filmplus.website/',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
axiosInstance.interceptors.request.use(
    config => {

        const userState = Store.getState().User;
        const adminState = Store.getState().Admin;
        const role = config.url.split("/")[1]
     

        if (role==='user') {

            config.headers['Authorization'] = `Bearer ${userState.token}`;
        }

        if (role==='admin') {
            config.headers['Authorization'] = `Bearer ${adminState.token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
