import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const NavigationWrapper = styled.nav`
  width: 100vw;
  height: 130px;
  padding-right: 10px;
  position: fixed;
  z-index: 10;
  top: 0;
  min-width: 360px;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    width: 100%;
    height: 190px;
    background-size: contain;
  }

  @media print {
    display: none;
  }
`;
