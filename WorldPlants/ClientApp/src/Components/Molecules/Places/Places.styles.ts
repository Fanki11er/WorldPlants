import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const PlacesWrapper = styled.div`
    background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
    display: grid;
    row-gap: 40px;
    border-radius: 15px;
    padding: 10px 20px;
    min-width: 350px;
    max-width: 450px;
`;

export const HeaderAndImgPlaceWrapper = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    direction: rtl;
    position: relative;
`;

export const HeaderPlace = styled.h2`
    color: ${(props: AppTheme) => props.theme.colors.orange};
    font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
    font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
`;

export const ImgPlace = styled.img`
    width: 40px;
    height: 40px;
    position: absolute;
`;