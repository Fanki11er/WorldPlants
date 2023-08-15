import { useField } from "formik";
import {
  FieldLabel,
  FieldWrapper,
  FormNumberFieldWrapper,
  ScaleInfo,
  StyledField,
} from "./FormNumberField.styles";

interface Props {
  name: string;
  label: string;
  scale: string;
}
const FormNumberField = (props: Props) => {
  const { label, scale } = props;
  const [field, meta] = useField(props);
  return (
    <FormNumberFieldWrapper>
      <FieldLabel>{label}</FieldLabel>
      <FieldWrapper>
        <StyledField
          {...field}
          {...props}
          type={"number"}
          iserror={meta.error ? "error" : ""}
        />
        <ScaleInfo>{scale}</ScaleInfo>
      </FieldWrapper>
    </FormNumberFieldWrapper>
  );
};

export default FormNumberField;
