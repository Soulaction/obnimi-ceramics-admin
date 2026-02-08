import {AxiosResponse} from "axios";
import {axiosInstanceServer} from "../../../shared/axios-instance";
import {TypeProductType} from "../type/typeProduct.type";

class TypeProductApiService {
    private contextPath: string

    constructor() {
        this.contextPath = '/product-type/admin';
    }

    async getTypeProductById(id: string): Promise<AxiosResponse<TypeProductType>> {
        return await axiosInstanceServer.get(`${this.contextPath}/${id}`);
    }

    async getAllProductType(): Promise<AxiosResponse<TypeProductType[]>> {
        return await axiosInstanceServer.get(this.contextPath);
    }

    async createTypeProduct(typeProduct: TypeProductType): Promise<AxiosResponse<TypeProductType>> {
        return await axiosInstanceServer.post(this.contextPath, typeProduct);
    }

    async updateTypeProduct(typeProduct: TypeProductType): Promise<AxiosResponse<TypeProductType>> {
        return await axiosInstanceServer.patch(this.contextPath, typeProduct);
    }

    async deleteTypeProduct(id: string): Promise<AxiosResponse<void>> {
        return await axiosInstanceServer.delete(`${this.contextPath}/${id}`);
    }
}

export const typeProductApiService = new TypeProductApiService();
