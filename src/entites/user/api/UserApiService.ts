import {AxiosResponse} from "axios";
import {CreateUserType, UserType} from "../type/user.type";
import {axiosInstanceServer} from "../../../shared/axios-instance";

class UserApiService {
    private contextPath: string

    constructor() {
        this.contextPath = '/admin/user';
    }

    async getUserById(id: string): Promise<AxiosResponse<UserType>> {
        return await axiosInstanceServer.get(`${this.contextPath}/${id}`);
    }

    async getAllUser(): Promise<AxiosResponse<UserType[]>> {
        return await axiosInstanceServer.get(this.contextPath);
    }

    async createUser(user: CreateUserType): Promise<AxiosResponse<UserType>> {
        return await axiosInstanceServer.post(this.contextPath, user);
    }

    async updateUser(user: CreateUserType): Promise<AxiosResponse<UserType>> {
        return await axiosInstanceServer.patch(this.contextPath, user);
    }

    async deleteUser(id: string): Promise<AxiosResponse<void>> {
        return await axiosInstanceServer.patch(`${this.contextPath}/${id}`);
    }
}

export const userApiService = new UserApiService();
