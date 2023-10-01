import { FormError } from "../../Atoms/FormError/FormError";
import { FormRequestErrorWrapper } from "./FormRequestError.styles";
import error from "../../../Assets/Error.svg";

interface Props {
  errorValues: string[];
}
const FormRequestError = (props: Props) => {
  const { errorValues } = props;
  return (
    <FormRequestErrorWrapper>
      {errorValues.map((errorValue, index) => {
        return (
          <FormError key={index}>
            <img src={error} alt="Obraz błędu" />
            {errorValue}
          </FormError>
        );
      })}
    </FormRequestErrorWrapper>
  );
};

export default FormRequestError;
