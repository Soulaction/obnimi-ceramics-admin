import {createBrowserRouter, RouteObject, Navigate} from "react-router-dom";
import App from "./App";
import User from "../pages/users/ui/User";
import Product from "../pages/product/ui/Product";
import ProductType from "../pages/product-type/ui/ProductType";
import ProductCategory from "../pages/product-category/ui/ProductCategory";
import PromoCode from "../pages/promo-code/ui/PromoCode";
import Orders from "../pages/orders/ui/Orders";


const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            { path: '', element: <Navigate to="/product" replace /> },
            {
                path: '/user',
                element: <User/>,
            },
            {
                path: '/product',
                element: <Product/>,
            },
            {
                path: '/product-type',
                element: <ProductType/>,
            },
            {
                path: '/product-category',
                element: <ProductCategory/>,
            },
            {
                path: '/promo-code',
                element: <PromoCode/>,
            },
            {
                path: '/orders',
                element: <Orders/>,
            },
            { path: '*', element: <Navigate to="/product" replace /> },
        ]
    }
];

export const router = createBrowserRouter(routes);