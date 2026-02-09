import * as s from './OrderCreateAnaUpdateModal.module.css';
import {FC, FormEvent, useEffect, useState} from 'react';
import {Button, Dialog} from 'ui-kit-dynamics';
import {CreateOrUpdateOrderType, OrderType} from "../../type/order.type";
import {useAppDispatch} from "../../../../app/store/hooks";
import InputWithLabel from "../../../../shared/ui/InputWithLabel/InputWithLabel";
import DropdownWithLabel from "../../../../shared/ui/DropdownWithLabel/DropdownWithLabel";
import {createOrder, updateOrder} from "../../model/orderThunk";

type OrderCreateAnaUpdateModalProps = {
    isOpen: boolean;
    hideModal: () => void;
    changeOrder: OrderType | null
}

const initCreateOrder: CreateOrUpdateOrderType = {
    id: '',
    login: '',
    lastName: '',
    firstName: '',
    phone: '',
    status: '',
    shippingAddress: '',
    comment: '',
};

export const OrderCreateAnaUpdateModal: FC<OrderCreateAnaUpdateModalProps> = ({isOpen, hideModal, changeOrder}) => {

    const dispatch = useAppDispatch();
    const [newOrder, setNewOrder] = useState<CreateOrUpdateOrderType>(initCreateOrder);


    useEffect(() => {
        if (changeOrder) {
            setNewOrder(changeOrder);
        } else {
            setNewOrder(initCreateOrder);
        }
    }, [changeOrder]);

    useEffect(() => {
        if (changeOrder) {
            setNewOrder(changeOrder);
        } else {
            setNewOrder(initCreateOrder);
        }
    }, [changeOrder]);

    const changeData = (controlName: keyof CreateOrUpdateOrderType, value: string) => {
        setNewOrder(prev => ({...prev, [controlName]: value}));
    }

    const saveData = (evt: FormEvent) => {
        evt.preventDefault();
        if (changeOrder) {
            dispatch(updateOrder(newOrder)).unwrap().then(() => hideModal());
        } else {
            dispatch(createOrder(newOrder));
        }
    }

    return (
        <Dialog header={changeOrder ? 'Корректировка заказа' : 'Добавление заказа'}
                visible={isOpen}
                onHide={hideModal}
        >
            <form className={s.form}
                  onSubmit={saveData}>
                <div className={s.formFields}>
                    <InputWithLabel label="Логин"
                                    value={newOrder.login}
                                    onChange={(evt) => changeData("login", evt.target.value)}
                    />
                    <InputWithLabel label="Фамилия"
                                    value={newOrder.lastName}
                                    onChange={(evt) => changeData("lastName", evt.target.value)}
                    />
                    <InputWithLabel label="Имя"
                                    value={newOrder.firstName}
                                    onChange={(evt) => changeData("firstName", evt.target.value)}
                    />
                    <InputWithLabel label="Телефон"
                                    value={newOrder.phone}
                                    onChange={(evt) => changeData("phone", evt.target.value)}
                    />
                    <InputWithLabel label="Статус заказа"
                                    value={newOrder.status}
                                    onChange={(evt) => changeData("status", evt.target.value)}
                    />
                    <InputWithLabel label="Адрес"
                                    value={newOrder.shippingAddress}
                                    onChange={(evt) => changeData("shippingAddress", evt.target.value)}
                    />
                    <InputWithLabel label="Комментарий"
                                    value={newOrder.comment}
                                    onChange={(evt) => changeData("comment", evt.target.value)}
                    />
                </div>
                <div className={s.formFooter}>
                    <Button label={changeOrder ? 'Изменить' : 'Сохранить'}/>
                </div>
            </form>
        </Dialog>
    );
};
