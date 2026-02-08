import {createAsyncThunk} from "@reduxjs/toolkit";
import {promoCodeApiService} from "../api/PromoCodeApiService";
import {CreateOrUpdatePromoCodeType, PromoCodeType} from "../type/promoCode.type";
import {RootState} from "../../../app/store/store";

export const getPromoCodeById = createAsyncThunk<PromoCodeType, string,
    {
        rejectValue: string;
    }>(
    'promoCode/getPromoCodeById',
    async (promoCodeId) => {
        const {data} = await promoCodeApiService.getPromoCodeById(promoCodeId);
        return data;
    },
)

export const getAllPromoCode = createAsyncThunk<PromoCodeType[], void>(
    'promoCode/getAllPromoCode',
    async () => {
        const {data} = await promoCodeApiService.getAllPromoCode();
        return data;
    },
)

export const createPromoCode = createAsyncThunk<CreateOrUpdatePromoCodeType[], CreateOrUpdatePromoCodeType,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'promoCode/createPromoCode',
    async (promoCode, {getState}) => {
        const {data} = await promoCodeApiService.createPromoCode(promoCode);
        const state: RootState = getState();
        return [data, ...state.promoCode.promoCodes];
    },
)

export const updatePromoCode = createAsyncThunk<CreateOrUpdatePromoCodeType, CreateOrUpdatePromoCodeType,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'promoCode/updatePromoCode',
    async (promoCode) => {
        const {data} = await promoCodeApiService.updatePromoCode(promoCode);
        return data;
    },
)

export const deletePromoCode = createAsyncThunk<PromoCodeType[], string,
    {
        state: RootState;
    }>(
    'promoCode/deletePromoCode',
    async (idPromoCode, {getState}) => {
        await promoCodeApiService.deletePromoCode(idPromoCode);
        const state = getState();
        return state.promoCode.promoCodes.filter(el => el.id !== idPromoCode);
    },
)
