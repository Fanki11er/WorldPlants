import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const SelectSiteTypeFormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export const FieldsWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  gap: 20px;
`;

export const InfoHeader = styled.h2`
  color: ${(props: AppTheme) => props.theme.colors.orange};
`;
