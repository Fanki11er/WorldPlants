import { FormikFormProps, useFormikContext } from "formik";
import { getErrorMessages } from "../../../Utils/Utils";
import {
  DeleteAccountFormWrapper,
  DeleteAccountInstruction,
} from "./DeleteAccountForm.styles";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import InputField from "../../Molecules/InputField/InputField";
import { ActionButton } from "../../Atoms/Buttons/Buttons";
import { DeleteAccountConfirmation } from "../../../Interfaces/DeleteAccountConfirmation";

interface Props {
  error: unknown;
  isLoading: boolean;
  confirmed: boolean;
}

const DeleteAccountForm = (props: Props & FormikFormProps) => {
  const { error, isLoading, confirmed } = props;
  const { errors } = useFormikContext<DeleteAccountConfirmation>();
  console.log(errors);
  return (
    <DeleteAccountFormWrapper>
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}

      <InputField label="Nazwa konta" name="name" placeholder="Nazwa konta" />
      {!errors.name && confirmed && (
        <DeleteAccountInstruction>
          Wpisz nazwę tego konta, aby móc je usunąć
        </DeleteAccountInstruction>
      )}

      {isLoading ? (
        <div>Loading</div>
      ) : (
        <ActionButton disabled={confirmed} type="submit">
          Zapisz
        </ActionButton>
      )}
    </DeleteAccountFormWrapper>
  );
};

export default DeleteAccountForm;
