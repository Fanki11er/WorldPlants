import { AuthFormHeader } from "../../Atoms/AuthFormHeader/AuthFormHeader";
import {
  AuthFormWrapper,
  ImgAuth,
} from "../../Atoms/AuthFormWrapper/AuthFormWrapper";
import { ActionButton } from "../../Atoms/Buttons/Buttons";
import InputField from "../../Molecules/InputField/InputField";
import ImgAuthSunFlower from "../../../Assets/SunFlower.svg";
import { FormInputsWrapper } from "../../Atoms/FormInputsWrapper/FormInputsWrapper";
import * as Yup from "yup";
import { apiEndpoints } from "../../../Api/endpoints";
import { paths } from "../../../Router/paths";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "../../../Api/axios";
import { Formik, FormikHelpers } from "formik";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";

interface Values {
  name: string;
  email: string;
  phone: string;
  password: string;
  repeatedPassword: string;
}

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Imię musi zawierać minimum 2 znaki")
    .max(30, "Imię może mieć maksymalnie 30 znaków ")
    .required("Imię jest wymagane"),
  password: Yup.string()
    .min(8, "Hasło musi się składać z minimum 8 znaków")
    .required("Hasło jest wymagane"),
  repeatedPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Hasła muszą być takie same")
    .required("Hasło jest wymagane"),
  email: Yup.string()
    .email("Nie prawidłowy format adresu email")
    .required("Email jest wymagany"),
  phone: Yup.string().matches(
    /^\d{9}$/,
    "Nie prawidłowy format numeru telefonu"
  ),
});

const RegistrationForm = () => {
  const { registerOwnerUser } = apiEndpoints;
  const { login } = paths;
  const navigate = useNavigate();

  const registrationMutation = useMutation({
    mutationFn: (values: Values) => {
      return axios.post(registerOwnerUser, values);
    },
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        password: "",
        repeatedPassword: "",
      }}
      validationSchema={RegistrationSchema}
      onSubmit={(
        values: Values,
        { setSubmitting, resetForm }: FormikHelpers<Values>
      ) => {
        registrationMutation.mutate(values, {
          onSuccess: () => {
            resetForm();
            navigate(login);
          },
        });
        setSubmitting(false);
      }}
    >
      <AuthFormWrapper noValidate={true}>
        <ImgAuth src={ImgAuthSunFlower} alt="ImgAuthSunFlowers" />
        <AuthFormHeader>Rejestracja</AuthFormHeader>
        {registrationMutation.isError && (
          <FormRequestError
            errorValues={getErrorMessages(registrationMutation.error)}
          />
        )}
        <FormInputsWrapper>
          <InputField
            name="name"
            placeholder="Imię"
            label="Imię"
            required={true}
          />
          <InputField
            name="email"
            placeholder="Email"
            label="Email"
            type="email"
            required={true}
          />
          <InputField
            name="phone"
            placeholder="Numer telefonu"
            label="Numer telefonu"
          />
          <InputField
            name="password"
            placeholder="Hasło"
            label="Hasło"
            type="password"
            required={true}
          />
          <InputField
            name="repeatedPassword"
            placeholder="Powtórz hasło"
            label="Powtórz hasło"
            type="password"
            required={true}
          />
        </FormInputsWrapper>

        {registrationMutation.isLoading ? (
          <div>Loading</div>
        ) : (
          <ActionButton type="submit">Zarejestruj</ActionButton>
        )}
      </AuthFormWrapper>
    </Formik>
  );
};

export default RegistrationForm;
