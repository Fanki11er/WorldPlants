import { Formik, FormikHelpers } from "formik";
import { ChangeAccountSettingsFormWrapper } from "./ChangeAccountSettingsForm.styles";
import { AccountSettingsDto } from "../../../Interfaces/AccountSettingsDto";
import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import {
  getErrorMessages,
  yupAccountSettingsValidationShape,
} from "../../../Utils/Utils";
import { apiEndpoints } from "../../../Api/endpoints";
import { ACCOUNT_SETTINGS } from "../../../Constants/Constants";
import * as Yup from "yup";
import InputField from "../../Molecules/InputField/InputField";
import { ActionButton } from "../../Atoms/Buttons/Buttons";
import { FormSuccess } from "../../Atoms/FormSuccess/FormSuccess";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";

interface Props {
  actualValues: AccountSettingsDto;
}

const AccountSettingsSchema = Yup.object().shape(
  yupAccountSettingsValidationShape
);

const ChangeAccountSettingsForm = (props: Props) => {
  const { accountSettings } = apiEndpoints;
  const { actualValues } = props;
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { error, isLoading, mutate, isSuccess } = useMutation({
    mutationFn: (values: AccountSettingsDto) => {
      return axiosPrivate.post(accountSettings, values);
    },
  });
  return (
    <Formik
      initialValues={
        {
          name: actualValues.name,
          email: actualValues.email,
          phoneNumber: actualValues.phoneNumber ? actualValues.phoneNumber : "",
        } as AccountSettingsDto
      }
      validationSchema={AccountSettingsSchema}
      onSubmit={(
        values,
        { setSubmitting }: FormikHelpers<AccountSettingsDto>
      ) => {
        if (
          values.email !== actualValues.email ||
          values.name !== actualValues.name ||
          values.phoneNumber !== actualValues.phoneNumber
        ) {
          mutate(values, {
            onSuccess: () => {
              queryClient.invalidateQueries(ACCOUNT_SETTINGS);
            },
          });
        }

        setSubmitting(false);
      }}
    >
      <ChangeAccountSettingsFormWrapper>
        {error ? (
          <FormRequestError errorValues={getErrorMessages(error)} />
        ) : null}
        {isSuccess && <FormSuccess>Sukces</FormSuccess>}

        <InputField label="Imię" name="name" placeholder="John" />

        <InputField
          label="Email"
          name="email"
          placeholder="john@acme.com"
          type="email"
        />

        <InputField
          label="Numer telefonu"
          name="phoneNumber"
          placeholder="999999999"
          type="phone"
        />

        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <ActionButton type="submit">Zapisz</ActionButton>
        )}
      </ChangeAccountSettingsFormWrapper>
    </Formik>
  );
};

export default ChangeAccountSettingsForm;
