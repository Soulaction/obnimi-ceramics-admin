import {AxiosResponse} from "axios";
import {CreateOrUpdatePromoCodeType, PromoCodeType} from "../type/promoCode.type";
import {axiosInstanceServer} from "../../../shared/axios-instance";

class PromoCodeApiService {
    private contextPath: string

    constructor() {
        this.contextPath = '/promo-code/admin';
    }

    async getPromoCodeById(id: string): Promise<AxiosResponse<PromoCodeType>> {
        return await axiosInstanceServer.get(`${this.contextPath}/${id}`);
    }

    async getAllPromoCode(): Promise<AxiosResponse<PromoCodeType[]>> {
        return await axiosInstanceServer.get(this.contextPath);
    }

    async createPromoCode(promoCode: CreateOrUpdatePromoCodeType): Promise<AxiosResponse<CreateOrUpdatePromoCodeType>> {
        return await axiosInstanceServer.post(this.contextPath, promoCode);
    }

    async updatePromoCode(promoCode: CreateOrUpdatePromoCodeType): Promise<AxiosResponse<CreateOrUpdatePromoCodeType>> {
        return await axiosInstanceServer.patch(this.contextPath, promoCode);
    }

    async deletePromoCode(id: string): Promise<AxiosResponse<void>> {
        return await axiosInstanceServer.delete(`${this.contextPath}/${id}`);
    }
}

export const promoCodeApiService = new PromoCodeApiService();
