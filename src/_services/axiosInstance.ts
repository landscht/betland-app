import axios, {AxiosInstance} from "axios";
import store from "@/_store";
import router from "@/router";

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    async config => {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${store.getters['AuthModule/getAccessToken']}`
        }
        return config;
    }
);

axiosInstance.interceptors.response.use(
    async response => {
        if (response.status === 401) {
            router.push({name: 'login'});
        }
        return response;
    },
    async error => {
        if (error.response.status === 401) {
            router.push({name: 'login'});
        }
        throw error;
    }
);

export default axiosInstance;