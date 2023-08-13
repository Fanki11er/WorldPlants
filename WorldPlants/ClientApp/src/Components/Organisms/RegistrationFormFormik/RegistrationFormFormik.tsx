import { useMutation } from "react-query";
import { Formik, FormikHelpers } from "formik";
import axios from "../../../Api/axios";
import { apiEndpoints } from "../../../Api/endpoints";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { paths } from "../../../Router/paths";
import { RegistrationFormValues } from "../../../Interfaces/RegistrationFormValues";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import { yupRegistrationValidationShape } from "../../../Utils/Utils";

const RegistrationSchema = Yup.object().shape(yupRegistrationValidationShape);

const RegistrationFormFormik = () => {
  const { registerOwnerUser } = apiEndpoints;
  const { login } = paths;
  const navigate = useNavigate();

  const { error, isLoading, mutate } = useMutation({
    mutationFn: (values: RegistrationFormValues) => {
      return axios.post(registerOwnerUser, values);
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
            navigate(login);
          },
        });
        setSubmitting(false);
      }}
    >
      <RegistrationForm error={error} isLoading={isLoading} />
    </Formik>
  );
};

export default RegistrationFormFormik;
