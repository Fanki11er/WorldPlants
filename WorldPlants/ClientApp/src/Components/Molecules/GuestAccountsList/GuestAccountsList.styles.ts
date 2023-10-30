import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const GuestAccountsListWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  list-style: none;
  padding: 0 30px;
`;

export const GuestListItemWrapper = styled.li`
  width: 100%;
  height: fit-content;
  background-color: ${(props: AppTheme) => props.theme.colors.darkPurple};
  border-radius: 25px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  row-gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  column-gap: 20px;
  box-shadow: 5px 5px 5px ${(props: AppTheme) => props.theme.colors.mainBlue};
`;

export const HeaderGuestListItem = styled.h2`
  margin: 0;
  color: ${(props: AppTheme) => props.theme.colors.yellow};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
`;
