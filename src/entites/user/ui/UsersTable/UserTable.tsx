import {FC, useEffect, useRef, useState} from 'react';
import {Table, ContextMenu, ContextMenuRef, MenuItem} from 'ui-kit-dynamics';
import {useAppDispatch, useAppSelector} from "../../../../app/store/hooks";
import {getAllUser} from "../../model/userThunk";
import {UserTableBtn} from "../UserTableBtn/UserTableBtn";
import {UserTableBtnType} from "../../type/userTable.type";
import {columnsUserTable} from "../../const/const";
import {UserCreateAnaUpdateModal} from "../UserCreateAnaUIpdateModal/UserCreateAnaUpdateModal";
import {UserType} from "../../type/user.type";


export const UserTable: FC = () => {
    const dispatch = useAppDispatch();
    const {users, isLoadingItems} = useAppSelector(state => state.user);

    const [updateUser, setUpdateUser] = useState<UserType | null>(null);
    const [isOpenCrateOrUpdateModal, setIsOpenCrateOrUpdateModal] = useState<boolean>(false);
    const contextMenuRef = useRef<ContextMenuRef | null>(null);


    const menuItemUserTable: MenuItem[] = [
        {
            label: 'Изменить запись',
            command: () => setIsOpenCrateOrUpdateModal(true),
        },
        {
            label: 'Удалить запись',
            command: () => setIsOpenCrateOrUpdateModal(true),
        }];

    useEffect(() => {
        dispatch(getAllUser());
    }, []);


    const clickUserTableBtn = (typeBtn: UserTableBtnType) => {
        if (typeBtn === 'plus') {
            setUpdateUser(null);
            setIsOpenCrateOrUpdateModal(true);
        }
    }

    return (
        <>
            <Table column={columnsUserTable}
                   TemplateHeader={<UserTableBtn clickCallback={clickUserTableBtn}></UserTableBtn>}
                   rowKey={'id'}
                   value={users}
                   changeSelectedItem={setUpdateUser}/>
            <ContextMenu items={menuItemUserTable}/>
            <UserCreateAnaUpdateModal isOpen={isOpenCrateOrUpdateModal}
                                      hideModal={() => setIsOpenCrateOrUpdateModal(false)}
                                      updateUser={updateUser}/>

        </>
    );
};