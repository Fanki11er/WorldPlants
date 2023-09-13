import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const LoadingIndicator = styled.span`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.veryLarge};
`;
