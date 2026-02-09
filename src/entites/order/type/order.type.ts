export type OrderType = {
    id: string;
    login: string;
    lastName: string;
    firstName: string;
    phone: string;
    status: string;
    shippingAddress: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

export type CreateOrUpdateOrderType = Omit<OrderType, 'createdAt' | 'updatedAt'>;
