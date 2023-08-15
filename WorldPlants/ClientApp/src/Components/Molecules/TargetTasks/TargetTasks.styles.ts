import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const TargetTasksWrapper = styled.div`
  background: ${(props: AppTheme) => props.theme.colors.gradientPurple};
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
  column-gap: 10px;
`;

export const ImgPlant = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
`;

export const HeaderWrapper = styled.div`
  display: grid;
  grid-template-rows: 35px 30px;
  align-items: flex-end;
`;

export const HeaderPlant = styled.h3`
  color: ${(props: AppTheme) => props.theme.colors.yellow};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
`;

export const HeaderSpace = styled.h4`
  color: ${(props: AppTheme) => props.theme.colors.turquoise};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
`;

export const ImgTreeWrapper = styled.div`
  margin: 42px 230px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  position: absolute;
`;

export const ImgTree = styled.img`
  width: 100px;
  height: 100px;
  opacity: 0.4;
`;

export const BlueCircleImgWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-top: 10px;
  margin-left: 9px;
`;

export const BlueCircleImg = styled.img`
  width: 40px;
  height: 40px;
`;
