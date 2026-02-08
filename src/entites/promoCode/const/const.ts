import {Column} from 'ui-kit-dynamics';

export const columnsPromoCodeTable: Column[] = [
    {
        header: 'Промо-код',
        field: 'code',
    },
    {
        header: 'Скидка',
        field: 'discountPercent',
    },
    {
        header: 'Количество использования',
        field: 'maxUses',
    },
    {
        header: 'Действителен с',
        field: 'validFrom',
    },
    {
        header: 'Действителен по',
        field: 'validTo',
    },
    {
        header: 'Активный',
        field: 'isActive',
    },
    {
        header: 'Дата создания',
        field: 'createdAt',
    }];