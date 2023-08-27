import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const NoListContentInfoWrapper = styled.div`
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-content: center;
  width: 80%;
  min-width: 300px;
  border-radius: 25px;
  padding: 50px;
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
