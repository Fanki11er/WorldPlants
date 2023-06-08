import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const AuthFormWrapper = styled.form`
    background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    row-gap: 40px;
    justify-items: center;
    border-radius: 25px;
    padding:30px 20px;
    min-width: 350px;
    max-width: 450px;
    position: relative;
`;

export const ImgAuth = styled.img`
     width: 100px;
    height: 100px;
    position: absolute;
    right: 0;
    left: 230px;
    top:10%;
`