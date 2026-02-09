import {SyntheticEvent, useRef} from 'react';
import {ContextMenu, ContextMenuRef, MenuItem, Table} from 'ui-kit-dynamics';
import {Column} from "../../../../../ui-kit-dynamics/lib/components/Table/Table";
import {TableAdminBtn} from "./components/TableAdminBtn/TableAdminBtn";
import {TableAdminBtnType} from "../../type/tableAdmin.type";


type TableAdminProps<T> = {
    columns: Column[];
    items: T[];
    selectedItem: T;
    changeSelectedItem: (data: T) => void;
    isLoadingItems: boolean;
    menuItemsTable: MenuItem[];
    btns: TableAdminBtnType[];
    clickTableBtn: (userTableBtn: TableAdminBtnType, evt: SyntheticEvent) => void;
}

export const TableAdmin = <T, >({
                                        columns,
                                        items,
                                        selectedItem,
                                        changeSelectedItem,
                                        isLoadingItems,
                                        menuItemsTable,
                                        btns,
                                        clickTableBtn
                                    }: TableAdminProps<T>) => {
    const contextMenuRef = useRef<ContextMenuRef | null>(null);

    return (
        <>
            <Table column={columns}
                   TemplateHeader={<TableAdminBtn btns={btns} clickCallback={clickTableBtn}></TableAdminBtn>}
                   rowKey={'id'}
                   value={items}
                   selectedItem={selectedItem}
                   changeSelectedItem={changeSelectedItem}
                   contextMenuRef={contextMenuRef}/>
            <ContextMenu items={menuItemsTable} ref={contextMenuRef}/>
        </>
    );
};