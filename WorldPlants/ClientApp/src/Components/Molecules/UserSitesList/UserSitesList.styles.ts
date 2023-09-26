import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";
import { Link } from "react-router-dom";

interface Props {
  $imageUrl: string;
}
export const UserSitesListWrapper = styled.ul<AppTheme>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 350px);
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
  column-gap: 50px;
  background-color: ${(props: AppTheme) => props.theme.colors.mainBlue};
  padding: 0;
  list-style: none;
`;

export const UserSitesListItemWrapper = styled.li<AppTheme>`
  display: flex;
  width: 350px;
  background-image: ${(props: AppTheme) => props.theme.colors.gradientPurple};
  border-radius: 25px;
  min-height: 190px;
  border: 2px solid transparent;
  outline: none;
  &:hover,
  &:focus {
    border: 2px solid ${(props: AppTheme) => props.theme.colors.orange};
  }
  transition: all 0.5s;
  opacity: 0;
  animation-name: show;
  animation-duration: 1s;
  animation-fill-mode: forwards;

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const LinkToSite = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 10px;
  text-decoration: none;
  padding: 20px 30px;
  outline: none;
`;

export const UserSitesListItemHeader = styled.h2<AppTheme>`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
  font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
  margin: 0;
`;

export const UserSitesListItemPlantsCountInfo = styled.h3<AppTheme>`
  color: ${(props: AppTheme) => props.theme.colors.green};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
  font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
  margin: 0;
`;

export const UserSiteListItemPlantsInformationWrapper = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 50px);
  gap: 25px;
`;

export const UserSiteListItemPlantWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
`;

export const UserSiteListItemPlantImage = styled.div<Props>`
  background-size: cover;
  background-position: center center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(${(props) => props.$imageUrl});
`;

export const UserSiteListItemPlantTasksNumber = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  width: 50px;
  padding: 5px 0;
  background-image: ${(props: AppTheme) => props.theme.colors.gradientBlue};
  border-radius: 5px;
  font-size: 8px;
  font-weight: bold;
`;
