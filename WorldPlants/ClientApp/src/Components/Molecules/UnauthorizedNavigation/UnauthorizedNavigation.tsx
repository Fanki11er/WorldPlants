import { AppLogoImage } from "../../Atoms/AppLogoImage/AppLogoImage";
import { NavigationWrapper } from "../NavigationWrapper/NavigationWrapper";
import { InnerNavigationWrapper } from "./UnauthorizedNavigation.styles";
import logoImage from "../../../Assets/Logo.svg"
import { NavigationLink } from "../../Atoms/Buttons/Buttons";
import { paths } from "../../../Router/paths";

const UnauthorizedNavigation = () => {
    const {rootPath, registration, login} = paths;
    return(
        <NavigationWrapper>
            <InnerNavigationWrapper>
                <AppLogoImage src={logoImage}/>
                <NavigationLink to={rootPath}>Główna</NavigationLink>
                <NavigationLink to={registration}>Rejestracja</NavigationLink>
                <NavigationLink to={login}>Logowanie</NavigationLink>
            </InnerNavigationWrapper>
        </NavigationWrapper>
    )
}

export default UnauthorizedNavigation;