import { Formik, FormikErrors } from "formik";
import { AddEditCustomActionFormWrapper } from "./AddEditCustomActionForm.styles";
import { CustomActionTypeInformation } from "../../../Interfaces/CustomActionTypeInformation";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import useQueryKey from "../../../Hooks/useQueryKey";
import { useMutation, useQueryClient } from "react-query";
import FormRequestError from "../FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import InputField from "../InputField/InputField";
import { FormSuccess } from "../../Atoms/FormSuccess/FormSuccess";
import { ActionButton } from "../../Atoms/Buttons/Buttons";
interface Props {
  currentTaskInformation: CustomActionTypeInformation | undefined;
  submitEndpoint: string;
}

interface FormValues {
  description: string;
}

const AddEditCustomActionForm = (props: Props) => {
  const { currentTaskInformation, submitEndpoint } = props;
  const { customActionTypesQueryKey } = useQueryKey();
  const axiosPrivate = useAxiosPrivate();
  const client = useQueryClient();
  const { mutate, error, isLoading, isSuccess } = useMutation({
    mutationFn: (values: FormValues) => {
      return axiosPrivate.post(submitEndpoint, values);
    },
  });
  return (
    <Formik
      initialValues={{
        description: currentTaskInformation
          ? currentTaskInformation.description
          : "",
      }}
      onSubmit={(values: FormValues) => {
        mutate(values, {
          onSuccess: () => {
            client.invalidateQueries(customActionTypesQueryKey());
          },
        });
      }}
      validate={(values) => {
        const errors = {} as FormikErrors<FormValues>;

        if (values.description.length < 3) {
          errors.description = "Minimalna długość to 3 znaki";
        }

        if (
          currentTaskInformation &&
          currentTaskInformation.description === values.description
        ) {
          errors.description = "Nie zmieniono wartości";
        }

        return errors;
      }}
    >
      <AddEditCustomActionFormWrapper>
        <InputField
          name={"description"}
          placeholder={"Typ akcji"}
          label={"Typ akcji"}
        />
        <ActionButton type="submit">Zapisz</ActionButton>
        {isLoading && <LoadingIndicator />}
        {isSuccess && <FormSuccess>Zapisano</FormSuccess>}
        {error ? (
          <FormRequestError errorValues={getErrorMessages(error)} />
        ) : null}
      </AddEditCustomActionFormWrapper>
    </Formik>
  );
};

export default AddEditCustomActionForm;
