export const RouteApplication = {
    user: 'user',
    product: 'product',
    productType: 'product-type',
    productCategory: 'product-category',
    promoCode: 'promo-code',
    orders: 'orders',
} as const;

export type RouteApplicationType = typeof RouteApplication[keyof typeof RouteApplication];