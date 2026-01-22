import * as s from "./InputWithLabel.module.css";
import {InputProps, InputText} from "ui-kit-dynamics";
import {FC} from "react";

type InputWithLabelProps = {
    label: string
    controlName: string;
    value: string;
    changeData: <T>(controlName: T, value: string) => void
} & InputProps;

const InputWithLabel: FC<InputWithLabelProps> = ({
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
            <InputText {...props}
                       id={controlName}
                       value={value}
                       onChange={(evt) => changeData(controlName, evt.target.value)}
            />
        </div>
    );
};

export default InputWithLabel;