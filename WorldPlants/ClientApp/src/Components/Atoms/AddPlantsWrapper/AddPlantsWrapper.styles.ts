import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const AddPlantsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  border-radius: 25px;
  padding: 20px;
  min-width: 800px;
  max-width: 300px;
`;
