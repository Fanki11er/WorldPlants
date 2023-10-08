import styled from "styled-components";

export const SectionHeaderWithIcon = styled.h1`
  margin: 0 50px 25px 0;
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
