import React, {useState} from 'react';
import {UserTable} from "../../../../entites/user/ui/UsersTable/UserTable";
import {UserTableBtnType} from "../../../../entites/user/type/userTable.type";
import {Dialog} from "ui-kit-dynamics";
import {UserCreateAnaUpdateModal} from "../../../../entites/user/ui/UserCreateAnaUIpdateModal/UserCreateAnaUpdateModal";

export const UserManagementPanel = () => {

    const [isOpenCrateOrUpdateModal, setIsOpenCrateOrUpdateModal] = useState<boolean>(false);

    const openModal = (typeModal: UserTableBtnType) => {
        if (typeModal === 'plus') {
            setIsOpenCrateOrUpdateModal(true);
        }
    }

    const hidePlusModal = () => {
        setIsOpenCrateOrUpdateModal(false);
    }

    return (
        <>
            <UserTable clickUserTableBtn={openModal}/>
            <UserCreateAnaUpdateModal isOpen={isOpenCrateOrUpdateModal}
                                      hideModal={hidePlusModal}/>
        </>
    );
};