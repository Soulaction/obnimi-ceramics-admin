import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createUser, deleteUser, getAllUser, getUserById, updateUser} from "./userThunk";
import {UserType} from "../type/user.type";

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
        builder.addAsyncThunk(getUserById, {
            pending: (state, action) => {
                console.log(action.payload);
                state.isLoadingItem = true;
            },
            fulfilled: (state, action) => {
                console.log(action);
                state.selectedUser = action.payload
            },
            rejected: (state, action) => {
                console.log(action);
                // state.error = action.error.
            }
        })
        builder.addAsyncThunk(getAllUser, {
            pending: (state, action) => {
                console.log(action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                console.log(action);
                state.users = action.payload
            },
            rejected: (state, action) => {
                console.log(action);
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
        builder.addAsyncThunk(createUser, {
            pending: (state, action) => {
                console.log('------', state, action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                console.log('------', state, action);
                state.users = action.payload
            },
            rejected: (state, action) => {
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
        builder.addAsyncThunk(updateUser, {
            pending: (state, action) => {
                console.log('------', state, action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                const changeUser = action.payload;
                const allUsersWithoutChangeUser = state.users.filter(el => el.id !== changeUser.id);
                state.users = [action.payload, ...allUsersWithoutChangeUser];
            },
            rejected: (state, action) => {
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
        builder.addAsyncThunk(deleteUser, {
            pending: (state, action) => {
                console.log('------', state, action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                state.users = action.payload;
            },
            rejected: (state, action) => {
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
    },
})

export const userReducer = userSlice.reducer;
