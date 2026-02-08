import {FC, useEffect, useState} from 'react';
import {ConfirmDialog, MenuItem, showConfirmDialog} from 'ui-kit-dynamics';
import {useAppDispatch, useAppSelector} from "../../../../app/store/hooks";
import {PromoCodeCreateAnaUpdateModal} from "../PromoCodeCreateAnaUpdateModal/PromoCodeCreateAnaUpdateModal";
import {PromoCodeType} from "../../type/promoCode.type";
import {deletePromoCode, getAllPromoCode} from "../../model/promoCodeThunk";
import {TableAdmin} from "../../../../shared/ui/TableAdmin/TableAdmin";
import {columnsPromoCodeTable} from "../../const/const";
import {TableAdminBtnType} from "../../../../shared/type/tableAdmin.type";


export const PromoCodeTable: FC = () => {
    const dispatch = useAppDispatch();
    const {promoCodes, isLoadingItems} = useAppSelector(state => state.promoCode);

    const [selectedPromoCode, setSelectedPromoCode] = useState<PromoCodeType | null>(null);
    const [isOpenCrateOrUpdateModal, setIsOpenCrateOrUpdateModal] = useState<boolean>(false);


    const menuItemTable: MenuItem[] = [
        {
            label: 'Изменить запись',
            command: () => showCrateOrUpdateModal(selectedPromoCode),
        },
        {
            label: 'Удалить запись',
            command: () => showConfirmDeletePromoCode()
        }];

    useEffect(() => {
        dispatch(getAllPromoCode());
    }, []);


    const clickTableBtn = (typeBtn: TableAdminBtnType) => {
        if (typeBtn === 'plus') {
            showCrateOrUpdateModal(null);
        }
    }

    const showCrateOrUpdateModal = (promoCode: PromoCodeType | null) => {
        setSelectedPromoCode(promoCode);
        setIsOpenCrateOrUpdateModal(true);
    }

    const showConfirmDeletePromoCode = () => {
        if (selectedPromoCode) {
            showConfirmDialog({
                header: 'Внимание!',
                message: 'Вы уверены, что хотите промо-код?',
                defaultFocus: 'reject',
                accept: () => {
                    dispatch(deletePromoCode(selectedPromoCode.id))
                }
            });
        }
    }

    return (
        <>
            <TableAdmin<PromoCodeType | null> columns={columnsPromoCodeTable}
                                         items={promoCodes}
                                         selectedItem={selectedPromoCode}
                                         changeSelectedItem={(data) => setSelectedPromoCode(data)}
                                         isLoadingItems={isLoadingItems}
                                         menuItemsTable={menuItemTable}
                                         btns={['plus']}
                                         clickUserTableBtn={clickTableBtn} />
            <PromoCodeCreateAnaUpdateModal isOpen={isOpenCrateOrUpdateModal}
                                           hideModal={() => setIsOpenCrateOrUpdateModal(false)}
                                           changePromoCode={selectedPromoCode}/>
            <ConfirmDialog/>
        </>
    );
};