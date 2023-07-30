import { Input, InputFieldWrapper, InputLabel, Required } from "./InputField.styles"

type InputProps = {
    name: string;
    label: string;
    required?: boolean;
    placeholder?: string;
    type?: string;
};
const InputField = (props: InputProps) => {
    const {name, label, placeholder, type, required} = props;
    return (
        <InputFieldWrapper>
        <InputLabel>{label}
           {required && <Required>*</Required>}
        </InputLabel>
        <Input
            name={name}
            placeholder={placeholder ? placeholder : ""}
            type={type ? type : "text"}
        />
        </InputFieldWrapper>
    )
}

export default InputField;