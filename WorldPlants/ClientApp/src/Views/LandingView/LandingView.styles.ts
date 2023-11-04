import styled, { ThemeProps } from "styled-components";
import backgroundSvg from "../../Assets/HeroPageBackground.svg";
import heroImage from "../../Assets/HeroImage.svg";
import { AppTheme } from "../../GlobalStyles/theme";

export const LandingViewWrapper = styled.div`
  background-image: url(${backgroundSvg});
  background-size: cover;
  background-position: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 90vh;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

export const HeaderWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr 100px;
  justify-items: center;
  align-self: center;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    grid-template-rows: 180px 1fr;
    order: 1;
  }
`;

export const HeroTitle = styled.img`
  width: 60%;
  align-self: center;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    max-width: 300px;
    min-width: 230px;
  }
`;

export const HeroImageWrapper = styled.div`
  display: flex;
  width: 100%;
  background-image: url(${heroImage});
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    max-width: 600px;
    min-width: 360px;
    justify-self: center;
    order: 2;
    background-position: top;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 50px;
`;
