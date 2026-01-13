import React, {FC, useEffect} from 'react';
import {Table} from 'ui-kit-dynamics';
import {columnsUserTable} from "../../../../features/const/const";
import {useAppDispatch, useAppSelector} from "../../../../app/store/hooks";
import {getAllUser} from "../../model/user-thunk";
import {UserTableBtn} from "../UserTableBtn/UserTableBtn";
import {UserTableBtnType} from "../../type/userTable.type";

type UserTableBtnProps = {
    clickCallback: (userTableBtn: UserTableBtnType) => void;
}

export const UserTable: FC<UserTableBtnProps> = ({clickCallback}) => {
    const dispatch = useAppDispatch();
    const {users, isLoadingItems} = useAppSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllUser());
    }, []);

    return (
        <Table column={columnsUserTable}
               title=""
               TemplateHeader={<UserTableBtn clickCallback={clickCallback}></UserTableBtn>}
               rowKey={'id'}
               value={users}/>
    );
};