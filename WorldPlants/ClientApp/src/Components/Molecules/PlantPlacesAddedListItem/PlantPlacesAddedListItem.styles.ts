import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const PlantPlacesAddedListItemWrapper = styled.li`
     background-image: ${(props: AppTheme) => props.theme.colors.gradientPurple};
     border-radius: 25px;
     list-style: none;
     padding: 20px 30px;
  
`;

export const HeaderPlantPlacesAdded = styled.h1`
    color: ${(props: AppTheme) => props.theme.colors.orange};
    font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
    font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
`;

export const HeaderHowManyPlants = styled.h2`
    color: ${(props: AppTheme) => props.theme.colors.green};
    font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
    font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
`;

