import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";
import { Field } from "formik";

interface ErrorProps {
  iserror: string;
}

export const InputFieldWrapper = styled.div`
  grid-template-columns: 1fr;
  display: grid;
  grid-template-rows: 1fr auto auto;
  justify-items: center;
  width: 80%;
  max-width: 220px;
`;

export const InputLabel = styled.label`
  width: fit-content;
  color: ${(props: AppTheme) => props.theme.colors.green};
  padding: 5px 10px;
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
  justify-self: flex-start;
`;

export const Input = styled(Field)`
  padding: 5px 10px;
  width: 100%;
  background-image: linear-gradient(
    ${(props: AppTheme) => props.theme.colors.gradientPurple}
  );
  background-color: ${(props: AppTheme) => props.theme.colors.purple};
  border-radius: 25px;
  outline: none;
  border: 2px solid
    ${(props: ErrorProps & AppTheme) =>
      props.iserror ? props.theme.colors.red : "transparent"};
  color: ${(props: AppTheme) => props.theme.colors.white};
  transition: all 0.5s;
  &:hover,
  &:focus {
    border: 2px solid ${(props: AppTheme) => props.theme.colors.orange};
  }
`;

export const Required = styled.sup`
  color: ${(props: AppTheme) => props.theme.colors.red};
  margin-left: 2px;
`;
