import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const SideMenuLocationIndicator = styled.div`
  width: 200px;
  padding: 5px 15px;
  height: 35px;
  display: flex;
  outline: none;
  border-radius: 15px;
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
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
