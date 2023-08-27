import { Field } from "formik";
import styled from "styled-components";

export const TextareaFieldWrapper = styled.label`
  display: flex;
  flex-direction: column;
  width: 80%;
  color: orange;
  row-gap: 5px;
`;

export const TextareaFieldInput = styled(Field)`
  background-color: lightgray;
  border-radius: 10px;
  padding: 10px 20px;
  resize: none;
`;
