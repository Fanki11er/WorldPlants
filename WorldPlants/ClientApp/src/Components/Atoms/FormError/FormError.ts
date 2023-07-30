import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";


export const FormError = styled.span`
  width: 100%;
  border: 2px solid ${(props: AppTheme) => props.theme.colors.errorRed};
  display: flex;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-weight: bold;
  color: ${(props: AppTheme) => props.theme.colors.errorRed};
`;