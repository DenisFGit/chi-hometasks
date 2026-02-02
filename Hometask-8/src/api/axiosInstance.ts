import axios from "axios";
import { history } from './navigate';

const apiClient = axios.create({
    baseURL: "https://playground.zenberry.one",
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {

            localStorage.removeItem('token');
            history.push('/');
        }

        return Promise.reject(error);
    }
);

export default apiClient;