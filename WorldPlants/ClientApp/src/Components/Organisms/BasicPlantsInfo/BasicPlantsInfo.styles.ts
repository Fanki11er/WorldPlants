import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const BasicPlantsInfoWrapper = styled.div``;

export const BasicPlantsInfoImg = styled.img`
  border-radius: 25px;
  width: 100%;
`;

export const BasicPlantsInfoHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const BasicPlantsInfoWateringHeader = styled.h2`
  font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
  color: ${(props: AppTheme) => props.theme.colors.orange};
`;

export const BasicPlantsInfoSunHeader = styled.h3`
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
  color: ${(props: AppTheme) => props.theme.colors.greenSettingsActive};
`;

export const BasicPlantsInfoImgWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0 20px 20px;
`;

export const BasicPlantsInfoWateringImg = styled.img`
  width: 40px;
  height: 40px;
`;

export const BasicPlantsInfoSunImg = styled.img`
  width: 40px;
  height: 40px;
`;
