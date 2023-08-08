import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const SettingsSectionWrapper = styled.div`
        width: 80%;
        display: grid;
        grid-template-columns: 1fr;
        justify-items: center;
`;

export const SettingsSectionHeader = styled.h1`
     font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
     color: ${(props: AppTheme) => props.theme.colors.orange};
     font-size:  ${(props: AppTheme) => props.theme.fontSizes.large};
     margin-right: 140px;
     margin-bottom: 8px;
   
`;