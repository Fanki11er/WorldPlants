import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const GuestAccountsListWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: 15px;
`;

export const GuestListItemWrapper = styled.li`
        height: fit-content;
        background-color: ${(props: AppTheme) => props.theme.colors.darkPurple};
        border-radius: 25px;
        list-style: none;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        justify-content: center;
        align-items: center;
        padding: 5px 20px;
        column-gap: 20px;
        box-shadow: 5px 5px 5px ${(props: AppTheme) => props.theme.colors.mainBlue};
`;

export const HeaderGuestListItem = styled.h2`
        color: ${(props: AppTheme) => props.theme.colors.yellow};
        font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
        font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
`;