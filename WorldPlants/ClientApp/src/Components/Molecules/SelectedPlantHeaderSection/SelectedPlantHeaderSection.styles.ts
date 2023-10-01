import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

interface ImageProp {
  $imageUrl: string;
}

export const SelectedPlantHeaderSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  position: relative;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  border-radius: 40px;
  padding: 120px 25px 25px 25px;
  align-items: center;
  row-gap: 15px;
  margin: 100px 0;
`;

export const SelectedPlantHeaderSectionImage = styled.div<ImageProp>`
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  width: 180px;
  height: 180px;
  position: absolute;
  left: 50%;
  top: -80px;
  transform: translateX(-50%);
`;

export const SelectedPlantHeaderSectionPlantName = styled.h1`
  margin: 0;
  font-size: ${(props: AppTheme) => props.theme.fontSizes.xLarge};
  color: ${(props: AppTheme) => props.theme.colors.orange};
`;

export const SelectedPlantHeaderSectionTopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

export const SelectedPlantHeaderSectionToUserSiteLink = styled(Link)`
  text-decoration: none;
  color: ${(props: AppTheme) => props.theme.colors.turquoise};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.large};
  transition: all 0.5s;
  outline: none;
  &:hover,
  &:focus {
    color: ${(props: AppTheme) => props.theme.colors.orange};
  }
`;

export const SelectedPlantHeaderSectionAdditionalDescription = styled.h3`
  margin: 0;
  color: ${(props: AppTheme) => props.theme.colors.greenSettings};
  align-self: flex-start;
`;
