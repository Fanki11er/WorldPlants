import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const PlantDetailWithIconWrapper = styled.div`
  display: grid;
  grid-template-columns: 40px auto auto;
  width: fit-content;
  column-gap: 10px;
  align-items: center;
  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    grid-template-columns: auto;
    row-gap: 5px;
  }
`;

export const PlantDetailWithIconTitle = styled.span<AppTheme>`
  color: ${(props) => props.theme.colors.orange};
`;

export const PlantDetailWithIconValue = styled.span<AppTheme>`
  color: ${(props) => props.theme.colors.greenSettingsActive};
  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    align-self: flex-start;
  }
`;
