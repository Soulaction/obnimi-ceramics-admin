import {FC, useEffect, useRef, useState} from 'react';
import {Table, ContextMenu, ContextMenuRef, MenuItem, ConfirmDialog, showConfirmDialog} from 'ui-kit-dynamics';
import {useAppDispatch, useAppSelector} from "../../../../app/store/hooks";
import {deleteUser, getAllUser} from "../../model/userThunk";
import {UserTableBtn} from "../UserTableBtn/UserTableBtn";
import {UserTableBtnType} from "../../type/userTable.type";
import {columnsUserTable} from "../../const/const";
import {UserCreateAnaUpdateModal} from "../UserCreateAnaUIpdateModal/UserCreateAnaUpdateModal";
import {UserType} from "../../type/user.type";


export const UserTable: FC = () => {
    const dispatch = useAppDispatch();
    const {users, isLoadingItems} = useAppSelector(state => state.user);

    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [isOpenCrateOrUpdateModal, setIsOpenCrateOrUpdateModal] = useState<boolean>(false);
    const contextMenuRef = useRef<ContextMenuRef | null>(null);


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


    const clickUserTableBtn = (typeBtn: UserTableBtnType) => {
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
            <Table column={columnsUserTable}
                   TemplateHeader={<UserTableBtn clickCallback={clickUserTableBtn}></UserTableBtn>}
                   rowKey={'id'}
                   value={users}
                   changeSelectedItem={setSelectedUser}
                   contextMenuRef={contextMenuRef}/>
            <ContextMenu items={menuItemUserTable} ref={contextMenuRef}/>
            <UserCreateAnaUpdateModal isOpen={isOpenCrateOrUpdateModal}
                                      hideModal={() => setIsOpenCrateOrUpdateModal(false)}
                                      changeUser={selectedUser}/>
            <ConfirmDialog/>
        </>
    );
};