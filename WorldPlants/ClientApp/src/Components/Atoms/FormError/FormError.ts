import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";


export const FormError = styled.span`
  width: 100%;
  background-color: ${(props: AppTheme) => props.theme.colors.pink};
  display: flex;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-weight: bold;
  color: ${(props: AppTheme) => props.theme.colors.red};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
`;