import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const FooterWrapper = styled.footer`
        background-color: ${(props: AppTheme) => props.theme.colors.darkBlue};
        width: 100%;
        height: 100px;
        grid-row: 2/3;
        position: relative;
`;

export const FooterImage = styled.img`
        position:absolute;
        width: 100%;
        bottom: 0;


`;

export const AuthorsContainer = styled.div`
        width: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        column-gap: 10px;
        position: absolute;
        left: 37%;
        bottom: 20%;
`;
export const AuthorName = styled.span`
        color: ${(props: AppTheme) => props.theme.colors.gray};
        font-size: calc(8px + (18 - 10) * ((100vw - 360px) / (1600 - 360)));
`;

