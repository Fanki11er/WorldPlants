import { Form } from "formik";
import styled from "styled-components";

export const AddUserSiteMultiStepFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MultiStepForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: center;
`;
