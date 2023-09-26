import { NavigationLink } from "../../Components/Atoms/Buttons/Buttons";
import {
  ButtonWrapper,
  HeaderWrapper,
  HeroImageWrapper,
  HeroTitle,
  LandingViewWrapper,
} from "./LandingView.styles";
import titleImage from "../../Assets/HeroTitle.svg";
import { paths } from "../../Router/paths";

const LandingView = () => {
  const { registration, login } = paths;
  return (
    <LandingViewWrapper>
      <HeroImageWrapper />
      <HeaderWrapper>
        <HeroTitle src={titleImage} />
        <ButtonWrapper>
          <NavigationLink to={login}>Logowanie</NavigationLink>
          <NavigationLink to={registration}>Rejestracja</NavigationLink>
        </ButtonWrapper>
      </HeaderWrapper>
    </LandingViewWrapper>
  );
};

export default LandingView;
