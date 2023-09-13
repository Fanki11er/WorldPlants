import styled from "styled-components";
import navigationBackground from "../../../Assets/NavigationBackground.svg";
import { AppTheme } from "../../../GlobalStyles/theme";

export const NavigationWrapper = styled.nav`
  width: 100vw;
  height: 130px;
  background-image: url(${navigationBackground});
  position: fixed;
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 10;
  top: 0;

  @media screen and (${(props: AppTheme) => props.theme.devices.medium}) {
  }

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    width: 100%;
    height: 190px;
  }
`;
