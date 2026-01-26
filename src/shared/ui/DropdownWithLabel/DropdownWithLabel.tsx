import * as s from "./DropdownWithLabel.module.css";
import {Dropdown, DropdownProps} from "ui-kit-dynamics";
import {FC} from "react";

type InputWithDropdownProps = {
    label: string;
} & DropdownProps;

const DropdownWithLabel: FC<InputWithDropdownProps> = ({
                                                           label,
                                                           ...props
                                                       }) => {
    return (
        <div className={s.labelInputBlock}>
            <label className={s.label}
                   htmlFor={label}>
                {label}
            </label>
            <Dropdown {...props}
            />
        </div>
    );
};

export default DropdownWithLabel;