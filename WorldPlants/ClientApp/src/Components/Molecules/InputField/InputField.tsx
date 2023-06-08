import { Input, InputFieldWrapper, InputLabel } from "./InputField.styles"

type InputProps = {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
};
const InputField = (props: InputProps) => {
    const {name, label, placeholder, type} = props;
    return (
        <InputFieldWrapper>
        <InputLabel>{label}</InputLabel>
        <Input
            name={name}
            placeholder={placeholder ? placeholder : ""}
            type={type ? type : "text"}
        />
        </InputFieldWrapper>
    )
}

export default InputField;