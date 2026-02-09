import * as s from './TypeProductCreateAnaUpdateModal.module.css';
import {FC, FormEvent, useEffect, useState} from 'react';
import {Button, Dialog} from 'ui-kit-dynamics';
import {TypeProductType} from "../../type/typeProduct.type";
import {useAppDispatch} from "../../../../app/store/hooks";
import {createTypeProduct, updateTypeProduct} from "../../model/typesProductThunk";
import InputWithLabel from "../../../../shared/ui/InputWithLabel/InputWithLabel";

type TypeProductCreateAnaUpdateModalProps = {
    isOpen: boolean;
    hideModal: () => void;
    changeTypeProduct: TypeProductType | null
}

const initCreateTypeProduct = {
    id: '',
    name: '',
    description: '',
};

export const TypeProductCreateAnaUpdateModal: FC<TypeProductCreateAnaUpdateModalProps> = ({isOpen, hideModal, changeTypeProduct}) => {

    const dispatch = useAppDispatch();
    const [newTypeProduct, setNewTypeProduct] = useState<TypeProductType>(initCreateTypeProduct);

    useEffect(() => {
        if (changeTypeProduct) {
            setNewTypeProduct(changeTypeProduct);
        } else {
            setNewTypeProduct(initCreateTypeProduct);
        }
    }, [changeTypeProduct]);

    const changeData = (controlName: keyof TypeProductType, value: string) => {
        setNewTypeProduct(prev => ({...prev, [controlName]: value}));
    }

    const saveData = (evt: FormEvent) => {
        evt.preventDefault();
        if (changeTypeProduct) {
            dispatch(updateTypeProduct(newTypeProduct)).unwrap().then(() => hideModal());
        } else {
            dispatch(createTypeProduct(newTypeProduct));
        }
    }

    return (
        <Dialog header={changeTypeProduct ? 'Корректировка тип продукта' : 'Добавление типа продукта'}
                visible={isOpen}
                onHide={hideModal}
        >
            <form className={s.form}
                  onSubmit={saveData}>
                <div className={s.formFields}>
                    <InputWithLabel label="Наименование"
                                    value={newTypeProduct.name}
                                    onChange={(evt) => changeData("name", evt.target.value)}
                    />
                    <InputWithLabel label="Описание"
                                    value={newTypeProduct.description}
                                    onChange={(evt) => changeData("description", evt.target.value)}
                    />
                </div>
                <div className={s.formFooter}>
                    <Button label={changeTypeProduct ? 'Изменить' : 'Сохранить'}/>
                </div>
            </form>
        </Dialog>
    );
};
