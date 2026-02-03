import {AxiosResponse} from "axios";
import {axiosInstanceServer} from "../../../shared/axios-instance";
import {ProductCategoryType} from "../type/product.type";

class ProductCategoryApiService {
    private contextPath: string

    constructor() {
        this.contextPath = '/product-category/admin';
    }

    async getProductCategoryById(id: string): Promise<AxiosResponse<ProductCategoryType>> {
        return await axiosInstanceServer.get(`${this.contextPath}/${id}`);
    }

    async getAllProductCategory(): Promise<AxiosResponse<ProductCategoryType[]>> {
        return await axiosInstanceServer.get(this.contextPath);
    }

    async createProductCategory(product: ProductCategoryType): Promise<AxiosResponse<ProductCategoryType>> {
        return await axiosInstanceServer.post(this.contextPath, product);
    }

    async updateProductCategory(product: ProductCategoryType): Promise<AxiosResponse<ProductCategoryType>> {
        return await axiosInstanceServer.patch(this.contextPath, product);
    }

    async deleteProductCategory(id: string): Promise<AxiosResponse<void>> {
        return await axiosInstanceServer.delete(`${this.contextPath}/${id}`);
    }
}

export const productCategoryApiService = new ProductCategoryApiService();
