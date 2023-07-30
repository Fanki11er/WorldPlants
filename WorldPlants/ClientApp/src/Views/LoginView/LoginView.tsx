import { ViewWrapper } from "../../Components/Atoms/ViewWrapper/ViewWrapper";
import UnauthorizedNavigation from "../../Components/Molecules/UnauthorizedNavigation/UnauthorizedNavigation";
import LoginForm from "../../Components/Organisms/LoginForm/LoginForm";


const LoginView = () => {
    return(
        <ViewWrapper>
            <UnauthorizedNavigation/>
            <LoginForm/>
        </ViewWrapper>
    )
}

export default LoginView;