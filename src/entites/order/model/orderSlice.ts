import {createSlice} from "@reduxjs/toolkit";
import {OrderType} from "../type/order.type";
import {createOrder, deleteOrder, getAllOrder, getOrderById, updateOrder} from "./orderThunk";

export type OrderStore = {
    orders: OrderType[];
    selectedOrder: OrderType | null;
    isLoadingItems: boolean,
    isLoadingItem: boolean,
    filterData: FilterData | null;
}

export type FilterData = {
    searchRow: string;
    page: number;
    size: number;
}

const initialState: OrderStore = {
    orders: [],
    selectedOrder: null,
    isLoadingItems: false,
    isLoadingItem: false,
    filterData: null
}

const ordersSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addAsyncThunk(getOrderById, {
            pending: (state, action) => {
                console.log(action.payload);
                state.isLoadingItem = true;
            },
            fulfilled: (state, action) => {
                console.log(action);
                state.selectedOrder = action.payload
            },
            rejected: (state, action) => {
                console.log(action);
                // state.error = action.error.
            }
        })
        builder.addAsyncThunk(getAllOrder, {
            pending: (state, action) => {
                console.log(action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                console.log(action);
                state.orders = action.payload
            },
            rejected: (state, action) => {
                console.log(action);
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
        builder.addAsyncThunk(createOrder, {
            pending: (state, action) => {
                console.log('------', state, action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                console.log('------', state, action);
                state.orders = action.payload
            },
            rejected: (state, action) => {
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
        builder.addAsyncThunk(updateOrder, {
            pending: (state, action) => {
                console.log('------', state, action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                const changeOrder = action.payload;
                const allOrdersWithoutChangeOrder = state.orders.filter(el => el.id !== changeOrder.id);
                state.orders = [action.payload, ...allOrdersWithoutChangeOrder];
            },
            rejected: (state, action) => {
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
        builder.addAsyncThunk(deleteOrder, {
            pending: (state, action) => {
                console.log('------', state, action);
                state.isLoadingItems = true;
            },
            fulfilled: (state, action) => {
                state.orders = action.payload;
            },
            rejected: (state, action) => {
                // state.error = action.error.
                state.isLoadingItems = false;
            }
        })
    },
})

export const ordersReducer = ordersSlice.reducer;
