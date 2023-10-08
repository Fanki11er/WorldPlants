import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const InnerNavigationWrapper = styled.div`
  display: grid;
  grid-template-columns: 130px repeat(3, auto) 1fr;
  height: 50px;
  justify-items: center;
  align-items: center;
  column-gap: 20px;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    grid-template-columns: 50px repeat(3, auto) 1fr;
    padding-top: 4px;
  }
`;

export const UnauthorizedNavigationLinksWrapper = styled.div`
  width: fit-content;
  display: flex;
  padding: 0 20px;
  column-gap: 20px;
  align-items: center;
  justify-self: center;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    width: 100%;
    //   order: 3;
    justify-content: center;
    padding: 0 10px;
  }
`;
