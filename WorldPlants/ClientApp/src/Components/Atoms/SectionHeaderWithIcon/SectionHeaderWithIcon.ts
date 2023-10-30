import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const SectionHeaderWithIcon = styled.h1`
  margin: 0 0 25px 0;
  display: flex;
  width: fit-content;
  column-gap: 20px;
  align-items: center;
  color: ${(props) => props.theme.colors.orange};
  align-self: center;
`;

export const SectionHeaderWithIconIcon = styled.img`
  height: 50px;
`;
