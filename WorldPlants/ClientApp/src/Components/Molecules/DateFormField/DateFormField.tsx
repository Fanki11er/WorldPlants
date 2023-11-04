import {
  DateField,
  DateFormFieldLabel,
  DateFormFieldWrapper,
  IndicatorImage,
} from "./DateFormField.styles";
import calendarImage from "../../../Assets/Calendar.svg";
import { ErrorMessage } from "formik";
import { FieldError } from "../../Atoms/FieldError/FieldError.styles.";

interface Props {
  label: string;
  name: string;
  isError: string | undefined | boolean;
}
const DateFormField = (props: Props) => {
  const { label, name, isError } = props;
  return (
    <DateFormFieldWrapper>
      <DateFormFieldLabel>{label}</DateFormFieldLabel>
      <DateField type={"date"} name={name} $iserror={!!isError} />
      <ErrorMessage
        name={name}
        render={(msg) => <FieldError>{msg}</FieldError>}
      />
      <IndicatorImage src={calendarImage} alt={"Ikona kalendarza"} />
    </DateFormFieldWrapper>
  );
};

export default DateFormField;
