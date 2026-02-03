import {createAsyncThunk} from "@reduxjs/toolkit";
import {productApiService} from "../api/ProductApiService";
import {CreateOrUpdateProductType, ProductType} from "../type/product.type";
import {RootState} from "../../../app/store/store";

export const getProductById = createAsyncThunk<ProductType, string,
    {
        rejectValue: string;
    }>(
    'product/getProductById',
    async (productId) => {
        const {data} = await productApiService.getProductById(productId);
        return data;
    },
)

export const getAllProduct = createAsyncThunk<ProductType[], void>(
    'product/getAllProduct',
    async () => {
        const {data} = await productApiService.getAllProduct();
        return data;
    },
)

export const createProduct = createAsyncThunk<CreateOrUpdateProductType[], CreateOrUpdateProductType,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'product/createProduct',
    async (product, {getState}) => {
        const {data} = await productApiService.createProduct(product);
        const state: RootState = getState();
        return [data, ...state.product.products];
    },
)

export const updateProduct = createAsyncThunk<CreateOrUpdateProductType, CreateOrUpdateProductType,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'product/updateProduct',
    async (product) => {
        const {data} = await productApiService.updateProduct(product);
        return data;
    },
)

export const deleteProduct = createAsyncThunk<ProductType[], string,
    {
        state: RootState;
    }>(
    'product/deleteProduct',
    async (idItemBasket, {getState}) => {
        await productApiService.deleteProduct(idItemBasket);
        const state = getState();
        return state.product.products.filter(el => el.id !== idItemBasket);
    },
)
