import { useField, ErrorMessage } from "formik";
import {
  Input,
  InputFieldWrapper,
  InputLabel,
  Required,
} from "./InputField.styles";
import { FieldError } from "../../Atoms/FieldError/FieldError.styles.";

type InputProps = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
};
const InputField = (props: InputProps) => {
  const { label, required, name } = props;
  const [field, meta] = useField(props);
  return (
    <InputFieldWrapper>
      <InputLabel>
        {label}
        {required && <Required>*</Required>}
      </InputLabel>
      <Input
        {...field}
        {...props}
        iserror={meta.error && meta.touched ? "error" : ""}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <FieldError>{msg}</FieldError>}
      />
    </InputFieldWrapper>
  );
};

export default InputField;
