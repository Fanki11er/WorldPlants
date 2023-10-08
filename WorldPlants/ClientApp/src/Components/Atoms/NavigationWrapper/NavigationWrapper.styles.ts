import styled from "styled-components";
import navigationBackground from "../../../Assets/NavigationBackground.svg";
import { AppTheme } from "../../../GlobalStyles/theme";

export const NavigationWrapper = styled.nav`
  width: 100vw;
  height: 130px;
  padding-right: 10px;
  background-image: url(${navigationBackground});
  position: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 10;
  top: 0;
  min-width: 360px;
`;
