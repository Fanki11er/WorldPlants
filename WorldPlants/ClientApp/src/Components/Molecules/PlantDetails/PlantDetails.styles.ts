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
  width: 100%;
  //!! Add media query to center image on small screens
`;

export const PLantsDetailsImage = styled.div<Props>`
  width: 300px;
  height: 300px;
  float: left;
  margin: 0 25px 15px 0;
  border-radius: 25px;
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const PlantDetailsName = styled.h2`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  margin: 0;
`;

export const PlantDetailsScientificName = styled.h3`
  color: ${(props: AppTheme) => props.theme.colors.greenSettingsActive};
  margin: 0;
`;

export const PlantDetailsOtherName = styled.span`
  color: ${(props: AppTheme) => props.theme.colors.yellow};
  margin: 0;
`;

export const PlantDetailsDescription = styled.p`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  margin: 0;
`;
