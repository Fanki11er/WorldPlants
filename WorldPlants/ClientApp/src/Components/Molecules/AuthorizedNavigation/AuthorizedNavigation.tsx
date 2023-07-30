import { AppLogoImage } from "../../Atoms/AppLogoImage/AppLogoImage";
import { NavigationLink, OrangeButton } from "../../Atoms/Buttons/Buttons";
import { NavigationWrapper } from "../NavigationWrapper/NavigationWrapper";
import { InnerNavigationWrapper } from "./AuthorizedNavigation.styles";
import logoImage from "../../../Assets/Logo.svg";
import UserInfo from "../UserInfo/UserInfo";
import useAuth from "../../../Hooks/useAuth";
import { paths } from "../../../Router/paths";

const AuthorizedNavigation = () => {
  const { plantsTasks } = paths;
  const { logout } = useAuth();
  return (
    <NavigationWrapper>
      <InnerNavigationWrapper>
        <AppLogoImage src={logoImage} />
        <NavigationLink to={plantsTasks}>Zadania</NavigationLink>
        <NavigationLink to={"/"}>Miejsca</NavigationLink>
        <NavigationLink to={"/"}>Rośliny</NavigationLink>
        <NavigationLink to={"/"}>Ustawienia</NavigationLink>
        <UserInfo />
        <OrangeButton onClick={logout}>Wyloguj</OrangeButton>
      </InnerNavigationWrapper>
    </NavigationWrapper>
  );
};

export default AuthorizedNavigation;
