import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const SettingsSectionWrapper = styled.div`
        display: grid;
        grid-template-columns: 1fr;
        justify-content: center;
        align-items: center;
        ;
       
`;

export const SettingsSectionHeader = styled.h1`
     font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
     color: ${(props: AppTheme) => props.theme.colors.orange};
     font-size:  ${(props: AppTheme) => props.theme.fontSizes.large};
`;