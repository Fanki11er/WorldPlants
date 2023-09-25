import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

interface Props {
  $imageUrl: string;
}

export const PlantDetailsWrapper = styled.article<AppTheme>`
  background-color: ${(props) => props.theme.colors.navyBlue};
  border-radius: 15px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 15px;
`;

export const PlantDetailsHeaderSection = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  grid-template-rows: auto auto auto 1fr;
  row-gap: 15px;
  column-gap: 20px;
`;

export const PLantsDetailsImage = styled.div<Props>`
  width: 100%;
  max-height: 350px;
  grid-column: 1/2;
  grid-row: 1/5;
  border-radius: 15px;
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const PlantDetailsName = styled.h2`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  margin: 0;
  grid-column: 2/3;
  grid-row: 1/2;
`;

export const PlantDetailsScientificName = styled.h3`
  color: ${(props: AppTheme) => props.theme.colors.greenSettingsActive};
  margin: 0;
  grid-column: 2/3;
  grid-row: 2/3;
`;

export const PlantDetailsOtherName = styled.span`
  color: ${(props: AppTheme) => props.theme.colors.yellow};
  margin: 0;
`;

export const PlantDetailsDescription = styled.p`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  margin: 0;
  grid-column: 2/3;
  grid-row: 4/5;
`;
