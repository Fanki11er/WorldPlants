import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const NavigationBackgroundSvg = styled.svg`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 130px;
  z-index: -1;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    height: 30%;
  }
`;
