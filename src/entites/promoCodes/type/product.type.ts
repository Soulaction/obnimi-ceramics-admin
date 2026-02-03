export type ProductType = {
    id: string;
    name: string;
    description: string;
    price: string;
    stockQuantity: number;
    productTypeId: number;
    productCategoryId: number;
    createdAt: string;
    updatedAt: string;
}

export type CreateOrUpdateProductType = Omit<ProductType, 'createdAt' | 'updatedAt'>;
