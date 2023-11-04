import { Form } from "formik";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const AddPlantFormWrapper = styled(Form)`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  width: 100%;
  max-width: 700px;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    grid-template-columns: 1fr;
  }
`;

export const AddPlantFormInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: flex-start;
  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    padding-left: 15px;
  }
`;

export const AddPlantFormImagePreview = styled.img`
  width: 350px;
  height: 350px;
  border-radius: 15px;
`;

export const AddPlantFormPhotoInputWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

export const IndicatorsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  grid-column: 1/3;
  margin-top: 35px;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    grid-column: 1/2;
  }
`;
