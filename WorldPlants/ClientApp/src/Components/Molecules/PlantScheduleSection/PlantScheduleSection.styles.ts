import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const PlantScheduleSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 35px;
  width: 75%;
  max-width: 800px;
`;

export const PlantScheduleConcreteTypeWrapper = styled.div<AppTheme>`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  background-color: ${(props) => props.theme.colors.navyBlue};
  border-radius: 20px;
  min-height: 100px;
  min-width: 340px;
  padding: 25px;
`;
export const PlantScheduleConcreteTypeHeaderWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  column-gap: 10px;
  align-items: center;
`;

export const PlantScheduleConcreteTypeHeader = styled.h2`
  margin: 0;
  color: ${(props: AppTheme) => props.theme.colors.orange};
`;
