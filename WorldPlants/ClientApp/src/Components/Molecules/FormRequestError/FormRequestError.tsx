import { FormError } from "../../Atoms/FormError/FormError";
import { FormRequestErrorWrapper } from "./FormRequestError.styles";

interface Props {
  errorValues: string[];
}
const FormRequestError = (props: Props) => {
  const { errorValues } = props;
  return (
    <FormRequestErrorWrapper>
      {errorValues.map((errorValue, index) => {
        return <FormError key={index}>{errorValue}</FormError>;
      })}
    </FormRequestErrorWrapper>
  );
};

export default FormRequestError;
