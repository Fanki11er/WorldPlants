import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const SettingsSectionWrapper = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
  row-gap: 15px;
  grid-column: 2/3;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    grid-column: 1/2;
    padding: 0 20px;
  }
`;

export const SettingsSectionHeader = styled.h1`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.large};
  margin-bottom: 8px;
  width: fit-content;
  justify-self: flex-start;
`;
