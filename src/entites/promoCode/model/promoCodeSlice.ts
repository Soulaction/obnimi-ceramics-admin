import {createSlice} from "@reduxjs/toolkit";

import { PromoCodeType} from "../type/promoCode.type";
import {createPromoCode, deletePromoCode, getAllPromoCode, getPromoCodeById, updatePromoCode} from "./promoCodeThunk";

export type PromoCodeStore = {
    promoCodes: PromoCodeType[];
    selectedPromoCode: PromoCodeType | null;
    isLoadingItems: boolean,
    isLoadingItem: boolean,
    filterData: FilterData | null;
}

export type FilterData = {
    searchRow: string;
    minPrice: number;
    maxPrice: number,
    productTypeId: number,
    productCategoryId: number,
    page: number;
    size: number;
}

const initialState: PromoCodeStore = {
    promoCodes: [],
    selectedPromoCode: null,
    isLoadingItems: false,
    isLoadingItem: false,
    filterData: null
}

const promoCodeSlice = createSlice({
    name: 'promoCode',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addAsyncThunk(getPromoCodeById, {
            pending: (state, action) => {
                console.log(action.payload);
                state.isLoadingItem = true;
            },
            fulfilled: (state, action) => {
                console.log(action);
                state.selectedPromoCode = action.payload
            },
            rejected: (state, action) => {
                console.log(action);
                // state.error = action.error.
            }
        })
        builder.addAsyncThunk(getAllPromoCode, {
            pending: (state, action) => {
                console.log(action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                console.log(action);
                state.promoCodes = action.payload
            },
            rejected: (state, action) => {
                console.log(action);
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
        builder.addAsyncThunk(createPromoCode, {
            pending: (state, action) => {
                console.log('------', state, action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                console.log('------', state, action);
                state.promoCodes = action.payload
            },
            rejected: (state, action) => {
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
        builder.addAsyncThunk(updatePromoCode, {
            pending: (state, action) => {
                console.log('------', state, action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                const changeUser = action.payload;
                const allUsersWithoutChangeUser = state.promoCodes.filter(el => el.id !== changeUser.id);
                state.promoCodes = [action.payload, ...allUsersWithoutChangeUser];
            },
            rejected: (state, action) => {
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
        builder.addAsyncThunk(deletePromoCode, {
            pending: (state, action) => {
                console.log('------', state, action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                state.promoCodes = action.payload;
            },
            rejected: (state, action) => {
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
    },
})

export const promoCodeReducer = promoCodeSlice.reducer;
