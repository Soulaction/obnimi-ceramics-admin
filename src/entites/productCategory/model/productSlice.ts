import {createSlice} from "@reduxjs/toolkit";
import {ProductCategoryType} from "../type/product.type";
import {
    createProductCategory, deleteProductCategory,
    getAllProductCategory,
    getProductCategoryById,
    updateProductCategory
} from "./productThunk";

export type ProductCategoryStore = {
    productCategories: ProductCategoryType[];
    selectedProduct: ProductCategoryType | null;
    isLoadingItems: boolean,
    isLoadingItem: boolean,
    filterData: FilterData | null;
}

export type FilterData = {
    searchRow: string;
    page: number;
    size: number;
}

const initialState: ProductCategoryStore = {
    productCategories: [],
    selectedProduct: null,
    isLoadingItems: false,
    isLoadingItem: false,
    filterData: null
}

const productCategorySlice = createSlice({
    name: 'productCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addAsyncThunk(getProductCategoryById, {
            pending: (state, action) => {
                console.log(action.payload);
                state.isLoadingItem = true;
            },
            fulfilled: (state, action) => {
                console.log(action);
                state.selectedProduct = action.payload
            },
            rejected: (state, action) => {
                console.log(action);
                // state.error = action.error.
            }
        })
        builder.addAsyncThunk(getAllProductCategory, {
            pending: (state, action) => {
                console.log(action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                console.log(action);
                state.productCategories = action.payload
            },
            rejected: (state, action) => {
                console.log(action);
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
        builder.addAsyncThunk(createProductCategory, {
            pending: (state, action) => {
                console.log('------', state, action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                console.log('------', state, action);
                state.productCategories = action.payload
            },
            rejected: (state, action) => {
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
        builder.addAsyncThunk(updateProductCategory, {
            pending: (state, action) => {
                console.log('------', state, action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                const changeUser = action.payload;
                const allUsersWithoutChangeUser = state.productCategories.filter(el => el.id !== changeUser.id);
                state.productCategories = [action.payload, ...allUsersWithoutChangeUser];
            },
            rejected: (state, action) => {
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
        builder.addAsyncThunk(deleteProductCategory, {
            pending: (state, action) => {
                console.log('------', state, action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                state.productCategories = action.payload;
            },
            rejected: (state, action) => {
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
    },
})

export const productCategoryReducer = productCategorySlice.reducer;
