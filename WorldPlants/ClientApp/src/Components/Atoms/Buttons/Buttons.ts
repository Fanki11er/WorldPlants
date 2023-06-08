import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";



export const ButtonAuth = styled.button`
    width: fit-content;
    height: auto;
    background-color: ${(props: AppTheme) => props.theme.colors.blue};
    border-radius: 15px;
    padding: 5px 30px;
    outline : none;
    border: 2px solid transparent;
    color:  ${(props: AppTheme) => props.theme.colors.white};
   
`

export const ActionButton = styled.button`
        min-width: 130px;
        width: fit-content;
        min-height: 35px;
        background-color: ${(props: AppTheme) => props.theme.colors.blue};
        border-radius: 25px;
        outline: none;
        border: none;
        padding: 5px 10px;
        :hover {
            background-color: ${(props: AppTheme) => props.theme.colors.orange};
            cursor: pointer;
            transition: all 0.5s;
        }
        `;
