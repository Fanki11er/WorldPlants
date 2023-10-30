import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const CustomActionTypesListWrapper = styled.ul`
  width: 100%;
  display: grid;
  padding: 0;
  list-style: none;
  grid-template-columns: repeat(auto-fit, 300px);
  justify-content: center;
`;

export const CustomActionTypesListItem = styled.li<AppTheme>`
  width: 300px;
  background-image: ${(props: AppTheme) => props.theme.colors.gradientPurple};
  border-radius: 15px;
  display: flex;
  padding: 20px 0;
  flex-direction: column;
  row-gap: 20px;
`;

export const CustomActionTypesListItemHeader = styled.h2<AppTheme>`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  margin: 0;
  text-align: center;
`;

export const CustomActionTypesListItemButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
