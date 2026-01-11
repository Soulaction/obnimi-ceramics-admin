import React, {useEffect} from 'react';
import {Table} from 'ui-kit-dynamics';
import {getAllUser} from "../../../entites/user/model/user-thunk";
import {useAppDispatch, useAppSelector} from "../../../app/store/hooks";
import {columnsUserTable} from "../const/const";

const UserPage = () => {
    const dispatch = useAppDispatch();
    const {users, isLoadingItems} = useAppSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllUser());
    }, []);


    return (
        <section>

            <Table column={columnsUserTable}
                   title=""
templateHeader={() => <>Ifgrf</>}
                   rowKey={'id'}
                   value={users}/>
        </section>
    );
};

export default UserPage;