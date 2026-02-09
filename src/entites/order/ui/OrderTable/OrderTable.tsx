import {FC, useEffect, useState} from 'react';
import {ConfirmDialog, MenuItem, showConfirmDialog} from 'ui-kit-dynamics';
import {useAppDispatch, useAppSelector} from "../../../../app/store/hooks";
import {OrderCreateAnaUpdateModal} from "../OrderCreateAnaUpdateModal/OrderCreateAnaUpdateModal";
import {OrderType} from "../../type/order.type";
import {TableAdmin} from "../../../../shared/ui/TableAdmin/TableAdmin";
import {TableAdminBtnType} from "../../../../shared/type/tableAdmin.type";
import {columnsOrderTable} from "../../const/const";
import {deleteOrder, getAllOrder} from "../../model/orderThunk";


export const OrderTable: FC = () => {
    const dispatch = useAppDispatch();
    const {orders, isLoadingItems} = useAppSelector(state => state.order);

    const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
    const [isOpenCrateOrUpdateModal, setIsOpenCrateOrUpdateModal] = useState<boolean>(false);


    const menuItemTable: MenuItem[] = [
        {
            label: 'Изменить запись',
            command: () => showCrateOrUpdateModal(selectedOrder),
        },
        {
            label: 'Удалить запись',
            command: () => showConfirmDeleteOrder()
        }];

    useEffect(() => {
        dispatch(getAllOrder());
    }, []);


    const clickTableBtn = (typeBtn: TableAdminBtnType) => {
        if (typeBtn === 'plus') {
            showCrateOrUpdateModal(null);
        }
    }

    const showCrateOrUpdateModal = (order: OrderType | null) => {
        setSelectedOrder(order);
        setIsOpenCrateOrUpdateModal(true);
    }

    const showConfirmDeleteOrder = () => {
        if (selectedOrder) {
            showConfirmDialog({
                header: 'Внимание!',
                message: 'Вы уверены, что хотите удалить заказ?',
                defaultFocus: 'reject',
                accept: () => {
                    dispatch(deleteOrder(selectedOrder.id))
                }
            });
        }
    }

    return (
        <>
            <TableAdmin<OrderType | null> columns={columnsOrderTable}
                                          items={orders}
                                          selectedItem={selectedOrder}
                                          changeSelectedItem={(data) => setSelectedOrder(data)}
                                          isLoadingItems={isLoadingItems}
                                          menuItemsTable={menuItemTable}
                                          btns={['plus']}
                                          clickTableBtn={clickTableBtn} />
            <OrderCreateAnaUpdateModal isOpen={isOpenCrateOrUpdateModal}
                                       hideModal={() => setIsOpenCrateOrUpdateModal(false)}
                                       changeOrder={selectedOrder}/>
            <ConfirmDialog/>
        </>
    );
};
