import { useLocation, useNavigate } from "react-router-dom";
import { AuthFormHeader } from "../../Atoms/AuthFormHeader/AuthFormHeader.styles";
import {
  AuthFormWrapper,
  ImgAuth,
} from "../../Atoms/AuthFormWrapper/AuthFormWrapper";
import { ActionButton } from "../../Atoms/Buttons/Buttons";
import InputField from "../../Molecules/InputField/InputField";
import ImgAuthSunFlower from "../../../Assets/SunFlower.svg";
import { FormInputsWrapper } from "../../Atoms/FormInputsWrapper/FormInputsWrapper";
import { apiEndpoints } from "../../../Api/endpoints";
import { paths } from "../../../Router/paths";
import useAuth from "../../../Hooks/useAuth";
import { useMutation } from "react-query";
import { LoginDataDto } from "../../../Interfaces/LoginDataDto";
import axios from "../../../Api/axios";
import { Formik, FormikHelpers } from "formik";
import { AuthenticatedUser } from "../../../Interfaces/AuthenticatedUser";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";

interface Values {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { loginUser } = apiEndpoints;
  const { plantsTasks } = paths;
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || plantsTasks;

  const loginMutation = useMutation({
    mutationFn: (values: LoginDataDto) => {
      return axios.post(loginUser, values);
    },
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(
        values: Values,
        { setSubmitting, resetForm }: FormikHelpers<Values>
      ) => {
        const loginDto: LoginDataDto = {
          Email: values.email,
          Password: values.password,
        };
        loginMutation.mutate(loginDto, {
          onSuccess: (response) => {
            const user: AuthenticatedUser = response.data;
            login(user);
            resetForm();
            navigate(from, { replace: true });
          },
        });
        setSubmitting(false);
      }}
    >
      <AuthFormWrapper>
        <ImgAuth src={ImgAuthSunFlower} alt="ImgAuthSunFlowers" />
        <AuthFormHeader>Logowanie</AuthFormHeader>
        {loginMutation.isError && (
          <FormRequestError
            errorValues={getErrorMessages(loginMutation.error)}
          />
        )}

        <FormInputsWrapper>
          <InputField
            name="email"
            placeholder="Email"
            label="Email"
            type="email"
          />
          <InputField
            name="password"
            placeholder="Hasło"
            label="Hasło"
            type="password"
          />
        </FormInputsWrapper>

        {loginMutation.isLoading ? (
          <div>Loading</div>
        ) : (
          <ActionButton type="submit">Zaloguj</ActionButton>
        )}
      </AuthFormWrapper>
    </Formik>
  );
};

export default LoginForm;
