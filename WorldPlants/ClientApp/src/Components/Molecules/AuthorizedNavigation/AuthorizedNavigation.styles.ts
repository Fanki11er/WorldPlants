import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const InnerNavigationWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 100px;
  align-items: center;
  padding: 0 15px;
  row-gap: 15px;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    flex-flow: wrap row;
  }
`;

export const AuthorizedNavigationLinksWrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-flow: wrap row;
  padding: 0 20px;
  column-gap: 20px;
  row-gap: 10px;
  justify-self: flex-start;
  align-items: center;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    width: 100%;
    order: 3;
    justify-self: center;
    justify-content: center;
    padding: 0 10px;
  }
`;

export const UserSectionWrapper = styled.div`
  display: flex;
  flex-basis: 330px;
  flex-shrink: 3;
  justify-content: flex-end;
  padding: 0 15px;
  column-gap: 20px;
  justify-self: flex-end;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    order: 2;
    flex-basis: 250px;
    padding: 0;
  }
`;
