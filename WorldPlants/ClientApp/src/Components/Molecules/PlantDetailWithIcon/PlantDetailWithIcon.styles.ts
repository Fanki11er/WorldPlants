import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const PlantDetailWithIconWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  width: fit-content;
  column-gap: 5px;
  align-items: center;
`;

export const PLantDetailWithIconTitle = styled.span<AppTheme>`
  color: ${(props) => props.theme.colors.orange};
`;

export const PLantDetailWithIconValue = styled.span<AppTheme>`
  color: ${(props) => props.theme.colors.greenSettingsActive};
`;

//#3ca023
