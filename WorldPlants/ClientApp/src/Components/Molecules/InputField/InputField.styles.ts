import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const InputFieldWrapper = styled.div`
    width: fit-content;
    height: auto;
    display: grid;
    grid-template-rows: 1fr auto;
   
   
`;

export const InputLabel = styled.label`
     font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
     color:  ${(props: AppTheme) => props.theme.colors.green};
     padding: 5px 10px;
    
   
`;

export const Input = styled.input`
    width: fit-content;
    height: auto;
    padding: 5px 10px;
    //background-image: ${(props: AppTheme) => props.theme.colors.gradientPurple};
    background-color: ${(props: AppTheme) => props.theme.colors.purple};
    border-radius: 25px;
    outline: none;
    border: 2px solid transparent;

    :hover {
        color:  ${(props: AppTheme) => props.theme.colors.white};
    }
   
`;