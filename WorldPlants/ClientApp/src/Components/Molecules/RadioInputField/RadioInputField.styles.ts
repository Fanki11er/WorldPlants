import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

interface Props {
  $checked: string;
}

export const RadioInputFieldWrapper = styled.label`
  display: grid;
  grid-template-columns: 1fr auto;
  position: relative;
  align-items: center;
  width: 180px;
  column-gap: 20px;
  border-radius: 25px;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  padding: 10px 30px;
  border: 2px solid
    ${(props: Props & AppTheme) =>
      props.$checked === "true"
        ? props.theme.colors.navyBlue
        : props.theme.colors.transparent};
  transition: all 0.5s;
`;

export const LabelText = styled.span`
  color: ${(props: AppTheme) => props.theme.colors.orange};
  font-weight: bold;
  justify-self: flex-start;
`;

export const SiteIcon = styled.img`
  width: 30px;
  height: 30px;
  justify-self: flex-end;
`;
