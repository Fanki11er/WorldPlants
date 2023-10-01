import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  $imageUrl: string;
}

export const PlantsWithTasksListWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 150px;
  transform: translateY(80px);
  padding: 0;
`;

export const PlantsWithTasksListItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  background-color: #071d53;
  border-radius: 25px;
  position: relative;
  padding: 90px 20px 20px 20px;
`;

export const PlantsWithTasksListItemHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  column-gap: 10px;
  justify-content: center;
  row-gap: 15px;
  align-items: center;
`;

export const PlantsWithTasksListItemPlantPhoto = styled.div<Props>`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  position: absolute;
  left: 50%;
  top: -80px;
  transform: translateX(-50%);
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
`;

export const PlantsWithTasksListItemHeader = styled(Link)`
  margin: 0;
  text-align: center;
  color: orange;
  text-decoration: none;
  font-size: 26px;
  transition: all 0.5s;
  &:hover,
  &:focus {
    color: #3bd6a6;
  }
`;
