//Archivo de configuración para la aplicación frontend
import axios from "axios";
export const API_BASE_URL = "http://localhost:8080"; //URL base de la API backend

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});


api.interceptors.request.use(
    (config) => {
        if(typeof window !== 'undefined') {
            const token = localStorage.getItem('token');

            if (token) 
                config.headers['Authorization'] = `Bearer ${token}`;

            if(config.data instanceof FormData) 
                delete config.headers['Content-Type'];
        }
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            const originalRequestUrl = error.config.url;
            if (typeof window !== 'undefined' && !originalRequestUrl.includes('/auth/login')) {
                localStorage.removeItem('token');
                window.location.href = '/auth'; 
            }
        }
        return Promise.reject(error);
    }
);