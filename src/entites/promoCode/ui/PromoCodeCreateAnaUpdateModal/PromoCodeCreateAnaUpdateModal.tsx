import * as s from './PromoCodeCreateAnaUpdateModal.module.css';
import {FC, FormEvent, useEffect, useState} from 'react';
import {Button, Dialog} from 'ui-kit-dynamics';
import {CreateOrUpdatePromoCodeType, PromoCodeType} from "../../type/promoCode.type";
import {useAppDispatch} from "../../../../app/store/hooks";
import InputWithLabel from "../../../../shared/ui/InputWithLabel/InputWithLabel";
import {createPromoCode, updatePromoCode} from "../../model/promoCodeThunk";

type PromoCodeCreateAnaUpdateModalProps = {
    isOpen: boolean;
    hideModal: () => void;
    changePromoCode: PromoCodeType | null
}

const initCreatePromoCode: CreateOrUpdatePromoCodeType = {
    id: '',
    code: '',
    discountPercent: 0,
    maxUses: 0,
    validFrom: false,
    validTo: '',
    isActive: ''
};

export const PromoCodeCreateAnaUpdateModal: FC<PromoCodeCreateAnaUpdateModalProps> = ({isOpen, hideModal, changePromoCode}) => {

    const dispatch = useAppDispatch();
    const [newPromoCode, setNewPromoCode] = useState<CreateOrUpdatePromoCodeType>(initCreatePromoCode);


    useEffect(() => {
        if (changePromoCode) {
            setNewPromoCode(changePromoCode);
        } else {
            setNewPromoCode(initCreatePromoCode);
        }
    }, [changePromoCode]);

    useEffect(() => {
        if (changePromoCode) {
            setNewPromoCode(changePromoCode);
        } else {
            setNewPromoCode(initCreatePromoCode);
        }
    }, [changePromoCode]);

    const changeData = (controlName: keyof CreateOrUpdatePromoCodeType, value: string) => {
        setNewPromoCode(prev => ({...prev, [controlName]: value}));
    }

    const saveData = (evt: FormEvent) => {
        evt.preventDefault();
        if (changePromoCode) {
            dispatch(updatePromoCode(newPromoCode)).unwrap().then(() => hideModal());
        } else {
            dispatch(createPromoCode(newPromoCode));
        }
    }

    return (
        <Dialog header={changePromoCode ? 'Корректировка промо-кода' : 'Добавление промокода'}
                visible={isOpen}
                onHide={hideModal}
        >
            <form className={s.form}
                  onSubmit={saveData}>
                <div className={s.formFields}>
                    <InputWithLabel label="Промо-код"
                                    value={newPromoCode.code}
                                    onChange={(evt) => changeData("code", evt.target.value)}
                    />
                    <InputWithLabel label="Скидка"
                                    value={newPromoCode.discountPercent}
                                    onChange={(evt) => changeData("discountPercent", evt.target.value)}
                    />
                    <InputWithLabel label="Количество использований"
                                    value={newPromoCode.maxUses}
                                    onChange={(evt) => changeData("maxUses", evt.target.value)}
                    />
                    <InputWithLabel label="Действителен с"
                                    value={newPromoCode.validFrom}
                                    onChange={(evt) => changeData("validFrom", evt.target.value)}
                    />
                    <InputWithLabel label="Действителен по"
                                    value={newPromoCode.validTo}
                                    onChange={(evt) => changeData("validTo", evt.target.value)}
                    />
                    <InputWithLabel label="Активный"
                                    value={newPromoCode.isActive}
                                    onChange={(evt) => changeData("isActive", evt.target.value)}
                    />
                </div>
                <div className={s.formFooter}>
                    <Button label={changePromoCode ? 'Изменить' : 'Сохранить'}/>
                </div>
            </form>
        </Dialog>
    );
};
