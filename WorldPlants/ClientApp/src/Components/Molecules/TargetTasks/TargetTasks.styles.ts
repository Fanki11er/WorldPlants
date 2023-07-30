import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const TargetTasksWrapper = styled.div`
    background-color: ${(props: AppTheme) => props.theme.colors.purpleLight};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
    border-radius: 25px;
    width: 401px;
    height: 162px;
    position: relative;
`;

export const ImgAndHeaderWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 30px;
    justify-content: center;
    align-items: center;
`;

export const ImgPlant = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 10px;
`;

export const HeaderWrapper = styled.div`
    display: gap;
   
`;

export const HeaderPlant= styled.h3`
    color: ${(props: AppTheme) => props.theme.colors.yellow};
`;

export const HeaderSpace = styled.h4`
     color: ${(props: AppTheme) => props.theme.colors.turquoise};
`;

export const ImgTreeWrapper = styled.div`
    margin: 42px 230px;
    position: absolute;
   
`;

export const ImgTree = styled.img`
    width: 100px;
    height: 100px;
    opacity:0.4;
`;