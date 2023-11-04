import { Form } from "formik";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const ChangeSiteSettingsFormWrapper = styled(Form)`
  width: 100%;
  max-width: 700px;
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: auto;
  row-gap: 20px;
  background-color: ${(props: AppTheme) => props.theme.colors.mainBlue};
  padding: 40px;
  border-radius: 25px;
  justify-items: center;
`;

export const FormNumberFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: fit-content;
`;
