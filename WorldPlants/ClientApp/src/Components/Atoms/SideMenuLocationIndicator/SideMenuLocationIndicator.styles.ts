import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const SideMenuLocationIndicator = styled.div`
  min-width: 150px;
  width: fit-content;
  padding: 5px 15px;
  height: 40px;
  display: flex;
  outline: none;
  border-radius: 10px;
  justify-self: flex-end;

  background-color: ${(props: AppTheme) => props.theme.colors.purpleLight};
  color: ${(props: AppTheme) => props.theme.colors.orange};
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: 2px solid ${(props: AppTheme) => props.theme.colors.orange};

  &:hover {
    cursor: not-allowed;
  }
`;
