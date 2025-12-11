import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAllUser, getUserById} from "./user-thunk";
import {UserType} from "../type/User.type";

export type UserStore = {
    users: UserType[];
    selectedUser: UserType | null;
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

const initialState: UserStore = {
    users: [],
    selectedUser: null,
    isLoadingItems: false,
    isLoadingItem: false,
    filterData: null

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
        builder.addCase(getUserById.pending, (state: UserStore, action: PayloadAction<UserType>) => {
            console.log(action.payload);
            state.isLoadingItem = true;
        })
        builder.addCase(getUserById.fulfilled, (state: UserStore, action: PayloadAction<UserType>) => {
            state.isLoadingItem = false;
            state.selectedUser = action.payload;
        })
        builder.addCase(getAllUser.pending, (state: UserStore, action: PayloadAction<UserType[]>) => {
            state.isLoadingItems = false;
            state.users = action.payload;
        })
        builder.addCase(getAllUser.fulfilled, (state: UserStore, action: PayloadAction<UserType[]>) => {
            state.isLoadingItems = false;
            state.users = action.payload;
        })
        builder.addMatcher((action) => action.type.endsWith('/rejected'),
            (state: BasketStore, action: PayloadAction<string>) => {
                state.isLoading = false
                state.errorMsg = action.payload as string;
            })
    },
})

export const userReducer = userSlice.reducer;
