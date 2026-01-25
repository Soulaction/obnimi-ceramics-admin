import * as s from './UserCreateAnaUpdateModal.module.css';
import {FC, useEffect, useState, FormEvent} from 'react';
import {Dialog, InputText, Dropdown, Button} from 'ui-kit-dynamics';
import {CreateUserType, Roles, UserType} from "../../type/user.type";
import {useAppDispatch} from "../../../../app/store/hooks";
import {createUser} from "../../model/userThunk";
import InputWithLabel from "../../../../shared/ui/InputWithLabel/InputWithLabel";
import DropdownWithLabel from "../../../../shared/ui/DropdownWithLabel/DropdownWithLabel";

type UserCreateAnaUpdateModalProps = {
    isOpen: boolean;
    hideModal: () => void;
    updateUser: UserType | null
}

const listRole = [
    {
        value: Roles.user,
    },
    {
        value: Roles.admin,
    },
    {
        value: Roles.worker,
    }
];

const initCreateUser = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: Roles.user
};

export const UserCreateAnaUpdateModal: FC<UserCreateAnaUpdateModalProps> = ({isOpen, hideModal, updateUser}) => {

    const dispatch = useAppDispatch();
    const [newUser, setNewUser] = useState<CreateUserType>(initCreateUser);

    useEffect(() => {
        if (updateUser) {
            setNewUser(updateUser);
        } else {
            setNewUser(initCreateUser);
        }
    }, []);

    const changeData = (controlName: keyof CreateUserType, value: string) => {
        setNewUser(prev => ({...prev, [controlName]: value}));
    }

    const saveData = (evt: FormEvent) => {
        evt.preventDefault();
        if (updateUser) {

        } else {
            dispatch(createUser(newUser));
        }
    }


    return (
        <Dialog header="Добавление пользователя"
                visible={isOpen}
                onHide={hideModal}
        >
            <form className={s.form}
                  onSubmit={saveData}>
                <div className={s.formFields}>
                    <InputWithLabel label="Email"
                                    controlName="email"
                                    value={newUser.email}
                                    changeData={changeData}
                    />
                    <InputWithLabel label="Имя"
                                    controlName="firstName"
                                    value={newUser.firstName}
                                    changeData={changeData}
                    />
                    <InputWithLabel label="Имя"
                                    controlName="lastName"
                                    value={newUser.lastName}
                                    changeData={changeData}
                    />
                    <InputWithLabel label="Имя"
                                    controlName="phone"
                                    value={newUser.phone}
                                    changeData={changeData}
                    />
                    <DropdownWithLabel rowKey="value"
                                       controlName="role"
                                       label="Роль"
                                       itemLabel="value"
                                       itemValue="value"
                                       value={newUser.role}
                                       items={listRole}
                                       changeData={changeData}
                    />
                </div>
                <div className={s.formFooter}>
                    <Button label={updateUser ? 'Изменить' : 'Сохранить'}/>
                </div>
            </form>
        </Dialog>
    );
};
