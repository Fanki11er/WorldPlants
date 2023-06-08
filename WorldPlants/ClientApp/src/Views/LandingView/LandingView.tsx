import { ActionButton} from "../../Components/Atoms/Buttons/Buttons";
import { ButtonWrapper, HeaderWrapper, HeroImageWrapper, HeroTitle, LandingViewWrapper } from "./LandingView.styles";
import titleImage from "../../Assets/HeroTitle.svg"

const LandingView = () => {
    return(
        <LandingViewWrapper>
            <HeroImageWrapper />
            <HeaderWrapper>
                <HeroTitle src={titleImage}/>
                <ButtonWrapper>
                    <ActionButton>Logowanie</ActionButton>
                    <ActionButton>Rejestracja</ActionButton>
                </ButtonWrapper>
            
            </HeaderWrapper>
           
        </LandingViewWrapper>
    )
}

export default LandingView;