import Competition from "@/_models/Competition";
import {Api} from "@/_services/api";
import axiosInstance from "@/_services/axiosInstance";

export default class CrudService {

    static async retrieveAll<T>(route: string): Promise<T[]> {
        const url = `${Api.URL}api/${route}`;
        const response = await axiosInstance.get<T[]>(url);
        return response.data;
    }

    static async create<T>(element: T, route: string): Promise<T> {
        const url = `${Api.URL}api/${route}`;
        const response = await axiosInstance.post<T>(url, element);
        return response.data;
    }

    static async deleteById(id: string, route: string): Promise<boolean> {
        const url = `${Api.URL}api/${route}/${id}`;
        const response = await axiosInstance.delete(url);
        return response.status === 200;
    }

}