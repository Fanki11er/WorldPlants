import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const SelectSiteTypeFormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  row-gap: 20px;
  font-size: ${(props: AppTheme) => props.theme.fontSizes.medium};
`;

export const FieldsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 180px);
  gap: 20px;
  justify-content: center;
  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    height: 345px;
    overflow-y: scroll;
  }

  &::-webkit-scrollbar {
    width: 15px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
    border-radius: 10px;
    min-height: 100px;
    border: 3px solid;
    border: none;
  }
`;

export const InfoHeader = styled.h2`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.large};
  text-align: center;
`;
