import {FC, useEffect, useState} from 'react';
import {ConfirmDialog, MenuItem, showConfirmDialog} from 'ui-kit-dynamics';
import {useAppDispatch, useAppSelector} from "../../../../app/store/hooks";
import {deleteUser, getAllUser} from "../../model/userThunk";
import {UserCreateAnaUpdateModal} from "../UserCreateAnaUpdateModal/UserCreateAnaUpdateModal";
import {UserType} from "../../type/user.type";
import {TableAdmin} from "../../../../shared/ui/TableAdmin/TableAdmin";
import {TableAdminBtnType} from "../../../../shared/type/tableAdmin.type";
import {columnsUserTable} from "../../const/const";


export const UserTable: FC = () => {
    const dispatch = useAppDispatch();
    const {users, isLoadingItems} = useAppSelector(state => state.user);

    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [isOpenCrateOrUpdateModal, setIsOpenCrateOrUpdateModal] = useState<boolean>(false);

    const menuItemUserTable: MenuItem[] = [
        {
            label: 'Изменить запись',
            command: () => showCrateOrUpdateModal(selectedUser),
        },
        {
            label: 'Удалить запись',
            command: () => showConfirmDeleteUser()
        }];

    useEffect(() => {
        dispatch(getAllUser());
    }, []);


    const clickTableBtn = (typeBtn: TableAdminBtnType) => {
        if (typeBtn === 'plus') {
            showCrateOrUpdateModal(null);
        }
    }

    const showCrateOrUpdateModal = (user: UserType | null) => {
        setSelectedUser(user);
        setIsOpenCrateOrUpdateModal(true);
    }

    const showConfirmDeleteUser = () => {
        if (selectedUser) {
            showConfirmDialog({
                header: 'Внимание!',
                message: 'Вы уверены, что хотите удалить пользователя?',
                defaultFocus: 'reject',
                accept: () => {
                    dispatch(deleteUser(selectedUser.id))
                }
            });
        }
    }

    return (
        <>
            <TableAdmin<UserType | null> columns={columnsUserTable}
                                         items={users}
                                         selectedItem={selectedUser}
                                         changeSelectedItem={(data) => setSelectedUser(data)}
                                         isLoadingItems={isLoadingItems}
                                         menuItemsTable={menuItemUserTable}
                                         btns={['plus']}
                                         clickTableBtn={clickTableBtn}/>
            <UserCreateAnaUpdateModal isOpen={isOpenCrateOrUpdateModal}
                                      hideModal={() => setIsOpenCrateOrUpdateModal(false)}
                                      changeUser={selectedUser}/>
            <ConfirmDialog/>
        </>
    );
};