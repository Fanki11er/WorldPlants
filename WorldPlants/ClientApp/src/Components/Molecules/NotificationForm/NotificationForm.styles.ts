import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const NotificationFormWrapper= styled.form`
    display: grid;
    row-gap: 40px;
    grid-template-columns: 1fr;
    column-gap: 40px;
    justify-items: center;
    align-items: center;
  
`;

export const NotificationFormLabel = styled.label`
    width: 200px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    background-color: ${(props: AppTheme) => props.theme.colors.darkPurple};
    border-radius: 25px;
    justify-items: center;
    align-items: center;
    padding: 5px 20px;
    box-shadow: 5px 5px 5px ${(props: AppTheme) => props.theme.colors.mainBlue};
`;

export const HeaderNotification = styled.h2`
        color: ${(props: AppTheme) => props.theme.colors.orange};
        font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
        font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
`;

export const CheckboxNotification = styled.input`
     width: 16px;
     height: 16px;
     background: ${(props: AppTheme) => props.theme.colors.greenSettings};
     border-radius: 3px;
    
`;

