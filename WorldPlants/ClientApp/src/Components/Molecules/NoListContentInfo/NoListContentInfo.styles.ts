import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const NoListContentInfoWrapper = styled.div`
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-content: center;
  width: 50%;
  min-width: 300px;
  border-radius: 25px;
  justify-self: center;
  //padding: 40px 40px 40px 60px;
`;

export const NoListContentInfoHeader = styled.h1`
  font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
  color: ${(props: AppTheme) => props.theme.colors.orange};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
`;

export const NoListContentInfoText = styled.p`
  font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
  color: ${(props: AppTheme) => props.theme.colors.yellow};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
`;
