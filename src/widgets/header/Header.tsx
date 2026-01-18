import React, {MouseEvent, useRef} from 'react';
import {Icon, OverlayPanel, OverlayRefType} from 'ui-kit-dynamics';
import Navigation from "../navigation/ui/Navigation/Navigation";

export const Header = () => {
    const menuRef = useRef<OverlayRefType>(null);

    const toggleMenu = (event: MouseEvent<HTMLElement>) => {
        if (menuRef.current) {
            menuRef.current.toggle(event);
        }
    }

    const hideMenu = () => {
        if (menuRef.current) {
            menuRef.current.hide();
        }
    }

    return (
        <header>
            <button onClick={toggleMenu}>
                <Icon name="menuBar"/>
            </button>

            <OverlayPanel ref={menuRef}>
                <Navigation hideMenu={hideMenu}/>
            </OverlayPanel>
        </header>
    );
};
