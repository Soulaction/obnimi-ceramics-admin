import {AxiosResponse} from "axios";
import {CreateOrUpdateOrderType, OrderType} from "../type/order.type";
import {axiosInstanceServer} from "../../../shared/axios-instance";

class OrderApiService {
    private contextPath: string

    constructor() {
        this.contextPath = '/order/admin';
    }

    async getOrderById(id: string): Promise<AxiosResponse<OrderType>> {
        return await axiosInstanceServer.get(`${this.contextPath}/${id}`);
    }

    async getAllOrder(): Promise<AxiosResponse<OrderType[]>> {
        return await axiosInstanceServer.get(this.contextPath);
    }

    async createOrder(order: CreateOrUpdateOrderType): Promise<AxiosResponse<OrderType>> {
        return await axiosInstanceServer.post(this.contextPath, order);
    }

    async updateOrder(order: CreateOrUpdateOrderType): Promise<AxiosResponse<OrderType>> {
        return await axiosInstanceServer.patch(this.contextPath, order);
    }

    async deleteOrder(id: string): Promise<AxiosResponse<void>> {
        return await axiosInstanceServer.delete(`${this.contextPath}/${id}`);
    }
}

export const orderApiService = new OrderApiService();
