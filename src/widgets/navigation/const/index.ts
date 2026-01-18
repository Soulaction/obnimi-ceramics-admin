import {NavigationItemType} from "../type";
import {RouteApplication} from "../../../shared/type/route";

export const navigationList: NavigationItemType[] = [
    {
        name: 'Пользователи',
        route: RouteApplication.user
    },
    {
        name: 'Товары',
        route: RouteApplication.product
    },
    {
        name: 'Типы товара',
        route: RouteApplication.productType
    },
    {
        name: 'категории',
        route: RouteApplication.productCategory
    },
    {
        name: 'Промокоды',
        route: RouteApplication.promoCode
    },
    {
        name: 'Заказы',
        route: RouteApplication.orders
    },
]