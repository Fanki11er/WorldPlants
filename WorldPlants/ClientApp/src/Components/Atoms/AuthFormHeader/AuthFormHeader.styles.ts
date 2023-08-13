import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const AuthFormHeader = styled.h2`
        color: ${(props: AppTheme) => props.theme.colors.orange};
        font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
        margin: 0;
`