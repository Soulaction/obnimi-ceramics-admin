import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAllUser, getUserById} from "./user-thunk";
import {UserType} from "../type/User.type";

export type UserStore = {
    users: UserType[];
    selectedUser: UserType | null;
    isLoadingItems: boolean,
    isLoadingItem: boolean,
    filterData: FilterData | null;
    error: string | null;
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

const initialState: UserStore = {
    users: [],
    selectedUser: null,
    isLoadingItems: false,
    isLoadingItem: false,
    filterData: null,
    error: null

}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher((action) => {
            console.log(action);
            return true
        }, () => {
        })
        builder.addAsyncThunk(getUserById, {
            pending: (state, action) => {
                console.log(action.payload);
                state.isLoadingItem = true;
            },
            fulfilled: (state, action) => {
                console.log(action.payload);
                state.selectedUser = action.payload
            },
            rejected: (state, action) => {
                console.log(action);
                // state.error = action.error.
            },
            settled: (state, action) => {
                console.log(action);
            },
        })
        builder.addAsyncThunk(getAllUser, {
            pending: (state, action) => {
                console.log(action.payload);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                console.log(action.payload);
                state.users = action.payload
            },
            rejected: (state, action) => {
                console.log(action);
                // state.error = action.error.
                state.isLoadingItems = false;
            },
            settled: (state, action) => {
                console.log(action);
            },
        })
        builder.addMatcher((action) => action.type.endsWith('/rejected'),
            (state, action) => {
                console.log(state, action);
            })
    },
})

export const userReducer = userSlice.reducer;
