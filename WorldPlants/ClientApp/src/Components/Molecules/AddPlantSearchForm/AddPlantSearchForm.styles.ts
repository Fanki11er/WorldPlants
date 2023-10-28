import { Form } from "formik";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const AddPlantSearchFormWrapper = styled(Form)`
  min-width: 320px;
  max-width: 400px;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  column-gap: 25px;
  grid-template-columns: 100%;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  padding: 30px 50px;
  border-radius: 25px;
  margin-bottom: 30px;
`;
