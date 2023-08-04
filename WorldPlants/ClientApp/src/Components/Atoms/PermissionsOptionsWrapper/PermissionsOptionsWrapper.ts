import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const PermissionsOptionsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    align-content: center;
    background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};

  
`;