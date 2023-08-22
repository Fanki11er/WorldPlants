import { Form } from "formik";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const ChangeSiteSettingsFormWrapper = styled(Form)`
  width: 700px;
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: auto;
  row-gap: 10px;
  background-color: ${(props: AppTheme) => props.theme.colors.mainBlue};
  padding: 40px;
  border-radius: 10px;
  justify-items: center;
`;
