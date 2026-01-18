import * as s from './Navigation.module.css';
import React, {FC, MouseEvent} from 'react';
import {navigationList} from "../../const";
import {NavigationItem} from "../NavigationItem/NavigationItem";
import {RouteApplicationType} from "../../../../shared/type/route";
import {useNavigate} from "react-router-dom";

type NavigationProps = {
    hideMenu: () => void;
}

const Navigation: FC<NavigationProps> = ({hideMenu}) => {
    const navigate = useNavigate();

    const clickMenuItem = (link: RouteApplicationType) => {
        navigate(link);
        hideMenu();
    }

    return (
        <nav>
            <ul className={s.navList}>
                {navigationList.map((item, index) =>
                    (<NavigationItem key={index} name={item.name} callback={() => clickMenuItem(item.route)}/>))
                }
            </ul>
        </nav>
    );
};

export default Navigation;