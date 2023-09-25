import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

interface Props {
  $isDelayed: boolean;
}
export const PlantTasksSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 35px;
  width: 100%;
  align-items: center;
`;

export const PlantTasksSectionTasksList = styled.ul`
  margin-top: 40px;
  width: 100%;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, 340px);
  row-gap: 80px;
  padding: 0;
  column-gap: 15px;
  justify-content: space-evenly;
  align-items: flex-start;
`;

export const PantTasksSectionTaskListItem = styled.li`
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 340px;
  background-image: ${(props) => props.theme.colors.gradientPurple};
  row-gap: 20px;
  padding: 50px 15px 15px 15px;
  border-radius: 15px;
  height: 200px;
  opacity: 0;
  animation-name: show;
  animation-duration: 1s;
  animation-fill-mode: forwards;

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const PlantTasksSectionTaskIndicator = styled.div<Props>`
  display: flex;
  flex-direction: column;
  column-gap: 15px;
  align-items: center;
  justify-content: center;
  padding: 15px;
  width: 80px;
  height: 80px;
  font-size: ${(props: AppTheme) => props.theme.fontSizes.large};
  background-image: ${(props) =>
    props.$isDelayed
      ? props.theme.colors.orangeGradient
      : props.theme.colors.gradientBlue};
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const PlantTasksSectionTaskIndicatorTextCore = styled.span<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  color: ${(props) => (!props.$isDelayed ? "#071D53" : "#690C0B")};
  font-weight: bold;
`;

export const PlantTaskSectionTaskInformationIndicatorInnerText = styled(
  PlantTasksSectionTaskIndicatorTextCore
)<Props>`
  font-size: 12px;
`;

export const PlantTaskSectionTaskInformationIndicatorNumber = styled(
  PlantTasksSectionTaskIndicatorTextCore
)<Props>`
  font-size: 20px;
`;

export const PlantTasksSectionTaskHeader = styled.h2`
  margin: 0;
  color: ${(props: AppTheme) => props.theme.colors.orange};
  text-align: center;
`;

export const PantTasksSectionTaskButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
