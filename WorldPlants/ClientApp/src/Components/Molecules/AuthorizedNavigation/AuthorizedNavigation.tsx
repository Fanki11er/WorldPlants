import { AppLogoImage } from "../../Atoms/AppLogoImage/AppLogoImage.styles";
import { NavigationLink, OrangeButton } from "../../Atoms/Buttons/Buttons";
import { NavigationWrapper } from "../NavigationWrapper/NavigationWrapper.styles";
import { InnerNavigationWrapper } from "./AuthorizedNavigation.styles";
import logoImage from "../../../Assets/Logo.svg";
import UserInfo from "../UserInfo/UserInfo";
import useAuth from "../../../Hooks/useAuth";
import { paths } from "../../../Router/paths";

const AuthorizedNavigation = () => {
  const { plantsTasks, userSettings, userSites } = paths;
  const { logout } = useAuth();
  return (
    <NavigationWrapper>
      <InnerNavigationWrapper>
        <AppLogoImage src={logoImage} />
        <NavigationLink to={plantsTasks} end>
          Zadania
        </NavigationLink>
        <NavigationLink to={userSites}>Miejsca</NavigationLink>
        <NavigationLink to={"/"}>Rośliny</NavigationLink>
        <NavigationLink to={userSettings}>Ustawienia</NavigationLink>
        <UserInfo />
        <OrangeButton onClick={logout}>Wyloguj</OrangeButton>
      </InnerNavigationWrapper>
    </NavigationWrapper>
  );
};

export default AuthorizedNavigation;
