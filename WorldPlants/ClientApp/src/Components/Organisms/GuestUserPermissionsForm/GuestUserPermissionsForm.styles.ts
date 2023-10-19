import { Form } from "formik";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const GuestUserPermissionsFormWrapper = styled(Form)`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  border-radius: 15px;
  padding: 50px 20px;
  justify-items: center;
  margin-bottom: 50px;
`;

export const PermissionsGroup = styled.section`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  gap: 30px;
  justify-content: space-evenly;
  padding-bottom: 30px;
`;

export const PermissionsGroupHeder = styled.h2`
  text-align: center;
  color: ${(props: AppTheme) => props.theme.colors.yellow};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.large};
  width: 100%;
`;
