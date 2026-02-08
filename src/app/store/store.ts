import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userReducer} from "../../entites/user/model/userSlice";
import {productReducer} from "../../entites/product/model/productSlice";
import {productCategoryReducer} from "../../entites/productCategory/model/productSlice";
import {promoCodeReducer} from "../../entites/promoCode/model/promoCodeSlice";
import {typeProductReducer} from "../../entites/typeProduct/model/typesProductSlice";

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    productCategory: productCategoryReducer,
    promoCode: promoCodeReducer,
    typeProduct: typeProductReducer,
})

export const store = configureStore({
    reducer: rootReducer
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
