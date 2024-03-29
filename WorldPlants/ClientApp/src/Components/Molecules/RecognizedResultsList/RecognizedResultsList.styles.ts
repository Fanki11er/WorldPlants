import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

interface Props {
  $imageUrl: string;
}

export const RecognizedResultsListWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-flow: wrap row;
  justify-content: space-evenly;
  gap: 25px;
  padding: 0;
  list-style: none;
  margin-top: 40px;
`;

export const RecognizedResultsListItem = styled.li`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  row-gap: 15px;
  padding: 30px;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  border-radius: 25px;
  transition: all 0.5s;
  border: 2px solid transparent;
  transition: all 0.5s;
`;

export const RecognizedResultsListItemProbability = styled.span`
  color: ${(props: AppTheme) => props.theme.colors.green};
  font-size: 20px;
  font-weight: bold;
`;
export const RecognizedResultsListItemHeader = styled.h2`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  margin: 0;
`;

export const RecognizedResultsListItemDescription = styled.p`
  margin: 0;
  color: ${(props: AppTheme) => props.theme.colors.greenSettingsActive};
`;

export const RecognizedResultsListItemImagesWrapper = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, 100px);
  margin-top: 20px;
`;

export const RecognizedResultsListItemImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

export const RecognizedResultsListItemImageWrapper = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, 100px);
  margin-top: 20px;
  min-height: 100px;
`;

export const RecognizedResultsListItemButtonsWrapper = styled.div`
  display: flex;
  width: fit-content;
  column-gap: 20px;
  margin-top: 15px;
`;
