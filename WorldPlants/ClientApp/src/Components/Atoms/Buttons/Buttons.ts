import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";
import { NavLink } from "react-router-dom";


export const ActionButton = styled.button`
        min-width: 130px;
        width: fit-content;
        min-height: 35px;
        background-color: ${(props: AppTheme) => props.theme.colors.blue};
        border-radius: 25px;
        outline: none;
        border: none;
        padding: 5px 10px;
        color: ${(props: AppTheme) => props.theme.colors.white};
        :hover {
            background-color: ${(props: AppTheme) => props.theme.colors.orange};
            cursor: pointer;
            transition: all 0.5s;
        }
        `;

export const NavigationLink = styled(NavLink)`
        min-width: 130px;
        width: fit-content;
        min-height: 35px;
        background-color: ${(props: AppTheme) => props.theme.colors.purpleLight};
        border-radius: 25px;
        outline: none;
        border: none;
        padding: 5px 10px;
        color: ${(props: AppTheme) => props.theme.colors.white};
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        :hover:not(.active){
            background-color: ${(props: AppTheme) => props.theme.colors.orange};
            cursor: pointer;
            transition: all 0.5s;
        }
        &.active {
            color: ${(props: AppTheme) => props.theme.colors.orange};
            cursor: not-allowed;
        }
`;