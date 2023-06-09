import { ViewWrapper } from "../../Components/Atoms/ViewWrapper/ViewWrapper";
import UnauthorizedNavigation from "../../Components/Molecules/UnauthorizedNavigation/UnauthorizedNavigation";
import RegistrationForm from "../../Components/Organisms/RegistrationForm/RegistrationForm";


const RegistrationView = () => {
    return(
        <ViewWrapper>
            <UnauthorizedNavigation/>
            <RegistrationForm/>
        </ViewWrapper>
    )
}

export default RegistrationView;