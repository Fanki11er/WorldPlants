import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const SunExposureWrapper = styled.div`
    background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
    display: grid;
    row-gap: 40px;
    border-radius: 15px;
    padding: 10px 20px;
    min-width: 550px;
    max-width: 650px;
`;

export const HeaderAndImgSunExposureWrapper = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0 60px;
    align-items: center;
    position: relative;
`;

export const HeaderSunExposure= styled.h2`
    color: ${(props: AppTheme) => props.theme.colors.orange};
    font-size: ${(props: AppTheme) => props.theme.fontSizes.large};
    font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
`;

export const ImgSunExposure = styled.img`
    width: 40px;
    height: 40px;
    position: absolute;
`;

export const TextSunExposure = styled.p`
     font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
     color: ${(props: AppTheme) => props.theme.colors.green};
     font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
`;