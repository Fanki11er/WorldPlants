import { Field } from "formik";
import styled from "styled-components";

interface ErrorProps {
  iserror: string;
}

export const FormNumberFieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`;

export const FieldLabel = styled.label`
  color: orange;
`;

export const ScaleInfo = styled.span`
  color: orange;
  width: fit-content;
`;

export const StyledField = styled(Field)<ErrorProps>`
  border: 2px solid ${(props) => (props.iserror ? "red" : "orange")};
  margin-left: 10px;
  width: 50px;
  padding: 0 0 0 10px;
`;
export const FieldWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
