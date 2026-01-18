import {createBrowserRouter, RouteObject, Navigate} from "react-router-dom";
import App from "../App";
import UserPage from "../../pages/users/ui/UserPage";
import ProductPage from "../../pages/product/ui/ProductPage";
import ProductTypePage from "../../pages/product-type/ui/ProductTypePage";
import ProductCategoryPage from "../../pages/product-category/ui/ProductCategoryPage";
import PromoCodePage from "../../pages/promo-code/ui/PromoCodePage";
import OrdersPage from "../../pages/orders/ui/OrdersPage";


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