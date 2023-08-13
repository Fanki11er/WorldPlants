import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const DeletingAccountsWrapper = styled.div`
    width: 80%;
    border: 2px solid ${(props: AppTheme) => props.theme.colors.red};
    border-radius: 10px;
    display: grid;
    justify-content: center;
    align-items: center;
    padding: 30px;

`;