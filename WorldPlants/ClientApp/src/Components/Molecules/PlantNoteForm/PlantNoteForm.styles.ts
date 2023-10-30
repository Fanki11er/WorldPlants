import { Form } from "formik";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const PlantNoteFormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  min-width: 340px;
  max-width: 600px;
  row-gap: 20px;
  align-items: center;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  border-radius: 15px;
  padding: 30px 20px;
`;

export const SetImageWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  justify-content: center;
  align-items: flex-end;
  column-gap: 15px;
  row-gap: 15px;
`;

export const NoteFormImagePreview = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 15px;
  object-fit: cover;
`;
