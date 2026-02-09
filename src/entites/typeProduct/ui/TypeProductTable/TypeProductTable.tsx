import {FC, useEffect, useState} from 'react';
import {ConfirmDialog, MenuItem, showConfirmDialog} from 'ui-kit-dynamics';
import {useAppDispatch, useAppSelector} from "../../../../app/store/hooks";
import {deleteTypeProduct, getAllTypeProduct} from "../../model/typesProductThunk";
import {TypeProductCreateAnaUpdateModal} from "../TypeProductCreateAnaUpdateModal/TypeProductCreateAnaUpdateModal";
import {TypeProductType} from "../../type/typeProduct.type";
import {TableAdmin} from "../../../../shared/ui/TableAdmin/TableAdmin";
import {TableAdminBtnType} from "../../../../shared/type/tableAdmin.type";
import {columnsTypeProductTable} from "../../const/const";


export const TypeProductTable: FC = () => {
    const dispatch = useAppDispatch();
    const {typesProduct, isLoadingItems} = useAppSelector(state => state.typeProduct);

    const [selectedTypeProduct, setSelectedTypeProduct] = useState<TypeProductType | null>(null);
    const [isOpenCrateOrUpdateModal, setIsOpenCrateOrUpdateModal] = useState<boolean>(false);

    const menuItemTypeProductTable: MenuItem[] = [
        {
            label: 'Изменить запись',
            command: () => showCrateOrUpdateModal(selectedTypeProduct),
        },
        {
            label: 'Удалить запись',
            command: () => showConfirmDeleteTypeProduct()
        }];

    useEffect(() => {
        dispatch(getAllTypeProduct());
    }, []);


    const clickTableBtn = (typeBtn: TableAdminBtnType) => {
        if (typeBtn === 'plus') {
            showCrateOrUpdateModal(null);
        }
    }

    const showCrateOrUpdateModal = (typeProduct: TypeProductType | null) => {
        setSelectedTypeProduct(typeProduct);
        setIsOpenCrateOrUpdateModal(true);
    }

    const showConfirmDeleteTypeProduct = () => {
        if (selectedTypeProduct) {
            showConfirmDialog({
                header: 'Внимание!',
                message: 'Вы уверены, что хотите удалить пользователя?',
                defaultFocus: 'reject',
                accept: () => {
                    dispatch(deleteTypeProduct(selectedTypeProduct.id))
                }
            });
        }
    }

    return (
        <>
            <TableAdmin<TypeProductType | null> columns={columnsTypeProductTable}
                                                items={typesProduct}
                                                selectedItem={selectedTypeProduct}
                                                changeSelectedItem={(data) => setSelectedTypeProduct(data)}
                                                isLoadingItems={isLoadingItems}
                                                menuItemsTable={menuItemTypeProductTable}
                                                btns={['plus']}
                                                clickTableBtn={clickTableBtn}/>
            <TypeProductCreateAnaUpdateModal isOpen={isOpenCrateOrUpdateModal}
                                             hideModal={() => setIsOpenCrateOrUpdateModal(false)}
                                             changeTypeProduct={selectedTypeProduct}/>
            <ConfirmDialog/>
        </>
    );
};