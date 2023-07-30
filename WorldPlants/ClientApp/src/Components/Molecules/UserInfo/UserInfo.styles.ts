import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const UserInfoWrapper = styled.div`
    display: grid;
    grid-template-columns: 40px auto;
    grid-column-gap: 15px;
    align-items: center;
`;

export const UserImage = styled.img`
    width: 40px;
    height: 40px;
`;

export const UserName = styled.span`
    color: ${(props: AppTheme) => props.theme.colors.white};
    width: fit-content;
`;