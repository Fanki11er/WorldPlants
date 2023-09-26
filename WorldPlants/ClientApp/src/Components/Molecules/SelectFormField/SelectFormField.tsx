import { ErrorMessage, useField } from "formik";
import {
  Option,
  SelectField,
  SelectFormFieldWrapper,
} from "./SelectFormField.styles";
import { FieldError } from "../../Atoms/FieldError/FieldError.styles.";
import { SelectFieldOptions } from "../../../Interfaces/SelectFieldOption";

interface Props<T> {
  name: string;
  label: string;
  values: SelectFieldOptions<T>[];
  placeholder: string;
  isError: string | undefined | boolean;
}
const SelectFormField = <T extends React.Key>(props: Props<T>) => {
  const { name, values, placeholder, label, isError } = props;
  const [field] = useField(name);

  return (
    <SelectFormFieldWrapper>
      {label}
      <SelectField {...field} $iserror={!!isError}>
        <Option hidden>{placeholder}</Option>
        {values.map((val) => {
          return (
            <Option
              key={val.value}
              value={val.value}
              hidden={val.value === field.value}
            >
              {val.label}
            </Option>
          );
        })}
      </SelectField>
      <ErrorMessage
        name={name}
        render={(msg) => <FieldError>{msg}</FieldError>}
      />
    </SelectFormFieldWrapper>
  );
};

export default SelectFormField;
