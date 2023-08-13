import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const FormSuccess = styled.span`
  width: 100%;
  background-color: ${(props: AppTheme) => props.theme.colors.greenLight};
  display: flex;
  border-radius: 10px;
  justify-content: center;
  padding: 10px;
  font-weight: bold;
  color: ${(props: AppTheme) => props.theme.colors.greenSettings};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
`;