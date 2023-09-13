import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const PermissionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 30px;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  width: 80%;
  justify-items: center;
  padding: 30px 0 50px 0;
`;

export const HeaderPermissions = styled.h1`
  color: ${(props: AppTheme) => props.theme.colors.yellow};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.large};
  justify-self: flex-start;
`;
