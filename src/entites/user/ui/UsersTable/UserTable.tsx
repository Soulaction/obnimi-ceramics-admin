import {FC, useEffect} from 'react';
import {Table} from 'ui-kit-dynamics';
import {useAppDispatch, useAppSelector} from "../../../../app/store/hooks";
import {getAllUser} from "../../model/userThunk";
import {UserTableBtn} from "../UserTableBtn/UserTableBtn";
import {UserTableBtnType} from "../../type/userTable.type";
import {columnsUserTable} from "../../const/const";

type UserTableBtnProps = {
    clickUserTableBtn: (userTableBtn: UserTableBtnType) => void;
}

export const UserTable: FC<UserTableBtnProps> = ({clickUserTableBtn}) => {
    const dispatch = useAppDispatch();
    const {users, isLoadingItems} = useAppSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllUser());
    }, []);

    return (
        <Table column={columnsUserTable}
               TemplateHeader={<UserTableBtn clickCallback={clickUserTableBtn}></UserTableBtn>}
               rowKey={'id'}
               value={users}/>
    );
};