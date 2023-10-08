import styled from "styled-components";

interface Props {
  $isDelayed: boolean;
}

export const PlantTasksSectionTasksListWrapper = styled.ul`
  margin-top: 40px;
  width: 100%;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, 340px);
  row-gap: 80px;
  column-gap: 15px;
  justify-content: space-evenly;
  padding: 0;
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
`;

export const PlantTasksSectionTaskIndicator = styled.div<Props>`
  display: flex;
  flex-direction: column;
  row-gap: 2px;
  justify-content: center;
  align-items: center;
  padding: 15px;
  width: 80px;
  height: 80px;
  background-image: linear-gradient(
    ${(props) =>
      props.$isDelayed
        ? "180deg, #FA5D56 0%, #F4B167 100%"
        : "180deg, #1089EC 0%, #4BC4DB 100%"}
  );
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
  color: ${(props) =>
    !props.$isDelayed
      ? props.theme.colors.navyBlue
      : props.theme.colors.claret};
  font-weight: bold;
`;

export const PlantTaskSectionTaskInformationIndicatorInnerText = styled(
  PlantTasksSectionTaskIndicatorTextCore
)<Props>`
  font-size: ${(props) => props.theme.fontSizes.smallX};
`;

export const PlantTaskSectionTaskInformationIndicatorNumber = styled(
  PlantTasksSectionTaskIndicatorTextCore
)<Props>`
  font-size: ${(props) => props.theme.fontSizes.large};
`;

export const PlantTasksSectionTaskHeader = styled.h2`
  margin: 0;
  color: ${(props) => props.theme.colors.orange};
  text-align: center;
`;

export const PantTasksSectionTaskButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const StyledButton = styled.button`
  min-width: 80px;
  width: fit-content;
  padding: 5px 15px;
  height: 40px;
  display: flex;
  outline: none;
  border-radius: 10px;
  border: 2px solid transparent;
  transition: all 0.5s;

  background-color: ${(props) => props.theme.colors.purpleLight};
  color: ${(props) => props.theme.colors.white};
  justify-content: center;
  align-items: center;
  &:hover,
  &:focus {
    border: 2px solid ${(props) => props.theme.colors.orange};
    cursor: pointer;
  }
`;
