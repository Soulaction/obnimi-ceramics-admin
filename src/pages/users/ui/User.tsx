import React, {useEffect} from 'react';
import {Table} from 'ui-kit-dynamics';
import {getAllUser} from "../../../entites/user/model/user-thunk";
import {useAppDispatch, useAppSelector} from "../../../app/store/hooks";
import {columnsUserTable} from "../const/const";

const User = () => {
    const dispatch = useAppDispatch();
    const {users, isLoadingItems} = useAppSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllUser());
    }, []);


    return (
        <section>
            <Table column={columnsUserTable}
                   rowKey={'id'}
                   value={users}/>
        </section>
    );
};

export default User;