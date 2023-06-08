import { AuthFormHeader } from "../../Atoms/AuthFormHeader/AuthFormHeader";
import { AuthFormWrapper, ImgAuth } from "../../Atoms/AuthFormWrapper/AuthFormWrapper.styles"
import { ActionButton, ButtonAuth } from "../../Atoms/Buttons/Buttons";
import InputField from "../../Molecules/InputField/InputField"
import ImgAuthSunFlower from "../../../Assets/SunFlower.svg";
import { FormInputsWrapper } from "../../Atoms/FormInputsWrapper/FormInputsWrapper";

const RegistrationForm = () => {
    return(
        <AuthFormWrapper>
             <ImgAuth src={ImgAuthSunFlower} alt="ImgAuthSunFlowers"/>
            <AuthFormHeader>Rejestracja</AuthFormHeader>
                <FormInputsWrapper>
                <InputField
                 name="firstName"
                 placeholder="Imię"
                 label="Imię"
                 type="firstName"
            />
             <InputField
                 name="lastName"
                 placeholder="Nazwisko"
                 label="Nazwisko"
                 type="lastName"
            />
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
                 <InputField
                      name="repeatPassword"
                      placeholder="Powtórz hasło"
                      label="Powtórz hasło"
                      type="repeatPassword"
                />
                </FormInputsWrapper>

               
                    <ActionButton>Zarejestruj</ActionButton>
                    
               
        </AuthFormWrapper>
    )
}

export default RegistrationForm;