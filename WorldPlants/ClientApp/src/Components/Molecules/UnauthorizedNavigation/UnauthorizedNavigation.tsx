import { AppLogoImage } from "../../Atoms/AppLogoImage/AppLogoImage.styles";
import {
  InnerNavigationWrapper,
  UnauthorizedNavigationLinksWrapper,
} from "./UnauthorizedNavigation.styles";
import logoImage from "../../../Assets/Logo.svg";
import { NavigationLink } from "../../Atoms/Buttons/Buttons";
import { paths } from "../../../Router/paths";
import { NavigationWrapper } from "../../Atoms/NavigationWrapper/NavigationWrapper.styles";
import NavigationBackground from "../NavigationBackground/NavigationBackground";

const UnauthorizedNavigation = () => {
  const { rootPath, registration, login } = paths;
  return (
    <NavigationWrapper>
      <InnerNavigationWrapper>
        <AppLogoImage src={logoImage} />
        <UnauthorizedNavigationLinksWrapper>
          <NavigationLink to={rootPath}>Główna</NavigationLink>
          <NavigationLink to={registration}>Rejestracja</NavigationLink>
          <NavigationLink to={login}>Logowanie</NavigationLink>
        </UnauthorizedNavigationLinksWrapper>
      </InnerNavigationWrapper>
      <NavigationBackground />
    </NavigationWrapper>
  );
};

export default UnauthorizedNavigation;
