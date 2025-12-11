import {createAsyncThunk} from "@reduxjs/toolkit";
import {userApiService} from "../api/UserApiService";
import {UserType} from "../type/User.type";
import {RootState} from "../../../app/store";

export const getUserById = createAsyncThunk<UserType, string,
    {
        rejectValue: string;
    }>(
    'user/getUserById',
    async (userId: string) => {
        const {data} = await userApiService.getUserById(userId);
        return data;
    },
)

export const getAllUser = createAsyncThunk<UserType[], void>(
    'user/getAllUser',
    async () => {
        const {data} = await userApiService.getAllUser();
        return data;
    },
)

export const createUser = createAsyncThunk<UserType, UserType,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'user/createUser',
    async (user: UserType) => {
        const {data} = await userApiService.createUser(user);
        return data;
    },
)

export const updateUser = createAsyncThunk<UserType, UserType,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'user/updateUser',
    async (user: UserType) => {
        const {data} = await userApiService.updateUser(user);
        return data;
    },
)

export const deleteUser = createAsyncThunk<string, string,
    {
        state: RootState;
    }>(
    'user/deleteUser',
    async (idItemBasket: string, {getState}: {getState: RootState}) => {
        await deleteUser(idItemBasket);
        const state = getState();
        return state.user.users.filter(el => el.id !== idItemBasket);
    },
)
