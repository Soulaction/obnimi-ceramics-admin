import React, {useState} from 'react';
import {UserTable} from "../../../../entites/user/ui/UsersTable/UserTable";
import {UserTableBtnType} from "../../../../entites/user/type/userTable.type";
import {Dialog} from "ui-kit-dynamics";

export const UserManagementPanel = () => {

    const [isOpenCrateModal, setIsOpenCrateModal] = useState<boolean>(false);

    const openModal = (typeModal: UserTableBtnType) => {
        if (typeModal === 'plus') {
            setIsOpenCrateModal(true);
        }
    }

    const hidePlusModal = () => {
        setIsOpenCrateModal(false);
    }

    return (
        <>
            <UserTable clickUserTableBtn={openModal}/>
            <Dialog header="Добавление пользователя"
                    visible={isOpenCrateModal}
                    onHide={hidePlusModal}
            />
        </>
    );
};