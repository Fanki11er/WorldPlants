import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const InnerNavigationWrapper = styled.div`
  display: grid;
  grid-template-columns: 130px 1fr 1fr;
  height: 50px;
  justify-items: center;
  align-items: center;
  column-gap: 20px;
  margin-top: 15px;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    grid-template-columns: 50px 1fr;
    padding-top: 4px;
    row-gap: 10px;
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
    justify-content: center;
    grid-column: 1/3;
    grid-row: 2/3;
    padding: 0 10px;
    justify-content: flex-start;
  }
`;
