import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const InnerNavigationWrapper = styled.div`
  display: grid;
  grid-template-columns: 130px repeat(3, auto) 1fr;
  height: 100px;
  justify-items: center;
  align-items: center;
  column-gap: 5%;

  @media screen and (${(props: AppTheme) => props.theme.devices.medium}) {
  }

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    grid-template-columns: 50px repeat(3, auto) 1fr;
    align-items: flex-start;
    padding-top: 4px;
  }
`;
