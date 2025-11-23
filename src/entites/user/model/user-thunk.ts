import {createAsyncThunk} from "@reduxjs/toolkit";
import {userApiService} from "../api/UserApiService";
import {UserType} from "../type/User.type";
import {RootState} from "../../../app/store";

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

export const getAllUser = createAsyncThunk<BasketItemModel, string,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'user/getAllUser',
    async (deviceId) => {
        const {data} = await getAllUser({userId: getState().userInfo.user.id, deviceId});
        return data;
    },
)

export const createUser = createAsyncThunk<BasketItemModel, string,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'user/createUser',
    async (deviceId) => {
        const {data} = await createUser({userId: getState().userInfo.user.id, deviceId});
        return data;
    },
)

export const updateUser = createAsyncThunk<BasketItemModel, string,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'user/updateUser',
    async (deviceId) => {
        const {data} = await updateUser({userId: getState().userInfo.user.id, deviceId});
        return data;
    },
)

export const deleteUser = createAsyncThunk<string, string,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'user/deleteUser',
    async (idItemBasket, {getState}) => {
        await deleteBasket(idItemBasket);
        const basketItem: BasketItemModel[] = getState().basket.basketItems.filter(el => el.id !== idItemBasket);
        return basketItem;
    },
)
