import * as s from './NavigationItem.module.css';
import {FC, MouseEvent} from 'react';

type NavigationItemProps = {
    name: string;
    callback: () => void;
}

export const NavigationItem: FC<NavigationItemProps> = ({name, callback}) => {
    return (
        <li className={s.li}
            onClick={() => callback()}>
            {name}
        </li>
    );
};