import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const DeleteAccountHeader = styled.h1`
  font-size: ${(props: AppTheme) => props.theme.fontSizes.large};
  color: ${(props: AppTheme) => props.theme.colors.red};
  display: flex;
  width: fit-content;
`;
