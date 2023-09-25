import { Field } from "formik";
import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

interface Props {
  $checked: string;
}

export const SunExposuresRadioFieldWrapper = styled.label`
  display: grid;
  grid-template-columns: auto 110px 1fr;
  position: relative;
  column-gap: 25px;
  align-items: center;
  max-width: 600px;
  min-width: 200px;
  border-radius: 25px;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  padding: 10px 30px;
  border: 2px solid
    ${(props: Props & AppTheme) =>
      props.$checked === "true"
        ? props.theme.colors.orange
        : props.theme.colors.transparent};
  transition: all 0.5s;
  :hover,
  :focus {
    border: 2px solid ${(props: AppTheme) => props.theme.colors.orange};
  }
`;

export const LabelText = styled.span`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  font-weight: bold;
  justify-self: flex-start;
`;

export const SunLevelIcon = styled.img`
  width: 50px;
  height: 50px;
  justify-self: flex-start;
`;

export const DescriptionListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  row-gap: 10px;
`;

export const SunExposureDescription = styled.p`
  margin: 0;
`;
