import {FC, useEffect, useState} from 'react';
import {ConfirmDialog, MenuItem, showConfirmDialog} from 'ui-kit-dynamics';
import {useAppDispatch, useAppSelector} from "../../../../app/store/hooks";
import {
    ProductCategoryTableCreateAnaUpdateModal
} from "../ProductCategoryTableCreateAnaUpdateModal/ProductCategoryTableCreateAnaUpdateModal";
import {TableAdmin} from "../../../../shared/ui/TableAdmin/TableAdmin";
import {TableAdminBtnType} from "../../../../shared/type/tableAdmin.type";
import {ProductCategoryType} from "../../../productCategory/type/product.type";
import {columnsProductCategoryTable} from "../../../productCategory/const/const";
import {deleteProductCategory, getAllProductCategory} from "../../model/productThunk";


export const ProductCategoryTable: FC = () => {
    const dispatch = useAppDispatch();
    const {productCategories, isLoadingItems} = useAppSelector(state => state.productCategory);

    const [selectedProductCategory, setSelectedProductCategory] = useState<ProductCategoryType | null>(null);
    const [isOpenCrateOrUpdateModal, setIsOpenCrateOrUpdateModal] = useState<boolean>(false);


    const menuItemTable: MenuItem[] = [
        {
            label: 'Изменить запись',
            command: () => showCrateOrUpdateModal(selectedProductCategory),
        },
        {
            label: 'Удалить запись',
            command: () => showConfirmDeleteProduct()
        }];

    useEffect(() => {
        dispatch(getAllProductCategory());
    }, []);


    const clickTableBtn = (typeBtn: TableAdminBtnType) => {
        if (typeBtn === 'plus') {
            showCrateOrUpdateModal(null);
        }
    }

    const showCrateOrUpdateModal = (productCategory: ProductCategoryType | null) => {
        setSelectedProductCategory(productCategory);
        setIsOpenCrateOrUpdateModal(true);
    }

    const showConfirmDeleteProduct = () => {
        if (selectedProductCategory) {
            showConfirmDialog({
                header: 'Внимание!',
                message: 'Вы уверены, что хотите удалить категорию товара?',
                defaultFocus: 'reject',
                accept: () => {
                    dispatch(deleteProductCategory(selectedProductCategory.id))
                }
            });
        }
    }

    return (
        <>
            <TableAdmin<ProductCategoryType | null> columns={columnsProductCategoryTable}
                                                    items={productCategories}
                                                    selectedItem={selectedProductCategory}
                                                    changeSelectedItem={(data) => setSelectedProductCategory(data)}
                                                    isLoadingItems={isLoadingItems}
                                                    menuItemsTable={menuItemTable}
                                                    btns={['plus']}
                                                    clickTableBtn={clickTableBtn} />
            <ProductCategoryTableCreateAnaUpdateModal isOpen={isOpenCrateOrUpdateModal}
                                                      hideModal={() => setIsOpenCrateOrUpdateModal(false)}
                                                      changeProductCategory={selectedProductCategory}/>
            <ConfirmDialog/>
        </>
    );
};