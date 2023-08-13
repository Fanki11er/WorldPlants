import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { yupRegistrationValidationShape } from "../../../Utils/Utils";
import { apiEndpoints } from "../../../Api/endpoints";
import { paths } from "../../../Router/paths";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { RegistrationFormValues } from "../../../Interfaces/RegistrationFormValues";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import RegistrationForm from "../RegistrationForm/RegistrationForm";

const RegistrationSchema = Yup.object().shape(yupRegistrationValidationShape);

const GuestRegistrationFormFormik = () => {
  const { registerGuestAccount } = apiEndpoints;
  const { userSettingsGuestAccounts, authorized, userSettings } = paths;
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { error, isLoading, mutate } = useMutation({
    mutationFn: (values: RegistrationFormValues) => {
      return axiosPrivate.post(registerGuestAccount, values);
    },
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        repeatedPassword: "",
      }}
      validationSchema={RegistrationSchema}
      onSubmit={(
        values: RegistrationFormValues,
        { setSubmitting, resetForm }: FormikHelpers<RegistrationFormValues>
      ) => {
        mutate(values, {
          onSuccess: () => {
            resetForm();
            navigate(
              `${authorized}/${userSettings}/${userSettingsGuestAccounts}`
            );
          },
        });
        setSubmitting(false);
      }}
    >
      <RegistrationForm error={error} isLoading={isLoading} />
    </Formik>
  );
};

export default GuestRegistrationFormFormik;

//!! Turn off login when user is not Active
