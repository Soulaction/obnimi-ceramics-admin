import {createAsyncThunk} from "@reduxjs/toolkit";
import {orderApiService} from "../api/OrderApiService";
import {CreateOrUpdateOrderType, OrderType} from "../type/order.type";
import {RootState} from "../../../app/store/store";

export const getOrderById = createAsyncThunk<OrderType, string,
    {
        rejectValue: string;
    }>(
    'order/getOrderById',
    async (orderId) => {
        const {data} = await orderApiService.getOrderById(orderId);
        return data;
    },
)

export const getAllOrder = createAsyncThunk<OrderType[], void>(
    'order/getAllOrder',
    async () => {
        const {data} = await orderApiService.getAllOrder();
        return data;
    },
)

export const createOrder = createAsyncThunk<OrderType[], CreateOrUpdateOrderType,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'order/createOrder',
    async (order, {getState}) => {
        const {data} = await orderApiService.createOrder(order);
        const state: RootState = getState();
        return [data, ...state.order.orders];
    },
)

export const updateOrder = createAsyncThunk<OrderType, CreateOrUpdateOrderType,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'order/updateOrder',
    async (order) => {
        const {data} = await orderApiService.updateOrder(order);
        return data;
    },
)

export const deleteOrder = createAsyncThunk<OrderType[], string,
    {
        state: RootState;
    }>(
    'order/deleteOrder',
    async (id, {getState}) => {
        await orderApiService.deleteOrder(id);
        const state = getState();
        return state.order.orders.filter(el => el.id !== id);
    },
)
