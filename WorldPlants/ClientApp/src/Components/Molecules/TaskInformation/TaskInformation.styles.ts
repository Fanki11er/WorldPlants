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
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-image: ${(props) =>
    props.$status === "Future"
      ? props.theme.colors.gradientBlue
      : props.theme.colors.orangeGradient};
`;

export const TaskInformationIndicatorNumber = styled.span<Status>`
  color: ${(props) =>
    props.$status === "Future"
      ? props.theme.colors.mainBlue
      : props.theme.colors.claret};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.large};
  font-weight: bold;
`;

export const TaskInformationIndicatorToday = styled.span`
  color: ${(props: AppTheme) => props.theme.colors.mainBlue};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
  font-weight: bold;
`;
