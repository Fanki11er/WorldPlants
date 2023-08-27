import { useField } from "formik";
import {
  TextareaFieldInput,
  TextareaFieldWrapper,
} from "./TextareaField.styles";
interface Props {
  label: string;
  name: string;
  placeholder: string;
  rows?: number;
}

const TextareaField = (props: Props) => {
  const { label, name, placeholder, rows } = props;
  const [field] = useField(name);

  return (
    <TextareaFieldWrapper>
      {label}
      <TextareaFieldInput
        rows={rows ? rows : 5}
        placeholder={placeholder}
        as={"textarea"}
        {...field}
      />
    </TextareaFieldWrapper>
  );
};

export default TextareaField;
