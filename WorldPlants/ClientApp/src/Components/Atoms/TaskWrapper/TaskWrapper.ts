import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const TaskWrapper = styled.div`
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  //row-gap: 40px;
  justify-items: flex-start;
  border-radius: 25px;
  // padding: 30px 20px;
  min-width: 350px;
  max-width: 450px;
  position: relative;
`;

export const HeaderAndImgWrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  //grid-template-columns: 1fr 1fr; */
  //grid-auto-rows: auto;
  //display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

export const HeaderTask = styled.h2`
  color: ${(props: AppTheme) => props.theme.colors.orange};
`;

export const ImgTask = styled.img`
  width: 30px;
  height: 30px;
`;
