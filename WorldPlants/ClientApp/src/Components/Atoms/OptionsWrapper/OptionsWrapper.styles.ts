import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const OptionsWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr auto;
  //row-gap: 30px;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  min-height: 400px;
  border-radius: 10px;
  padding: 50px 0;
  margin-bottom: 50px;
`;
