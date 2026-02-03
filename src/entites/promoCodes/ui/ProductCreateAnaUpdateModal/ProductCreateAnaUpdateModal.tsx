import * as s from './ProductCreateAnaUpdateModal.module.css';
import {FC, FormEvent, useEffect, useState} from 'react';
import {Button, Dialog} from 'ui-kit-dynamics';
import {CreateOrUpdateProductType, ProductType} from "../../type/product.type";
import {useAppDispatch} from "../../../../app/store/hooks";
import InputWithLabel from "../../../../shared/ui/InputWithLabel/InputWithLabel";
import DropdownWithLabel from "../../../../shared/ui/DropdownWithLabel/DropdownWithLabel";
import {createProduct, updateProduct} from "../../model/productThunk";
import {CreateOrUpdateUserType} from "../../../user/type/user.type";

type UserCreateAnaUpdateModalProps = {
    isOpen: boolean;
    hideModal: () => void;
    changeProduct: ProductType | null
}

const initCreateProduct = {
    id: '',
    name: '',
    firstName: '',
    description: '',
    price: '0',
    stockQuantity: 0,
    productTypeId: 0,
    productCategoryId: 0
};

export const ProductCreateAnaUpdateModal: FC<UserCreateAnaUpdateModalProps> = ({isOpen, hideModal, changeProduct}) => {

    const dispatch = useAppDispatch();
    const [newProduct, setNewProduct] = useState<CreateOrUpdateProductType>(initCreateProduct);


    useEffect(() => {
        if (changeProduct) {
            setNewProduct(changeProduct);
        } else {
            setNewProduct(initCreateProduct);
        }
    }, [changeProduct]);

    useEffect(() => {
        if (changeProduct) {
            setNewProduct(changeProduct);
        } else {
            setNewProduct(initCreateProduct);
        }
    }, [changeProduct]);

    const changeData = (controlName: keyof CreateOrUpdateProductType, value: string) => {
        setNewProduct(prev => ({...prev, [controlName]: value}));
    }

    const saveData = (evt: FormEvent) => {
        evt.preventDefault();
        if (changeProduct) {
            dispatch(updateProduct(newProduct)).unwrap().then(() => hideModal());
        } else {
            dispatch(createProduct(newProduct));
        }
    }

    return (
        <Dialog header={changeProduct ? 'Корректировка товара' : 'Добавление товара'}
                visible={isOpen}
                onHide={hideModal}
        >
            <form className={s.form}
                  onSubmit={saveData}>
                <div className={s.formFields}>
                    <InputWithLabel label="Название"
                                    value={newProduct.name}
                                    onChange={(evt) => changeData("name", evt.target.value)}
                    />
                    <InputWithLabel label="Описание"
                                    value={newProduct.description}
                                    onChange={(evt) => changeData("description", evt.target.value)}
                    />
                    <InputWithLabel label="Цена"
                                    value={newProduct.price}
                                    onChange={(evt) => changeData("price", evt.target.value)}
                    />
                    <InputWithLabel label="Колличество"
                                    value={newProduct.stockQuantity}
                                    onChange={(evt) => changeData("stockQuantity", evt.target.value)}
                    />
                    <DropdownWithLabel rowKey="id"
                                       label="Тип товара"
                                       itemLabel="name"
                                       itemValue="id"
                                       selectItem={newProduct.productTypeId}
                                       items={listRole}
                                       selectedItem={changeData.bind(null, "productTypeId")}/>
                    <DropdownWithLabel rowKey="id"
                                       label="Категория товара"
                                       itemLabel="name"
                                       itemValue="id"
                                       selectItem={newProduct.productCategoryId}
                                       items={listRole}
                                       selectedItem={changeData.bind(null, "productCategoryId")}/>
                </div>
                <div className={s.formFooter}>
                    <Button label={changeProduct ? 'Изменить' : 'Сохранить'}/>
                </div>
            </form>
        </Dialog>
    );
};
