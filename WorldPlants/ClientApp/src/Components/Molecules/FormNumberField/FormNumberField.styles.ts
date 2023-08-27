import { Field } from "formik";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

interface ErrorProps {
  iserror: string;
}

export const FormNumberFieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 150px auto;
  grid-template-rows: auto auto;
`;

export const FieldLabel = styled.label`
  color: ${(props: AppTheme) => props.theme.colors.orange};
`;

export const ScaleInfo = styled.span`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  width: fit-content;
`;

export const StyledField = styled(Field)<ErrorProps>`
  border: 2px solid
    ${(props) =>
      props.iserror ? props.theme.colors.red : props.theme.colors.orange};
  margin-left: 10px;
  width: 50px;
  padding: 0 0 0 10px;
`;

export const FieldWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
