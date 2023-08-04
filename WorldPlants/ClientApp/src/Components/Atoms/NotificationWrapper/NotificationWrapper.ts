import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const NotificationWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    gap: 15px;
    padding: 0 75px;
    justify-content: space-evenly;
    background: ${(props: AppTheme) => props.theme.colors.navyBlue};
`;

export const HeaderNotificationEmailAndSms = styled.h1`
        color: ${(props: AppTheme) => props.theme.colors.yellow};
        font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
        font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
`;

