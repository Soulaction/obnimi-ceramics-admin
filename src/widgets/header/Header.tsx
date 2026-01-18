import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import {Icon, OverlayPanel, OverlayRefType} from 'ui-kit-dynamics';

export const Header = () => {
    const menuRef = useRef<OverlayRefType>(null);
    const [t, sett] = useState(false);

    const showMenu = (event: MouseEvent<HTMLButtonElement>) => {
        if (menuRef.current) {
            menuRef.current.toggle(event);
        }
    }


    return (
        <header style={{opacity: t ? 0 : 1}}>
            <button onClick={showMenu}>
                <Icon name="menuBar"/>
            </button>

            <OverlayPanel ref={menuRef}>
                какой-то контент
            </OverlayPanel>
        </header>
    );
};
