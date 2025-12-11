import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userReducer} from "../../entites/user/model/user-slice";

const rootReducer = combineReducers({
    user: userReducer,
    // device: deviceReducer,
    // userInfo: userReducer
})

export const store = configureStore({
    reducer: rootReducer
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
