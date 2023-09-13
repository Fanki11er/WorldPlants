import { Form } from "formik";
import styled from "styled-components";

export const PlantStandardTaskScheduleFormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

export const FormRowWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  gap: 25px;
  align-items: flex-start;
  justify-content: center;
`;
