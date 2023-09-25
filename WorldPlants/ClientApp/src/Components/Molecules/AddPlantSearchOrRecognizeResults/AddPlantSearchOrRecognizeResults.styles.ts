import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";
// import imgFallback from "../../../Assets/ImageFallback.svg";

interface Props {
  $imageUrl: string;
}

export const AddPlantSearchOrRecognizeResultsWrapper = styled.ul`
  display: flex;
  flex-flow: wrap row;
  gap: 35px;
  width: 100%;
  list-style: none;
  padding: 0;
  justify-content: center;
`;

export const AddPlantSearchOrRecognizeResultsListItem = styled.li`
  width: 300px;
  height: 350px;
  border-radius: 15px;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  border: 2px solid ${(props: AppTheme) => props.theme.colors.transparent};
  transition: all 0.5s;
  &:hover,
  &:focus {
    border: 2px solid ${(props: AppTheme) => props.theme.colors.orange};
  }
`;

export const AddPlantSearchOrRecognizeResultsListItemLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 200px auto;
  text-decoration: none;
  row-gap: 10px;
`;

export const AddPlantSearchOrRecognizeResultsListItemImage = styled.div<Props>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

export const AddPlantSearchOrRecognizeResultsListItemContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 0 20px;
`;

export const AddPlantSearchOrRecognizeResultsListItemName = styled.h3`
  //font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
  color: ${(props: AppTheme) => props.theme.colors.orange};
  margin: 0;
`;
export const AddPlantSearchOrRecognizeResultsListItemScientificName = styled.h4`
  //font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
  color: ${(props: AppTheme) => props.theme.colors.greenSettingsActive};
  margin: 0;
`;

export const AddPlantSearchOrRecognizeResultsListItemIconsWrapper = styled.div`
  display: flex;
  width: fit-content;
  column-gap: 20px;
  padding: 15px 0;
`;
