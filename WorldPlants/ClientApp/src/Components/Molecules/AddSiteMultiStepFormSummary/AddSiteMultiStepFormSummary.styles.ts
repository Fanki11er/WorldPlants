import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const AddSiteMultiStepFormSummaryWrapper = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  align-items: center;
`;

export const SectionHeader = styled.h2`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  align-self: flex-start;
  font-size: ${(props: AppTheme) => props.theme.fontSizes.large};
  font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
`;

export const SunExposureInfoWrapper = styled.div`
  display: flex;
  border-radius: 20px;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  column-gap: 20px;
  padding: 20px;
  width: 300px;
  justify-content: center;
`;

export const SunExposureIcon = styled.img`
  width: 50px;
  height: 50px;
`;

export const SunExposureName = styled.span`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
  font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
`;
