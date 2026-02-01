import {AxiosResponse} from "axios";
import {CreateOrUpdateProductType, ProductType} from "../type/product.type";
import {axiosInstanceServer} from "../../../shared/axios-instance";

class ProductApiService {
    private contextPath: string

    constructor() {
        this.contextPath = '/product/admin';
    }

    async getProductById(id: string): Promise<AxiosResponse<ProductType>> {
        return await axiosInstanceServer.get(`${this.contextPath}/${id}`);
    }

    async getAllProduct(): Promise<AxiosResponse<ProductType[]>> {
        return await axiosInstanceServer.get(this.contextPath);
    }

    async createProduct(product: CreateOrUpdateProductType): Promise<AxiosResponse<CreateOrUpdateProductType>> {
        return await axiosInstanceServer.post(this.contextPath, product);
    }

    async updateProduct(product: CreateOrUpdateProductType): Promise<AxiosResponse<CreateOrUpdateProductType>> {
        return await axiosInstanceServer.patch(this.contextPath, product);
    }

    async deleteProduct(id: string): Promise<AxiosResponse<void>> {
        return await axiosInstanceServer.delete(`${this.contextPath}/${id}`);
    }
}

export const productApiService = new ProductApiService();
