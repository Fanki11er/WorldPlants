import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";
import { Field } from "formik";

interface Props {
  $checked: string;
}

export const RadioInputFieldWrapper = styled.label`
  display: grid;
  grid-template-columns: 1fr auto;
  position: relative;
  overflow: hidden;
  align-items: center;
  width: 180px;
  column-gap: 20px;
  border-radius: 25px;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  padding: 10px 30px;
  border: 2px solid
    ${(props: Props & AppTheme) =>
      props.$checked === "true"
        ? props.theme.colors.orange
        : props.theme.colors.transparent};
  transition: all 0.5s;
  outline: none;
  &:hover,
  &:focus-within {
    border: 2px solid ${(props: AppTheme) => props.theme.colors.orange};
    cursor: ${(props: Props) =>
      props.$checked === "true" ? "not-allowed" : "pointer"};
  }
`;

export const LabelText = styled.span`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  font-weight: bold;
  justify-self: flex-start;
`;

export const SiteIcon = styled.img`
  width: 30px;
  height: 30px;
  justify-self: flex-end;
`;
