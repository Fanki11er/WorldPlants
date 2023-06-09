
import { Link } from "react-router-dom";
import { AuthFormHeader } from "../../Atoms/AuthFormHeader/AuthFormHeader";
import { AuthFormWrapper, ImgAuth } from "../../Atoms/AuthFormWrapper/AuthFormWrapper.styles";
import { ActionButton} from "../../Atoms/Buttons/Buttons";
import InputField from "../../Molecules/InputField/InputField";
import ImgAuthSunFlower from "../../../Assets/SunFlower.svg";
import { FormInputsWrapper } from "../../Atoms/FormInputsWrapper/FormInputsWrapper";


const LoginForm = () => {
    return (
            <AuthFormWrapper>
                <ImgAuth src={ImgAuthSunFlower} alt="ImgAuthSunFlowers"/>
                <AuthFormHeader>Logowanie</AuthFormHeader>
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
               
                    <ActionButton type={"submit"}>Zaloguj</ActionButton>
                    
                
                
            </AuthFormWrapper>
           
        
    )
}

export default LoginForm;

