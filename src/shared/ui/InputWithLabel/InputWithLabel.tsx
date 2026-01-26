import * as s from "./InputWithLabel.module.css";
import {InputProps, InputText} from "ui-kit-dynamics";
import {FC} from "react";

type InputWithLabelProps = {
    label: string
} & InputProps;

const InputWithLabel: FC<InputWithLabelProps> = ({
                                                     label,
                                                     ...props
                                                 }) => {
    console.log(props.value);
    return (
        <div className={s.labelInputBlock}>
            <label className={s.label}
                   htmlFor={label}>
                {label}
            </label>
            <InputText {...props}
                       id={label}
            />
        </div>
    );
};

export default InputWithLabel;