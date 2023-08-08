import { Form } from "formik";
import styled from "styled-components";

export const GuestUserPermissionsFormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  background-color: #071d53;
  border-radius: 15px;
  padding: 20px;
`;

export const PermissionsGroup = styled.section`
  display: flex;
  flex-flow: row wrap;
  gap: 30px;
  justify-content: space-evenly;
`;

export const PermissionsGroupHeder = styled.h2`
  text-align: center;
  color: #ffc643;
  width: 100%;
`;
