import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const NoListContentInfoWrapper = styled.div`
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-content: center;
  width: fit-content;
  min-width: 320px;
  max-width: 600px;
  border-radius: 25px;
  padding: 40px;
`;

export const NoListContentInfoHeader = styled.h1`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
`;

export const NoListContentInfoText = styled.p`
  color: ${(props: AppTheme) => props.theme.colors.yellow};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
`;
