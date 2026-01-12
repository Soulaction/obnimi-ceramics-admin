import React, {useEffect} from 'react';
import {Table} from 'ui-kit-dynamics';
import {columnsUserTable} from "../../const/const";
import {useAppDispatch, useAppSelector} from "../../../app/store/hooks";
import {getAllUser} from "../../../entites/user/model/user-thunk";

export const UserTable = () => {
    const dispatch = useAppDispatch();
    const {users, isLoadingItems} = useAppSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllUser());
    }, []);

    return (
        <Table column={columnsUserTable}
               title=""
               TemplateHeader={() => <>Ifgrf</>}
               rowKey={'id'}
               value={users}/>
    );
};