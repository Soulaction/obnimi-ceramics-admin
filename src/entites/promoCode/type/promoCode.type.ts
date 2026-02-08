export type PromoCodeType = {
    id: string;
    code: string;
    discountPercent: number;
    maxUses: number;
    validFrom: boolean;
    validTo: string;
    isActive: string;
    createdAt: string;
}

export type CreateOrUpdatePromoCodeType = Omit<PromoCodeType, 'createdAt'>;
