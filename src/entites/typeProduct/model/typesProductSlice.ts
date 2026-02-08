import {createSlice} from "@reduxjs/toolkit";
import {TypeProductType} from "../type/typeProduct.type";
import {
    createTypeProduct,
    deleteTypeProduct,
    getAllTypeProduct,
    getTypeProductById,
    updateTypeProduct
} from "./typesProductThunk";

export type TypeProductStore = {
    typesProduct: TypeProductType[];
    selectedTypeProduct: TypeProductType | null;
    isLoadingItems: boolean,
    isLoadingItem: boolean,
    filterData: FilterData | null;
}

export type FilterData = {
    searchRow: string;
    page: number;
    size: number;
}

const initialState: TypeProductStore = {
    typesProduct: [],
    selectedTypeProduct: null,
    isLoadingItems: false,
    isLoadingItem: false,
    filterData: null
}

const typeProductSlice = createSlice({
    name: 'typeProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addAsyncThunk(getTypeProductById, {
            pending: (state, action) => {
                console.log(action.payload);
                state.isLoadingItem = true;
            },
            fulfilled: (state, action) => {
                console.log(action);
                state.selectedTypeProduct = action.payload
            },
            rejected: (state, action) => {
                console.log(action);
                // state.error = action.error.
            }
        })
        builder.addAsyncThunk(getAllTypeProduct, {
            pending: (state, action) => {
                console.log(action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                console.log(action);
                state.typesProduct = action.payload
            },
            rejected: (state, action) => {
                console.log(action);
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
        builder.addAsyncThunk(createTypeProduct, {
            pending: (state, action) => {
                console.log('------', state, action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                console.log('------', state, action);
                state.typesProduct = action.payload
            },
            rejected: (state, action) => {
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
        builder.addAsyncThunk(updateTypeProduct, {
            pending: (state, action) => {
                console.log('------', state, action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                const changeTypeProduct = action.payload;
                const allTypesProductWithoutChangeTypeProduct = state.typesProduct.filter(el => el.id !== changeTypeProduct.id);
                state.typesProduct = [action.payload, ...allTypesProductWithoutChangeTypeProduct];
            },
            rejected: (state, action) => {
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
        builder.addAsyncThunk(deleteTypeProduct, {
            pending: (state, action) => {
                console.log('------', state, action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                state.typesProduct = action.payload;
            },
            rejected: (state, action) => {
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
    },
})

export const typeProductReducer = typeProductSlice.reducer;
