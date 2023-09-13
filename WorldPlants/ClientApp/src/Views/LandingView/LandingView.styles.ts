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
  min-height: 100vh;

  @media screen and (${(props: AppTheme) => props.theme.devices.veryLarge}) {
  }

  @media screen and (${(props: AppTheme) => props.theme.devices.medium}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

export const HeaderWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 220px 1fr;
  justify-items: center;
  align-self: center;

  @media screen and (${(props: AppTheme) => props.theme.devices.medium}) {
    order: 1;
    grid-template-rows: 350px 50px;
  }

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    grid-template-rows: 180px 1fr;
  }
`;

export const HeroTitle = styled.img`
  width: 60%;
  align-self: center;

  @media screen and (${(props: AppTheme) => props.theme.devices.medium}) {
    max-width: 40%;
  }

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    max-width: 300px;
  }
`;

export const HeroImageWrapper = styled.div`
  display: flex;
  width: 100%;
  background-image: url(${heroImage});
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;

  @media screen and (${(props: AppTheme) => props.theme.devices.medium}) {
    order: 2;
    transform: translateY(-80px);
  }

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    max-width: 600px;
    justify-self: center;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 50px;
`;
