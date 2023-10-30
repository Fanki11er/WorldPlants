import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const SelectSunExposureFormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: ${(props: AppTheme) => props.theme.colors.turquoise};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
`;

export const InfoHeader = styled.h2`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.large};
  margin: 0;
  text-align: center;
`;
