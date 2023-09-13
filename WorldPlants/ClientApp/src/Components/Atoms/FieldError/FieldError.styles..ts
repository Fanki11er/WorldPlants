import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const FieldError = styled.span`
  color: ${(props: AppTheme) => props.theme.colors.red};
  padding: 5px 15px;
  text-align: center;
  background-color: ${(props: AppTheme) => props.theme.colors.pink};
  font-weight: bold;
  border-radius: 10px;
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
`;
