import * as s from './UserTable.module.css';
import {FC} from 'react';
import {Button} from 'ui-kit-dynamics';
import {UserTableBtnType} from '../../type/userTable.type';

type UserTableBtnProps = {
    clickCallback: (userTableBtn: UserTableBtnType) => void;
}

export const UserTableBtn: FC<UserTableBtnProps> = ({clickCallback}) => {
    const btns: UserTableBtnType[] = ['plus'];

    return (
        <div className={s.header}>
            <h1 className={s.headerTitle}>Пользователи</h1>
            <div className={s.btnList}>
                {
                    btns.map((btn) => <Button key={btn}
                                              iconName={btn}
                                              onClick={() => clickCallback(btn)}>
                    </Button>)
                }
            </div>
        </div>
    );
};

