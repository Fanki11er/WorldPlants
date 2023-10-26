import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const PlantNotesListWrapper = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 340px);
  row-gap: 20px;
  padding: 20px 0;
  margin: 0;
  list-style: none;
  column-gap: 30px;
  justify-content: center;
`;

export const PlantNoteListItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 20px;
  border-radius: 15px;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  padding: 30px 20px;
`;

export const PlantNotesItemButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
