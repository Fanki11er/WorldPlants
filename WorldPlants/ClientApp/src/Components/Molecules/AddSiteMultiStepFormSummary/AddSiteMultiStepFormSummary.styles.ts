import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const AddSiteMultiStepFormSummaryWrapper = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

export const SectionHeader = styled.h2`
  color: ${(props: AppTheme) => props.theme.colors.orange};
`;

export const SunExposureInfoWrapper = styled.div`
  display: flex;
  border-radius: 20px;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  column-gap: 20px;
  padding: 20px;
  width: fit-content;
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
`;
