import { Form } from "formik";
import styled from "styled-components";

export const PlantStandardTaskScheduleFormWrapper = styled(Form)`
  display: flex;
  width: 100%;
  flex-direction: column;
  row-gap: 15px;
  align-items: center;
`;

export const FormRowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: wrap row;
  gap: 25px;
  align-items: flex-start;
  justify-content: center;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 30px;
  column-gap: 20px;
  justify-content: center;
`;
