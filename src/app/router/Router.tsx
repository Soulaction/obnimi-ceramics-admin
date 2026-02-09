import {createBrowserRouter, RouteObject, Navigate} from "react-router-dom";
import App from "../App";
import UserPage from "../../pages/users/ui/UserPage";
import ProductPage from "../../pages/product/ui/ProductPage";
import ProductTypePage from "../../pages/typeProduct/ui/ProductTypePage";
import ProductCategoryPage from "../../pages/productCategory/ui/ProductCategoryPage";
import PromoCodePage from "../../pages/promoCode/ui/PromoCodePage";
import OrdersPage from "../../pages/order/ui/OrderPage";


const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            { path: '', element: <Navigate to="/product" replace /> },
            {
                path: 'user',
                element: <UserPage/>,
            },
            {
                path: 'product',
                element: <ProductPage/>,
            },
            {
                path: 'product-type',
                element: <ProductTypePage/>,
            },
            {
                path: 'product-category',
                element: <ProductCategoryPage/>,
            },
            {
                path: 'promo-code',
                element: <PromoCodePage/>,
            },
            {
                path: 'orders',
                element: <OrdersPage/>,
            },
            { path: '*', element: <Navigate to="/product" replace /> },
        ]
    }
];

export const router = createBrowserRouter(routes);