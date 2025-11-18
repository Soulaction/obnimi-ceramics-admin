import {combineReducers, configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    // basket: basketReducer,
    // device: deviceReducer,
    // userInfo: userReducer
})

export const store = configureStore({
    reducer: rootReducer
})


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch