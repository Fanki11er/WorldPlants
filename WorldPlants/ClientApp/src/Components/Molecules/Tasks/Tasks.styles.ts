import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const TasksWrapper = styled.div`
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  display: grid;
  row-gap: 40px;
  border-radius: 25px;
  padding: 30px 20px;
  min-width: 350px;
  max-width: 450px;
`;

export const HeaderAndImgWrapper = styled.div`
  display: grid;
  grid-template-columns: 5px 200px;
  column-gap: 40px;
  justify-content: center;
  align-items: center;
`;

export const HeaderTask = styled.h2`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.large};
`;

export const ImgTask = styled.img`
  width: 30px;
  height: 30px;
`;
