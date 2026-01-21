import {createAsyncThunk} from "@reduxjs/toolkit";
import {userApiService} from "../api/UserApiService";
import {CreateUserType, UserType} from "../type/user.type";
import {RootState} from "../../../app/store/store";

export const getUserById = createAsyncThunk<UserType, string,
    {
        rejectValue: string;
    }>(
    'user/getUserById',
    async (userId) => {
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

export const createUser = createAsyncThunk<UserType[], CreateUserType,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'user/createUser',
    async (user, {getState}) => {
        const {data} = await userApiService.createUser(user);
        const users: RootState = getState();
        return [data, ...users.user.users];
    },
)

export const updateUser = createAsyncThunk<UserType, UserType,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'user/updateUser',
    async (user) => {
        const {data} = await userApiService.updateUser(user);
        return data;
    },
)

export const deleteUser = createAsyncThunk<UserType[], string,
    {
        state: RootState;
    }>(
    'user/deleteUser',
    async (idItemBasket, {getState}) => {
        await deleteUser(idItemBasket);
        const state = getState();
        return state.user.users.filter(el => el.id !== idItemBasket);
    },
)
