import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const InnerNavigationWrapper = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
  width: 100%;
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
