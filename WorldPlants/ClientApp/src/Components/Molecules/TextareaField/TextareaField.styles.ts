import { Field } from "formik";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const TextareaFieldWrapper = styled.label`
  display: flex;
  flex-direction: column;
  width: 80%;
  color: ${(props: AppTheme) => props.theme.colors.orange};
  row-gap: 5px;
  margin-top: 20px;
`;

export const TextareaFieldInput = styled(Field)`
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  border-radius: 10px;
  padding: 10px 20px;
  resize: none;
  border: 2px solid ${(props: AppTheme) => props.theme.colors.orange};
`;
