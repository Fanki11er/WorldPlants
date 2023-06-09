import styled from "styled-components";
import { AppTheme } from "../../GlobalStyles/theme";

export const RouteLayoutWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    //row-gap: 100px;
    background-color:  ${(props: AppTheme) => props.theme.colors.mainBlue};
`;