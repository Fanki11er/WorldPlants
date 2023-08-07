import { Form } from "formik";
import styled from "styled-components";

export const DeleteAccountFormWrapper = styled(Form)`
  width: 500px;
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: auto;
  row-gap: 10px;
  border: 2px solid red;
  padding: 10px;
`;

export const DeleteAccountInstruction = styled.span``;