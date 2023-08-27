import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const PlantsWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr auto;
  gap: 30px;
  background-color: ${(props: AppTheme) => props.theme.colors.mainBlue};
  /* min-height: 400px; */
  height: 100%;
  border-radius: 10px;
  padding: 50px 0;
  margin-bottom: 50px;
  justify-items: center;
`;
