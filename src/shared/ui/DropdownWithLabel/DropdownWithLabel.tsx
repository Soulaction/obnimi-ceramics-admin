import * as s from "./DropdownWithLabel.module.css";
import {Dropdown, DropdownProps} from "ui-kit-dynamics";
import {FC} from "react";

type InputWithDropdownProps = {
    label: string
    controlName: string;
    value: string;
    changeData: <T>(controlName: T, value: string) => void
} & DropdownProps;

const DropdownWithLabel: FC<InputWithDropdownProps> = ({
                                                           label,
                                                           controlName,
                                                           value,
                                                           changeData,
                                                           ...props
                                                       }) => {
    return (
        <div className={s.labelInputBlock}>
            <label className={s.label}
                   htmlFor={controlName}>
                {label}
            </label>
            <Dropdown {...props}
                      selectItem={value}
                      selectedItem={(item) => changeData(controlName, item)}
            />
        </div>
    );
};

export default DropdownWithLabel;