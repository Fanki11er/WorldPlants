import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const SettingsHeader = styled.h1`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.large};
  justify-self: flex-start;
`;
