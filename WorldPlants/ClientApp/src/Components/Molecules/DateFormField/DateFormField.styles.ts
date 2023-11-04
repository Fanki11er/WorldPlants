import { Field } from "formik";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

interface ErrorProps {
  $iserror: boolean;
}

export const DateFormFieldWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 5px;
  position: relative;
  width: 150px;
`;

export const DateFormFieldLabel = styled.label<AppTheme>`
  color: ${(props) => props.theme.colors.orange};
  font-weight: bold;
`;

export const IndicatorImage = styled.img`
  position: absolute;
  grid-row: 2/3;
  right: 15px;
  top: 8px;
  width: 25px;
  height: 25px;
  pointer-events: none;
`;

export const DateField = styled(Field)<ErrorProps>`
  width: fit-content;
  height: 40px;
  border-radius: 10px;
  background-image: ${(props: AppTheme) => props.theme.colors.gradientPurple};
  padding: 5px 10px;
  border: 2px solid
    ${(props) =>
      props.$iserror ? props.theme.colors.red : props.theme.colors.transparent};
  color: ${(props: AppTheme) => props.theme.colors.turquoise};
  outline: none;
  &::-webkit-calendar-picker-indicator {
    justify-self: flex-end;
    background-image: none;
    width: 25px;
    height: 25px;
    &:hover {
      cursor: pointer;
    }
  }

  &:hover,
  &:focus {
    border: 2px solid ${(props: AppTheme) => props.theme.colors.orange};
    cursor: pointer;
  }
  transition: all 0.5s;
`;
