import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

interface ImageProp {
  $imageUrl: string;
}

export const SitePlantsListWrapper = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, 350px);
  justify-content: center;
  row-gap: 100px;
  column-gap: 40px;
  margin-top: 80px;
  align-items: flex-start;
`;

export const SitePlantsListItem = styled.li<AppTheme>`
  display: flex;
  background-image: ${(props) => props.theme.colors.gradientPurple};
  border-radius: 30px;
  min-height: 290px;
  position: relative;
  padding: 0 20px 20px 20px;
  transition: all 0.5s;
  border: 2px solid transparent;
  &:hover,
  &:focus-within {
    border: 2px solid ${(props: AppTheme) => props.theme.colors.orange};
  }
  opacity: 0;
  animation-name: show;
  animation-duration: 1s;
  animation-fill-mode: forwards;
`;

export const SitePlantsListItemLink = styled(Link)`
  align-items: center;
  padding-top: 120px;
  row-gap: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  outline: none;
`;

export const SitePlantsListItemImage = styled.div<ImageProp>`
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translate(-50%);
`;

export const SitePlantsListItemHeader = styled.h2`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  margin: 0;
`;

export const SitePlantsListItemTasksInformationWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  column-gap: 10px;
  row-gap: 15px;
`;

export const SitePlantsListItemNoTasksInformation = styled.div`
  width: 100%;
  display: flex;
  row-gap: 5px;
  color: ${(props: AppTheme) => props.theme.colors.green};
  font-weight: bold;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NoTasksIcon = styled.img`
  width: 60px;
  height: 60px;
`;
