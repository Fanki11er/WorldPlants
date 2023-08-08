import { Form } from "formik";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const DeleteAccountFormWrapper = styled(Form)`
  width: 100%;
  display: grid;
  row-gap: 10px;
  justify-items: center;
  border: 2px solid ${(props: AppTheme) => props.theme.colors.red};;
  border-radius: 10px;
  padding: 40px;
`;

export const DeleteAccountInstruction = styled.span`
     font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
     font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
     color:  ${(props: AppTheme) => props.theme.colors.red};

`;