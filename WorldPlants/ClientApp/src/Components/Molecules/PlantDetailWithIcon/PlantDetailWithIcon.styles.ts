import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const PlantDetailWithIconWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  width: fit-content;
  column-gap: 10px;
  align-items: center;
`;

export const PlantDetailWithIconTitle = styled.span<AppTheme>`
  color: ${(props) => props.theme.colors.orange};
`;

export const PlantDetailWithIconValue = styled.span<AppTheme>`
  color: ${(props) => props.theme.colors.greenSettingsActive};
`;
