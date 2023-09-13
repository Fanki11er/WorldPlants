import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";
import { Form } from "formik";

export const DeleteFormWrapper = styled(Form)`
  width: 100%;
  display: grid;
  row-gap: 10px;
  justify-items: center;
  border: 2px solid ${(props: AppTheme) => props.theme.colors.red};
  border-radius: 25px;
  padding: 40px;
`;

export const DeleteFormInstruction = styled.span`
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
  color: ${(props: AppTheme) => props.theme.colors.red};
  width: 80%;
  max-width: 220px;
  padding-left: 10px;
`;
