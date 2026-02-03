import * as s from './ProductCategoryTableCreateAnaUpdateModal.module.css';
import {FC, FormEvent, useEffect, useState} from 'react';
import {Button, Dialog} from 'ui-kit-dynamics';
import {ProductCategoryType} from "../../type/product.type";
import {useAppDispatch} from "../../../../app/store/hooks";
import InputWithLabel from "../../../../shared/ui/InputWithLabel/InputWithLabel";
import {createProductCategory, updateProductCategory} from "../../model/productThunk";

type UserCreateAnaUpdateModalProps = {
    isOpen: boolean;
    hideModal: () => void;
    changeProductCategory: ProductCategoryType | null
}

const initCreateProduct: ProductCategoryType = {
    id: '',
    name: '',
    description: ''
};

export const ProductCategoryTableCreateAnaUpdateModal: FC<UserCreateAnaUpdateModalProps> = ({isOpen, hideModal, changeProductCategory}) => {

    const dispatch = useAppDispatch();
    const [newProductCategory, setNewProductCategory] = useState<ProductCategoryType>(initCreateProduct);

    useEffect(() => {
        if (changeProductCategory) {
            setNewProductCategory(changeProductCategory);
        } else {
            setNewProductCategory(initCreateProduct);
        }
    }, [changeProductCategory]);

    const changeData = (controlName: keyof ProductCategoryType, value: string) => {
        setNewProductCategory(prev => ({...prev, [controlName]: value}));
    }

    const saveData = (evt: FormEvent) => {
        evt.preventDefault();
        if (changeProductCategory) {
            dispatch(updateProductCategory(newProductCategory)).unwrap().then(() => hideModal());
        } else {
            dispatch(createProductCategory(newProductCategory));
        }
    }

    return (
        <Dialog header={changeProductCategory ? 'Корректировка товара' : 'Добавление товара'}
                visible={isOpen}
                onHide={hideModal}
        >
            <form className={s.form}
                  onSubmit={saveData}>
                <div className={s.formFields}>
                    <InputWithLabel label="Название"
                                    value={newProductCategory.name}
                                    onChange={(evt) => changeData("name", evt.target.value)}
                    />
                    <InputWithLabel label="Описание"
                                    value={newProductCategory.description}
                                    onChange={(evt) => changeData("description", evt.target.value)}
                    />
                </div>
                <div className={s.formFooter}>
                    <Button label={changeProductCategory ? 'Изменить' : 'Сохранить'}/>
                </div>
            </form>
        </Dialog>
    );
};
