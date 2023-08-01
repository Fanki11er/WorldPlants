import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const NotificationListItemWrapper = styled.ul`
    display: grid;
    flex-direction: column;
    row-gap: 15px;
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
`;

export const HeaderNotificationListItem = styled.h2`
        color: ${(props: AppTheme) => props.theme.colors.orange};
        font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
        font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
`;

export const CheckboxNotification = styled.div`
    display: inline-block;
     width: 16px;
     height: 16px;
     background: ${(props: AppTheme) => props.theme.colors.greenSettings};
     border-radius: 3px;
     transition: all 150ms;
    
`;