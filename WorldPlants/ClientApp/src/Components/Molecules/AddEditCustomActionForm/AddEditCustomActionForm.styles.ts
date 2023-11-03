import { Form } from "formik";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const AddEditCustomActionFormWrapper = styled(Form)<AppTheme>`
  width: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  row-gap: 20px;
  border-radius: 15px;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  align-items: center;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    width: 300px;
  }
`;
