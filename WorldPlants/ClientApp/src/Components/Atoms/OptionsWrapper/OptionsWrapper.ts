import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const OptionsWrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr auto;
    row-gap: 30px;
    background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
    width: 80%;
    height: fit-content;
    border-radius: 10px;
    padding: 30px 30px 0 0;
`;