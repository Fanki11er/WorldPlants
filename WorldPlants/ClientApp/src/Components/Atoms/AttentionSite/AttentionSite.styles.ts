import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const AttentionSite = styled.h2`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
`;

export const AttentionSiteIcon = styled.img`
  width: 40px;
  height: 40px;
`;
