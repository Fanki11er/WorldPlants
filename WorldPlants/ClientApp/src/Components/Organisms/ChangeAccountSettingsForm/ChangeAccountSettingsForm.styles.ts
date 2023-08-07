import { Form } from "formik";
import styled from "styled-components";

export const ChangeAccountSettingsFormWrapper = styled(Form)`
  width: 500px;
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: auto;
  row-gap: 10px;
  border: 2px solid black;
  padding: 10px;
`;
