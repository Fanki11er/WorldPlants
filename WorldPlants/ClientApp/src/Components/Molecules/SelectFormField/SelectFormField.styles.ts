import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

interface ErrorProps {
  $iserror: boolean;
}

export const SelectFormFieldWrapper = styled.label<AppTheme>`
  display: flex;
  flex-direction: column;
  width: 160px;
  row-gap: 5px;
  color: ${(props) => props.theme.colors.orange};
  font-weight: bold;
`;

export const SelectField = styled.select<ErrorProps>`
  height: 40px;
  background-image: ${(props: AppTheme) => props.theme.colors.gradientPurple};
  border: 2px solid
    ${(props) =>
      props.$iserror ? props.theme.colors.red : props.theme.colors.transparent};
  border-radius: 10px;
  color: ${(props: AppTheme) => props.theme.colors.turquoise};
  padding: 0 10px;
  outline: none;
  text-align: center;

  &:hover,
  &:focus {
    border: 2px solid ${(props: AppTheme) => props.theme.colors.orange};
    cursor: pointer;
  }
  transition: all 0.5s;
`;

export const Option = styled.option`
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  border: none;
  outline: none;
  padding: 10px;
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
  text-align: center;
`;
