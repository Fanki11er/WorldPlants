import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const PermissionsFormWrapper = styled.form`
    display: flex;
    flex-flow: row wrap;
    padding: 0 0;
    column-gap: 30px;
    row-gap: 20px;
    justify-content: space-evenly;
`;  

export const PermissionsLabel = styled.label`
    width: 200px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    background-color: ${(props: AppTheme) => props.theme.colors.darkPurple};
    border-radius: 25px;
    justify-items: center;
    align-items: center;
    padding: 5px 20px;
    box-shadow: 5px 5px 5px ${(props: AppTheme) => props.theme.colors.mainBlue};
`;

