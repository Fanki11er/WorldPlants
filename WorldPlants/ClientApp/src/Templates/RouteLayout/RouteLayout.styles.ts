import styled from "styled-components";
import { AppTheme } from "../../GlobalStyles/theme";

export const RouteLayoutWrapper = styled.div`
  width: 100%;
  min-height: calc(85vh + 150px);
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  background-color: ${(props: AppTheme) => props.theme.colors.mainBlue};
`;
