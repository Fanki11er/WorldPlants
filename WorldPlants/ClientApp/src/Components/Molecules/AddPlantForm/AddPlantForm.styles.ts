import { Form } from "formik";
import styled from "styled-components";

export const AddPlantFormWrapper = styled(Form)`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  width: 100%;
  max-width: 700px;
`;

export const AddPlantFormInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: flex-start;
`;

export const AddPlantFormImagePreview = styled.img`
  width: 350px;
  height: 350px;
  border-radius: 15px;
`;

export const AddPlantFormPhotoInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const IndicatorsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  grid-column: 1/3;
`;
