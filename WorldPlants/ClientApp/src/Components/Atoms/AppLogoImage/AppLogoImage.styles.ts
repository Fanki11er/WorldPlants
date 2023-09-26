import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const AppLogoImage = styled.img`
  width: 70px;
  height: 65px;

  @media screen and (${(props: AppTheme) => props.theme.devices.medium}) {
  }

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    width: 30px;
    height: 25px;
  }
`;
