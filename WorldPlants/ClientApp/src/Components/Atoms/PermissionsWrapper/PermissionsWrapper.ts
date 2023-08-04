import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const PermissionsWrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr auto;
    row-gap: 30px;
    background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
    width: 80%;
    padding: 30px 30px 50px 0;
    justify-items: center;
`;

export const HeaderPermissions = styled.h1`
      font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
      color: ${(props: AppTheme) => props.theme.colors.yellow};
      font-size:  ${(props: AppTheme) => props.theme.fontSizes.large};
`;