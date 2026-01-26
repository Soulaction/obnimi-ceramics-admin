import * as s from './UserCreateAnaUpdateModal.module.css';
import {FC, FormEvent, useEffect, useState} from 'react';
import {Button, Dialog} from 'ui-kit-dynamics';
import {CreateOrUpdateUserType, Roles, UserType} from "../../type/user.type";
import {useAppDispatch} from "../../../../app/store/hooks";
import {createUser, updateUser} from "../../model/userThunk";
import InputWithLabel from "../../../../shared/ui/InputWithLabel/InputWithLabel";
import DropdownWithLabel from "../../../../shared/ui/DropdownWithLabel/DropdownWithLabel";

type UserCreateAnaUpdateModalProps = {
    isOpen: boolean;
    hideModal: () => void;
    changeUser: UserType | null
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
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: Roles.user
};

export const UserCreateAnaUpdateModal: FC<UserCreateAnaUpdateModalProps> = ({isOpen, hideModal, changeUser}) => {

    const dispatch = useAppDispatch();
    const [newUser, setNewUser] = useState<CreateOrUpdateUserType>(initCreateUser);

    useEffect(() => {
        if (changeUser) {
            setNewUser(changeUser);
        } else {
            setNewUser(initCreateUser);
        }
    }, [changeUser]);

    const changeData = (controlName: keyof CreateOrUpdateUserType, value: string) => {
        setNewUser(prev => ({...prev, [controlName]: value}));
    }

    const saveData = (evt: FormEvent) => {
        evt.preventDefault();
        if (changeUser) {
            dispatch(updateUser(newUser)).unwrap().then(() => hideModal());
        } else {
            dispatch(createUser(newUser));
        }
    }

    console.log(changeUser);
    return (
        <Dialog header={changeUser ? 'Корректировка пользователя' : 'Добавление пользователя'}
                visible={isOpen}
                onHide={hideModal}
        >
            <form className={s.form}
                  onSubmit={saveData}>
                <div className={s.formFields}>
                    <InputWithLabel label="Email"
                                    value={newUser.email}
                                    onChange={(evt) => changeData("email", evt.target.value)}
                    />
                    <InputWithLabel label="Имя"
                                    value={newUser.firstName}
                                    onChange={(evt) => changeData("firstName", evt.target.value)}
                    />
                    <InputWithLabel label="Фамилия"
                                    value={newUser.lastName}
                                    onChange={(evt) => changeData("lastName", evt.target.value)}
                    />
                    <InputWithLabel label="Телефон"
                                    value={newUser.phone}
                                    onChange={(evt) => changeData("phone", evt.target.value)}
                    />
                    <DropdownWithLabel rowKey="value"
                                       label="Роль"
                                       itemLabel="value"
                                       itemValue="value"
                                       selectItem={newUser.role}
                                       items={listRole}
                                       selectedItem={changeData.bind(null, "role")}/>
                </div>
                <div className={s.formFooter}>
                    <Button label={changeUser ? 'Изменить' : 'Сохранить'}/>
                </div>
            </form>
        </Dialog>
    );
};
