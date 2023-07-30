import { AppLogoImage } from "../../Atoms/AppLogoImage/AppLogoImage";
import { NavigationLink, OrangeButton } from "../../Atoms/Buttons/Buttons";
import { NavigationWrapper } from "../NavigationWrapper/NavigationWrapper";
import { InnerNavigationWrapper } from "./AuthorizedNavigation.styles";
import logoImage from "../../../Assets/Logo.svg";
import UserInfo from "../UserInfo/UserInfo";

const AuthorizedNavigation = () => {
    return(
    <NavigationWrapper>
        <InnerNavigationWrapper>
        <AppLogoImage src={logoImage}/>
            <NavigationLink to={"/"}>Zadania</NavigationLink>
            <NavigationLink to={"/"}>Miejsca</NavigationLink>
            <NavigationLink to={"/"}>Rośliny</NavigationLink>
            <NavigationLink to={"/"}>Ustawienia</NavigationLink>
            <UserInfo/>
            <OrangeButton>Wyloguj</OrangeButton>
        </InnerNavigationWrapper>
          
    </NavigationWrapper>
        
    )
}

export default AuthorizedNavigation;