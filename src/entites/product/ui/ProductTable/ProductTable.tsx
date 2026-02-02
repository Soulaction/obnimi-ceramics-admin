import {FC, useEffect, useRef, useState} from 'react';
import {Table, ContextMenu, ContextMenuRef, MenuItem, ConfirmDialog, showConfirmDialog} from 'ui-kit-dynamics';
import {useAppDispatch, useAppSelector} from "../../../../app/store/hooks";
import {ProductTableBtn} from "../ProductTableBtn/ProductTableBtn";
import {ProductCreateAnaUpdateModal} from "../ProductCreateAnaUpdateModal/ProductCreateAnaUpdateModal";
import {ProductType} from "../../type/product.type";
import {deleteProduct, getAllProduct} from "../../model/productThunk";
import {ProductTableBtnType} from "../../type/productTable.type";
import {columnsProductTable} from "../../const/const";


export const ProductTable: FC = () => {
    const dispatch = useAppDispatch();
    const {products, isLoadingItems} = useAppSelector(state => state.product);

    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const [isOpenCrateOrUpdateModal, setIsOpenCrateOrUpdateModal] = useState<boolean>(false);
    const contextMenuRef = useRef<ContextMenuRef | null>(null);


    const menuItemProductTable: MenuItem[] = [
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


    const clickProductTableBtn = (typeBtn: ProductTableBtnType) => {
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
                message: 'Вы уверены, что хотите удалить пользователя?',
                defaultFocus: 'reject',
                accept: () => {
                    dispatch(deleteProduct(selectedProduct.id))
                }
            });
        }
    }

    return (
        <>
            <Table column={columnsProductTable}
                   TemplateHeader={<ProductTableBtn clickCallback={clickProductTableBtn}></ProductTableBtn>}
                   rowKey={'id'}
                   value={products}
                   changeSelectedItem={setSelectedProduct}
                   contextMenuRef={contextMenuRef}/>
            <ContextMenu items={menuItemProductTable} ref={contextMenuRef}/>
            <ProductCreateAnaUpdateModal isOpen={isOpenCrateOrUpdateModal}
                                         hideModal={() => setIsOpenCrateOrUpdateModal(false)}
                                         changeUser={selectedProduct}/>
            <ConfirmDialog/>
        </>
    );
};