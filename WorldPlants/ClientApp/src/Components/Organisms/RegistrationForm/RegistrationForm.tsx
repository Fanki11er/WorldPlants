import { AuthFormHeader } from "../../Atoms/AuthFormHeader/AuthFormHeader.styles";
import {
  AuthFormWrapper,
  ImgAuth,
} from "../../Atoms/AuthFormWrapper/AuthFormWrapper";
import { ActionButton } from "../../Atoms/Buttons/Buttons";
import InputField from "../../Molecules/InputField/InputField";
import ImgAuthSunFlower from "../../../Assets/SunFlower.svg";
import { FormInputsWrapper } from "../../Atoms/FormInputsWrapper/FormInputsWrapper";
import { FormikFormProps } from "formik";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";

interface Props {
  error: unknown;
  isLoading: boolean;
}

const RegistrationForm = (props: Props & FormikFormProps) => {
  const { error, isLoading } = props;

  return (
    <AuthFormWrapper noValidate={true}>
      <ImgAuth src={ImgAuthSunFlower} alt="Obraz słonecznika" />
      <AuthFormHeader>Rejestracja</AuthFormHeader>
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
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
          name="phoneNumber"
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

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <ActionButton type="submit">Zarejestruj</ActionButton>
      )}
    </AuthFormWrapper>
  );
};

export default RegistrationForm;
