import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const AddPlacesForPlantsWrapper = styled.div`
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-content: center;
  width: 50%;
  border-radius: 25px;
  padding: 40px 40px 40px 60px;
`;

export const HeaderAddPlacesForPlants = styled.h1`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
`;

export const AddPlacesForPlantsText = styled.p`
  color: ${(props: AppTheme) => props.theme.colors.yellow};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
`;
