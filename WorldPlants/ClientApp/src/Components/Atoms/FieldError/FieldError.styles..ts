import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const FieldError = styled.span`
  color: ${(props: AppTheme) => props.theme.colors.red};
  padding: 5px 10px;
  justify-self: flex-start;
`;
