import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const FormError = styled.span`
  width: 100%;
  background-color: ${(props: AppTheme) => props.theme.colors.pink};
  display: flex;
  column-gap: 5px;
  border-radius: 10px;
  justify-items: center;
  align-items: center;
  padding: 10px 15px;
  font-weight: bold;
  font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
  color: ${(props: AppTheme) => props.theme.colors.red};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
`;

export const ErrorImage = styled.img`
  width: 20px;
  height: 20px;
`;
