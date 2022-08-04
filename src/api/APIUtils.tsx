import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const TOKEN_KEY = 'token';

axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        switch (error.response.status) {
            case 401:
            case 404:
            case 403:
                useNavigate()('/signin')
                break;
        }
        return Promise.reject(error.response);
    },
);

export function setHeaderAuthorizationToken(token: string | null) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default axios;