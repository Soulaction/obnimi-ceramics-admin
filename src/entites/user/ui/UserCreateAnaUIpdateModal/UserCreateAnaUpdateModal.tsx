import * as s from './UserCreateAnaUpdateModal.module.css';
import {FC, useEffect, useState} from 'react';
import {Dialog, InputText, Dropdown, Button} from 'ui-kit-dynamics';
import {CreateUserType, Roles, UserType} from "../../type/user.type";
import {useAppDispatch} from "../../../../app/store/hooks";
import {createUser} from "../../model/userThunk";

type UserCreateAnaUpdateModalProps = {
    isOpen: boolean;
    hideModal: () => void;
    updateUser?: UserType
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

    const saveData = () => {
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
            <form className={s.form}>
                <div className={s.formFields}>
                    <InputText value={newUser.email}
                               onChange={(evt) => changeData('email', evt.target.value)}
                    />
                    <InputText value={newUser.firstName}
                               onChange={(evt) => changeData('firstName', evt.target.value)}
                    />
                    <InputText value={newUser.lastName}
                               onChange={(evt) => changeData('lastName', evt.target.value)}
                    />
                    <InputText value={newUser.phone}
                               onChange={(evt) => changeData('phone', evt.target.value)}
                    />
                    <Dropdown rowKey="value"
                              label="value"
                              items={listRole}
                              selectItem={newUser.role}
                              selectedItem={(item) => changeData('role', item)}
                    />
                </div>
                <div className={s.formFooter}>
                    <Button label={updateUser ? 'Изменить' : 'Сохранить'}
                            onClick={saveData}/>
                </div>
            </form>
        </Dialog>
    );
};
