import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";
import { Field } from "formik";

interface Props {
    $checked: string;
  }

export const NotificationFormLabel = styled.label`
    
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 300px;
    min-width: 180px;
    align-items: center;
    column-gap: 10px;
    background-color: ${(props: AppTheme) => props.theme.colors.darkPurple};
    border-radius: 25px;
    justify-items: center;
    align-items: center;
    padding: 5px 20px;
    box-shadow: 5px 5px 5px ${(props: AppTheme) => props.theme.colors.mainBlue};
    position: relative;
`;

export const HeaderNotification = styled.h2`
        color: ${(props: AppTheme) => props.theme.colors.orange};
        font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
        font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
`;

export const CheckboxNotification = styled.div`
     width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 2px solid
    ${(props: Props & AppTheme) => (props.$checked === "true" ? props.theme.colors.greenSettings : props.theme.colors.mainBlue)};
    background-color: ${(props: Props & AppTheme) =>
    props.$checked === "true" ? props.theme.colors.greenSettings  : props.theme.colors.transparent};
    justify-self: flex-end;
    transition: all 0.5s;
    
`;

export const HiddenCheckbox = styled(Field)`
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  justify-self: center;
  display: none;
`;
