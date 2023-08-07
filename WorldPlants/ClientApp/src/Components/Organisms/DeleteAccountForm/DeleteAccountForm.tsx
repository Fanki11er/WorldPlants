import { FormikFormProps } from "formik";
import { getErrorMessages } from "../../../Utils/Utils";
import { DeleteAccountFormWrapper } from "./DeleteAccountForm.styles";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import InputField from "../../Molecules/InputField/InputField";

interface Props {
  error: unknown;
  isLoading: boolean;
  confirmed: boolean;
}

const DeleteAccountForm = (props: Props & FormikFormProps) => {
  const { error, isLoading, confirmed } = props;

  return (
    <DeleteAccountFormWrapper>
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}

      <InputField label="Nazwa konta" name="name" placeholder="Nazwa konta" />
      <span>Wpisz nazwę tego konta aby móc je usunąć </span>

      {isLoading ? (
        <div>Loading</div>
      ) : (
        <button disabled={confirmed} type="submit">
          Submit
        </button>
      )}
    </DeleteAccountFormWrapper>
  );
};

export default DeleteAccountForm;
