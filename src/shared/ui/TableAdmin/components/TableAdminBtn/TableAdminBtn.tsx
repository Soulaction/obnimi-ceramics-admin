import * as s from './TableAdminBtn.module.css';
import {FC, SyntheticEvent} from 'react';
import {Button} from 'ui-kit-dynamics';
import {TableAdminBtnType} from "../../../../type/tableAdmin.type";

type UserTableBtnProps = {
    clickCallback: (userTableBtn: TableAdminBtnType, evt: SyntheticEvent) => void;
    btns: TableAdminBtnType[];
}

export const TableAdminBtn: FC<UserTableBtnProps> = ({clickCallback, btns}) => {
    return (
        <div className={s.header}>
            <h1 className={s.headerTitle}>Пользователи</h1>
            <div className={s.btnList}>
                {
                    btns.map((btn) => <Button key={btn}
                                              iconName={btn}
                                              onClick={(evt) => clickCallback(btn, evt)}>
                    </Button>)
                }
            </div>
        </div>
    );
};

