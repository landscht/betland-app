import axios, {AxiosInstance} from "axios";
import store from "@/_store";


const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    async config => {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${store.getters['AuthModule/getAccessToken']}`
        }
        return config;
    }
)

export default axiosInstance;