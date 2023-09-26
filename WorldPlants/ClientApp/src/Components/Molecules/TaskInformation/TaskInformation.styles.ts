import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

interface Status {
  $status: "Delayed" | "Future";
}
export const TaskInformationWrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  align-items: center;
`;

export const TaskInformationTitle = styled.span<Status>`
  color: ${(props) =>
    props.$status === "Future"
      ? props.theme.colors.turquoise
      : props.theme.colors.orange};
  font-weight: bold;
  width: 90px;
  text-align: center;
`;

export const TaskInformationIndicator = styled.div<Status>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background-image: ${(props) =>
    props.$status === "Future"
      ? props.theme.colors.gradientBlue
      : props.theme.colors.orangeGradient};
`;

const TaskInformationIndicatorInnerTextCore = styled.span<Status>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  font-weight: bold;
  color: ${(props) =>
    props.$status === "Future"
      ? props.theme.colors.navyBlue
      : props.theme.colors.claret};
`;

export const TaskInformationIndicatorInnerText = styled(
  TaskInformationIndicatorInnerTextCore
)<Status>`
  font-size: 10px;
`;

export const TaskInformationIndicatorNumber = styled(
  TaskInformationIndicatorInnerTextCore
)<Status>`
  font-size: 16px;
`;

export const TaskInformationIndicatorToday = styled.span`
  color: ${(props: AppTheme) => props.theme.colors.mainBlue};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
  font-weight: bold;
`;
