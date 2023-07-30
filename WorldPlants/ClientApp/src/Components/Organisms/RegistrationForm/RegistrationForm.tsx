import { AuthFormHeader } from "../../Atoms/AuthFormHeader/AuthFormHeader";
import { AuthFormWrapper, ImgAuth } from "../../Atoms/AuthFormWrapper/AuthFormWrapper"
import { ActionButton } from "../../Atoms/Buttons/Buttons";
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
                 name="name"
                 placeholder="Imię"
                 label="Imię"
                 type="name"
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
                 name="telephone"
                 placeholder="Numer telefonu"
                 label="Numer telefonu"
                 type="telephone"
               />
                <InputField
                      name="password"
                      placeholder="Hasło"
                      label="Hasło"
                      type="password"
                      required={true}
                />
                 <InputField
                      name="repeatPassword"
                      placeholder="Powtórz hasło"
                      label="Powtórz hasło"
                      type="repeatPassword"
                      required={true}
                />
                </FormInputsWrapper>

               
                    <ActionButton>Zarejestruj</ActionButton>
                    
               
        </AuthFormWrapper>
    )
}

export default RegistrationForm;