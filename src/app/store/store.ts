import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userReducer} from "../../entites/user/model/userSlice";
import {productReducer} from "../../entites/product/model/productSlice";

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    // userInfo: userReducer
})

export const store = configureStore({
    reducer: rootReducer
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
