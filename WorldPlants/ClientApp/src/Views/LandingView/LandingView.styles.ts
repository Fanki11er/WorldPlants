import styled, { ThemeProps } from "styled-components";
import backgroundSvg from "../../Assets/HeroPageBackground.svg"
import heroImage from "../../Assets/HeroImage.svg"
import { AppTheme } from "../../GlobalStyles/theme";

export const LandingViewWrapper = styled.div`
    background-image: url(${backgroundSvg});
    background-size: cover;
    background-position: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;

    @media screen and (${(props: AppTheme) => props.theme.devices.veryLarge}) {
    
    }

    @media screen and (${(props: AppTheme) => props.theme.devices.medium}) {
    
    }

    @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
   
    }
  
`;

export const HeaderWrapper = styled.div`
        display: grid;
        width: 100%;
        grid-template-rows: 220px 1fr;
        justify-items: center;
        align-self: center;
`;

export const HeroImageWrapper = styled.div`
    width: 100%;
    background-image: url(${heroImage});
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: center;

`;

export const HeroTitle = styled.img`
    width: 60%;
`;

export const ButtonWrapper = styled.div`
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   column-gap: 50px;

`;
