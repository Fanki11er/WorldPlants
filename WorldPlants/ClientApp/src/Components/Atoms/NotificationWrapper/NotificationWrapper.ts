import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const NotificationWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 200px));
  justify-items: center;
  gap: 30px;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 20px;
`;

export const HeaderNotificationEmailAndSms = styled.h1`
  color: ${(props: AppTheme) => props.theme.colors.yellow};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
`;
