import {FC, useEffect, useState} from 'react';
import {ConfirmDialog, MenuItem, showConfirmDialog} from 'ui-kit-dynamics';
import {useAppDispatch, useAppSelector} from "../../../../app/store/hooks";
import {ProductCreateAnaUpdateModal} from "../ProductCreateAnaUpdateModal/ProductCreateAnaUpdateModal";
import {ProductType} from "../../type/product.type";
import {deleteProduct, getAllProduct} from "../../model/productThunk";
import {TableAdmin} from "../../../../shared/ui/TableAdmin/TableAdmin";
import {columnsProductTable} from "../../const/const";
import {TableAdminBtnType} from "../../../../shared/type/tableAdmin.type";


export const ProductTable: FC = () => {
    const dispatch = useAppDispatch();
    const {products, isLoadingItems} = useAppSelector(state => state.product);

    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const [isOpenCrateOrUpdateModal, setIsOpenCrateOrUpdateModal] = useState<boolean>(false);


    const menuItemTable: MenuItem[] = [
        {
            label: 'Изменить запись',
            command: () => showCrateOrUpdateModal(selectedProduct),
        },
        {
            label: 'Удалить запись',
            command: () => showConfirmDeleteProduct()
        }];

    useEffect(() => {
        dispatch(getAllProduct());
    }, []);


    const clickTableBtn = (typeBtn: TableAdminBtnType) => {
        if (typeBtn === 'plus') {
            showCrateOrUpdateModal(null);
        }
    }

    const showCrateOrUpdateModal = (product: ProductType | null) => {
        setSelectedProduct(product);
        setIsOpenCrateOrUpdateModal(true);
    }

    const showConfirmDeleteProduct = () => {
        if (selectedProduct) {
            showConfirmDialog({
                header: 'Внимание!',
                message: 'Вы уверены, что хотите удалить товар?',
                defaultFocus: 'reject',
                accept: () => {
                    dispatch(deleteProduct(selectedProduct.id))
                }
            });
        }
    }

    return (
        <>
            <TableAdmin<ProductType | null> columns={columnsProductTable}
                                            items={products}
                                            selectedItem={selectedProduct}
                                            changeSelectedItem={(data) => setSelectedProduct(data)}
                                            isLoadingItems={isLoadingItems}
                                            menuItemsTable={menuItemTable}
                                            btns={['plus']}
                                            clickTableBtn={clickTableBtn} />
            <ProductCreateAnaUpdateModal isOpen={isOpenCrateOrUpdateModal}
                                         hideModal={() => setIsOpenCrateOrUpdateModal(false)}
                                         changeProduct={selectedProduct}/>
            <ConfirmDialog/>
        </>
    );
};
