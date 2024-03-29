import { FormikFormProps, useFormikContext } from "formik";
import { getErrorMessages } from "../../../Utils/Utils";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import InputField from "../../Molecules/InputField/InputField";
import { ActionButton, RedActionButton } from "../../Atoms/Buttons/Buttons";
import { DeleteAccountConfirmation } from "../../../Interfaces/DeleteAccountConfirmation";
import {
  DeleteFormInstruction,
  DeleteFormWrapper,
} from "../../Atoms/DeleteFormWrapper/DeleteFormWrapper.styles";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";

interface Props {
  error: unknown;
  isLoading: boolean;
  confirmed: boolean;
}

const DeleteAccountForm = (props: Props & FormikFormProps) => {
  const { error, isLoading, confirmed } = props;
  const { errors } = useFormikContext<DeleteAccountConfirmation>();

  return (
    <DeleteFormWrapper>
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}

      <InputField label="Nazwa konta" name="name" placeholder="Nazwa konta" />
      {!errors.name && confirmed && (
        <DeleteFormInstruction>
          Wpisz nazwę tego konta, aby móc je usunąć
        </DeleteFormInstruction>
      )}

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <RedActionButton disabled={confirmed} type="submit">
          Usuń
        </RedActionButton>
      )}
    </DeleteFormWrapper>
  );
};

export default DeleteAccountForm;
