import {createAsyncThunk} from "@reduxjs/toolkit";
import {typeProductApiService} from "../api/TypeProductApiService";
import {TypeProductType} from "../type/typeProduct.type";
import {RootState} from "../../../app/store/store";

export const getTypeProductById = createAsyncThunk<TypeProductType, string,
    {
        rejectValue: string;
    }>(
    'typeProduct/getTypeProductById',
    async (typeProductId) => {
        const {data} = await typeProductApiService.getTypeProductById(typeProductId);
        return data;
    },
)

export const getAllTypeProduct = createAsyncThunk<TypeProductType[], void>(
    'typeProduct/getAllTypeProduct',
    async () => {
        const {data} = await typeProductApiService.getAllProductType();
        return data;
    },
)

export const createTypeProduct = createAsyncThunk<TypeProductType[], TypeProductType,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'typeProduct/createTypeProduct',
    async (typeProduct, {getState}) => {
        const {data} = await typeProductApiService.createTypeProduct(typeProduct);
        const state: RootState = getState();
        return [data, ...state.typeProduct.typesProduct];
    },
)

export const updateTypeProduct = createAsyncThunk<TypeProductType, TypeProductType,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'typeProduct/updateTypeProduct',
    async (typeProduct) => {
        const {data} = await typeProductApiService.updateTypeProduct(typeProduct);
        return data;
    },
)

export const deleteTypeProduct = createAsyncThunk<TypeProductType[], string,
    {
        state: RootState;
    }>(
    'typeProduct/deleteTypeProduct',
    async (idTypeProduct, {getState}) => {
        await typeProductApiService.deleteTypeProduct(idTypeProduct);
        const state = getState();
        return state.typeProduct.typesProduct.filter(el => el.id !== idTypeProduct);
    },
)
