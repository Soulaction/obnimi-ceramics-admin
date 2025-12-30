import axios from "axios";

export const axiosInstanceServer = axios.create({
    baseURL: process.env.STORE_SERVICE_URL
})