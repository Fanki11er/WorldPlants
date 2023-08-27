import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const PlantDetailsWrapper = styled.div``;

export const PlantDetailsImgAndButtonWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
`;
export const PlantDetailsImg = styled.img`
  width: 300px;
  height: 300px;
`;

export const PlantDetailsHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const PlantDetailsNameHeader = styled.h2`
  font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
  color: ${(props: AppTheme) => props.theme.colors.orange};
`;

export const PlantDetailsElementHeader = styled.h2`
  font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
  color: ${(props: AppTheme) => props.theme.colors.greenSettingsActive};
`;

export const PlantDetailsSpan = styled.span`
  font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
  color: ${(props: AppTheme) => props.theme.colors.turquoise};
`;
