import React, {FC} from 'react';
import {Button} from 'ui-kit-dynamics';
import {UserTableBtnType} from '../../type/userTable.type';

type UserTableBtnProps = {
    clickCallback: (userTableBtn: UserTableBtnType) => void;
}

export const UserTableBtn: FC<UserTableBtnProps> = ({clickCallback}) => {
    const btns: UserTableBtnType[] = ['plus'];

    return (
        <div>
            {
                btns.map(btn => <Button iconName={btn}
                                        onClick={() => clickCallback(btn)}>
                </Button>)
            }
        </div>
    );
};

