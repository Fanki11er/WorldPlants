import { Field } from "formik";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

interface ErrorProps {
  $iserror: string;
}

export const FieldLabel = styled.label`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  width: fit-content;
  display: grid;
  width: fit-content;
  grid-template-rows: auto auto;
  row-gap: 5px;
  font-weight: bold;
`;

export const ScaleInfo = styled.span`
  color: ${(props: AppTheme) => props.theme.colors.turquoise};
  width: fit-content;
`;

export const StyledField = styled(Field)`
  text-align: end;
  border: none;
  font-weight: bold;
  height: 40px;
  width: 40px;
  padding: 5px 0 5px 10px;
  background-color: transparent;
  outline: none;
  color: ${(props: AppTheme) => props.theme.colors.turquoise};
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const FieldWrapper = styled.div<ErrorProps>`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 40px;
  border-radius: 10px;
  column-gap: 5px;
  padding-right: 10px;
  background-image: ${(props: AppTheme) => props.theme.colors.gradientPurple};
  border: 2px solid
    ${(props) =>
      props.$iserror ? props.theme.colors.red : props.theme.colors.transparent};
  transition: all 0.5s;
  &:hover,
  &:focus {
    border: 2px solid
      ${(props) =>
        props.$iserror ? props.theme.colors.red : props.theme.colors.orange};
  }
`;
