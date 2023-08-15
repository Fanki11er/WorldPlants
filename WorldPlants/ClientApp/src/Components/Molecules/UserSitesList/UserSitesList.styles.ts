import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";
import { Link } from "react-router-dom";

export const UserSitesListWrapper = styled.ul`
  display: flex;
  flex-flow: wrap row;
  gap: 20px;
  justify-content: center;
  align-items: center;
  column-gap: 50px;
  background-color: ${(props: AppTheme) => props.theme.colors.mainBlue};
  padding: 0;
  list-style: none;
`;

export const LinkToSite = styled(Link)`
  display: grid;
  grid-template-rows: auto auto 1fr;
  width: 100%;
  row-gap: 10px;
  text-decoration: none;
`;

export const UserSitesListItemWrapper = styled.li`
  width: 350px;
  background-image: ${(props: AppTheme) => props.theme.colors.gradientPurple};
  border-radius: 25px;
  padding: 20px 30px;
  height: 200px;
`;

export const UserSitesListItemHeader = styled.h2`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
  font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
  margin: 0;
`;

export const UserSitesListItemPlantsCountInfo = styled.h3`
  color: ${(props: AppTheme) => props.theme.colors.green};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
  font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
  margin: 0;
`;

export const UserSitesPlantsImg = styled.img`
  display: flex;
  align-self: flex-end;
  width: 100%;
`;
