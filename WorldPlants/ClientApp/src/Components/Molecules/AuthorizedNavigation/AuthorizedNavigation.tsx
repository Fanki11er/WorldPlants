import { AppLogoImage } from "../../Atoms/AppLogoImage/AppLogoImage.styles";
import { NavigationLink, OrangeButton } from "../../Atoms/Buttons/Buttons";
import {
  AuthorizedNavigationLinksWrapper,
  InnerNavigationWrapper,
  UserSectionWrapper,
} from "./AuthorizedNavigation.styles";
import logoImage from "../../../Assets/Logo.svg";
import UserInfo from "../UserInfo/UserInfo";
import useAuth from "../../../Hooks/useAuth";
import { paths } from "../../../Router/paths";
import { NavigationWrapper } from "../../Atoms/NavigationWrapper/NavigationWrapper.styles";
import NavigationBackground from "../NavigationBackground/NavigationBackground";

const AuthorizedNavigation = () => {
  const { plantsTasks, userSettings, userSites } = paths;
  const { logout } = useAuth();
  return (
    <NavigationWrapper>
      <InnerNavigationWrapper>
        <AppLogoImage src={logoImage} />
        <AuthorizedNavigationLinksWrapper>
          <NavigationLink to={plantsTasks} end>
            Zadania
          </NavigationLink>
          <NavigationLink to={userSites}>Miejsca</NavigationLink>
          <NavigationLink to={userSettings}>Ustawienia</NavigationLink>
          <NavigationLink to={""}>Skaner QR</NavigationLink>
        </AuthorizedNavigationLinksWrapper>
        <UserSectionWrapper>
          <UserInfo />
          <OrangeButton onClick={logout}>Wyloguj</OrangeButton>
        </UserSectionWrapper>
      </InnerNavigationWrapper>
      <NavigationBackground />
    </NavigationWrapper>
  );
};

export default AuthorizedNavigation;
