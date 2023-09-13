import { ErrorMessage, useField } from "formik";
import {
  FieldLabel,
  FieldWrapper,
  ScaleInfo,
  StyledField,
} from "./FormNumberField.styles";
import { FieldError } from "../../Atoms/FieldError/FieldError.styles.";

interface Props {
  name: string;
  label: string;
  scale: string;
  minValue?: number;
  maxValue?: number;
}
const FormNumberField = (props: Props) => {
  const { label, scale, minValue, maxValue, name } = props;
  const [field, meta] = useField(props);
  return (
    <FieldLabel>
      {label}
      <FieldWrapper $iserror={meta.error ? "error" : ""}>
        <StyledField
          {...field}
          name={name}
          type={"number"}
          iserror={meta.error ? "error" : ""}
          min={minValue || minValue === 0 ? minValue : ""}
          max={maxValue ? maxValue : ""}
        />
        <ScaleInfo>{scale}</ScaleInfo>
      </FieldWrapper>
      <ErrorMessage
        name={name}
        render={(msg) => <FieldError>{msg}</FieldError>}
      />
    </FieldLabel>
  );
};

export default FormNumberField;
