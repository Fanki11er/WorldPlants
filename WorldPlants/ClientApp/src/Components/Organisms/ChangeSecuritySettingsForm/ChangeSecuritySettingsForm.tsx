import { useMutation } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {
  getErrorMessages,
  yupSecuritySettingsValidationShape,
} from "../../../Utils/Utils";
import * as Yup from "yup";
import { SecuritySettingsDto } from "../../../Interfaces/SecuritySettingsDto";
import { Formik, FormikHelpers } from "formik";
import { ChangeSecuritySettingsFormWrapper } from "./ChangeSecuritySettingsForm.styles";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import InputField from "../../Molecules/InputField/InputField";

const SecuritySettingsSchema = Yup.object().shape(
  yupSecuritySettingsValidationShape
);

const ChangeSecuritySettingsForm = () => {
  const { securitySettings } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();

  const { error, isLoading, mutate, isSuccess } = useMutation({
    mutationFn: (values: SecuritySettingsDto) => {
      return axiosPrivate.post(securitySettings, values);
    },
  });
  return (
    <Formik
      initialValues={
        {
          password: "",
          newPassword: "",
          newRepeatedPassword: "",
        } as SecuritySettingsDto
      }
      validationSchema={SecuritySettingsSchema}
      onSubmit={(
        values,
        { setSubmitting, resetForm }: FormikHelpers<SecuritySettingsDto>
      ) => {
        mutate(values, {
          onSuccess: () => {
            resetForm();
          },
        });
        setSubmitting(false);
      }}
    >
      <ChangeSecuritySettingsFormWrapper>
        {error ? (
          <FormRequestError errorValues={getErrorMessages(error)} />
        ) : null}
        {isSuccess && <div>Success</div>}

        <InputField
          label="Hasło"
          name="password"
          placeholder="Hasło"
          type="password"
        />

        <InputField
          label="Nowe hasło"
          name="newPassword"
          placeholder="Nowe hasło"
          type="password"
        />

        <InputField
          label="Powtórz Nowe hasło"
          name="newRepeatedPassword"
          placeholder="Powtórz nowe hasło"
          type="password"
        />
        {isLoading ? <div>Loading</div> : <button type="submit">Zapisz</button>}
      </ChangeSecuritySettingsFormWrapper>
    </Formik>
  );
};

export default ChangeSecuritySettingsForm;
