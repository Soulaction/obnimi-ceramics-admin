import {Column} from 'ui-kit-dynamics';

export const columnsUserTable: Column[] = [
    {
        header: 'ИД',
        field: 'id',
    },
    {
        header: 'Почта',
        field: 'email',
    },
    {
        header: 'Фамилия',
        field: 'lastName',
    },
    {
        header: 'Имя',
        field: 'firstName',
    },
    {
        header: 'Телефон',
        field: 'phone',
    },
    {
        header: 'Роль',
        field: 'role',
    },
    {
        header: 'Дата созданя',
        field: 'createdAt',
    },
    {
        header: 'Дата редактирования',
        field: 'updatedAt',
    }];