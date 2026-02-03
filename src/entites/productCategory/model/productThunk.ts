import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../../app/store/store";
import {productCategoryApiService} from "../api/ProductCategoryApiService";
import {ProductCategoryType} from "../type/product.type";

export const getProductCategoryById = createAsyncThunk<ProductCategoryType, string,
    {
        rejectValue: string;
    }>(
    'productCategory/getProductCategoryById',
    async (id) => {
        const {data} = await productCategoryApiService.getProductCategoryById(id);
        return data;
    },
)

export const getAllProductCategory = createAsyncThunk<ProductCategoryType[], void>(
    'productCategory/getAllProductCategory',
    async () => {
        const {data} = await productCategoryApiService.getAllProductCategory();
        return data;
    },
)

export const createProductCategory = createAsyncThunk<ProductCategoryType[], ProductCategoryType,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'productCategory/createProductCategory',
    async (productCategory, {getState}) => {
        const {data} = await productCategoryApiService.createProductCategory(productCategory);
        const state: RootState = getState();
        return [data, ...state.product.products];
    },
)

export const updateProductCategory = createAsyncThunk<ProductCategoryType, ProductCategoryType,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'productCategory/updateProductCategory',
    async (productCategory) => {
        const {data} = await productCategoryApiService.updateProductCategory(productCategory);
        return data;
    },
)

export const deleteProductCategory = createAsyncThunk<ProductCategoryType[], string,
    {
        state: RootState;
    }>(
    'product/deleteProduct',
    async (id, {getState}) => {
        await productCategoryApiService.deleteProductCategory(id);
        const state = getState();
        return state.product.products.filter(el => el.id !== id);
    },
)
